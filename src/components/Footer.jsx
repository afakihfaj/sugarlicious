import React from 'react';
import { MessageCircle, MapPin, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenBlueprint }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-bakery-espresso text-amber-100/80 pt-16 pb-12 border-t border-amber-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-amber-900/40">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                Sugarlicious
                <span className="text-bakery-gold text-2xl">🌾</span>
              </span>
              <span className="text-[11px] tracking-[0.25em] uppercase text-amber-300 font-semibold mt-0.5">
                Artisanal Bakehouse & Viennoiserie
              </span>
            </div>

            <p className="text-xs sm:text-sm text-amber-200/70 leading-relaxed max-w-sm">
              Mewujudkan tradisi boulangerie Prancis klasik: 100% mentega murni Prancis, fermentasi 24 jam dengan ragi alami, dan dipanggang segar setiap subuh.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/6281226070170"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/50 hover:bg-emerald-800 text-emerald-400 flex items-center justify-center transition-colors border border-emerald-700/40"
                title="WhatsApp CS"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://maps.app.goo.gl/puxenseYFvncEoMm7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-amber-900/40 hover:bg-amber-800 text-amber-300 flex items-center justify-center transition-colors border border-amber-700/40"
                title="Lokasi Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-amber-900/40 hover:bg-amber-800 text-amber-300 flex items-center justify-center transition-colors border border-amber-700/40"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Eksplorasi
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-amber-300 transition-colors">Beranda</a></li>
              <li><a href="#produk" className="hover:text-amber-300 transition-colors">Galeri Menu Artisan</a></li>
              <li><a href="#rahasia-rasa" className="hover:text-amber-300 transition-colors">Rahasia Rasa</a></li>
              <li><a href="#ulasan" className="hover:text-amber-300 transition-colors">Ulasan Pelanggan</a></li>
              <li><a href="#lokasi" className="hover:text-amber-300 transition-colors">Lokasi Bakehouse</a></li>
              <li>
                <button onClick={onOpenBlueprint} className="hover:text-amber-300 transition-colors text-left">
                  Dokumentasi Blueprint
                </button>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Koleksi Roti
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#produk" className="hover:text-amber-300 transition-colors">Classic Croissant</a></li>
              <li><a href="#produk" className="hover:text-amber-300 transition-colors">Shokupan Milk Loaf</a></li>
              <li><a href="#produk" className="hover:text-amber-300 transition-colors">Pain au Chocolat</a></li>
              <li><a href="#produk" className="hover:text-amber-300 transition-colors">Cinnamon Rolls</a></li>
              <li><a href="#produk" className="hover:text-amber-300 transition-colors">Artisan Sourdough</a></li>
              <li><a href="#produk" className="hover:text-amber-300 transition-colors">Gift Box & Hampers</a></li>
            </ul>
          </div>

          {/* Bakehouse Hours & Address */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Jam & Lokasi
            </h3>
            <div className="space-y-2 text-xs text-amber-200/70">
              <p className="text-white font-medium">Buka Setiap Hari:</p>
              <p>07.00 - 21.00 WIB</p>
              <p className="text-amber-400 text-[11px] font-semibold mt-1">
                🔥 Fresh Batch: 04.00 Subuh
              </p>
              <p className="pt-2 text-[11px] leading-tight">
                JL. Sucipto GG. Kharisma LK. Parse RT 003 RW 002
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-300/60">
          <p>© {new Date().getFullYear()} Sugarlicious Artisanal Bakehouse. Hak cipta dilindungi.</p>
          
          <button
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}

