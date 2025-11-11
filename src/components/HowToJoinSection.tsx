import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Button } from "@/components/ui/button";
import MailerLiteModal from "@/components/mailer-lite/MailerLiteModal";

export interface HowToJoinSectionRef {
  highlightCards: () => void;
}

const HowToJoinSection = forwardRef<HowToJoinSectionRef>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<
    "host" | "guest" | "associate"
  >("host");
  const [isHighlighting, setIsHighlighting] = useState(false);

  const hostCardRef = useRef<HTMLDivElement>(null);
  const guestCardRef = useRef<HTMLDivElement>(null);
  const associateCardRef = useRef<HTMLDivElement>(null);

  const handleUserTypeClick = (userType: "host" | "guest" | "associate") => {
    setSelectedUserType(userType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const highlightCards = () => {
    setIsHighlighting(true);
    setTimeout(() => {
      setIsHighlighting(false);
    }, 1000);
  };

  useImperativeHandle(ref, () => ({
    highlightCards,
  }));

  return (
    <section className="px-5 px-" id="how-to-join-section">
      {/* User selection section */}

      <div className="max-w-6xl mx-auto mb-5">
        <h2 className="text-4xl font-semibold text-primary mb-24 text-center ">
          How do you want to experience Ulô
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Host Column */}
          <div
            ref={hostCardRef}
            className={`relative bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-full ${
              isHighlighting
                ? "ring-4 ring-primary/50 shadow-2xl transform scale-105 bg-primary/5"
                : ""
            }`}
          >
            <div className="flex-1 flex flex-col justify-start">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Host</h3>
              <p className="text-lg text-gray-600 mb-3">
                Share your home. <br /> Earn from it.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Become a Host on Ulô and open your doors to the world. List your
                property, welcome global guests, and earn income while Ulô
                handles bookings, payments, and support.
              </p>
            </div>

            <button
              onClick={() => handleUserTypeClick("host")}
              className="mt-auto w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
            >
              Become a Host
            </button>
          </div>

          {/* Guest Column */}
          <div
            ref={guestCardRef}
            className={`relative bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-full ${
              isHighlighting
                ? "ring-4 ring-primary/50 shadow-2xl transform scale-105 bg-primary/5"
                : ""
            }`}
          >
            <div className="flex-1 flex flex-col justify-start">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Guest</h3>
              <p className="text-lg text-gray-600 mb-3">
                Explore Africa. Stay connected.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Discover unique homes, authentic stays, and cultural experiences
                across Africa. With Ulô, booking is simple, payments are secure,
                and every trip feels like home.
              </p>
            </div>

            <button
              onClick={() => handleUserTypeClick("guest")}
              className="mt-auto w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
            >
              Join Now
            </button>
          </div>

          {/* Associate Column */}
          <div
            ref={associateCardRef}
            className={`relative bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-full ${
              isHighlighting
                ? "ring-4 ring-primary/50 shadow-2xl transform scale-105 bg-primary/5"
                : ""
            }`}
          >
            <div className="flex-1 flex flex-col justify-start">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Associate
              </h3>
              <p className="text-lg text-gray-600 mb-3">
                Represent. Guide. Earn Globally.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Step into the world of hospitality as an Ulô Certified
                Associate. Build global guest connections, represent Ulô
                professionally, work remotely, and earn a substantial income.
              </p>
            </div>

            <button
              onClick={() => handleUserTypeClick("associate")}
              className="mt-auto w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
            >
              Become an Associate
            </button>
          </div>
        </div>
      </div>

      {/* MailerLite Modal */}
      <MailerLiteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userType={selectedUserType}
      />
    </section>
  );
});

export default HowToJoinSection;
