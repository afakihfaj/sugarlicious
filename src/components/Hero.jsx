import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ArrowRight, MessageCircle, RotateCcw } from 'lucide-react';

// Lazy load 3D Three.js canvas on demand so initial page text, fonts & hero CTAs render in <100ms
const ThreeCanvas = lazy(() => import('./ThreeCanvas'));

export default function Hero({ onExploreMenu }) {
  const [show3D, setShow3D] = useState(false);

  // Auto-activate 3D on high-end desktop after idle period
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    let timer;

    if (isDesktop && 'requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => {
        timer = setTimeout(() => setShow3D(true), 3200);
      }, { timeout: 4000 });

      return () => {
        window.cancelIdleCallback(idleId);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24 bg-gradient-to-b from-bakery-cream via-[#F8F2EA] to-bakery-cream">
      {/* Background warm bakery glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-12 -left-12 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs & Stats */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-200/60 text-bakery-espresso text-xs font-semibold uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-bakery-gold animate-pulse" />
              Artisanal Bakehouse
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-bakery-espresso font-bold leading-[1.12] tracking-tight">
              Hangat Dari Oven,<br />
              <span className="italic font-normal text-bakery-cocoa">Lembut Hingga</span> Gigitan Terakhir.
            </h1>

            {/* Subhead description */}
            <p className="text-base sm:text-lg text-bakery-cocoa/90 leading-relaxed max-w-xl font-normal">
              Menghadirkan kelezatan roti artisan autentik dengan 100% mentega murni Prancis, fermentasi lambat 24 jam dengan ragi alami, dan bebas pengawet sintetis.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2.5 bg-bakery-green hover:bg-bakery-green-dark text-white text-sm md:text-base font-semibold px-6 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>🥖</span>
                <span>Jelajahi Menu Hari Ini</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/6281226070170?text=Halo%20Sugarlicious,%20saya%20ingin%20pesan%20roti%20dan%20pastry%20fresh%20hari%20ini."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-amber-50/50 text-bakery-espresso text-sm md:text-base font-semibold px-6 py-3.5 rounded-full border border-bakery-border transition-all duration-200 shadow-sm hover:shadow"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Pesan via WhatsApp</span>
              </a>
            </div>

            {/* Quality Pillars Micro-Row */}
            <div className="pt-6 border-t border-bakery-border/80 grid grid-cols-3 gap-3 sm:gap-6">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100/60 text-bakery-gold">
                  <span className="text-xl">🧈</span>
                </div>
                <div>
                  <div className="font-bold text-bakery-espresso text-sm sm:text-base">100%</div>
                  <div className="text-[11px] sm:text-xs text-bakery-muted leading-tight">Mentega Prancis & New Zealand</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100/60 text-bakery-gold">
                  <span className="text-xl">⏳</span>
                </div>
                <div>
                  <div className="font-bold text-bakery-espresso text-sm sm:text-base">24 Jam</div>
                  <div className="text-[11px] sm:text-xs text-bakery-muted leading-tight">Fermentasi Lambat Alami</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100/60 text-bakery-gold">
                  <span className="text-xl">🌿</span>
                </div>
                <div>
                  <div className="font-bold text-bakery-espresso text-sm sm:text-base">0%</div>
                  <div className="text-[11px] sm:text-xs text-bakery-muted leading-tight">Pengawet Sintetis</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Canvas & Seal Badge */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Vintage Artisanal Seal Badge (matching top right in image.png) */}
            <div className="absolute -top-3 right-4 sm:right-8 z-20 pointer-events-none">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-amber-500/70 bg-[#FDF7EE]/95 backdrop-blur-md p-2 flex flex-col items-center justify-center text-center shadow-lg transform rotate-6 animate-float">
                <div className="text-amber-500 text-xs">👑</div>
                <span className="text-[10px] sm:text-[11px] font-bold text-bakery-espresso uppercase tracking-wider leading-tight">
                  Artisanal
                </span>
                <span className="text-[9px] font-serif text-bakery-gold font-medium">
                  Premium Bakehouse
                </span>
                <div className="text-[9px] text-amber-500 tracking-widest mt-0.5">★★★★★</div>
              </div>
            </div>

            {/* Stable Fixed Height Container for Zero CLS (Layout Shift = 0.000) */}
            <div className="w-full h-[440px] sm:h-[480px] md:h-[510px] relative rounded-3xl p-3 bg-gradient-to-b from-amber-200/25 to-amber-100/15 backdrop-blur-sm border border-amber-200/40 shadow-warm flex flex-col justify-between overflow-hidden">
              {show3D ? (
                <Suspense
                  fallback={
                    <div className="w-full h-full rounded-2xl flex flex-col items-center justify-center bg-amber-50/50">
                      <div className="w-10 h-10 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mb-3" />
                      <span className="text-xs font-semibold text-bakery-espresso">Menyiapkan Model 3D...</span>
                    </div>
                  }
                >
                  <ThreeCanvas onSwitchToPhoto={() => setShow3D(false)} />
                </Suspense>
              ) : (
                <div className="w-full h-full relative rounded-2xl overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#2A1B14]/5 to-amber-100/20 p-3 sm:p-4">
                  {/* Immediate High Priority Hero Bread Visual */}
                  <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
                    <img
                      src="/hero-sourdough.webp"
                      alt="Artisan Sourdough Boule Sugarlicious"
                      width="440"
                      height="360"
                      className="w-full h-full max-h-[340px] object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                      fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-radial from-amber-300/15 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom Controls Bar */}
                  <div className="mt-2 flex items-center justify-between gap-2 z-10 px-1">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-amber-200/70 shadow-sm text-xs font-medium text-bakery-espresso">
                      <span>🥖</span>
                      <span className="font-semibold text-[11px] sm:text-xs">Sourdough Bulat</span>
                    </div>

                    <button
                      onClick={() => setShow3D(true)}
                      className="inline-flex items-center gap-1.5 bg-[#213728] hover:bg-[#182C1F] text-amber-200 hover:text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 group"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
                      <span>Putar 3D 360°</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
