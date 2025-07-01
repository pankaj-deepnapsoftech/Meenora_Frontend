import React, { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialsData = [
  {
    name: "Ananya M.",
    rating: 5,
    comment: "Confidence restored!",
    video: "/reviewVideo/Video-800.mp4",
  },
  {
    name: "Ravi S.",
    rating: 5,
    comment: "Real results.",
    video: "/reviewVideo/Video-377.mp4",
  },
  {
    name: "Priya K.",
    rating: 5,
    comment: "Feels amazing.",
    video: "/reviewVideo/Video-76.mp4",
  },
  {
    name: "Priya K.",
    rating: 5,
    comment: "Feels amazing.",
    video: "/reviewVideo/AQPbSlAlYpfaXmNni854DU-XGNsbbjPMqyv77te24-9YYLxktlvvJrDnoyDV-0Lh8VVLPetnFRLOX3_ofR3DoVFtLrMsrko0853A7rE.mp4",
  },
  {
    name: "Priya K.",
    rating: 5,
    comment: "Feels amazing.",
    video: "/reviewVideo/AQM9xr6unDjRWHOXD7EkAc1mxN8ZgeE1wFOXQ7D_C6vBFZy1dEV_jecvSZj0wu7_CCxaV88gYIsqyl8kLjYA6vkVWzeGJTHkgWTG4WU.mp4",
  },
];

const TestimonialsSection = () => {


  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-secondary/20 py-20 px-6">
      <div className="max-w-7xl mx-auto relative">
      
        <Quote className="h-12 w-12 text-foreground/50 mb-8 mx-auto" />
        <h1 className="text-zinc-700 font-display text-[50px] font-bold text-center mb-4">
          How to Use These Products
        </h1>
        <p className="text-center text-lg text-black/60 mb-10">
          These videos show how to use our products effectively.
        </p>

       
        <div className="relative">
      
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow"
          >
            <ChevronLeft />
          </button>

    
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow"
          >
            <ChevronRight />
          </button>

        
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth scrollbar-hide flex-nowrap gap-x-6 pb-4 px-6"
          >
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                className="w-[330px] bg-white/5 border border-gray-300 rounded-xl p-4 shadow-lg flex-shrink-0"
              >
                <div className="relative w-[300px] h-[60vh] aspect-video mb-4 overflow-hidden rounded-lg">
                  <video
                    src={testimonial.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    title={`Testimonial from ${testimonial.name}`}
                  >
                    <track kind="captions" />
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
};

export default TestimonialsSection;
