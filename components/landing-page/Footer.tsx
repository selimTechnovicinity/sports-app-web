"use client";
import assets from "@/assets";
import Image from "next/image";

const AppFooter = () => {
  return (
    <footer className="w-full bg-white text-gray-600">
      {/* Download Section */}
      <div className="bg-white">
        <div className="bg-[#181F32]">
          <div className=" text-white py-6  px-6 flex flex-col lg:flex-row items-center justify-between gap-8 mt-10 max-w-7xl mx-auto">
            {/* Text & Buttons */}
            <div className="flex flex-col gap-4 max-w-lg">
              <h2 className="text-3xl lg:text-4xl font-semibold leading-snug">
                Hosting a tournament? Get <br /> our organizer app
              </h2>
              <div className="flex gap-4 mt-2">
                <Image
                  src={assets.images.apple_logo}
                  alt="Google Play"
                  width={140}
                  height={40}
                />
                <Image
                  src={assets.images.playstore_badge}
                  alt="App Store"
                  width={140}
                  height={40}
                />
              </div>
              <div className="flex gap-8 mt-2 text-sm items-center">
                <div className="flex items-center gap-1">
                  <Image
                    src={assets.images.playstore_small}
                    alt="play rating"
                    width={16}
                    height={16}
                  />
                  <span>
                    4.6 <span className="text-green-400">★</span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Image
                    src={assets.images.apple_small}
                    alt="apple rating"
                    width={16}
                    height={16}
                  />
                  <span>
                    4.2 <span className="text-green-400">★</span>
                  </span>
                </div>
              </div>
            </div>
            {/* Phone Image */}
            <div className=" flex absolute justify-center right-150">
              <Image
                src={assets.images.phone}
                alt="Phone Preview"
                width={250}
                height={500}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-12 px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 text-center sm:text-left gap-10 border-gray-200 mt-5 md:mt-10">
        {/* Menu */}
        <div>
          <h3 className="text-green-500 font-semibold mb-3">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Programs</li>
            <li>Coaches</li>
            <li>Success Stories</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-green-500 font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>Live Video</li>
            <li>Leagues & Tourneys</li>
            <li>Fan Pricing</li>
            <li>Download the App</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-green-500 font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Careers</li>
            <li>Advertise</li>
            <li>of the Year</li>
          </ul>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center py-4 text-sm text-gray-400 border-t border-gray-100">
        All Rights Reserved.
      </div>
    </footer>
  );
};

export default AppFooter;
