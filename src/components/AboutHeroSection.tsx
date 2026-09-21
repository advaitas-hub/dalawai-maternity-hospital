import { useState } from "react";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  Stethoscope,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Clock,
  Users,
  CheckCircle2,
  MapPin,
  PhoneCall,
  GraduationCap,
  Calendar,
  ChevronDown,
  ChevronUp,
  Star,
  Quote,
  Shield,
  Zap,
  Heart,
  Building2,
} from "lucide-react";



/* ─── Main Component ─────────────────────────────────────────────────── */
export function AboutHeroSection() {
  const [activeDoctor, setActiveDoctor] = useState<"sathish" | "abhishek">("sathish");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleBookAppointment = () => { window.location.href = "index.html#appointment"; };
  const handleExploreSpecialities = () => { window.location.href = "specialities.html"; };

  const doctorsData = {
    sathish: {
      name: "Dr. Sathish Dalawai",
      title: "Senior Consultant & Founder",
      degrees: "MBBS, DGO (Obstetrics & Gynecology)",
      experience: "25+ Years Clinical Experience",
      image: "assets/images/doctor_satish.jpg",
      quote: "Our founding promise in 2005 remains unchanged: to provide every woman with compassionate, safe, and world-class maternal healthcare right here in Jamkhandi.",
      bio: "Dr. Sathish Dalawai is a pioneer in maternal and gynecological care in the region. Having performed thousands of successful deliveries and complex surgeries, his visionary leadership established Dalawai Hospital as a beacon of trust, safety, and clinical excellence.",
      specialisms: ["High-Risk Pregnancy Management", "Normal & Cesarean Deliveries", "Infertility Evaluation", "Gynecological Consultations"],
    },
    abhishek: {
      name: "Dr. Abhishek Dalawai",
      title: "Laparoscopic Surgeon & Clinical Director",
      degrees: "MBBS, MS (General & Laparoscopic Surgery), FMAS",
      experience: "12+ Years Surgical Expertise",
      image: "assets/images/doctor_transparent.png",
      quote: "We bring keyhole precision and zero-infection protocols to every surgical case, ensuring minimal pain and rapid recovery for our patients.",
      bio: "Dr. Abhishek Dalawai specializes in advanced minimally invasive laparoscopic surgery, emergency trauma management, and critical surgical care. He leads the 24/7 Surgical ICU (SICU) and modern modular operation theater suite.",
      specialisms: ["Total Laparoscopic Hysterectomy (TLH)", "Fibroid & Ovarian Cyst Removal", "Critical Care & SICU Management", "Emergency Abdominal Surgeries"],
    },
  };

  const facilityCards = [
    { icon: <Shield className="w-5 h-5" />, title: "Modular HEPA Operation Suites", desc: "Zero-infection laminar airflow with HD laparoscopic towers and shadowless surgical lighting.", color: "emerald" },
    { icon: <Activity className="w-5 h-5" />, title: "24/7 Surgical ICU (SICU)", desc: "Multi-para telemetry monitoring, central oxygen lines, and emergency ventilator support.", color: "teal" },
    { icon: <Heart className="w-5 h-5" />, title: "Gentle Labour & Delivery Suite", desc: "Painless delivery options, continuous fetal monitoring, and 3D/4D ultrasound scanning.", color: "rose" },
    { icon: <Sparkles className="w-5 h-5" />, title: "Postnatal Ayurvedic Wellness", desc: "Traditional herbal oil therapies, lactation support, and postnatal mother-baby recovery care.", color: "amber" },
    { icon: <Building2 className="w-5 h-5" />, title: "Comfortable Inpatient Wards", desc: "Air-conditioned private suites and deluxe rooms with round-the-clock nursing care.", color: "blue" },
    { icon: <Stethoscope className="w-5 h-5" />, title: "OPD Specialist Clinics", desc: "Daily consultation clinics with senior specialists across all departments and diagnostics.", color: "violet" },
  ];

  const faqs = [
    { q: "What emergency services are available 24/7 at Dalawai Hospital?", a: "Our emergency department, labour room, blood transfusion support, and Surgical ICU operate 24 hours a day, 7 days a week with on-call specialists and trained nursing staff." },
    { q: "What are the advantages of Laparoscopic (Keyhole) Surgery?", a: "Laparoscopic surgery offers tiny 5mm incisions, minimal blood loss, significantly less post-operative pain, shorter hospital stays (often 24–48 hours), and a much faster return to normal daily routines." },
    { q: "What does Postnatal Ayurvedic Care include?", a: "Our postnatal care blends medical nursing with traditional Ayurvedic herbal oils, herbal bath therapies, infant massage, lactation counseling, and dietary guidance tailored for post-delivery recovery." },
    { q: "How can I book an appointment?", a: "You can book via the 'Book Appointment' button on our website, visit our OPD counter at Dalawai Hospital, Jamkhandi, or call our 24/7 helpline." },
  ];

  const doc = doctorsData[activeDoctor];

  const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100" },
    teal:    { bg: "bg-teal-50",    icon: "text-teal-600",    border: "border-teal-100" },
    rose:    { bg: "bg-rose-50",    icon: "text-rose-500",    border: "border-rose-100" },
    amber:   { bg: "bg-amber-50",   icon: "text-amber-600",   border: "border-amber-100" },
    blue:    { bg: "bg-blue-50",    icon: "text-blue-600",    border: "border-blue-100" },
    violet:  { bg: "bg-violet-50",  icon: "text-violet-600",  border: "border-violet-100" },
  };

  const milestones = [
    { year: "2005", label: "Foundation", title: "Establishment of Dalawai Hospital", desc: "Founded by Dr. Sathish Dalawai with a mission to provide specialized, safe, and dignified maternal care to women in Jamkhandi and surrounding districts." },
    { year: "2012", label: "Technology Upgrade", title: "3D/4D Ultrasound & High-Risk Obstetrics", desc: "Introduced advanced colour Doppler ultrasonography and high-risk fetal monitoring systems for early diagnosis of complex fetal conditions." },
    { year: "2018", label: "Surgical Wing", title: "Laparoscopic OT & 24/7 Surgical ICU", desc: "Dr. Abhishek Dalawai joined, establishing high-end laparoscopic surgical suites and a dedicated 24/7 Surgical ICU (SICU)." },
    { year: "2026", label: "Holistic & Digital", title: "Ayurvedic Wellness & Dalawai 2.0", desc: "Launched the Postnatal Ayurvedic Wellness Center and expanded digital appointment scheduling into a fully modern multispecialty hospital." },
  ];

  return (
    <div className="w-full text-gray-800 antialiased" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* ═══════════════════════════════════════════════════════════
       SECTION 1 · HERO  (Vanta TOPOLOGY background injected via about.html)
       This section is transparent — Vanta canvas renders behind it
       ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[760px] flex flex-col items-center justify-center" style={{ background: 'transparent' }}>

        {/* ── Content ── */}
        <div className="relative w-full max-w-5xl mx-auto px-5 sm:px-8 text-center" style={{ zIndex: 10 }}>


          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight text-gray-900"
          >
            Trusted Care.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #059669 0%, #0d9488 50%, #10b981 100%)" }}
            >
              Expert Hands.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-500 font-light leading-relaxed"
          >
            Dalawai Maternity & Surgical Hospital — 18+ years of clinical
            excellence in Obstetrics, Advanced Laparoscopy, 24/7 Surgical ICU
            &amp; Postnatal Ayurvedic Wellness.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={handleBookAppointment}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              style={{ background: "linear-gradient(135deg, #059669, #0d9488)" }}
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
            <button
              onClick={handleExploreSpecialities}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white/80 backdrop-blur-sm px-8 py-3.5 text-sm font-bold text-emerald-700 shadow-sm hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95"
            >
              Our Specialities
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { icon: <Users className="h-4 w-4" />, text: "15,000+ Deliveries" },
              { icon: <Award className="h-4 w-4" />, text: "18+ Years Legacy" },
              { icon: <ShieldCheck className="h-4 w-4" />, text: "99.8% Success Rate" },
              { icon: <Clock className="h-4 w-4" />, text: "24/7 Emergency ICU" },
            ].map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-emerald-100 px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm backdrop-blur-sm"
              >
                <span className="text-emerald-500">{s.icon}</span>
                {s.text}
              </span>
            ))}
          </motion.div>

        </div>

        {/* ── Bottom fade ── */}
        <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to top, white, transparent)", zIndex: 10 }} />

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-emerald-400"
          style={{ zIndex: 11 }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>

        {/* Inline keyframes for ping-slow */}
        <style>{`
          @keyframes ping-slow {
            0% { transform: scale(0.85); opacity: 0.5; }
            70% { transform: scale(1.2); opacity: 0; }
            100% { transform: scale(1.2); opacity: 0; }
          }
        `}</style>
      </section>

      {/*
       ═══════════════════════════════════════════════════════════
       SECTION 2 · STATS STRIP
       ═══════════════════════════════════════════════════════════ */}
      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: <Users className="h-5 w-5" />, num: "15,000+", lbl: "Happy Deliveries" },
              { icon: <Award className="h-5 w-5" />, num: "18+ Years", lbl: "Clinical Practice" },
              { icon: <Clock className="h-5 w-5" />, num: "24 / 7", lbl: "Emergency & ICU" },
              { icon: <ShieldCheck className="h-5 w-5" />, num: "99.8%", lbl: "Surgical Recovery" },
            ].map((s, i) => (
              <div
                key={i}
                className={`group flex flex-col items-center justify-center gap-2 px-6 py-7 text-center transition
                  ${i < 3 ? "md:border-r md:border-gray-100" : ""}
                  ${i === 0 || i === 2 ? "border-r border-gray-100" : ""}
                  ${i < 2 ? "border-b border-gray-100 md:border-b-0" : ""}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                  {s.icon}
                </div>
                <p className="text-2xl font-extrabold text-gray-900">{s.num}</p>
                <p className="text-xs font-medium text-gray-400">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
       ═══════════════════════════════════════════════════════════
       SECTION 3 · SENIOR CONSULTANTS
       ═══════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50/60 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 shadow-sm">
              <GraduationCap className="h-3.5 w-3.5 text-emerald-500" />
              Medical Leadership
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Meet Our Senior Consultants</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 leading-relaxed">Guided by decades of clinical expertise, patient advocacy, and surgical innovation.</p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
              {(["sathish", "abhishek"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveDoctor(key)}
                  className={`flex items-center gap-2 rounded-lg px-4 sm:px-5 py-2.5 text-sm font-semibold transition-all duration-200
                    ${activeDoctor === key ? "bg-emerald-600 text-white shadow-md" : "text-gray-500 hover:text-gray-800"}`}
                >
                  {key === "sathish" ? <Stethoscope className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                  {key === "sathish" ? "Dr. Sathish" : "Dr. Abhishek"}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative lg:col-span-4 bg-gray-100">
                <img src={doc.image} alt={doc.name} className="h-[280px] w-full object-cover object-top lg:h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="mb-2 inline-block rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-bold text-white">{doc.experience}</span>
                  <p className="text-lg font-bold text-white">{doc.name}</p>
                  <p className="text-sm text-white/75">{doc.degrees}</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 p-6 sm:p-8 lg:col-span-8 lg:p-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">{doc.title}</p>
                  <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-gray-900">{doc.name}</h3>
                </div>
                <blockquote className="rounded-r-xl border-l-4 border-emerald-500 bg-emerald-50/60 py-3 pl-5 pr-4 text-sm italic leading-relaxed text-gray-600">"{doc.quote}"</blockquote>
                <p className="text-sm leading-relaxed text-gray-500">{doc.bio}</p>
                <div>
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">Key Clinical Specialisms</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {doc.specialisms.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span className="text-sm font-medium text-gray-700">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <button onClick={handleBookAppointment} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700">
                    <Calendar className="h-4 w-4" />
                    Book Consultation with {doc.name.split(" ")[1]} Sir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
       ═══════════════════════════════════════════════════════════
       SECTION 4 · FACILITIES GRID
       ═══════════════════════════════════════════════════════════ */}
      <section className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">Infrastructure & Facilities</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">State-of-the-Art Medical Facilities</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 leading-relaxed">Designed for clinical precision, zero infection risk, and absolute patient comfort.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilityCards.map((card, i) => {
              const c = colorMap[card.color];
              return (
                <div key={i} className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${c.border} ${c.bg} ${c.icon}`}>{card.icon}</div>
                  <div className="flex-1">
                    <h3 className="mb-1.5 font-bold text-gray-900">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{card.desc}</p>
                  </div>
                  <a href="facilities.html" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 transition hover:text-emerald-700">
                    Learn More <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/*
       ═══════════════════════════════════════════════════════════
       SECTION 5 · MILESTONE TIMELINE
       ═══════════════════════════════════════════════════════════ */}
      <section className="border-t border-gray-100 bg-gray-50/60 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 shadow-sm">Our Journey</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">18+ Years of Service in Jamkhandi</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 leading-relaxed">From a dedicated maternity home to a comprehensive multispecialty surgical & critical care hospital.</p>
          </div>
          <div className="relative pl-10 md:pl-14">
            <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[30px] md:-left-[38px] top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald-500 bg-white shadow-sm">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-emerald-200">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-extrabold text-white">{m.year}</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{m.label}</span>
                    </div>
                    <h4 className="mb-1.5 font-bold text-gray-900">{m.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-500">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*
       ═══════════════════════════════════════════════════════════
       SECTION 6 · PATIENT TESTIMONIALS
       ═══════════════════════════════════════════════════════════ */}
      <section className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">Patient Stories</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Trusted by 15,000+ Families</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 leading-relaxed">Here is what mothers and families say about their experience at Dalawai Hospital.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Pooja Patil", role: "Normal Baby Delivery", location: "Jamkhandi", text: "Delivering my first baby at Dalawai Hospital was a peaceful, reassuring experience. Dr. Sathish and the nursing staff treated us like family. The pain-free labour support was incredible!" },
              { name: "Sunita Kulkarni", role: "Laparoscopic Surgery", location: "Mudhol", text: "I underwent Total Laparoscopic Hysterectomy under Dr. Abhishek Dalawai. I was amazed that I could walk comfortably the next morning with almost zero pain. Truly world-class surgery!" },
              { name: "Anitha Desai", role: "Postnatal Ayurvedic Care", location: "Banahatti", text: "The Postnatal Ayurvedic oil treatment and infant care guidance helped me recover so quickly post delivery. Dalawai Hospital perfectly combines modern medicine with traditional care." },
            ].map((t, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
                <Quote className="h-7 w-7 text-emerald-100" />
                <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="flex-1 text-sm leading-relaxed text-gray-600">"{t.text}"</p>
                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs font-medium text-emerald-600">{t.role}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin className="h-3 w-3" /> {t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
       ═══════════════════════════════════════════════════════════
       SECTION 7 · SIX PILLARS OF CARE
       ═══════════════════════════════════════════════════════════ */}
      <section className="border-t border-gray-100 bg-gray-50/60 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 shadow-sm">Our Core Values</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Six Pillars of Dalawai Healthcare</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 leading-relaxed">The principles that guide every diagnosis, treatment, and patient interaction.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Shield className="h-5 w-5" />, title: "Clinical Excellence & Safety", desc: "HEPA-filtered modular OTs with international sterilization and zero-infection surgical standards." },
              { icon: <Heart className="h-5 w-5" />, title: "Gentle Maternity Care", desc: "Painless delivery options, continuous fetal monitoring, and warm, dignified maternal support." },
              { icon: <Zap className="h-5 w-5" />, title: "Advanced Laparoscopy", desc: "Keyhole precision surgery ensuring minimal scarring, less pain, and rapid 24–48 hr recovery." },
              { icon: <Clock className="h-5 w-5" />, title: "24/7 Critical ICU Response", desc: "Surgical ICU staffed round-the-clock for high-risk deliveries and emergency trauma care." },
              { icon: <Sparkles className="h-5 w-5" />, title: "Ayurvedic Postnatal Healing", desc: "Traditional herbal oil massages, infant wellness, and restorative postnatal recovery care." },
              { icon: <HeartHandshake className="h-5 w-5" />, title: "Ethical & Transparent Care", desc: "Honest treatment options, affordable care packages, and deep respect for every patient's dignity." },
            ].map((p, i) => (
              <div key={i} className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">{p.icon}</div>
                <div>
                  <h4 className="mb-1.5 text-sm font-bold text-gray-900">{p.title}</h4>
                  <p className="text-xs leading-relaxed text-gray-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
       ═══════════════════════════════════════════════════════════
       SECTION 8 · FAQ ACCORDION
       ═══════════════════════════════════════════════════════════ */}
      <section className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-5 md:px-10">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-500">Common Questions</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto mt-3 text-sm text-gray-500 leading-relaxed">Clear answers about our hospital services, admissions, and emergency care.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-gray-800 transition hover:text-emerald-700"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="h-4 w-4 shrink-0 text-emerald-500" /> : <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />}
                </button>
                {openFaq === idx && (
                  <div className="border-t border-gray-50 px-5 pb-5 pt-4 text-sm leading-relaxed text-gray-500">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
       ═══════════════════════════════════════════════════════════
       SECTION 9 · CTA BANNER
       ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-gray-100 py-16" style={{ background: "linear-gradient(135deg, #059669 0%, #0d9488 60%, #10b981 100%)" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">Ready to Book Your Consultation?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-emerald-100/90 md:text-base">Our medical specialists and 24/7 emergency ICU team are ready to provide you with safe, compassionate, world-class healthcare.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={handleBookAppointment} className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
              <PhoneCall className="h-4 w-4" />
              Book Appointment Now
            </button>
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/20">
              <MapPin className="h-4 w-4" />
              Dalawai Hospital, Jamkhandi
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutHeroSection;
