import React, { useEffect, useState } from "react";
import { animate } from "framer-motion";


 const BANNER_2 = "data:image/jpeg;base64,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";
const TEAM_MEMBERS = [
  {
    name: "Belinda",
    role: "Company Management",
    image: "https://i.ibb.co.com/0jHFcn70/Hasbi-Islam.jpg",
  },
  {
    name: "Cristian",
    role: " Job Management",
    image: "https://i.ibb.co.com/TNhJnN3/Eti.jpg",
  },
  {
    name: "Robert",
    role: "Operations Head",
    image: "https://i.ibb.co.com/GQ8YTGJ6/admin3.jpg",
  },
  {
    name: "Tony Teo",
    role: "Partnership Coordinator",
    image: "https://i.ibb.co.com/CpPQFVzG/admin2.jpg",
  },
 
 ];

const ACCENT_RED = "#00ced1";

// Dynamically load Font Awesome
const loadFontAwesome = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
  document.head.appendChild(link);
};



const FeatureCard = ({ title, desc, icon }) => (
  <div
    className={`rounded-3xl p-8 text-center border bg-[#061F21] border-white/10 cursor-pointer transform transition-all duration-300  hover:scale-105`}
  >
    <div className="mb-6 flex justify-center items-center w-20 h-20 rounded-full bg-[#002B2C] border border-white/5">
      <i
        className={`${icon} text-2xl transition-transform duration-300 group-hover:scale-110`}
        style={{ color: ACCENT_RED }}
      ></i>
    </div>
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="mt-3 leading-relaxed text-gray-300">{desc}</p>
    <button
      className="mt-6 inline-block text-sm font-medium underline underline-offset-4 text-white"
      type="button"
    >
      Read More
    </button>
  </div>
);

// Stat

const Stat = ({ value, label, icon }) => {
  const [count, setCount] = useState(0);

  // Extract numeric part from value like "800K +" → 800000
  const parseValue = (val) => {
    if (val.includes("K")) return parseInt(val) * 1000;
    if (val.includes("M")) return parseInt(val) * 1000000;
    return parseInt(val);
  };

  const endValue = parseValue(value);

 // Format number back into K/M shorthand
  const formatValue = (num) => {
    if (num >= 1000000) return Math.floor(num / 1000000) + "M";
    if (num >= 1000) return Math.floor(num / 1000) + "K";
    return num;
  };

  useEffect(() => {
    const controls = animate(0, endValue, {
      duration: 4,
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return () => controls.stop();
  }, [endValue]);

  return (
    <div className="text-center text-white">
      <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 rounded-full bg-[#1a1a1a]">
        <i className={`${icon} text-2xl`}></i>
      </div>
      <h3 className="text-2xl font-bold">
        {formatValue(count)}+
      </h3>
      <p className="text-gray-300">{label}</p>
    </div>
  );
}

export default function AboutUs() {
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    loadFontAwesome();
  }, []);

  return (
    <main className="bg-black text-white leading-relaxed">
      {/* ===================== COMPANY OVERVIEW ===================== */}
      <section className="container mx-auto px-4 py-14 md:py-20 max-w-[86%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div
                className="absolute -left-8 top-0 h-[99%] w-[80%] rounded-[32px]"
                style={{ backgroundColor: "#061F21"}}
              />
              <div className="relative rounded-[32px] overflow-hidden shadow-lg">
                <img
                  src={BANNER_2}
                  alt="Company overview visual"
                  className="w-[90%] h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="lg:col-span-7">
            <h2 className="text-[34px] sm:text-[40px] font-extrabold leading-tight">
              <span className="text-white/90">Company </span>
              <span style={{ color: ACCENT_RED }}>Overview</span>
            </h2>

            <div className="mt-6 space-y-6 text-gray-200/95">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, Donec
                vitae dui eget tellus gravida venenatis. Integer fringilla
                congue eros non fermentum. Maecenas nisl est, Donec vitae dui
                eget tellus gravida venenatis. Fusce luctus vestibulum augue ut
                aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, Donec vitae dui eget tellus gravida venenatis. Integer
                fringilla congue eros non fermentum.
              </p>
              {/* <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, Donec vitae dui
        eget tellus gravida venenatis. Integer fringilla congue eros non
        fermentum.
        <span className="mx-2">........</span>
      
      </p> */}

              {!showMore ? (
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, Donec
                  vitae dui eget tellus gravida venenatis. Integer fringilla
                  congue eros non fermentum.
                  <span className="mx-2">........</span>
                  <button
                    onClick={() => setShowMore(true)}
                    className="underline underline-offset-4"
                  >
                    Read More
                  </button>
                </p>
              ) : (
                <>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    Donec vitae dui eget tellus gravida venenatis. Integer
                    fringilla congue eros non fermentum. Maecenas nisl est,
                    Donec vitae dui eget tellus gravida venenatis. Fusce luctus
                    vestibulum augue ut aliquet.
                  </p>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                    <button
                      onClick={() => setShowMore(false)}
                      className="underline underline-offset-4"
                    >
                      Read less
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE US ===================== */}
      <section className="container mx-auto px-4 pb-8 pt-2">
        <h2 className="text-center text-[34px] sm:text-[40px] font-extrabold">
          <span className="text-white/90">Why Choose </span>
          <span style={{ color: ACCENT_RED }}>Us ?</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            emphasis
            icon="fa fa-building"
            title="Trusted Quality"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt....."
          />
          <FeatureCard
            icon="fa-sharp fa-solid fa-pen-to-square"
            title="Top Companies"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt....."
          />
          <FeatureCard
            icon="fa fa-user"
            title="No Extra Charges"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt....."
          />
          <FeatureCard
            icon="fa fa-pie-chart"
            title="Internation Job"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt....."
          />
        </div>
      </section>

      {/* ===================== COUNTERS ===================== */}
      <section className=" px-4 py-14 ">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <Stat
            value="800K +"
            label="Total Recruiters"
            icon="fa fa-pie-chart"
          />
          <Stat
            value="600K +"
            label="Daily User Visited"
            icon="fa fa-building"
          />
          <Stat
            value="10K +"
            label="Daily Job Posted"
            icon="fa-sharp fa-solid fa-money-bill-1"
          />
          <Stat value="800k +" label="Verified Jobs" icon="fa fa-user" />
        </div>
      </section>

      {/* ===================== MEET OUR TEAM ===================== */}
      <section className="container mx-auto px-4 pb-16 mb-14 ">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[34px] sm:text-[40px] font-extrabold">
            <span className="text-white/90">Meet Our </span>
            <span style={{ color: ACCENT_RED }}>Team</span>
          </h2>
          <p className="mt-2 text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </p>
        </div>

             <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-1 gap-y-10 place-items-center">
      {TEAM_MEMBERS.map((member, i) => (
        <div key={i} className="text-center">
          <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow ">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            className="mt-4 text-[17px] font-semibold"
            style={{ color: "#00ced1" }} // same as ACCENT_YELLOW
          >
            {member.name}
          </div>
          <div className="text-sm text-gray-700">{member.role}</div>
        </div>
      ))}
    </div>
      </section>
    </main>
  );
}