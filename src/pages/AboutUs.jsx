import React, { useEffect, useState } from "react";
import { animate } from "framer-motion";

const BANNER_2 =
  "https://ocsolutions.co.in/html/jobportal/new/images/about-us/Second-banner.png";
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