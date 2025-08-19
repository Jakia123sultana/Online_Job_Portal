import React from "react";
import { motion } from "framer-motion";

export default function Collaps() {
  const C = {
    BG: "#000000",          // section background black
    CARD_BG: "#111111",     // card background slightly lighter black
    QUESTION: "#FFFFFF",    // question text white
    ANSWER: "#DDDDDD",      // answer text soft white
    ACCENT: "#00CED1",      // heading accent cyan
    SHADOW: "0 6px 18px rgba(0,0,0,0.6)", // card shadow
  };

  const items = [
    { 
      q: "Can I search and filter jobs specifically by category or type of work that I am most interested in?", 
      a: "Yes, you can filter jobs based on different categories (such as IT, Marketing, Design, Teaching, etc.) to narrow down your search results and quickly find the opportunities that best match your skills and interests." 
    },
    { 
      q: "If I create and publish a job post on the platform, will I later be able to edit or completely delete my post whenever I want?", 
      a: "Yes! From the 'My Post' page, you will have full control over your listings. You can edit details such as title, description, or salary, and if needed, you can permanently delete the post." 
    },
    { 
      q: "Is the personal information that I provide during registration or job application process safe, secure, and protected from unauthorized access?", 
      a: "Yes! Your information is always safe and secure. We use data encryption and privacy protection policies to ensure that your details remain confidential and are never shared with third parties without your consent." 
    },
    { 
      q: "What should I do if I come across a fake, misleading, or inappropriate job listing on the platform?", 
      a: "Great question! We are planning to introduce a reporting feature very soon that will allow you to flag any suspicious or harmful job listing. Once reported, our admin team will review it immediately and take proper action." 
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto mt-20 px-6 mb-20"
     
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: C.QUESTION }}>
          Frequently <span style={{ color: C.ACCENT }}>Asked Questions</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: C.ANSWER }}>
          Browse through common questions from our users. If you don’t find your answer,
          feel free to contact us directly.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-5">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="collapse collapse-arrow rounded-xl border cursor-pointer transform transition-all duration-300 hover:-translate-y-1 bg-[#002B2C] border border-white/5"
          
          >
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-base sm:text-xl font-normal" style={{ color: C.QUESTION }}>
              {item.q}
            </div>
            <div className="collapse-content">
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: C.ANSWER }}>
                {item.a}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
