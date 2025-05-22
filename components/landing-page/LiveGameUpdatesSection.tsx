"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import assets from "@/assets"; // Your local image import map

const LiveGameUpdatesSection = () => {
  return (
    <section className="py-20 px-6 bg-white text-center">
      <p className="text-sm text-gray-500 mb-2">Live Scorekeeping</p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#1C1C29] mb-4">
        Real-Time Game Updates
      </h2>
      <p className="text-gray-600 mb-12">
        Follow live scores, stats, and key moments from ongoing tournaments
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className=" text-white  relative "
        >
          <Image
            src={assets.images.live1}
            alt="Team 1"
            width={480}
            height={480}
            className="mx-auto z-10 transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-white  relative"
        >
          <Image
            src={assets.images.live2}
            alt="Team A"
            width={480}
            height={480}
            className="mx-auto z-10 transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </motion.div>
      </div>

      <p className="text-sm text-gray-600">
        Real-time score updates | Quarter/half breakdowns | Player stats (PTS,
        REB, AST) | Play-by-play commentary toggle
      </p>
    </section>
  );
};

export default LiveGameUpdatesSection;
