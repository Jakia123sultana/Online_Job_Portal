import React from "react";
import { motion } from "framer-motion";

export default function Collaps() {
  const C = {
          // black background
    COLLAPS_BG: "#061F21",  // collapsible bg color
    TITLE: "#FFFFFF",       // white text
    MUTED: "#CCCCCC",       // lighter white/gray for answers
  };

  const items = [
    { q: "Is there category based filtering?", a: "Yes, you can filter jobs based on category to narrow your search." },
    { q: "Can I delete my post?", a: 'Yes! From the "My Post" page.' },
    { q: "Is my info safe?", a: "Yes! Your information is always safe and secure." },
    { q: "How do I report a bad listing?", a: "We will implement this feature in the future." },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto mt-20 rounded-2xl shadow-lg"
      style={{
        background: C.BG,
        boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
      }}
    >
      <div className="p-6 space-y-4">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="collapse collapse-arrow rounded-lg shadow-md"
            style={{
              background: C.COLLAPS_BG,
              color: C.TITLE,
              boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
            }}
          >
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-medium" style={{ color: C.TITLE }}>
              {item.q}
            </div>
            <div className="collapse-content" style={{ color: C.MUTED }}>
              <p>{item.a}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
