"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqSections = [
  {
    title: "Orders & Shipping",
    items: [
      { q: "How long does shipping take?", a: "Standard delivery takes 3-5 business days within India. Express shipping (1-2 days) is available at checkout for an additional fee." },
      { q: "Do you offer free shipping?", a: "Yes! All orders over $50 qualify for free standard shipping. Use code FREESHIP for a shipping discount on smaller orders." },
      { q: "Can I track my order?", a: "Absolutely. Once your order ships, you'll receive a tracking link via email. You can also track your order in real-time on our tracking page." },
      { q: "Do you ship internationally?", a: "Currently we ship within India. International shipping is coming soon — join our newsletter to be the first to know." },
    ],
  },
  {
    title: "Products & Coffee",
    items: [
      { q: "How fresh is your coffee?", a: "We roast in small batches every week and ship within 48 hours of roasting. Your coffee is never more than a few days from the roaster." },
      { q: "What grind options do you offer?", a: "We ship whole beans by default for maximum freshness. If you'd prefer pre-ground, select your grind size (espresso, drip, French press) at checkout." },
      { q: "Are your beans organic?", a: "Many of our single-origin coffees are organically grown. Look for the 'Organic' badge on individual product pages." },
      { q: "How should I store my coffee?", a: "Store in an airtight container at room temperature, away from light and moisture. Don't refrigerate or freeze — it degrades flavour." },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      { q: "What's your return policy?", a: "If you're not satisfied, contact us within 14 days of delivery. We'll send a replacement or issue a full refund — no questions asked." },
      { q: "Can I return opened bags?", a: "Yes. We stand behind our coffee. If the flavour isn't what you expected, reach out and we'll make it right." },
      { q: "How long do refunds take?", a: "Refunds are processed within 3-5 business days and will appear on your statement within 7-10 days depending on your bank." },
    ],
  },
  {
    title: "Subscriptions",
    items: [
      { q: "How does the subscription work?", a: "Choose your coffee, frequency (weekly, bi-weekly, or monthly), and we'll deliver fresh-roasted beans to your door automatically. Skip, pause, or cancel anytime." },
      { q: "Do I get a discount on subscriptions?", a: "Yes! Subscribers save 15% on every delivery plus get free shipping on all subscription orders." },
      { q: "Can I change my subscription coffee?", a: "Of course. You can swap your blend, adjust quantity, or change frequency anytime from your account." },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <section className="pt-28 sm:pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3">Help Center</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-espresso mb-4">FAQ</h1>
          <p className="text-espresso/50 max-w-lg">Everything you need to know about Country Coffee. Can&apos;t find your answer? <a href="/contact" className="text-mocha hover:underline">Contact us</a>.</p>
        </motion.div>

        <div className="space-y-10">
          {faqSections.map((section, si) => (
            <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.1 }}>
              <h2 className="font-display text-xl font-bold text-espresso mb-4">{section.title}</h2>
              <div className="space-y-2">
                {section.items.map((item, qi) => {
                  const key = `${si}-${qi}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div key={key} className="border border-espresso/8 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-cream/50 transition-colors"
                      >
                        <span className="font-display text-sm font-semibold text-espresso pr-4">{item.q}</span>
                        <ChevronDown size={16} className={`text-espresso/30 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-4 text-sm text-espresso/50 leading-relaxed">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
