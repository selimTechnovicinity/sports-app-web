import assets from "@/assets";
import Image from "next/image";
import { useEffect, useState } from "react";

const BusketBall = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    assets?.images?.busket1,
    assets?.images?.busket2,
    assets?.images?.busket3,
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="hidden md:block w-1/2 bg-white relative ml-4 mb-10">
      <Image
        src={images[currentImage]}
        alt="Basketball Visual"
        width={400}
        height={400}
        className="absolute bottom-0 right-0 mx-auto transition-all duration-700"
      />
    </div>
  );
};

export default BusketBall;
