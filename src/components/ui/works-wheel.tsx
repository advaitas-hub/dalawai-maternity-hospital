"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Facility or project title. Shown beside the front card and in the index. */
  title: string;
  /** Facility photo URL (local asset or Unsplash image). */
  image: string;
  /** Facility detail link or section hash. */
  href?: string;
  /** Short description or category badge (optional). */
  category?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring at rest. @default "Our Facilities" */
  label?: string;
  /** Label on the card's hover affordance. @default "Explore" */
  action?: string;
}

/* Geometry & Math Constants */
const CARD_H = 0.38; // front card height relative to stage
const CARD_MAX_W = 0.34; // max width ratio
const CARD_RATIO = 1.45; // aspect ratio width / height
const STEP = 36; // degrees between items on 3D drum
const DRUM = 2.22; // drum radius in card heights
const LENS = 2.7; // 3D perspective distance
const RING_R = 1.14; // rest ring radius
const BOW = 1.82; // arc curvature radius
const TITLE = 0.095; // ring label & front-card title scale
const INDEX = 0.038; // right-side index text scale
const CULL = 1.8; // culling threshold for distant cards

const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Our Facilities",
  action = "Explore",
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  const settling = React.useRef(0);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  const drag = React.useRef<number | null>(null);

  return (
    <section
      aria-label={label}
      className={cn(
        "relative h-full min-h-[30rem] md:min-h-[36rem] w-full overflow-hidden select-none bg-gradient-to-b from-white via-teal-50/20 to-slate-50 text-slate-900",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`facility-wheel-${active}`}
        className="absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href ? "a" : "div") as "a";
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`facility-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  className="group absolute [backface-visibility:hidden]"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="relative block size-full overflow-hidden rounded-2xl border border-teal-100/80 bg-white shadow-[0_20px_45px_-15px_rgba(15,118,110,0.18)] transition-all duration-300 group-hover:shadow-[0_25px_50px_-12px_rgba(15,118,110,0.28)] group-hover:border-teal-300">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Subtle Medical Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                    {/* Facility Badge */}
                    <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-semibold tracking-wider text-teal-800 uppercase backdrop-blur-md shadow-sm">
                      {item.category || "Hospital Facility"}
                    </div>

                    {/* Action Button */}
                    {action && item.href ? (
                      <span className="pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1.5 rounded-full bg-teal-600 px-3 py-1.5 text-[0.72rem] font-semibold text-white shadow-md backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:bg-teal-700">
                        <span>{action}</span>
                        <svg
                          viewBox="0 0 12 12"
                          className="size-3"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Ring Center Title (At Rest) */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center font-extrabold tracking-tight text-slate-800 transition-opacity duration-300 drop-shadow-sm"
        style={{ fontSize: metrics.title }}
      >
        <span className="bg-gradient-to-r from-teal-800 via-slate-900 to-teal-700 bg-clip-text text-transparent">
          {label}
        </span>
      </div>

      {/* Active Facility Title (On Wheel Turn) */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[5%] md:left-[8%] -translate-y-1/2 max-w-[40%] tracking-tight opacity-0 transition-opacity duration-300"
        style={{ fontSize: metrics.title }}
      >
        <div className="text-[0.4em] font-bold tracking-widest text-teal-600 uppercase mb-1">
          Featured Facility
        </div>
        <div className="font-extrabold text-slate-900 leading-none">
          {items[active]?.title}
        </div>
      </div>

      {/* Right-hand Side Index List */}
      <ol
        className="absolute top-[8%] right-[3%] md:right-[4%] text-right leading-[1.8] space-y-0.5 z-20"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "group inline-flex items-center gap-2 cursor-pointer transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-teal-500 rounded px-1.5 py-0.5 text-slate-500 hover:text-teal-700",
                i === active && "text-teal-800 font-bold scale-105"
              )}
            >
              <span
                className={cn(
                  "inline-block size-1.5 rounded-full transition-all duration-300",
                  i === active
                    ? "bg-teal-600 scale-125 shadow-[0_0_8px_rgba(13,148,136,0.6)]"
                    : "bg-slate-300 group-hover:bg-teal-400"
                )}
              />
              <span>{item.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default WorksWheel;
