import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, FileText, ChevronDown } from 'lucide-react';

export default function Header({ cartCount, onOpenCart, onOpenBlueprint }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ['hero', 'produk', 'rahasia-rasa', 'ulasan', 'lokasi'];
      const scrollPos = window.scrollY + 220;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#hero', id: 'hero' },
    { 
      name: 'Galeri Produk', 
      href: '#produk',
      id: 'produk',
      hasDropdown: true 
    },
    { name: 'Rahasia Rasa', href: '#rahasia-rasa', id: 'rahasia-rasa' },
    { name: 'Ulasan', href: '#ulasan', id: 'ulasan' },
    { name: 'Lokasi', href: '#lokasi', id: 'lokasi' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      
      {/* 1. Artisanal Top Announcement Bar matching image.png */}
      <div className="bg-bakery-green bg-gradient-to-r from-[#17271C] via-[#233C29] to-[#17271C] text-[#F5ECE1] text-[11px] sm:text-xs py-2.5 px-4 sm:px-6 lg:px-8 border-b border-[#2d4936] tracking-wide font-medium shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Col 1 (Left): Fresh Batch with Pulsing Live Dot */}
          <div className="flex-1 flex items-center justify-start gap-2 min-w-0">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <svg className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 0 0-12 0c0 7 4 11 6 13 2-2 6-6 6-13Z" />
              <circle cx="12" cy="8" r="2" />
            </svg>
            <span className="truncate">
              Fresh Batch Setiap Hari <span className="opacity-40">·</span> <strong className="text-amber-300 font-semibold">Mulai 04.00 Subuh</strong>
            </span>
          </div>

          {/* Divider */}
          <span className="hidden md:block w-px h-3.5 bg-amber-200/25 flex-shrink-0" />

          {/* Col 2 (Center): Instant Delivery */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-2 text-center">
            <svg className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
            </svg>
            <span>Pengiriman Instan Seluruh Area</span>
          </div>

          {/* Divider */}
          <span className="hidden lg:block w-px h-3.5 bg-amber-200/25 flex-shrink-0" />

          {/* Col 3 (Right): Free Ongkir Hampers */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-2 text-right">
            <svg className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
            </svg>
            <span>
              Free Ongkir untuk <strong className="text-amber-200 font-semibold underline underline-offset-2 decoration-amber-400/50">Tasting Box & Hampers</strong>
            </span>
          </div>

        </div>
      </div>

      {/* 2. Main Sticky Navbar matching image.png */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DEC9] py-3.5' 
          : 'bg-[#FAF7F2]/90 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo brand Sugarlicious matching image.png */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-bakery-espresso flex items-center gap-1.5 leading-none">
                Sugarlicious
                <span className="text-amber-700 text-base md:text-lg inline-block transition-transform duration-300 group-hover:rotate-12">🌾</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-bakery-muted font-semibold mt-1">
                Artisanal Bakehouse
              </span>
            </div>
          </a>

          {/* Center Navigation Links with Active Underline Indicator */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-bakery-espresso">
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;

              return (
                <div key={link.name} className="relative group">
                  <a
                    href={link.href}
                    className={`relative flex items-center gap-1 py-1 transition-colors duration-200 ${
                      isActive ? 'text-bakery-espresso font-semibold' : 'text-bakery-cocoa hover:text-bakery-gold'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                    )}

                    {/* Active Underline matching image.png */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-bakery-espresso rounded-full transition-all" />
                    )}
                  </a>

                  {/* Submenu for Galeri Produk */}
                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white/95 backdrop-blur-md rounded-2xl shadow-warm border border-bakery-border p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                      <a href="#produk" className="block px-3 py-2 text-xs font-semibold rounded-xl hover:bg-bakery-beige transition-colors text-bakery-espresso">
                        ✨ Semua Menu Pilihan
                      </a>
                      <a href="#produk" className="block px-3 py-2 text-xs text-bakery-muted hover:text-bakery-espresso rounded-xl hover:bg-bakery-beige transition-colors">
                        🍞 Roti Tawar & Sourdough
                      </a>
                      <a href="#produk" className="block px-3 py-2 text-xs text-bakery-muted hover:text-bakery-espresso rounded-xl hover:bg-bakery-beige transition-colors">
                        🥐 Croissant & Viennoiserie
                      </a>
                      <a href="#produk" className="block px-3 py-2 text-xs text-bakery-muted hover:text-bakery-espresso rounded-xl hover:bg-bakery-beige transition-colors">
                        🎁 Hampers & Tasting Box
                      </a>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Blueprint MD button */}
            <button
              onClick={onOpenBlueprint}
              className="flex items-center gap-1.5 text-xs font-medium text-bakery-muted hover:text-bakery-espresso py-1 px-2.5 rounded-full hover:bg-amber-100/60 transition-all"
              title="Lihat Dokumen Blueprint PRD"
            >
              <FileText className="w-3.5 h-3.5 text-bakery-gold" />
              <span>Blueprint MD</span>
            </button>
          </div>

          {/* Right Action Buttons with Vertical Divider matching image.png */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Direct Chat Button */}
            <a
              href="https://wa.me/6281226070170?text=Halo%20Sugarlicious,%20saya%20ingin%20tanya%20menu%20dan%20stok%20fresh%20hari%20ini."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#213728] hover:bg-[#182a1e] text-white text-xs md:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Chat WA</span>
            </a>

            {/* Subtle Divider matching image.png */}
            <span className="hidden sm:block w-px h-6 bg-bakery-border mx-0.5" />

            {/* Cart Drawer Trigger with Badge */}
            <button
              onClick={onOpenCart}
              aria-label="Buka Keranjang Belanja"
              className="relative p-2 text-bakery-espresso hover:text-bakery-gold rounded-full transition-all active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 text-bakery-espresso" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8E532C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden p-2 text-bakery-espresso rounded-xl hover:bg-amber-100/50 ml-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-bakery-border bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-bakery-espresso rounded-xl hover:bg-amber-100/60 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBlueprint();
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-bakery-muted rounded-xl hover:bg-amber-100/60 text-left"
              >
                <FileText className="w-4 h-4 text-bakery-gold" />
                <span>Blueprint MD</span>
              </button>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/6281226070170?text=Halo%20Sugarlicious,%20saya%20ingin%20tanya%20menu%20dan%20stok%20fresh%20hari%20ini."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#213728] text-white text-sm font-semibold py-2.5 rounded-full shadow"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Chat WhatsApp Admin</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
