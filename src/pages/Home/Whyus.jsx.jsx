const ACCENT_RED = "#00ced1";
import { motion } from "framer-motion";
const FeatureCard = ({ title, desc, icon }) => (
  <div
    className="group rounded-3xl p-8 text-center border bg-[#061F21] border-white/10 cursor-pointer transform transition-all duration-300 hover:scale-105"
  >
    {/* Icon */}
    <div className="mb-6 flex justify-center items-center w-20 h-20 rounded-full bg-[#002B2C] border border-white/5">
      <i
        className={`${icon} text-2xl transition-transform duration-300 group-hover:scale-125`}
        style={{ color: ACCENT_RED }}
      ></i>
    </div>

    {/* Title */}
    <h3 className="text-xl font-semibold text-white">{title}</h3>

    {/* Description */}
    <p className="mt-3 leading-relaxed text-gray-300">{desc}</p>

    {/* Button */}
  
  </div>
);

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto px-4 pb-8 pt-2">
      <div className="text-center px-4 bg-black py-16">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-[28px] sm:text-[34px] md:text-[40px] font-semibold mb-6"
      >
        <span className="text-white/90">Why Choose </span>
        <span style={{ color: ACCENT_RED }}>Us?</span>
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-gray-400 max-w-2xl mx-auto mb-4"
      >
        We provide top-notch services with a dedicated team, modern solutions, 
        and unmatched customer support. Our commitment is to deliver quality and 
        reliability that sets us apart in the industry.
      </motion.p>
</div>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
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
          title="International Job"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt....."
        />
      </div>
    </section>
  );
}
