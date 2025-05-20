"use client";

import AppFooter from "@/components/landing-page/Footer";
import AppHeader from "@/components/landing-page/Header";

export default function Home() {
  return (
    <div>
      <AppHeader />
      <div className="min-h-screen">
        <div className="text-2xl mt-40 text-center">Under Developing</div>
      </div>
      <AppFooter />
    </div>
  );
}
