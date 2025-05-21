"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import assets from "@/assets";

// Replace these with your actual image paths
const section2 = assets.section2;

const cardContent = [
  {
    title: "Live Stats & Scorekeeping",
    subtitle: "Real-time scoring and detailed stats at your fingertips.",
    images: [section2[0], section2[1]],
  },
  {
    title: "Live Video Streaming",
    subtitle: "Let fans and family watch the game from anywhere.",
    images: [section2[2], section2[3]],
  },
  {
    title: "Team Management",
    subtitle: "Schedule, sync, message team, RSVP game attendance.",
    images: [section2[4], section2[5]],
  },
];

const WhyGameChangerSection = () => {
  return (
    <section className="py-20 px-6 bg-white text-center">
      <p className="text-sm text-gray-500 mb-2">Why GameChanger?</p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#1C1C29] mb-12 leading-tight">
        Built for Coaches. Loved by Teams.
        <br />
        Trusted by Families
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {cardContent.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className=" rounded-2xl p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
          >
            <div className="bg-[#00D084] bg-opacity-10 space-y-4 mb-4 rounded-2xl p-4 hover:shadow-xl">
              {card.images.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`${card.title} ${i + 1}`}
                    width={400}
                    height={250}
                    className="rounded-lg object-cover transition-transform duration-500 hover:scale-105 w-full"
                  />
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t border-[#00D084]/20">
              <h3 className="text-lg font-semibold text-[#1C1C29] mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600">{card.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyGameChangerSection;
