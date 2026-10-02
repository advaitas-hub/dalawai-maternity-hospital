"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

// Hospital Facilities Dataset
const FACILITIES: WorksWheelItem[] = [
  {
    title: "Patient Rooms",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    href: "#patient-rooms",
    category: "Inpatient Wards",
  },
  {
    title: "Operation Theatre",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    href: "#operation-theatre",
    category: "Modular OT",
  },
  {
    title: "Pharmacy",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
    href: "#pharmacy",
    category: "24/7 Dispensary",
  },
  {
    title: "Laboratory",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    href: "#laboratory",
    category: "Pathology Lab",
  },
  {
    title: "ICU",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    href: "#icu",
    category: "Surgical ICU",
  },
  {
    title: "Emergency Care",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    href: "#emergency",
    category: "24-hr Trauma ER",
  },
  {
    title: "Radiology",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    href: "#radiology",
    category: "X-Ray & Imaging",
  },
  {
    title: "Consultation Rooms",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    href: "#consultation",
    category: "OPD Clinics",
  },
  {
    title: "NICU",
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    href: "#nicu",
    category: "Neonatal Care",
  },
  {
    title: "Diagnostic Services",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    href: "#diagnostics",
    category: "Health Scans",
  },
];

export default function WorksWheelDemo() {
  return (
    <div className="w-full h-[32rem] md:h-[38rem] my-6 md:my-10">
      <WorksWheel
        items={FACILITIES}
        label="Our Facilities"
        action="View Facility"
        className="rounded-3xl border border-emerald-100/80 bg-white/80 shadow-lg backdrop-blur-xs"
      />
    </div>
  );
}
