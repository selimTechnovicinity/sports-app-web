import assets from "@/assets";
import Image from "next/image";

const Section1 = () => {
  return (
    <section className="text-white py-12 px-4 sm:px-6">
      <div className="bg-[#00D084] max-w-7xl py-8 sm:py-16 rounded-3xl sm:rounded-[40px] mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
          Stream, Score, &<br />
          Elevate Your Game
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto px-4">
          Live stream games, track real-time stats, and keep families connected—
          all in one powerful platform.
        </p>

        {/* Download Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          <div className="hidden md:block">
            <Image
              src={assets.images.section1_basket_left}
              alt="Basket Left"
              width={300}
              height={300}
              className="w-[200px] lg:w-[300px]"
            />
          </div>
          <div className="mb-6 md:mb-10 flex flex-col items-center justify-center gap-4">
            <button className="bg-white text-black font-semibold py-2 px-6 rounded-md w-full max-w-[296px] shadow-sm">
              Download App
            </button>
            <div className="flex gap-2 sm:gap-4">
              <Image
                src={assets.images.playstore_badge}
                alt="Google Play"
                width={140}
                height={40}
                className="w-[120px] sm:w-[140px]"
              />
              <Image
                src={assets.images.apple_logo}
                alt="App Store"
                width={140}
                height={40}
                className="w-[120px] sm:w-[140px]"
              />
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src={assets.images.section1_basket_right}
              alt="Basket Right"
              width={300}
              height={300}
              className="w-[200px] lg:w-[300px]"
            />
          </div>
        </div>

        {/* Phone Screens */}
        <div className="flex justify-center items-end gap-4 sm:gap-8 flex-wrap">
          <div className="h-[180px] sm:h-[220px] md:h-[280px] mt-0 sm:mt-20">
            <Image
              src={assets.images.section1_phone_left}
              alt="App Screen Left"
              width={300}
              height={300}
              className="rounded-xl w-[120px] sm:w-[180px] md:w-[220px] lg:w-[300px] transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="h-[220px] sm:h-[280px] md:h-[350px]">
            <Image
              src={assets.images.section1_phone_center}
              alt="App Screen Center"
              width={400}
              height={500}
              className="rounded-xl w-[160px] sm:w-[220px] md:w-[280px] lg:w-[350px] transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="h-[180px] sm:h-[220px] md:h-[280px] mt-0 sm:mt-20">
            <Image
              src={assets.images.section1_phone_right}
              alt="App Screen Right"
              width={300}
              height={300}
              className="rounded-xl w-[120px] sm:w-[180px] md:w-[220px] lg:w-[300px] transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
