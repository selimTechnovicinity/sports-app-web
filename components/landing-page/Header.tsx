"use client";
import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";

const AppHeader = () => {
  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={assets.images.logo}
            alt="Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link href="/" className="text-green-500 font-semibold">
            Home
          </Link>
          <Link href="/programs" className="text-gray-800 hover:text-green-500">
            Programs
          </Link>
          <Link href="/coaches" className="text-gray-800 hover:text-green-500">
            Coaches
          </Link>
          <Link
            href="/success-stories"
            className="text-gray-800 hover:text-green-500"
          >
            Success Stories
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-green-500">
            Contact
          </Link>
        </nav>

        {/* Login Button */}
        <Link
          href="/login"
          className="bg-[#00D084] text-white text-sm px-4 py-2 rounded-md font-medium hover:bg-[#00b374] transition"
        >
          Login/Registration
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
