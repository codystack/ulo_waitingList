import React, { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoShowcaseSection from "@/components/VideoShowcaseSection";
import VideoContentSection from "@/components/VideoContentSection";
import FeaturesSection from "@/components/FeaturesSection";
import BusinessShowcaseSection from "@/components/BusinessShowcaseSection";
import HowToJoinSection, {
  HowToJoinSectionRef,
} from "@/components/HowToJoinSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ScrollDotsSection from "@/components/ScrollDotsSection";
import AncillaryServicesShowcase from "@/components/AncillaryServicesShowcase";
import { heroContent, businessSlides, flippedSlides } from "@/data";
import MusicToggleButton from "@/components/MusicToggleButton";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  console.log(isMobile);
  const howToJoinSectionRef = useRef<HowToJoinSectionRef>(null);
  return (
    <div className="min-h-screen bg-white">
      <Header howToJoinSectionRef={howToJoinSectionRef} />

      <div className="">
        <HeroSection heroContent={heroContent} />

        <VideoShowcaseSection heroContent={heroContent} />

        <ScrollDotsSection />

        <VideoContentSection
          title1="Hands‑Free Management"
          subtitle1="From bookings to check-outs, Ulô handles every detail. This means you earn effortlessly, while your guests enjoy a flawless stay."
          video1="/videos/Hands‑Free-Management/1.webm"
          title2="Focus on what matters most"
          subtitle2="With Ulô Associates handling the chats, check-ins, and care, hosting feels easy — and guests feel at home."
          video2="/videos/Hands‑Free-Management/2.webm"
          listItems={[
            "Automated booking management",
            "24/7 guest communication & support",
            "Seamless check-in, check-out & cleaning",
          ]}
          sectionId="handsfree-section"
        />

        <VideoContentSection
          title1="Xperience Gallery"
          subtitle1="From vibrant cities to local secrets, Ulô uncovers it all, helping you explore, connect, and make travel unforgettable."
          video1="/videos/XPERIENCE-GALLERY-1.mp4"
          title2="See the soul of every stay"
          subtitle2="Ulô’s Xperience Gallery reveals the unique character of every home and journey, building the trust and connection that inspires your next adventure."
          video2="/videos/XPERIENCE-GALLERY2.mp4"
          listItems={[
            "Explore authentic reels of vibrant cities and local secrets.",
            "Create & share your unique city story with friends and family.",
            "Feel the home’s aura through video reels before you book.",
          ]}
          sectionId="xperience-section"
        />

        <VideoContentSection
          title1="Borderless Payment"
          subtitle1="Pay with confidence. Ulô Cowries makes every transaction, from booking to last-minute extras, simple, seamless, and secure."
          video1="/videos/BORDERLESS-PAYMENT1.mp4"
          title2="Seamless Journeys, Simple Payments"
          subtitle2="Ulô Cowries makes paying simple and worry-free. You get to pay your way, so your focus stays on the adventure, not the transaction."
          video2="/videos/BORDERLESS-PAYMENT2.mp4"
          listItems={[
            "Convert with USD valuation — 1 ACW = 1 USD",
            "Share Cowries easily with family & friends",
            "Withdraw in any African currency with ease",
          ]}
          sectionId="borderless-section"
        />

        <VideoContentSection
          title1="Ulô Associates"
          subtitle1="Your personal city companion. Managing your stay, guiding your steps, and making every moment smoother."
          video1="/videos/ULÔ-ASSOCIATE.mp4"
          title2="Feel the city, not the stress"
          subtitle2="With Ulô Associates, guests are welcomed like family, guided through culture and hidden gems, and supported every step for a truly effortless stay."
          video2="/videos/ULÔASSOCIATE-2.mp4"
          listItems={[
            " Welcome you at check-in and ensure comfort",
            " Connect you with culture, tours, and insider experiences",
            " ⁠Handle safety, logistics, and local support",
          ]}
          sectionId="associates-section"
        />
        <FeaturesSection />

        {/* <BusinessShowcaseSection businessSlides={businessSlides} /> */}

        <AncillaryServicesShowcase
          slides={flippedSlides}
          sectionTitle="Go Beyond the Stay"
        />

        <VideoContentSection
          title1="Guest Handbook"
          subtitle1="Your passport to belonging. This city companion has everything you need to explore African cities with confidence, from key phrases to etiquette and safe spots."
          video1="/public//videos/HANDBOOK.mp4"
          listItems={[
            "Navigate easily",
            "Connect authentically",
            "Access help when needed",
          ]}
          sectionId="guestbook-section"
          isLooped={false}
        />
        <CTASection />

        <HowToJoinSection ref={howToJoinSectionRef} />

        <FAQSection />

        <Footer />
      </div>
      {/* 
      <MusicToggleButton containerClassName="fixed left-8 bottom-8 z-50 hover:opacity-100 opacity-70" /> */}
    </div>
  );
};

export default Index;
