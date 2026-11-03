import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function QualityPillars({ onExploreProcess }) {
  const pillars = [
    {
      icon: '🧈',
      title: 'Bahan Premium',
      description: 'Mentega murni Prancis & New Zealand dengan kadar lemak 84% Grade A untuk aroma kaya autentik.',
    },
    {
      icon: '⏳',
      title: 'Fermentasi 24 Jam',
      description: 'Fermentasi lambat ragi liar (wild levain) mengembangkan kompleksitas rasa alami dan ramah pencernaan.',
    },
    {
      icon: '🌿',
      title: 'Bebas Pengawet',
      description: '0% pelembut sintetis & bahan kimiawi. Roti murni berkualitas yang aman dinikmati seluruh keluarga.',
    },
  ];

  return (
    <section id="rahasia-rasa" className="py-20 bg-bakery-green-bg text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Artisan Baker Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-800/40 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=75&fm=webp"
                alt="Proses pembuatan roti artisan Sugarlicious"
                width="600"
                height="400"
                loading="lazy"
                decoding="async"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bakery-green-bg/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-bakery-gold/20 flex items-center justify-center text-bakery-gold">
                    🥖
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Daily Baking at 04.00 AM</div>
                    <p className="text-xs text-amber-100">Batch fresh baru keluar dari panggangan setiap subuh.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle & Right Columns */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            
            {/* Story Text */}
            <div className="space-y-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-300">
                Rahasia Rasa Kami
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Proses Alami,<br />
                Hasil <span className="italic font-normal text-amber-300">Istimewa.</span>
              </h2>
              <p className="text-amber-100 text-sm sm:text-base leading-relaxed max-w-xl">
                Kami percaya, roti yang enak butuh waktu. Karena itu, kami menggunakan bahan terbaik, fermentasi alami, dan teknik artisan untuk rasa dan tekstur yang lebih kaya dan autentik.
              </p>
              
              <div className="pt-2">
                <a
                  href="#lokasi"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-300/60 text-amber-100 hover:text-white hover:border-amber-300 text-xs sm:text-sm font-semibold transition-colors duration-200"
                >
                  <span>Lihat Proses Kami</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quality Pillars List */}
            <div className="space-y-6 pt-6 border-t border-emerald-800/40">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-900/60 border border-emerald-700/50 flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base sm:text-lg">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100 mt-0.5 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

