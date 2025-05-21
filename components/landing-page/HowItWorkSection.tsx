"use client";
import { FaDownload, FaUsers, FaShareAlt } from "react-icons/fa";

const HowItWorksSection = () => {
  return (
    <section className="bg-[#0F172A] text-white py-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <p className="text-sm text-gray-300">How It Works Section</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Start in Minutes
        </h2>

        {/* Step Line */}
        <div className="flex items-center justify-between max-w-md mx-auto mb-12 relative">
          {[1, 2, 3].map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-sm text-gray-300"
            >
              <span className="mb-2">Step {step}</span>
              <div className="w-4 h-4 bg-[#00D084] rounded-full" />
            </div>
          ))}

          {/* Connecting Line */}
          <div className="absolute top-6 left-[8px] right-[8px] h-0.5 bg-gradient-to-r from-[#00D084]/70 via-[#00D084] to-[#00D084]/70 z-[-1]" />
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Step 1 */}
          <div className="bg-[#00D084] text-white rounded-xl shadow-lg py-12">
            <div className="text-3xl mb-4 flex justify-center">
              <FaDownload />
            </div>
            <h3 className="text-xl font-semibold mb-2">Download</h3>
            <p className="text-sm">Available on iOS & Android</p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#00D084] text-white  rounded-xl shadow-lg py-12">
            <div className="text-3xl mb-4 flex justify-center">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Your Team</h3>
            <p className="text-sm">Add players, coaches, and schedules</p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#00D084] text-white rounded-xl shadow-lg py-12">
            <div className="text-3xl mb-4 flex justify-center">
              <FaShareAlt />
            </div>
            <h3 className="text-xl font-semibold mb-2">Score & Share</h3>
            <p className="text-sm">Track games live and stream highlights</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
