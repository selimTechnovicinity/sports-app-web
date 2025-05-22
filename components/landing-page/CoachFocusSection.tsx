"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import assets from "@/assets";

const CoachFocusSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex lg:flex-row justify-between items-center gap-8">
        
        {/* Left: Image Stack */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative flex-1 w-full max-w-[600px] min-h-[520px] flex flex-col items-center lg:block"
        >
          {/* Background shape (visible on desktop only) */}
          <div className="hidden lg:block absolute top-[40px] left-[0px] w-[480px] h-[450px] bg-[#00D084] rounded-[30px] z-0" />

          {/* Main Phone App UI */}
          <Image
            src={assets.images.coach_focus_1}
            alt="App UI"
            width={300}
            height={500}
            className="relative z-10 rounded-xl transition-transform duration-500 hover:scale-105 lg:absolute lg:top-0 lg:left-[20px]"
          />

          {/* Timeout Box */}
          <Image
            src={assets.images.coach_focus_2}
            alt="Timeout Box"
            width={240}
            height={120}
            className="mt-6 lg:mt-0 lg:absolute lg:top-[60px] lg:left-[340px] z-20 rounded-xl  transition-transform duration-500 hover:scale-105"
          />

          {/* Stat Table */}
          <Image
            src={assets.images.coach_focus_3}
            alt="Stat Table"
            width={240}
            height={120}
            className="mt-4 lg:mt-0 lg:absolute lg:top-[210px] lg:left-[340px] z-20 rounded-xl  transition-transform duration-500 hover:scale-105"
          />
        </motion.div>

        {/* Right: Text */}
        <div className="justify-end items-right">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 text-center lg:text-left"
        >
          <p className="text-sm text-gray-500 mb-2">
            All-in-One Team Management
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1C1C29] mb-6">
            Focus on <br className="hidden sm:block" />
            Coaching. We’ll <br className="hidden sm:block" />
            Handle the Rest.
          </h2>
          <ul className="text-gray-700 space-y-3 list-disc list-inside text-left">
            <li>Effortless scorekeeping</li>
            <li>Automatic stat tracking</li>
            <li>Shareable game summaries</li>
            <li>Organize practice & game schedules</li>
          </ul>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoachFocusSection;
