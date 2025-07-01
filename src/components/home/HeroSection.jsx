import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminBannerContext } from "../../contexts/AdminBannerContext";

// Slide animation variants
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 2000 : -1000,
  }),
  center: {
    x: 0,
  },
  exit: (direction) => ({
    x: direction < 0 ? 2000 : -1000,
  }),
};

const HeroSection = () => {
  const { bannerDataBypage, GetBannerDataByPage } = useAdminBannerContext();
  const banners = bannerDataBypage?.home || [];

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  const imageIndex = page % banners.length;

  useEffect(() => {
    GetBannerDataByPage("home");
  }, []);

  // Auto-slide every 2s
  useEffect(() => {
    if (banners.length === 0) return;

    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        setPage((prev) => (prev + 1) % banners.length);
        setDirection(1);
      }, 3000);
    };

    startAutoSlide();

    return () => clearInterval(intervalRef.current);
  }, [banners.length]);

  const goToSlide = (i) => {
    setDirection(i > page ? 1 : -1);
    setPage(i);
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] bg-background w-full">
      {/* Slider Section */}
      <div className="w-full mt-8 h-[60vh] sm:h-[75vh] lg:h-[55vh] px-4 flex flex-col items-center">
        <div className="w-full h-full rounded-xl overflow-hidden shadow-lg relative">
          <AnimatePresence initial={false} custom={direction}>
            {banners.length > 0 && (
              <motion.img
                key={banners[imageIndex]?.image}
                src={banners[imageIndex]?.image || "/fallback.jpg"}
                alt={banners[imageIndex]?.heading || "Meenora Product"}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ ease: "easeInOut", duration: 0.6 }}
                className="absolute inset-0 w-full h-full object-cover object-center rounded-xl"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex mt-4 space-x-3">
          {banners.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === imageIndex ? "bg-primary" : "bg-gray-300"}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 max-w-7xl mx-4 sm:px-6 lg:px-8 py-12 lg:py-20 text-center">
        {banners.length > 0 && (
          <>
            <motion.h1
              key={banners[imageIndex]?.heading}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight"
            >
              {banners[imageIndex]?.heading || "Because Self-Care Should Be"}
            </motion.h1>

            <motion.h2
              key={banners[imageIndex]?.description}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-xl sm:text-2xl font-display text-foreground mt-4"
            >
              <span className="block gradient-text">
                Simple, Clean, and Empowering.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Discover sulfate-free, cruelty-free, and vegan personal care that works with your body — not against it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
            >
              <Link to="/shop">
                <Button size="lg" className="btn-primary text-base py-3.5 px-8 group shadow-lg">
                  Shop Now
                  <ShoppingBag className="ml-2.5 h-5 w-5 group-hover:animate-pulse" />
                </Button>
              </Link>
              <Link to="/shop#coming-soon">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base py-3.5 px-8 border-secondary text-secondary hover:bg-secondary hover:text-white shadow-sm"
                >
                  Explore Coming Soon
                  <Sparkles className="ml-2.5 h-5 w-5 group-hover:animate-ping" />
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
      <div className="relative z-10 px-6 py-12 lg:py-20 text-center bg-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-zinc-700 leading-tight mb-6">
          Introducing Our Shampoo
          <span className="block text-zinc-500 text-xl md:text-2xl font-medium mt-2">
            Tested Purity. Visible Strength.
          </span>
        </h1>

        <div className="w-full  rounded-2xl overflow-hidden shadow-xl">
          <video
            src="/MEENORA.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
            title="Product Demo Video"
          />
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
