import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const TestimonialsSection = () => {
  const feedbacks = [
    {
      name: "Rakhab Uddin",
      title: "UI/UX Engineer",
      rating: 4.5,
      content: "I found the perfect job in just a few clicks.",
      avatar: "https://i.ibb.co/LDmYnQHd/Eti.jpg",
    },
    {
      name: "Mrs. Jordan Harry",
      title: "Senior Nurse",
      rating: 4.5,
      content: "Very professional platform, easy to use.",
      avatar: "https://i.ibb.co/0jHFcn70/Hasbi-Islam.jpg",
    },
    {
      name: "Zara Smith",
      title: "Frontend Developer",
      rating: 5,
      content: "Best experience ever! Found a remote job quickly.",
      avatar: "https://i.ibb.co/CpPQFVzG/admin2.jpg",
    },
    {
      name: "Mohammad Azad",
      title: "Data Analyst",
      rating: 4,
      content: "Smooth user experience, helpful filters.",
      avatar: "https://i.ibb.co/GQ8YTGJ6/admin3.jpg",
    },
    {
      name: "Alice Johnson",
      title: "Product Manager",
      rating: 4.8,
      content: "Great platform with a lot of opportunities.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "John Doe",
      title: "Marketing Specialist",
      rating: 4.2,
      content: "Easy to navigate and find relevant jobs.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Emma Watson",
      title: "Graphic Designer",
      rating: 4.9,
      content: "Highly recommend for creatives looking for jobs.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "David Lee",
      title: "Software Engineer",
      rating: 5,
      content: "Found a fantastic remote position thanks to this.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  ];

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="flex text-yellow-400 text-lg">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i}>★</span>
        ))}
        {halfStar && <span>☆</span>}
      </div>
    );
  };

  const cardWidth = 290;
  const gap = 18;
  const scrollBy = 1;

  const scrollLeft = () => {
    const newIndex = Math.max(activeIndex - scrollBy, 0);
    setActiveIndex(newIndex);
    scrollRef.current?.scrollTo({
      left: newIndex * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const maxIndex = feedbacks.length - scrollBy;
    const newIndex = Math.min(activeIndex + scrollBy, maxIndex);
    setActiveIndex(newIndex);
    scrollRef.current?.scrollTo({
      left: newIndex * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-black text-white py-12 px-6 md:px-20">
      {/* Header and Arrows */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-semibold">
            Trusted Customer <span className="text-cyan-400">Feedback</span>
          </h2>
          <p className="text-gray-400 mt-2">
            To choose your trending job dream & to make future bright.
          </p>
        </div>
        <div className="hidden md:flex gap-0.5">
          <motion.button
            aria-label="scroll-left"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollLeft}
            className="flex items-center justify-center rounded-full p-2"
          >
            <span className="relative flex items-center">
              <FaArrowLeftLong
                size={18}
                className="text-cyan-400 relative z-10"
              />
              <span className="absolute right-2 rounded-full border border-cyan-400 w-6 h-6"></span>
            </span>
          </motion.button>
          <motion.button
            aria-label="scroll-right"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollRight}
            className="flex items-center justify-center rounded-full p-2"
          >
            <span className="relative flex items-center">
              <FaArrowRightLong
                size={18}
                className="text-cyan-400 relative z-10"
              />
              <span className="absolute left-2 rounded-full border border-cyan-400 w-6 h-6"></span>
            </span>
          </motion.button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        className="overflow-hidden w-full md:w-[1190px]"
      >
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
        >
          {feedbacks.map((fb, i) => {
            let scaleClass = "scale-100 md:scale-90";
            if (i === activeIndex) scaleClass = "md:scale-110";
            else if (i === activeIndex + 1) scaleClass = "md:scale-95";

            return (
              <div
                key={fb.name + i}
                className={`min-w-[80%] sm:min-w-[260px] md:min-w-[280px] max-w-[90%] md:max-w-[280px] transition-all duration-[1200ms] ease-in-out transform ${scaleClass} bg-[#061F21] p-6 rounded-xl shadow-lg flex flex-col items-start gap-4`}
              >
                <img
                  src={fb.avatar}
                  alt={fb.name}
                  className="w-20 h-20 rounded-full mb-2"
                />
                {renderStars(fb.rating)}
                <p className="text-gray-300 mt-2 mb-4">{fb.content}</p>
                <div>
                  <h4 className="font-semibold text-white">{fb.name}</h4>
                  <p className="text-gray-400 text-sm">{fb.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hide scrollbar style */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSection;
