"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import assets from "@/assets";

const ToolFeatureSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className=" max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-[40%] text-center lg:text-left"
        >
          <p className="text-sm text-gray-500 mb-2">
            All-in-One Team Management
          </p>
          <h2 className="text-4xl font-extrabold text-[#1C1C29] mb-6 leading-tight">
            One App. Every <br /> Tool You Need.
          </h2>
          <ul className="text-gray-700 space-y-3 mb-6 list-disc list-inside text-left">
            <li>Team Scheduling</li>
            <li>Player Availability</li>
            <li>Messaging & Announcements</li>
            <li>Roster & Lineups</li>
          </ul>
          <p className="text-sm font-semibold text-black">
            Compatible with iOS & Android
          </p>
        </motion.div>

        {/* Visual Section */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 relative h-[680px] max-w-[752px] w-full"
        >
          <div className="bg-[#00D084] h-full rounded-[22px] max-w-7xl">
            {/* Background Shape */}
            <Image
              src={assets.images.tool_feature_phone}
              alt="Phone Background"
              width={405}
              height={680}
              className="absolute inset-0 object-contain h-full z-0 ml-70 shadow-xl transition-transform duration-500 hover:scale-105"
            />

            {/* Main App UI */}
            <Image
              src={assets.images.tool_feature_1}
              alt="Main App"
              width={310}
              height={600}
              className="absolute top-[60px] left-10 z-20 rounded-[28px] shadow-xl transition-transform duration-500 hover:scale-105"
            />

            {/* RSVP Floating */}
            <Image
              src={assets.images.tool_feature_2}
              alt="RSVP"
              width={350}
              height={600}
              className="absolute top-[240px] left-[-140px] z-30 rounded-xl transition-transform duration-500 hover:scale-105"
            />

            {/* Chat Floating */}
            <Image
              src={assets.images.tool_feature_3}
              alt="Chats"
              width={260}
              height={160}
              className="absolute bottom-4 left-[-50px] z-30 rounded-xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolFeatureSection;
