"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Select",
    description: "Choose from our curated collection of single-origin and blended coffees, each with a unique story.",
    art: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-mocha/20" />
        <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-mocha/15" />
        <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-mocha/10" />
        {/* Coffee bean shape */}
        <ellipse cx="50" cy="55" rx="12" ry="18" fill="currentColor" className="text-mocha/15" transform="rotate(-20 50 55)" />
        <ellipse cx="70" cy="65" rx="12" ry="18" fill="currentColor" className="text-mocha/15" transform="rotate(20 70 65)" />
        <line x1="45" y1="42" x2="55" y2="68" stroke="currentColor" strokeWidth="0.8" className="text-mocha/30" />
        <line x1="65" y1="52" x2="75" y2="78" stroke="currentColor" strokeWidth="0.8" className="text-mocha/30" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Roast",
    description: "Every batch is roasted to order in small quantities, ensuring peak freshness and flavour development.",
    art: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Flame shapes */}
        <path d="M60 95 Q45 70 55 50 Q50 65 60 30 Q70 65 65 50 Q75 70 60 95Z" fill="currentColor" className="text-mocha/12" />
        <path d="M60 95 Q50 75 57 60 Q55 70 60 45 Q65 70 63 60 Q70 75 60 95Z" fill="currentColor" className="text-mocha/20" />
        <circle cx="60" cy="85" r="3" fill="currentColor" className="text-mocha/30" />
        {/* Temperature lines */}
        {[40, 50, 60, 70, 80].map((y) => (
          <line key={y} x1="85" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="0.5" className="text-mocha/15" />
        ))}
      </svg>
    ),
  },
  {
    number: "03",
    title: "Grind",
    description: "Ground fresh before shipping, or send whole beans for the ultimate home brewing experience.",
    art: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Grinder shape */}
        <rect x="40" y="20" width="40" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-mocha/20" />
        <rect x="35" y="35" width="50" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-mocha/20" />
        <circle cx="60" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="1" className="text-mocha/25" />
        <circle cx="60" cy="60" r="5" fill="currentColor" className="text-mocha/15" />
        <rect x="45" y="85" width="30" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-mocha/15" />
        {/* Handle */}
        <line x1="60" y1="10" x2="60" y2="20" stroke="currentColor" strokeWidth="1.5" className="text-mocha/25" />
        <circle cx="60" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-mocha/20" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Brew",
    description: "With every sip, taste the journey — from the highlands to your cup. That's the Country Coffee promise.",
    art: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Cup */}
        <path d="M30 45 L35 95 Q60 105 85 95 L90 45Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-mocha/20" />
        <path d="M90 55 Q110 55 110 70 Q110 85 90 85" fill="none" stroke="currentColor" strokeWidth="1" className="text-mocha/15" />
        {/* Steam */}
        <path d="M45 40 Q47 30 45 20" fill="none" stroke="currentColor" strokeWidth="1" className="text-mocha/20" strokeLinecap="round" />
        <path d="M60 38 Q62 25 60 15" fill="none" stroke="currentColor" strokeWidth="1" className="text-mocha/25" strokeLinecap="round" />
        <path d="M75 40 Q77 30 75 20" fill="none" stroke="currentColor" strokeWidth="1" className="text-mocha/20" strokeLinecap="round" />
        {/* Saucer */}
        <ellipse cx="60" cy="98" rx="40" ry="5" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-mocha/15" />
      </svg>
    ),
  },
];

export function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <section ref={containerRef} className="py-32 lg:py-40 bg-white relative overflow-hidden">
      {/* Animated vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block">
        <motion.div
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
          className="w-full h-full bg-gradient-to-b from-transparent via-mocha/20 to-transparent"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3">
            The Process
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-espresso">
            How It Works
          </h2>
        </motion.div>

        <div className="space-y-24 lg:space-y-32">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-display text-7xl font-bold text-mocha/15">
                    {step.number}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-espresso">
                    {step.title}
                  </h3>
                </div>
                <p className="text-espresso/50 leading-relaxed max-w-md text-lg">
                  {step.description}
                </p>
              </div>

              <motion.div
                className={`w-48 h-48 md:w-64 md:h-64 mx-auto ${i % 2 === 1 ? "lg:order-1" : ""}`}
                whileInView={{
                  rotate: [0, 5, -5, 0],
                  scale: [0.9, 1, 1],
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {step.art}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
