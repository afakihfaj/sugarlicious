import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

const HERO_BREADS = [
  {
    id: 'sourdough',
    name: 'Artisan Country Sourdough',
    label: '🥖 Sourdough Bulat',
    desc: 'Fermentasi lambat 24 jam dengan wild levain kultur alami.',
    badge: 'Wild Levain 24 Jam',
    image: '/hero-sourdough.webp',
  },
  {
    id: 'croissant',
    name: 'Classic Butter Croissant',
    label: '🥐 Classic Croissant',
    desc: 'Laminasi sarang lebah renyah dengan 100% mentega murni Prancis.',
    badge: '★ Best Seller',
    image: '/images/products/classic-croissant.webp',
  },
  {
    id: 'shokupan',
    name: 'Shokupan Milk Loaf',
    label: '🍞 Shokupan Loaf',
    desc: 'Metode Yudane khas Jepang, sangat empuk, lembut, dan harum susu.',
    badge: 'Favorit Sarapan',
    image: '/images/products/shokupan-loaf.webp',
  },
];

export default function Hero({ onExploreMenu }) {
  const [selectedBread, setSelectedBread] = useState(HERO_BREADS[0]);

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

          {/* Right Column: Artisan Bread Showcase & Seal Badge */}
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

            {/* Stable Fixed Height Card for Zero CLS (Layout Shift = 0.000) */}
            <div className="w-full h-[440px] sm:h-[480px] md:h-[510px] relative rounded-3xl p-3 bg-gradient-to-b from-amber-200/25 to-amber-100/15 backdrop-blur-sm border border-amber-200/40 shadow-warm flex flex-col justify-between overflow-hidden">
              <div className="w-full h-full relative rounded-2xl overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#2A1B14]/5 to-amber-100/20 p-3 sm:p-4">
                
                {/* Top Badge: Fresh Batch Subuh */}
                <div className="flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-amber-200/80 text-[11px] font-bold text-bakery-espresso shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{selectedBread.badge}</span>
                  </span>
                  <span className="text-[11px] text-bakery-muted font-medium">
                    Batch 04.00 Subuh
                  </span>
                </div>

                {/* Bread Visual (Instant Fast Load, Eager with High Fetch Priority) */}
                <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden my-2">
                  <img
                    key={selectedBread.id}
                    src={selectedBread.image}
                    alt={selectedBread.name}
                    width="440"
                    height="340"
                    className="w-full h-full max-h-[300px] object-contain drop-shadow-2xl transition-all duration-500 hover:scale-105"
                    fetchpriority="high"
                  />
                  <div className="absolute inset-0 bg-radial from-amber-300/15 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bread Caption & Interactive Switcher Pills */}
                <div className="space-y-2 z-10">
                  <div className="text-center px-2">
                    <h3 className="font-serif text-lg font-bold text-bakery-espresso">
                      {selectedBread.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-bakery-muted line-clamp-1">
                      {selectedBread.desc}
                    </p>
                  </div>

                  {/* Switcher Pills */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                    {HERO_BREADS.map((bread) => {
                      const isActive = selectedBread.id === bread.id;
                      return (
                        <button
                          key={bread.id}
                          onClick={() => setSelectedBread(bread)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1 shadow-sm active:scale-95 ${
                            isActive
                              ? 'bg-[#213728] text-white ring-2 ring-amber-400/60 shadow'
                              : 'bg-white/90 text-bakery-espresso hover:bg-amber-100/70 border border-bakery-border'
                          }`}
                        >
                          <span>{bread.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
