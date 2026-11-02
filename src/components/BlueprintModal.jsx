import React from 'react';
import { X, FileText, CheckCircle, ExternalLink, ShieldCheck, Terminal } from 'lucide-react';

export default function BlueprintModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-bakery-border overflow-hidden flex flex-col max-h-[85vh]">
          
          {/* Header */}
          <div className="px-6 py-5 bg-bakery-cream border-b border-bakery-border flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-bakery-gold" />
              <div>
                <h3 className="font-serif text-lg font-bold text-bakery-espresso">
                  Blueprint & PRD Documentation Viewer
                </h3>
                <span className="text-[11px] text-bakery-muted">
                  Sugarlicious Artisanal Bakehouse Web Platform Specs
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-bakery-muted hover:text-bakery-espresso hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Scrollable */}
          <div className="p-6 overflow-y-auto space-y-6 text-left text-sm text-bakery-cocoa leading-relaxed font-sans">
            
            {/* Overview */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/60">
              <h4 className="font-bold text-bakery-espresso text-base flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                1. Project Architecture Overview
              </h4>
              <p className="mt-1.5 text-xs text-bakery-cocoa">
                Single Page Application (SPA) berbasis <strong>React + Vite + Tailwind CSS</strong> dengan <strong>Three.js 3D WebGL Canvas</strong>, katalog dinamis, custom slice requests, keranjang interaktif, dan generator pesanan WhatsApp terenkripsi ke nomor resmi <code>+6281226070170</code>.
              </p>
            </div>

            {/* Architecture Table */}
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-bakery-muted mb-2">
                Teknologi & Modul Terpasang
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-bakery-espresso">🎨 Design System:</div>
                  <div className="text-stone-600 mt-0.5">Tailwind CSS + Google Fonts (Playfair Display & Plus Jakarta Sans) + Anti-UI Slop Tokens.</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-bakery-espresso">🥐 3D WebGL Engine:</div>
                  <div className="text-stone-600 mt-0.5">Three.js custom procedural croissant mesh, golden aroma crumb particle system, 360° inertia orbit.</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-bakery-espresso">🛒 Cart & Checkout:</div>
                  <div className="text-stone-600 mt-0.5">Slide-over drawer, real-time subtotal, loaf slicing customizer, free shipping progress bar, WhatsApp URL encode.</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-bakery-espresso">🚀 Deployment:</div>
                  <div className="text-stone-600 mt-0.5">Netlify ready dengan <code>netlify.toml</code> dan <code>_redirects</code> SPA rewrite rules.</div>
                </div>
              </div>
            </div>

            {/* Official Bakehouse Info */}
            <div className="border-t border-bakery-border pt-4">
              <h5 className="font-bold text-xs uppercase tracking-wider text-bakery-muted mb-2">
                Data Outlet Resmi
              </h5>
              <ul className="list-disc list-inside text-xs space-y-1 text-stone-700">
                <li><strong>Alamat & Maps:</strong> <a href="https://maps.app.goo.gl/puxenseYFvncEoMm7" target="_blank" rel="noopener noreferrer" className="text-amber-800 underline hover:text-amber-950 font-medium">JL. Sucipto GG. Kharisma LK. Parse RT 003 RW 002 (Buka di Google Maps)</a></li>
                <li><strong>Jam Buka:</strong> 07.00 - 21.00 WIB (Baking mulai 04.00 Subuh)</li>
                <li><strong>WhatsApp CS:</strong> +62 812-2607-0170</li>
                <li><strong>Komitmen:</strong> 100% French & NZ Butter, Fermentasi 24 Jam Levain, 0% Pengawet</li>
              </ul>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-bakery-cream border-t border-bakery-border flex justify-end flex-shrink-0">
            <button
              onClick={onClose}
              className="bg-bakery-green hover:bg-bakery-green-dark text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Tutup Blueprint
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

