import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS, STORE_STATS } from '../data/testimonials';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? TESTIMONIALS.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === TESTIMONIALS.length - 1 ? 0 : curr + 1));
  };

  return (
    <section id="ulasan" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-bakery-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title row with arrows matching image.png */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-bakery-gold bg-amber-100/70 px-3 py-1 rounded-full">
                Ulasan Jujur
              </span>
              <span className="text-xs font-semibold text-bakery-muted">
                ★ {STORE_STATS.rating}/5.0 ({STORE_STATS.totalReviews} ulasan)
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-bakery-espresso mt-2">
              Apa Kata<br />Pelanggan Kami?
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Ulasan Sebelumnya"
              className="p-3 rounded-full bg-white border border-bakery-border text-bakery-espresso hover:bg-amber-50 transition-colors shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Ulasan Berikutnya"
              className="p-3 rounded-full bg-white border border-bakery-border text-bakery-espresso hover:bg-amber-50 transition-colors shadow-sm active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border border-bakery-border shadow-sm hover:shadow-warm transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote text */}
              <div>
                <p className="text-sm sm:text-base text-bakery-cocoa italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Rating footer */}
              <div className="mt-8 pt-5 border-t border-bakery-border/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-11 h-11 rounded-full object-cover border border-amber-200"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-bakery-espresso">
                      {item.author}
                    </h4>
                    <span className="text-xs text-bakery-muted block">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* 5 Stars */}
                <div className="flex items-center text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

