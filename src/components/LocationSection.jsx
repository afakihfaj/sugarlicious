import React from 'react';
import { MapPin, Clock, Navigation, CheckCircle2, Phone, Sparkles } from 'lucide-react';

export default function LocationSection() {
  const facilities = [
    'Fresh Daily Baking (04.00 Subuh)',
    'Area Pick-up Nyaman',
    'Parkir Mobil & Motor',
    'Free High-Speed WiFi',
    'QRIS & Cashless Ready',
    'Dine-in Mini Bar'
  ];

  return (
    <section id="lokasi" className="py-16 md:py-24 bg-[#F5ECE1]/60 border-t border-bakery-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-bakery-gold bg-amber-100/80 px-3.5 py-1.5 rounded-full">
            Kunjungi Bakehouse Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-bakery-espresso mt-3">
            Aroma Roti Hangat Menanti Anda
          </h2>
          <p className="mt-3 text-sm sm:text-base text-bakery-muted">
            Datang langsung untuk mencium aroma mentega Prancis dan memilih pastry favorit Anda langsung dari display kaca kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Outlet Details Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-warm flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-100/70 text-bakery-gold flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-bakery-espresso">Alamat Resmi Bakehouse</h3>
                  <p className="text-sm text-bakery-cocoa mt-1 leading-relaxed">
                    JL. Sucipto GG. Kharisma LK. Parse RT 003 RW 002
                  </p>
                  <span className="inline-block text-xs font-medium text-bakery-muted mt-0.5">
                    Akses mudah dijangkau kendaraan roda dua & empat.
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-100/70 text-bakery-gold flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-bakery-espresso">Jam Operasional</h3>
                  <p className="text-sm text-bakery-cocoa mt-1">
                    Buka Setiap Hari: <span className="font-semibold text-bakery-espresso">07.00 - 21.00 WIB</span>
                  </p>
                  <p className="text-xs text-amber-700 font-medium mt-0.5">
                    🔥 Batch Pertama Keluar Oven: 04.00 WIB (Subuh)
                  </p>
                </div>
              </div>

              {/* Facilities */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-bakery-muted mb-3">
                  Fasilitas Outlet
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {facilities.map((fac, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-bakery-cocoa font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Direction Button */}
            <div className="pt-6 mt-6 border-t border-bakery-border flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.app.goo.gl/puxenseYFvncEoMm7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-bakery-green hover:bg-bakery-green-dark text-white text-sm font-semibold py-3 px-4 rounded-full transition-all shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Buka Google Maps</span>
              </a>

              <a
                href="https://wa.me/6281226070170?text=Halo%20Sugarlicious,%20saya%20sedang%20menuju%20ke%20outlet,%20apakah%20stok%20masih%20lengkap?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-bakery-espresso text-sm font-semibold py-3 px-4 rounded-full border border-bakery-border transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Hubungi Outlet</span>
              </a>
            </div>

          </div>

          {/* Interactive Google Maps Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-bakery-border shadow-warm min-h-[350px] relative bg-stone-200">
            <iframe
              title="Sugarlicious Artisanal Bakehouse Location"
              src="https://maps.google.com/maps?q=-7.6996365,114.0101403&hl=id&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            {/* Overlay tag */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-bakery-border text-xs font-semibold text-bakery-espresso shadow-md">
              📍 Sugarlicious Bakehouse
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

