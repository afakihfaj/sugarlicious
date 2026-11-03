import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { SLICE_OPTIONS } from '../data/products';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateSliceNote,
  onProceedToCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 150000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-bakery-border flex items-center justify-between bg-bakery-cream">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-bakery-gold" />
              <h2 className="font-serif text-xl font-bold text-bakery-espresso">
                Keranjang Pesanan
              </h2>
              <span className="text-xs bg-bakery-beige px-2 py-0.5 rounded-full font-semibold text-bakery-cocoa">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} item
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Tutup Keranjang"
              className="p-2 rounded-full text-bakery-muted hover:text-bakery-espresso hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-amber-50/80 border-b border-amber-200/50 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <span>🎉</span>
                <span>Selamat! Pesanan Anda memenuhi syarat <strong>Free Ongkir</strong>!</span>
              </div>
            ) : (
              <div>
                <p className="text-amber-900 font-medium">
                  Tambah <strong>Rp {(freeShippingThreshold - subtotal).toLocaleString('id-ID')}</strong> lagi untuk <strong>Free Ongkir</strong>!
                </p>
                <div className="w-full bg-amber-200/60 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div
                    className="bg-bakery-gold h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List / Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center text-3xl">
                  🥖
                </div>
                <h3 className="font-serif text-lg font-bold text-bakery-espresso">
                  Keranjang Anda Masih Kosong
                </h3>
                <p className="text-xs text-bakery-muted max-w-xs leading-relaxed">
                  Pilih croissant renyah atau roti artisan favorit Anda sekarang selagi fresh dari oven.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 inline-flex items-center gap-2 bg-bakery-green text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow hover:bg-bakery-green-dark transition-all"
                >
                  <span>Mulai Belanja</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-bakery-cream/50 rounded-2xl border border-bakery-border flex flex-col gap-3 transition-all hover:bg-bakery-cream"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      width="64"
                      height="64"
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 rounded-xl object-cover border border-bakery-border flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-bakery-espresso truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Hapus ${item.name}`}
                          className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-bakery-gold block mt-0.5">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-white border border-bakery-border flex items-center justify-center text-xs font-bold hover:bg-amber-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-bakery-espresso px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-white border border-bakery-border flex items-center justify-center text-xs font-bold hover:bg-amber-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Loaf Slicing Note */}
                  {item.isLoaf && (
                    <div className="pt-2 border-t border-bakery-border/60">
                      <label className="block text-[11px] font-semibold text-bakery-cocoa mb-1">
                        ✂️ Request Potongan Roti:
                      </label>
                      <select
                        value={item.sliceNote || '1.8cm'}
                        onChange={(e) => onUpdateSliceNote(item.id, e.target.value)}
                        className="w-full text-xs bg-white border border-bakery-border rounded-xl px-2.5 py-1.5 text-bakery-espresso focus:outline-none focus:ring-1 focus:ring-bakery-gold"
                      >
                        {SLICE_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Subtotal & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-bakery-border bg-bakery-cream space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-bakery-muted">Subtotal Produk</span>
                <span className="font-bold text-lg text-bakery-espresso">
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 bg-bakery-green hover:bg-bakery-green-dark text-white font-semibold py-3.5 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99]"
              >
                <span>Lanjut ke Detail Pemesanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

