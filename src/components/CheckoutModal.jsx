import React, { useState } from 'react';
import { X, Send, Sparkles, AlertCircle, ShoppingBag, Truck, Store } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SLICE_OPTIONS } from '../data/products';

export default function CheckoutModal({ isOpen, onClose, cartItems, onClearCart }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    method: 'delivery', // 'delivery' or 'pickup'
    address: '',
    deliveryTime: '08:00 - 10:00 WIB (Fresh Morning)',
    notes: '',
  });

  const [error, setError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getSliceLabel = (sliceId) => {
    const found = SLICE_OPTIONS.find((o) => o.id === sliceId);
    return found ? found.label.split('(')[0].trim() : sliceId;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('Silakan isi Nama Pemesan');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Silakan isi Nomor WhatsApp Aktif');
      return;
    }
    if (formData.method === 'delivery' && !formData.address.trim()) {
      setError('Silakan isi Alamat Pengiriman Lengkap');
      return;
    }

    setError('');

    // Trigger delightful celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C88A3B', '#213B29', '#F5D77F'],
      });
    } catch (err) {
      // ignore
    }

    // Format WhatsApp Message as per PRD 5.6
    const orderItemsText = cartItems
      .map((item) => {
        const sliceInfo = item.isLoaf && item.sliceNote ? ` [Potong: ${getSliceLabel(item.sliceNote)}]` : '';
        const itemTotal = (item.price * item.quantity).toLocaleString('id-ID');
        return `• ${item.quantity}x ${item.name}${sliceInfo} - Rp ${itemTotal}`;
      })
      .join('\n');

    const methodLabel = formData.method === 'delivery' ? '🛵 Kurir Instan (Diantar)' : '🏪 Ambil Sendiri di Bakehouse';

    const message = `*PESANAN BARU SUGARLICIOUS BAKEHOUSE* 🥐\n` +
      `----------------------------------------\n` +
      `*Data Pemesan:*\n` +
      `Nama: ${formData.name}\n` +
      `No. WhatsApp: ${formData.phone}\n` +
      `Metode: ${methodLabel}\n` +
      (formData.method === 'delivery' ? `Alamat Kirim: ${formData.address}\n` : '') +
      `Estimasi Waktu: ${formData.deliveryTime}\n` +
      (formData.notes ? `Catatan Tambahan: ${formData.notes}\n` : '') +
      `\n*Rincian Menu:*\n` +
      `${orderItemsText}\n` +
      `----------------------------------------\n` +
      `*Total Subtotal: Rp ${subtotal.toLocaleString('id-ID')}*\n\n` +
      `Halo Admin Sugarlicious, mohon bantu verifikasi pesanan dan konfirmasi nomor rekening/QRIS untuk pembayaran. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/6281226070170?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(waUrl, '_blank');

    // Close and clear cart after short delay
    setTimeout(() => {
      onClearCart();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-bakery-border overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-5 bg-bakery-cream border-b border-bakery-border flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-bakery-gold">
                Langkah Terakhir
              </span>
              <h3 className="font-serif text-xl font-bold text-bakery-espresso">
                Detail Pemesanan WhatsApp
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-bakery-muted hover:text-bakery-espresso hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-bakery-espresso mb-1">
                Nama Lengkap Pemesan *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="cth. Kak Nadia Putri"
                className="w-full text-sm bg-bakery-cream/40 border border-bakery-border rounded-xl px-3.5 py-2.5 text-bakery-espresso focus:outline-none focus:ring-2 focus:ring-bakery-gold/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-bakery-espresso mb-1">
                Nomor WhatsApp Aktif *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="cth. 081234567890"
                className="w-full text-sm bg-bakery-cream/40 border border-bakery-border rounded-xl px-3.5 py-2.5 text-bakery-espresso focus:outline-none focus:ring-2 focus:ring-bakery-gold/40"
              />
            </div>

            {/* Delivery Method Radio */}
            <div>
              <label className="block text-xs font-bold text-bakery-espresso mb-1.5">
                Metode Pengambilan *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, method: 'delivery' })}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                    formData.method === 'delivery'
                      ? 'border-bakery-green bg-emerald-50/50 text-bakery-green ring-1 ring-bakery-green'
                      : 'border-bakery-border bg-white text-bakery-cocoa hover:bg-amber-50/40'
                  }`}
                >
                  <Truck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Kurir Instan</div>
                    <div className="text-[10px] text-stone-500">Kirim ke Alamat</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, method: 'pickup' })}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                    formData.method === 'pickup'
                      ? 'border-bakery-green bg-emerald-50/50 text-bakery-green ring-1 ring-bakery-green'
                      : 'border-bakery-border bg-white text-bakery-cocoa hover:bg-amber-50/40'
                  }`}
                >
                  <Store className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Ambil di Outlet</div>
                    <div className="text-[10px] text-stone-500">Pick-up Sendiri</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Conditional Delivery Address */}
            {formData.method === 'delivery' && (
              <div>
                <label className="block text-xs font-bold text-bakery-espresso mb-1">
                  Alamat Pengiriman Lengkap *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Nama jalan, nomor rumah, patokan, RT/RW, kelurahan..."
                  className="w-full text-sm bg-bakery-cream/40 border border-bakery-border rounded-xl px-3.5 py-2 text-bakery-espresso focus:outline-none focus:ring-2 focus:ring-bakery-gold/40"
                />
              </div>
            )}

            {/* Time Slot */}
            <div>
              <label className="block text-xs font-bold text-bakery-espresso mb-1">
                Estimasi Waktu Pengantaran / Pengambilan
              </label>
              <select
                value={formData.deliveryTime}
                onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                className="w-full text-xs sm:text-sm bg-bakery-cream/40 border border-bakery-border rounded-xl px-3.5 py-2.5 text-bakery-espresso focus:outline-none focus:ring-2 focus:ring-bakery-gold/40"
              >
                <option value="08:00 - 10:00 WIB (Fresh Morning)">08:00 - 10:00 WIB (Fresh Morning)</option>
                <option value="11:00 - 13:00 WIB (Lunch Break)">11:00 - 13:00 WIB (Lunch Break)</option>
                <option value="14:00 - 17:00 WIB (Afternoon Tea)">14:00 - 17:00 WIB (Afternoon Tea)</option>
                <option value="18:00 - 20:30 WIB (Evening Fresh)">18:00 - 20:30 WIB (Evening Fresh)</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-bold text-bakery-espresso mb-1">
                Catatan Tambahan (Opsional)
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="cth. Titip di pos satpam / minta paperbag ekstra..."
                className="w-full text-sm bg-bakery-cream/40 border border-bakery-border rounded-xl px-3.5 py-2 text-bakery-espresso focus:outline-none focus:ring-2 focus:ring-bakery-gold/40"
              />
            </div>

            {/* Order Summary Preview */}
            <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/60 text-xs">
              <div className="flex justify-between font-bold text-bakery-espresso">
                <span>Total Belanja ({cartItems.length} menu)</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <p className="text-[11px] text-amber-900 mt-1">
                Formulir ini akan langsung membuka chat WhatsApp resmi Sugarlicious dengan format pesanan yang siap diverifikasi admin.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 bg-bakery-green hover:bg-bakery-green-dark text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-md hover:shadow-lg active:scale-[0.99] mt-2"
            >
              <Send className="w-4 h-4 text-emerald-300" />
              <span>Kirim Pesanan ke WhatsApp Toko</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

