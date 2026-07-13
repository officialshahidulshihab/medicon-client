"use client";
 
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { BsCalendar3 } from "react-icons/bs";
import { TbCircleCheckFilled } from "react-icons/tb";

const steps = [
  {
    id: 1,
    icon: FiSearch,
    title: "Search & Filter",
    description:
      "Find specialist doctors by name, specialty, location, fee range, or rating using our powerful search and filter tools.",
  },
  {
    id: 2,
    icon: BsCalendar3,
    title: "Choose a Slot",
    description:
      "View real-time availability and select a consultation time that fits your schedule — morning, afternoon, or evening.",
  },
  {
    id: 3,
    icon: TbCircleCheckFilled,
    title: "Confirm & Visit",
    description:
      "Receive an SMS confirmation instantly. Show up to your appointment — no paperwork, no waiting. Just care.",
  },
];
 
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};
 
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const SimpleSteps = () => {
    return (
        <section
      style={{ backgroundColor: "#080b12" }}
      className="w-full py-24 px-6 md:px-12"
    >
      
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="text-xs font-bold tracking-[0.22em] uppercase mb-4"
          style={{ color: "#3b9eff" }}
        >
          Process
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold leading-tight"
          style={{ color: "#ffffff" }}
        >
          Book in 3 Simple Steps
        </h2>
      </motion.div>
 
      
      <motion.div
        className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
       
        <div
          className="hidden md:block absolute top-[52px] left-[calc(16.66%+28px)] right-[calc(16.66%+28px)] h-px"
          style={{
            background:
              "linear-gradient(90deg, #1e3a5f 0%, #1e5a9f 50%, #1e3a5f 100%)",
          }}
          aria-hidden="true"
        />
 
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}
              className="relative flex flex-col items-center text-center flex-1"
              variants={itemVariants}
            >
              
              <div className="relative mb-7">
                {/* Glow behind box */}
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                  style={{ backgroundColor: "#1e5aff" }}
                  aria-hidden="true"
                />
 
                
                <div
                  className="relative w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: "#0d1626",
                    border: "1px solid #1a3a6a",
                    boxShadow:
                      "inset 0 1px 0 rgba(59,158,255,0.08), 0 4px 24px rgba(0,0,0,0.5)",
                  }}
                >
                  <Icon
                    size={36}
                    style={{ color: "#3b9eff" }}
                    aria-hidden="true"
                  />
                </div>
 
             
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10"
                  style={{
                    background: "linear-gradient(135deg, #3b9eff, #1a6fd4)",
                    color: "#ffffff",
                    boxShadow: "0 2px 8px rgba(59,158,255,0.5)",
                  }}
                >
                  {step.id}
                </div>
              </div>
 
             
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "#ffffff" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed max-w-[260px]"
                style={{ color: "#7a8fa8" }}
              >
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
    );
};

export default SimpleSteps;