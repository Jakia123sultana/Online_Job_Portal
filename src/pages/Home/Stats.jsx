import React from 'react';
import CountUp from 'react-countup';
import { GrDocumentVerified } from "react-icons/gr";
import { FaRegAddressCard } from "react-icons/fa6";
import { LiaUsersCogSolid } from "react-icons/lia";
import { BsFillFilePostFill } from "react-icons/bs";
import { motion } from "framer-motion";
const stats = [
  { icon:<FaRegAddressCard />, label: "Total Recruiters", end: 800, suffix: "K+" },
  { icon: <LiaUsersCogSolid />, label: "Daily User Visited", end: 600, suffix: "K+" },
  { icon: <BsFillFilePostFill />, label: "Daily Job Posted", end: 10, suffix: "K+" },
  { icon: <GrDocumentVerified />, label: "Verified Jobs", end: 800, suffix: "K+" },
];

const Stats = () => {
  return (
    <div>
<div className="text-center mt-12 px-4">
      {/* Title */}
      <motion.h1
        className="text-white text-4xl font-bold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Our Success Story
      </motion.h1>

      {/* Paragraph */}
      <motion.p
        className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Over the years, we have helped thousands of professionals land their dream jobs
        and companies find the right talent. Our platform is trusted by top
        organizations.
      </motion.p>
    </div>
    <div className="stats-container " style={styles.container}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          title={stat.label}
          end={stat.end}
          suffix={stat.suffix}
        />
      ))}
    </div>
    </div>
  );
};

const StatCard = ({ icon, title, end, suffix }) => (
  <div style={styles.card} className='flex gap-4 p-8 items-center'>
    <div style={styles.icon}>{icon}</div>
    <div>
      <div className='text-xl font-bold text-white'>
        <CountUp end={end} duration={3} separator="," suffix={suffix} />
      </div>
      <div style={styles.title} className='text-white'>{title}</div>
    </div>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    color: '#0ff',
    padding: '40px 20px',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  card: {
    margin: '20px',
    minWidth: '180px',
    paddingLeft: '10px', // extra left padding for better spacing
  },
  icon: {
    fontSize: '3rem', // increased icon size
    marginBottom: '0px',
    color: '#0ff',
  },
  number: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '1rem',
    marginTop: '5px',
  },
};

export default Stats;
