"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3"
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-6xl font-bold text-espresso mb-6"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-espresso/60 max-w-lg mb-16"
        >
          Have a question about our coffee, want to place a bulk order, or just
          want to say hello? We&apos;d love to hear from you.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            {[
              { icon: Mail, label: "Email", value: "hello@countrycoffee.com" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: MapPin, label: "Address", value: "123 Brew Street, Coorg\nKarnataka, India 571201" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-mocha" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-accent text-xs uppercase tracking-[0.2em] text-espresso/40 mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-espresso whitespace-pre-line">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-8">
              <p className="font-accent text-xs uppercase tracking-[0.2em] text-espresso/40 mb-3">
                Hours
              </p>
              <p className="text-sm text-espresso">Mon — Fri: 9am — 6pm IST</p>
              <p className="text-sm text-espresso/50">Weekends: Closed</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="bg-cream rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={24} className="text-sage" />
                </div>
                <h3 className="font-display text-2xl font-bold text-espresso mb-3">
                  Message Sent!
                </h3>
                <p className="text-espresso/50 max-w-sm mx-auto">
                  Thanks for reaching out. We&apos;ll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-accent text-xs uppercase tracking-[0.15em] text-espresso/50 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-cream border border-transparent text-espresso placeholder:text-espresso/30 font-body text-sm focus:outline-none focus:border-mocha transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-accent text-xs uppercase tracking-[0.15em] text-espresso/50 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-cream border border-transparent text-espresso placeholder:text-espresso/30 font-body text-sm focus:outline-none focus:border-mocha transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-accent text-xs uppercase tracking-[0.15em] text-espresso/50 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-cream border border-transparent text-espresso placeholder:text-espresso/30 font-body text-sm focus:outline-none focus:border-mocha transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block font-accent text-xs uppercase tracking-[0.15em] text-espresso/50 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-5 py-4 rounded-xl bg-cream border border-transparent text-espresso placeholder:text-espresso/30 font-body text-sm focus:outline-none focus:border-mocha transition-colors resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-espresso text-cream px-10 py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-mocha transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
