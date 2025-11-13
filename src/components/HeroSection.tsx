import React, { useRef, useState } from "react";
import { HeroContent } from "@/types";
import BlurText from "@/components/BlurText";
import { useMobileVideoPlayback } from "../hooks/useMobileVideoPlayback";
import Modal from "@/components/Modal";
import HeroForm from "@/components/HeroForm";
import VideoShowcaseSection from "@/components/VideoShowcaseSection";

interface HeroSectionProps {
  heroContent: HeroContent;
}

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const handleScrollToVideo = () => {
  const videoSection = document.getElementById("video-section");
  if (videoSection) {
    videoSection.scrollIntoView({ behavior: "smooth" });
  }
};

const HeroSection: React.FC<HeroSectionProps> = ({ heroContent }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useMobileVideoPlayback(videoRef);

  // Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/hero-page.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-sm md:max-w-5xl p-5 mx-auto mt-45 text-center">
        <BlurText
          suffix={["Africa", "Lagos", "Durban", "Accra", "Nairobi", "Kigali"]}
          cycleInterval={3000}
          text="Don’t just visit"
          bottomText="Connect with it."
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-[2.2rem] sm:text-6xl md:text-8xl text-white mb-3 tracking-tight font-medium leading-none md:leading-tight"
        />

        <p className="text-lg text-white mb-10 md:px-20 leading-relaxed animate-fade-in max-w-3xl mx-auto tracking-wide font-light">
          {heroContent.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <button
            onClick={() => setIsFormModalOpen(true)}
            className="bg-[#8B5E3C] text-white px-6 py-3 rounded-[7px] text-[17px] shadow-md hover:bg-[#8B5E3C]/90 transition-all"
          >
            Join the Movement
          </button>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="bg-white text-[#8B5E3C] px-6 py-3 border border-[#8B5E3C] text-[17px] rounded-[7px] shadow-md hover:bg-gray-100 transition-all"
          >
            Watch Video
          </button>
        </div>

        {/* Down Arrow */}
        <div className="max-w-14 mx-auto animate-bounce duration-1000">
          <button
            onClick={handleScrollToVideo}
            aria-label="Scroll to video section"
          >
            <img
              src="/icons/ARROW.svg"
              alt=""
              className="scale-125 rotate-180"
            />
          </button>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
        <HeroForm />
      </Modal>

      <Modal
        size="lg"
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      >
        <VideoShowcaseSection heroContent={heroContent} />
      </Modal>
    </section>
  );
};

export default HeroSection;
