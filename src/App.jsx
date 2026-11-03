import React, { useState, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { PRODUCTS } from './data/products';
import { CheckCircle, ArrowRight } from 'lucide-react';

// Below-the-fold component lazy loading (Code-Splitting for blazing fast initial paint)
const ProductCatalog = lazy(() => import('./components/ProductCatalog'));
const QualityPillars = lazy(() => import('./components/QualityPillars'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const LocationSection = lazy(() => import('./components/LocationSection'));
const Footer = lazy(() => import('./components/Footer'));

// Off-screen modals lazy loaded only when triggered by user
const CartDrawer = lazy(() => import('./components/CartDrawer'));
const CheckoutModal = lazy(() => import('./components/CheckoutModal'));
const BlueprintModal = lazy(() => import('./components/BlueprintModal'));

// Agentation visual feedback only loaded in development mode
const DevAgentation = import.meta.env.DEV
  ? lazy(() => import('agentation').then((m) => ({ default: m.Agentation })))
  : () => null;

// Lightweight skeleton to prevent layout shift during chunk load
const SectionSkeleton = ({ height = 'min-h-[400px]' }) => (
  <div className={`w-full ${height} flex flex-col items-center justify-center bg-bakery-cream/50 py-16`}>
    <div className="w-8 h-8 rounded-full border-2 border-amber-600/30 border-t-amber-700 animate-spin mb-2" />
    <span className="text-xs text-bakery-muted font-medium">Memuat Konten...</span>
  </div>
);

export default function App() {
  // Pre-populate items matching the badge '3' in image.png
  const [cart, setCart] = useState([
    {
      ...PRODUCTS[0], // Classic Croissant
      quantity: 2,
    },
    {
      ...PRODUCTS[1], // Shokupan Loaf
      quantity: 1,
      sliceNote: '1.8cm',
    },
  ]);

  const [favorites, setFavorites] = useState(['classic-croissant', 'pain-au-chocolat']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);

  const showToast = (message, product) => {
    setToast({ message, product });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          sliceNote: product.isLoaf ? '1.8cm' : undefined,
        },
      ];
    });

    showToast(`"${product.name}" ditambahkan ke keranjang!`, product);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleUpdateSliceNote = (productId, sliceNote) => {
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, sliceNote } : item))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bakery-cream text-bakery-espresso selection:bg-bakery-gold/25 selection:text-bakery-espresso">
      
      {/* Navbar with announcement bar (Loaded immediately) */}
      <Header
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBlueprint={() => setIsBlueprintOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section (Above the fold, loaded immediately) */}
        <Hero onExploreMenu={() => scrollToSection('produk')} />

        {/* Below-the-fold sections with Lazy Loading */}
        <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
          <ProductCatalog
            onAddToCart={handleAddToCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="min-h-[400px]" />}>
          <QualityPillars onExploreProcess={() => scrollToSection('lokasi')} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="min-h-[380px]" />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="min-h-[420px]" />}>
          <LocationSection />
        </Suspense>
      </main>

      {/* Footer (Lazy Loaded) */}
      <Suspense fallback={null}>
        <Footer onOpenBlueprint={() => setIsBlueprintOpen(true)} />
      </Suspense>

      {/* Modals & Slide-over Drawer (Lazy Loaded on Demand) */}
      <Suspense fallback={null}>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onUpdateSliceNote={handleUpdateSliceNote}
            onProceedToCheckout={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
          />
        )}

        {isCheckoutOpen && (
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            cartItems={cart}
            onClearCart={handleClearCart}
          />
        )}

        {isBlueprintOpen && (
          <BlueprintModal
            isOpen={isBlueprintOpen}
            onClose={() => setIsBlueprintOpen(false)}
          />
        )}

        {/* Development only Agentation Toolbar */}
        {import.meta.env.DEV && <DevAgentation />}
      </Suspense>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-3 bg-bakery-espresso text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-900/40">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-semibold">{toast.message}</span>
            <button
              onClick={() => {
                setToast(null);
                setIsCartOpen(true);
              }}
              className="ml-2 text-xs font-bold text-amber-300 hover:text-white underline underline-offset-2 flex items-center gap-1"
            >
              <span>Lihat</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
