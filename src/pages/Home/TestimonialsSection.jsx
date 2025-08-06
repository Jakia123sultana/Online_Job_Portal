import React, { useRef, useState } from "react";

const TestimonialsSection = () => {
  const stats = [
    { icon: "🧑‍💼", label: "Total Recruiters", value: "800K+" },
    { icon: "👥", label: "Daily User Visited", value: "600K+" },
    { icon: "📄", label: "Daily Job Posted", value: "10K+" },
    { icon: "🗂", label: "Total Recruiters", value: "800K+" },
  ];

  const feedbacks = [
    {
      name: "Rakhab Uddin",
      title: "UI/UX Engineer",
      rating: 4.5,
      content: "I found the perfect job in just a few clicks.",
      avatar: "https://via.placeholder.com/100",
    },
    {
      name: "Mrs. Jordan Harry",
      title: "Senior Nurse",
      rating: 4.5,
      content: "Very professional platform, easy to use.",
      avatar: "https://via.placeholder.com/100",
    },
    {
      name: "Zara Smith",
      title: "Frontend Developer",
      rating: 5,
      content: "Best experience ever! Found a remote job quickly.",
      avatar: "https://via.placeholder.com/100",
    },
    {
      name: "Mohammad Azad",
      title: "Data Analyst",
      rating: 4,
      content: "Smooth user experience, helpful filters.",
      avatar: "https://via.placeholder.com/100",
    },
    {
      name: "Alice Johnson",
      title: "Product Manager",
      rating: 4.8,
      content: "Great platform with a lot of opportunities.",
      avatar: "https://via.placeholder.com/100",
    },
    {
      name: "John Doe",
      title: "Marketing Specialist",
      rating: 4.2,
      content: "Easy to navigate and find relevant jobs.",
      avatar: "https://via.placeholder.com/100",
    },
    {
      name: "Emma Watson",
      title: "Graphic Designer",
      rating: 4.9,
      content: "Highly recommend for creatives looking for jobs.",
      avatar: "https://via.placeholder.com/100",
    },
    {
      name: "David Lee",
      title: "Software Engineer",
      rating: 5,
      content: "Found a fantastic remote position thanks to this.",
      avatar: "https://via.placeholder.com/100",
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

  const cardWidth = 300;
  const scrollBy = 2;

  const scrollLeft = () => {
    const newIndex = Math.max(activeIndex - scrollBy, 0);
    setActiveIndex(newIndex);
    scrollRef.current?.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const newIndex = Math.min(activeIndex + scrollBy, feedbacks.length - scrollBy);
    setActiveIndex(newIndex);
    scrollRef.current?.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-black text-white py-12 px-6 md:px-20">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-12">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-3xl">{stat.icon}</div>
            <h3 className="text-xl font-bold">{stat.value}</h3>
            <p className="text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

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
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition"
            aria-label="Scroll Left"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition"
            aria-label="Scroll Right"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
        >
          {feedbacks.map((fb, i) => {
            let scaleClass = "scale-90";
            if (i === activeIndex) scaleClass = "scale-110";
            else if (i === activeIndex + 1) scaleClass = "scale-95";

            return (
              <div
                key={fb.name + i}
                className={`min-w-[250px] max-w-[280px] transition-all duration-[1200ms] ease-in-out transform ${scaleClass} bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-start gap-4`}
              >
                <img
                  src={fb.avatar}
                  alt={fb.name}
                  className="w-14 h-14 rounded-full mb-2"
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
