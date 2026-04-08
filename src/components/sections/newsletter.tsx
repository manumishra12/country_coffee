"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-24 lg:py-32 bg-cream-dark">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3"
        >
          Stay Connected
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4"
        >
          Join the Brew Circle
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-espresso/50 mb-10 max-w-md mx-auto"
        >
          Get early access to new roasts, brewing tips, and exclusive offers.
          No spam, just good coffee talk.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-6 py-4 rounded-full bg-white border border-espresso/10 text-espresso placeholder:text-espresso/30 font-accent text-sm focus:outline-none focus:border-mocha transition-colors"
          />
          <button
            type="submit"
            className="bg-espresso text-cream px-8 py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-mocha transition-colors whitespace-nowrap"
          >
            {submitted ? "Subscribed!" : "Subscribe"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
