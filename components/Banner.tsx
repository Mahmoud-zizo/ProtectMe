import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="w-full px-6 py-16 flex items-center justify-center">
      <div
        style={{ backgroundColor: "#ffff" }}
        className="
          relative w-full max-w-7xl overflow-hidden rounded-[70px]
          shadow-[0_8px_40px_rgba(0,0,0,0.3)]
          flex flex-col items-center gap-7 px-12 py-14
        "
      >
        {/* soft glow top-right */}
        <div className="pointer-events-none absolute -top-40 -right-20 h-125 w-125 rounded-full bg-[#F5C518]/15 blur-3xl" />
        {/* soft glow bottom-left */}
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-75 w-75 rounded-full bg-[#F5C518]/10 blur-2xl" />

        <p className="relative z-10 text-center text-2xl font-black leading-relaxed tracking-tight text-gray-700 sm:text-3xl max-w-xl">
          Protect it before it&apos;s{" "}
          <span className="text-gray-700">too late</span>
        </p>

        <Link href={"/book"}>
          <button
            className="
            relative z-10 inline-flex items-center gap-2 rounded-full bg-[#F5C518] px-9 py-3.5 
            text-sm font-bold text-[#16181B] tracking-wide
            shadow-[0_4px_16px_rgba(245,197,24,0.3)] transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(245,197,24,0.4)]
            active:translate-y-0 cursor-pointer
          "
          >
            Book An Appointment
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </section>
  );
}
