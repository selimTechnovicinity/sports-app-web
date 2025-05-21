"use client";

import ContactMailSection from "@/components/landing-page/ContactMailSection";
import FaqSection from "@/components/landing-page/FaqSection";
import AppFooter from "@/components/landing-page/Footer";
import AppHeader from "@/components/landing-page/Header";
import HowItWorksSection from "@/components/landing-page/HowItWorkSection";
import Section1 from "@/components/landing-page/Section1";
import ToolFeatureSection from "@/components/landing-page/ToolFeatueSection";
import WhyGameChangerSection from "@/components/landing-page/WhyGameChangerSection";

export default function Home() {
  return (
    <div>
      <AppHeader />
      <div className="min-h-screen">
        <Section1 />
      </div>
      <div className="mt-[30vh]">
        <WhyGameChangerSection />
      </div>
      <div>
        <ToolFeatureSection />
      </div>
      <div>
        <HowItWorksSection />
      </div>
      <div>
        <FaqSection />
      </div>

      <div>
        <ContactMailSection />
      </div>

      <div className="mt-[20vh]">
        <AppFooter />
      </div>
    </div>
  );
}
