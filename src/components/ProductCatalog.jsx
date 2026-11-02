import React, { useState } from 'react';
import { Heart, Plus, ChevronLeft, ChevronRight, LayoutGrid, Gift, Check, ArrowRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';

export default function ProductCatalog({ onAddToCart, favorites, onToggleFavorite }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedAnimationId, setAddedAnimationId] = useState(null);

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category.includes(activeCategory));

  const handleAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'grid': return <LayoutGrid className="w-4 h-4" />;
      case 'bread': return <span>🍞</span>;
      case 'croissant': return <span>🥐</span>;
      case 'gift': return <Gift className="w-4 h-4" />;
      default: return <span>🥖</span>;
    }
  };

  return (
    <section id="produk" className="py-16 md:py-24 bg-bakery-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Category Filters matching image.png */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          
          {/* Left Title & Description */}
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-bakery-espresso">
                Pilihan Menu<br />Roti & Pastry Artisan
              </h2>
              <span className="text-bakery-gold text-2xl -mt-6">✨</span>
            </div>
            <p className="mt-4 text-bakery-muted text-sm sm:text-base leading-relaxed">
              Dibuat segar setiap hari dengan bahan premium dan teknik artisan untuk rasa yang lebih kaya, aromatik, dan autentik.
            </p>
            <div className="mt-5">
              <a
                href="#produk"
                onClick={() => setActiveCategory('all')}
                className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white bg-bakery-green hover:bg-bakery-green-dark px-5 py-2.5 rounded-full transition-colors shadow-sm"
              >
                <span>Lihat Semua Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Category Filter Pills & Arrows */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex flex-wrap items-center gap-2 bg-[#F3ECE4] p-1.5 rounded-full border border-bakery-border">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-bakery-green text-white shadow-sm'
                        : 'text-bakery-cocoa hover:text-bakery-espresso hover:bg-white/60'
                    }`}
                  >
                    {getCategoryIcon(cat.icon)}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button 
                onClick={() => {
                  const idx = CATEGORIES.findIndex(c => c.id === activeCategory);
                  if (idx > 0) setActiveCategory(CATEGORIES[idx - 1].id);
                }}
                disabled={activeCategory === CATEGORIES[0].id}
                aria-label="Previous Category"
                className="p-2.5 rounded-full bg-white border border-bakery-border text-bakery-espresso hover:bg-amber-50 disabled:opacity-40 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  const idx = CATEGORIES.findIndex(c => c.id === activeCategory);
                  if (idx < CATEGORIES.length - 1) setActiveCategory(CATEGORIES[idx + 1].id);
                }}
                disabled={activeCategory === CATEGORIES[CATEGORIES.length - 1].id}
                aria-label="Next Category"
                className="p-2.5 rounded-full bg-white border border-bakery-border text-bakery-espresso hover:bg-amber-50 disabled:opacity-40 transition-colors shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Product Cards Grid matching image.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            const isJustAdded = addedAnimationId === product.id;

            return (
              <div
                key={product.id}
                className="group relative bg-[#FAF6F0] rounded-2xl overflow-hidden border border-bakery-border hover:border-bakery-gold/50 shadow-sm hover:shadow-warm transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-amber-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Product Badge (e.g. Best Seller / Favorit) */}
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-[#8B5E34] text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Favorite Heart Button */}
                  <button
                    onClick={() => onToggleFavorite(product.id)}
                    aria-label={`Favorite ${product.name}`}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-bakery-espresso hover:text-red-500 transition-colors shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav ? 'fill-red-500 text-red-500' : 'text-stone-600'
                      }`}
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-bakery-espresso group-hover:text-bakery-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-bakery-muted line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="mt-5 pt-3 border-t border-bakery-border/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-bakery-muted block">Harga</span>
                      <span className="font-bold text-base text-bakery-espresso">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* Circular Add Button */}
                    <button
                      onClick={(e) => handleAdd(product, e)}
                      aria-label={`Tambah ${product.name} ke keranjang`}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white scale-110'
                          : 'bg-[#8B5E34] hover:bg-[#704622] text-white hover:shadow'
                      }`}
                      title="Tambah ke Keranjang"
                    >
                      {isJustAdded ? (
                        <Check className="w-4 h-4 animate-scaleIn" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

