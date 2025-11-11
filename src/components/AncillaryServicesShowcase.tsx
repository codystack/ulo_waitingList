import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServiceSlide {
  id: number;
  title: string;
  description: string;
  contentType: "video" | "image" | "component";
  videoUrl?: string;
  imageUrl?: string;
  component?: React.ReactNode;
  // SpotlightCard specific properties
  icon?: string | React.ReactNode;
  spotlightTitle?: string;
  spotlightDescription?: string;
}

interface AncillaryServicesShowcaseProps {
  slides: ServiceSlide[];
  sectionTitle: string;
}

const AncillaryServicesShowcase: React.FC<AncillaryServicesShowcaseProps> = ({
  slides,
  sectionTitle,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Video playback control refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasEnteredViewportOnceRef = useRef<boolean>(false);

  // Clear any existing timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Clear pause timeout
  const clearPauseTimeout = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  };

  // Handle slide change with animation
  const handleSlideChange = (newSlideIndex: number, isManualClick = false) => {
    if (newSlideIndex === activeSlide) return;

    clearTimer();
    clearPauseTimeout();
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsTransitioning(true);
    setProgress(0);
    progressRef.current = 0;

    // Small delay to trigger fade out, then change slide
    setTimeout(() => {
      setActiveSlide(newSlideIndex);
      setProgress(0);
      progressRef.current = 0;
      // Reset transition state after fade in completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);

    // If manual click, pause auto-advance for 20 seconds
    if (isManualClick) {
      setIsPaused(true);
      pauseTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 3000); // 3 seconds pause
    }
  };

  // Progress bar animation and auto-advance (10 seconds)
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 3000; // 3 seconds

    function animateProgress(timestamp: number) {
      if (isPaused) return;
      if (startTimestamp === null) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      let percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);
      progressRef.current = percent;
      if (percent < 100) {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        // Advance to next slide
        const nextSlide = (activeSlide + 1) % slides.length;
        handleSlideChange(nextSlide);
      }
    }

    // Reset progress on slide change
    setProgress(0);
    progressRef.current = 0;
    if (!isPaused) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animateProgress);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [activeSlide, slides, isPaused]);

  // Clean up timers and animation frame on component unmount
  useEffect(() => {
    return () => {
      clearTimer();
      clearPauseTimeout();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  // Viewport-based video playback control
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || typeof IntersectionObserver === "undefined") {
      return;
    }

    const applyPlayback = (shouldPlay: boolean) => {
      const v = videoRef.current;
      if (!v) return;
      const currentlyPlaying = !v.paused && !v.ended;
      if (shouldPlay && !currentlyPlaying) {
        const playPromise = v.play();
        if (playPromise && typeof (playPromise as any).catch === "function") {
          (playPromise as Promise<void>).catch(() => {});
        }
      } else if (!shouldPlay && currentlyPlaying) {
        v.pause();
      }
    };

    const entryObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          hasEnteredViewportOnceRef.current = true;
          applyPlayback(true);
        }
      },
      { root: null, threshold: 0 }
    );

    const proximityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) {
          applyPlayback(false);
        } else if (hasEnteredViewportOnceRef.current) {
          applyPlayback(true);
        }
      },
      { root: null, rootMargin: "50px 0px 50px 0px", threshold: 0 }
    );

    entryObserver.observe(videoEl);
    proximityObserver.observe(videoEl);

    return () => {
      entryObserver.disconnect();
      proximityObserver.disconnect();
    };
  }, []);

  const renderVideoContent = () => {
    return (
      <div className="flex flex-col  items-center">
        <div className="w-full max-w-[700px] h-[500px] sm:h-[240px] md:h-[580px] mb-4 sm:mb-6">
          <video
            ref={videoRef}
            className="w-full h-full"
            loop
            muted
            playsInline
          >
            <source src="/videos/ANCILARY.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  };

  return (
    <section
      className="py-12  sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      id="services-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-20xl   mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Go Beyond the Stay
            </h2>
            <p className="text-lg text-gray-600">
              Add ease, thrill, and local flavor to your journey
              <br /> with trusted services that take your African experience
              further.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left side - Video */}
          <div className="relative flex justify-center order-1 lg:order-1">
            <div className="w-full max-w-md">{renderVideoContent()}</div>
          </div>

          {/* Right side - Horizontal slider for text content */}
          <div className="relative overflow-hidden order-2 lg:order-2">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {slide.title}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      {slide.description}
                    </p>

                    {/* Progress bar */}
                    <div className="w-full h-1 bg-gray-200 rounded-full mt-4 sm:mt-6 overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full transition-all ease-linear"
                        style={{
                          width: index === activeSlide ? `${progress}%` : "0%",
                          transitionProperty: "width",
                          transitionDuration:
                            index === activeSlide ? "0ms" : "300ms",
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation arrows - positioned outside the sliding container */}
            <div className="flex items-center space-x-3 sm:space-x-4 mt-2 px-2 sm:px-4">
              <button
                onClick={() =>
                  handleSlideChange(
                    (activeSlide - 1 + slides.length) % slides.length,
                    true
                  )
                }
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button
                onClick={() =>
                  handleSlideChange((activeSlide + 1) % slides.length, true)
                }
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AncillaryServicesShowcase;
