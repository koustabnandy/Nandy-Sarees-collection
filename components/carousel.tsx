'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'Exquisite Banarasi Collection',
    subtitle: 'Handcrafted luxury with golden brocade',
    image: 'https://images.unsplash.com/photo-1610707267991-c8f3d56c0b96?w=1200&h=500&fit=crop',
    ctaLink: '/collections/banarasi',
    ctaText: 'Explore Banarasi',
  },
  {
    id: 2,
    title: 'Puja Specials',
    subtitle: 'Celebrate with our festive collection',
    image: 'https://images.unsplash.com/photo-1597103442097-8b74394b95c6?w=1200&h=500&fit=crop',
    ctaLink: '/collections/kanjeevaram',
    ctaText: 'View Puja Collection',
  },
  {
    id: 3,
    title: 'Chanderi Elegance',
    subtitle: 'Lightweight and sophisticated',
    image: 'https://images.unsplash.com/photo-1605777927616-2fcbf70f9f4f?w=1200&h=500&fit=crop',
    ctaLink: '/collections/chanderi',
    ctaText: 'Discover Chanderi',
  },
];

export function Carousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setAutoplay(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoplay(false);
  };

  return (
    <div
      className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${slide.image}')`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-12">
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-2 max-w-2xl text-balance">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.ctaLink}
                  className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-foreground" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              setAutoplay(false);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-white w-8' : 'bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
