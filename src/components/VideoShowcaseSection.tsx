import React, { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";
import { HeroContent } from "@/types";

interface VideoShowcaseSectionProps {
  heroContent: HeroContent;
}

// const THUMBNAIL_URL =
//   'https://res.cloudinary.com/dfcsaxtru/video/upload/q_55/v1753103917/THUMBNAIL_rkh4m3.mp4'

const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({
  heroContent,
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullVideo, setShowFullVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Handle escape key for fullscreen exit
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        exitFullscreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Sync video playing state with actual video state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const handlePlayClick = () => {
    setShowFullVideo(true);
    setTimeout(() => {
      videoRef.current?.play();
      setIsVideoPlaying(true);
    }, 100);
  };

  const enterFullscreen = async () => {
    if (containerRef.current && !isFullscreen) {
      try {
        await containerRef.current.requestFullscreen();
      } catch (error) {
        console.error("Error entering fullscreen:", error);
      }
    }
  };

  const exitFullscreen = async () => {
    if (isFullscreen) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.error("Error exiting fullscreen:", error);
      }
    }
  };

  const handleDoubleClick = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      id="video-section"
    >
      <div className="max-w-20xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-primary mb-4">
            This is Africa, See for Yourself
          </h2>
          <p className="text-xl  text-gray-600">
            Not the Africa of postcards
            <span className="block">but the one you’ve never experienced.</span>
          </p>
        </div>
        <div
          ref={containerRef}
          className={`relative bg-gray-900 rounded-3xl md:rounded-[50px] overflow-hidden aspect-video mx-auto ${
            isFullscreen ? "fixed inset-0 z-50 rounded-none" : "max-w-7xl"
          }`}
        >
          {/* Show thumbnail preview until play is clicked */}
          {!showFullVideo ? (
            <>
              <video
                className="w-full h-full object-cover"
                src="/videos//ULÔ_SHORT_FILM.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/video-placeholder.jpg"
              />
              {/* Pulsing Play Button */}
              <button
                type="button"
                aria-label="Play full video"
                className="absolute inset-0 flex items-center justify-center focus:outline-none"
                onClick={handlePlayClick}
                tabIndex={0}
              >
                <span className="relative flex items-center justify-center">
                  <span className="absolute inline-flex h-24 w-24 rounded-full bg-white animate-ping duration-1000"></span>
                  <span className="relative  h-20 w-20 rounded-full bg-white shadow-lg flex items-center justify-center group hover:scale-105 transition-all opacity-80 ">
                    <Play
                      className="w-12 h-12 text-primary ml-1 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                    />
                  </span>
                </span>
              </button>
            </>
          ) : (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={heroContent.videoUrl}
              autoPlay
              muted={false}
              loop
              controls
              controlsList="nodownload"
              poster="/video-placeholder.jpg"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            />
          )}

          {/* Gradient overlay - only show when not in fullscreen */}
          {!isFullscreen && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 pointer-events-none"></div>
          )}

          {/* Video description - only show when not in fullscreen */}
          {/* {!isFullscreen && (
            <div className="absolute bottom-4 left-4 text-white pointer-events-none">
              <p className="text-sm opacity-80">
                See how Ulo Business Profile works
              </p>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;
