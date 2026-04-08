"use client";

import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.2, type: "spring" as const, duration: 1.5, bounce: 0 },
      opacity: { delay: i * 0.2, duration: 0.3 },
    },
  }),
};

export function SketchCoffeeCup({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={`${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Cup body */}
      <motion.path
        d="M50 70 L55 160 Q100 180 145 160 L150 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw}
        custom={0}
      />
      {/* Cup rim */}
      <motion.ellipse
        cx="100"
        cy="70"
        rx="50"
        ry="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        variants={draw}
        custom={0.5}
      />
      {/* Handle */}
      <motion.path
        d="M150 85 Q175 85 175 110 Q175 135 150 135"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw}
        custom={1}
      />
      {/* Steam */}
      <motion.path
        d="M75 60 Q77 40 73 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={draw}
        custom={1.5}
      />
      <motion.path
        d="M100 55 Q102 30 98 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={draw}
        custom={2}
      />
      <motion.path
        d="M125 60 Q127 40 123 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={draw}
        custom={2.5}
      />
      {/* Saucer */}
      <motion.ellipse
        cx="100"
        cy="165"
        rx="65"
        ry="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        variants={draw}
        custom={1}
      />
    </motion.svg>
  );
}

export function SketchCoffeeBean({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.ellipse
        cx="50"
        cy="50"
        rx="30"
        ry="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        transform="rotate(-15 50 50)"
        variants={draw}
        custom={0}
      />
      <motion.path
        d="M38 20 Q50 50 38 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={draw}
        custom={1}
      />
    </motion.svg>
  );
}

export function SketchPourOver({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 250"
      className={`${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Dripper cone */}
      <motion.path
        d="M60 30 L80 120 Q100 130 120 120 L140 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw}
        custom={0}
      />
      {/* Dripper rim */}
      <motion.path
        d="M55 30 Q100 20 145 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw}
        custom={0.5}
      />
      {/* Drip */}
      <motion.line
        x1="100"
        y1="125"
        x2="100"
        y2="145"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 4"
        variants={draw}
        custom={1.5}
      />
      {/* Carafe */}
      <motion.path
        d="M65 150 L70 220 Q100 235 130 220 L135 150"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw}
        custom={1}
      />
      {/* Carafe handle */}
      <motion.path
        d="M135 165 Q155 170 155 185 Q155 200 135 205"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw}
        custom={2}
      />
      {/* Coffee level */}
      <motion.path
        d="M75 195 Q100 200 125 195"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        variants={draw}
        custom={2.5}
      />
    </motion.svg>
  );
}

export function SketchLeafBranch({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 300 100"
      className={`${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Branch */}
      <motion.path
        d="M10 50 Q80 45 150 50 Q220 55 290 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={draw}
        custom={0}
      />
      {/* Leaves */}
      {[50, 100, 150, 200, 250].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 50 Q${x + 10} ${i % 2 === 0 ? 25 : 75} ${x + 25} ${i % 2 === 0 ? 30 : 70}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          variants={draw}
          custom={i * 0.3 + 0.5}
        />
      ))}
      {/* Small berries */}
      {[75, 125, 175, 225].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy={i % 2 === 0 ? 55 : 45}
          r="3"
          fill="currentColor"
          variants={draw}
          custom={i * 0.2 + 1}
        />
      ))}
    </motion.svg>
  );
}
