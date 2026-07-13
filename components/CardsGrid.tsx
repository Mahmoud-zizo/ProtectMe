// components/landing/CardsGrid.tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CARDS = [
  {
    id: 1,
    title: "PPF",
    description:
      "Shield your car's paint from chips, scratches, and road debris with our ultra-durable PPF.",
    image: "/images/ppf2.jpg",
  },
  {
    id: 2,
    title: "Nano Ceramic Coating",
    description:
      "Flexible long-term protection with extreme resistance to UV radiation, chemicals, and aggressive elements.",
    image: "/images/ppf1.jpg",
  },
  {
    id: 3,
    title: "Window Tinting",
    description:
      "Reduce heat, block UV rays, and enhance privacy with premium window tint films that balance performance and style.",
    image: "/images/window2.jpg",
  },
];

const CYCLE_SECONDS = 3;

export default function CardsGrid() {
  // order[0] = active/background, order[1] = "up next" preview (animated border), order[2] = the third preview
  const [order, setOrder] = useState([0, 1, 2]);
  const [cycleKey, setCycleKey] = useState(0);

  const advance = useCallback(() => {
    setOrder((prev) => [prev[1], prev[2], prev[0]]);
    setCycleKey((k) => k + 1);
  }, []);

  const goPrev = () => {
    setOrder((prev) => [prev[2], prev[0], prev[1]]);
    setCycleKey((k) => k + 1);
  };

  // Clicking a preview thumbnail jumps straight to it and restarts the cycle from there.
  const selectPreview = (position: 1 | 2) => {
    setOrder((prev) =>
      position === 1
        ? [prev[1], prev[2], prev[0]]
        : [prev[2], prev[0], prev[1]],
    );
    setCycleKey((k) => k + 1);
  };

  const main = CARDS[order[0]];
  const previewA = CARDS[order[1]];
  const previewB = CARDS[order[2]];

  return (
    <section id="services" className="w-full mt-32  px-4 sm:px-6">
      <div className="max-w-9xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <span className="w-1 h-4 bg-[#F5C518] rounded-full" />
          <span className="text-[#16181B] font-extrabold uppercase tracking-[0.15em] text-lg">
            What we do
          </span>
        </div>

        <div className="relative w-full h-140 sm:h-150 md:h-165 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
          {/* Background image, crossfades between slides */}
          <AnimatePresence mode="sync">
            <motion.div
              key={main.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={main.image}
                alt={main.title}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Legibility gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-black/10 pointer-events-none" />

          {/* Title + copy, vertically centered left */}
          <div className="absolute top-1/2 -translate-y-1/2 left-5 sm:left-8 md:left-10 max-w-[230px] sm:max-w-xs md:max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={main.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-white font-black text-2xl sm:text-4xl md:text-5xl tracking-tight mb-3">
                  {main.title}
                </h3>
                <p className="text-white/70 text-sm sm:text-base font-medium leading-relaxed mb-5">
                  {main.description}
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-white text-[#16181B] font-bold px-6 py-2.5 rounded-full text-sm hover:-translate-y-0.5 transition-transform"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
            <span className="hidden sm:block w-20 h-px bg-white/25 mt-7" />
          </div>

          {/* Preview thumbnails, vertically centered right */}
          <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 md:right-12 lg:right-16 flex items-center gap-3 sm:gap-4">
            {/* previewA — up next, animated progress border. Click to jump to it now. */}
            <button
              type="button"
              onClick={() => selectPreview(1)}
              aria-label={`View ${previewA.title}`}
              className="relative w-32 h-44 sm:w-40 sm:h-56 md:w-48 md:h-64 lg:w-52 lg:h-68 rounded-2xl overflow-hidden cursor-pointer group"
            >
              <Image
                src={previewA.image}
                alt={previewA.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.rect
                  key={cycleKey}
                  x="2"
                  y="2"
                  width="96"
                  height="96"
                  rx="14"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: CYCLE_SECONDS, ease: "linear" }}
                  onAnimationComplete={advance}
                />
              </svg>
            </button>

            {/* previewB — static, third in queue. Click to jump to it now. Hidden on mobile. */}
            <button
              type="button"
              onClick={() => selectPreview(2)}
              aria-label={`View ${previewB.title}`}
              className="hidden sm:block relative sm:w-40 sm:h-56 md:w-48 md:h-64 lg:w-52 lg:h-68 rounded-2xl overflow-hidden border-2 border-white/15 cursor-pointer group"
            >
              <Image
                src={previewB.image}
                alt={previewB.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </div>

          {/* Prev / Next controls */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <button
              onClick={goPrev}
              aria-label="Previous service"
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={advance}
              aria-label="Next service"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#e0b512] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-[#16181B]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
