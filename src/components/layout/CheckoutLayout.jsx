import { Outlet, Link, useLocation } from 'react-router-dom';

export const CheckoutLayout = () => {
  const { pathname } = useLocation();

  // Determine current active step
  const isAddress = pathname.includes('/checkout/address');
  const isPayment = pathname.includes('/checkout/payment');
  const isConfirmation = pathname.includes('/checkout/confirmation');

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-black flex flex-col font-sans">
      {/* Distraction-Free Luxury Checkout Header (NO standard Header) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex flex-col group shrink-0">
            <span className="font-sans font-bold text-base sm:text-xl tracking-wider text-black uppercase leading-tight group-hover:opacity-80 transition-opacity">
              KODE X ATTIRE
            </span>
            <span className="text-[7.5px] sm:text-[8px] tracking-[0.26em] uppercase text-neutral-600 font-medium">
              ATELIER CHECKOUT
            </span>
          </Link>

          {/* Stepper Progress Indicators: Compact on mobile, verbose on desktop */}
          <nav className="flex items-center space-x-1.5 sm:space-x-2 text-xs">
            {/* Step 1: Address */}
            <div className={`flex items-center gap-1.5 sm:gap-2 ${isAddress ? 'text-black font-bold' : isPayment || isConfirmation ? 'text-emerald-700 font-semibold' : 'text-neutral-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isAddress ? 'bg-black text-white' : isPayment || isConfirmation ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'
              }`}>
                {isPayment || isConfirmation ? '✓' : '1'}
              </span>
              <span className="uppercase tracking-wider text-[11px] hidden sm:inline">Shipping Address</span>
            </div>

            <span className="text-neutral-300 font-light px-1 sm:px-2">———</span>

            {/* Step 2: Payment */}
            <div className={`flex items-center gap-1.5 sm:gap-2 ${isPayment ? 'text-black font-bold' : isConfirmation ? 'text-emerald-700 font-semibold' : 'text-neutral-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isPayment ? 'bg-black text-white' : isConfirmation ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'
              }`}>
                {isConfirmation ? '✓' : '2'}
              </span>
              <span className="uppercase tracking-wider text-[11px] hidden sm:inline">Payment Gateway</span>
            </div>

            <span className="text-neutral-300 font-light px-1 sm:px-2">———</span>

            {/* Step 3: Confirmation */}
            <div className={`flex items-center gap-1.5 sm:gap-2 ${isConfirmation ? 'text-black font-bold' : 'text-neutral-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isConfirmation ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'
              }`}>
                3
              </span>
              <span className="uppercase tracking-wider text-[11px] hidden sm:inline">Confirmation</span>
            </div>
          </nav>

          {/* Right Placeholder to balance center stepper */}
          <div className="w-12 sm:w-24 hidden md:block" />

        </div>
      </header>

      {/* Main Checkout Viewport (No Header & No Footer) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Minimal Checkout Legal Strip (NO standard Footer) */}
      <footer className="border-t border-neutral-200 bg-white/70 py-4 text-center text-[11px] text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} KODE X ATTIRE. All rights reserved.</span>
          <div className="flex items-center gap-4 text-neutral-600">
            <span>Encrypted Payment Processing</span>
            <span>•</span>
            <span>Tamper-Proof Packaging</span>
            <span>•</span>
            <span>Atelier Guarantee</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutLayout;