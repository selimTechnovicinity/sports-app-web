"use client";
import Image from "next/image";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import assets from "@/assets"; // your imported images

const NeverMissSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <section className="  px-4 py-60 ">
      <div className="bg-[#00D084] rounded-[32px] max-w-7xl mx-auto text-center text-white py-4">
        <p className="text-sm mb-2">Live score and Video</p>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
          Never Miss a Moment
        </h2>
        <p className="max-w-xl mx-auto text-base md:text-lg">
          Whether at the game or miles away, stay connected with live video,
          real-time updates, and post-game recaps.
        </p>

        {/* Animated Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            hidden: { opacity: 0, y: 50 },
          }}
          className="mt-12 relative flex flex-col md:flex-row justify-center items-center gap-4"
        >
          <div className="h-[100px]">
            <Image
              src={assets.images.never_miss}
              alt="AutoStream Setup"
              width={700}
              height={700}
              className="w-full  z-30"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NeverMissSection;
