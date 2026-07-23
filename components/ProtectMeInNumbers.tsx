// components/ProtectMeInNumbers.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "@/lib/hooks/Useinview";

const STATS = [
  {
    target: 65000,
    prefix: "+",
    suffix: "",
    label: "Vehicles Protected",
  },
  {
    target: 10,
    prefix: "",
    suffix: "",
    label: "Years Warranty",
  },
  {
    target: 100,
    prefix: "",
    suffix: "%",
    label: "Self-Healing Technology",
  },
  {
    target: 12,
    prefix: "+",
    suffix: "",
    label: "Years Experience",
  },
  {
    target: 5,
    prefix: "+",
    suffix: "",
    label: "Certified Installers",
  },
];

const PERIMETER = 384;
const COUNT_DURATION = 1800; // ms

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function CountUp({
  target,
  prefix,
  suffix,
  play,
}: {
  target: number;
  prefix: string;
  suffix: string;
  play: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!play) return;
    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / COUNT_DURATION, 1);
      setValue(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play, target]);

  return (
    <>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </>
  );
}

function AnimatedBorder({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="none"
    >
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="14"
        stroke="#16181B0D"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <motion.rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="14"
        stroke="#F5C518"
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        strokeDasharray="70 314"
        animate={{ strokeDashoffset: [0, -PERIMETER] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      />
    </svg>
  );
}

export default function ProtectMeInNumbers() {
  const [ref, inView] = useInView(0.3);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative  w-full mt-10 overflow-hidden px-4 sm:px-6 py-20 sm:py-28"
    >
      {/* Section background image */}
      <Image
        src="/images/lotus2.jpg"
        alt=""
        fill
        className="object-cover -z-20"
      />
      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-[#16181B]/70 -z-10" />

      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow — matches CardsGrid's header style */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <span className="w-1 h-4 bg-[#F5C518] rounded-full" />
          <span className="text-white text-xl font-extrabold uppercase tracking-[0.15em]">
            Protect Me in Numbers
          </span>
        </div>

        <p className="text-white/70 text-lg sm:text-lg leading-relaxed max-w-lg mb-16">
          Our numbers speak for themselves. We&apos;re proud to lead the
          automotive protection industry in Egypt with results you can count on.
        </p>

        {/* Stat cards */}
        <div className="w-full flex flex-wrap justify-center gap-5 sm:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="relative flex-1 basis-56 sm:basis-64 max-w-80
                bg-white rounded-3xl
                px-6 py-12 sm:py-14 flex flex-col items-center
                shadow-[0_8px_28px_rgba(0,0,0,0.2)]
                hover:-translate-y-1 transition-transform duration-300"
            >
              <AnimatedBorder delay={i * 0.3} />

              <h3 className="relative z-10 text-[#16181B] font-black text-3xl sm:text-4xl tracking-tight mb-3 tabular-nums">
                <CountUp
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  play={inView}
                />
              </h3>
              <p className="relative z-10 text-gray-500 text-sm sm:text-base font-medium text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
