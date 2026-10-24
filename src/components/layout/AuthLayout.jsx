import { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

export const AuthLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Scroll to top on change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  const isSignUp = pathname.includes('/signup') || pathname.includes('/register');

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-brand-black flex flex-col font-sans selection:bg-brand-gold selection:text-black relative overflow-x-hidden">
      
      {/* Minimalist Distraction-Free Luxury Top Bar (NO standard Header) */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-neutral-200/80 sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Left: Back to store / Previous page */}
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate('/');
              }
            }}
            className="group flex items-center gap-1.5 sm:gap-2 text-xs uppercase tracking-wider text-neutral-600 hover:text-black font-semibold transition-colors shrink-0"
          >
            <span className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
              <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span className="hidden sm:inline tracking-widest text-[11px]">Return to Store</span>
            <span className="sm:hidden text-[10px]">Back</span>
          </button>

          {/* Center: Brand Identity */}
          <Link to="/" className="flex flex-col items-center text-center group px-1">
            <span className="font-sans font-bold text-base sm:text-2xl tracking-wider text-black uppercase leading-tight group-hover:opacity-80 transition-opacity">
              KODE X ATTIRE
            </span>
            <span className="text-[7.5px] sm:text-[9px] tracking-[0.26em] uppercase text-neutral-500 font-medium font-sans">
              STYLE THAT DEFINES YOU
            </span>
          </Link>

          {/* Right: Quick Tab Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              to={isSignUp ? '/login' : '/signup'}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neutral-300 hover:border-black text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-all shadow-xs"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Link>
          </div>

        </div>
      </header>

      {/* Main Content (Login or Sign Up form) */}
      <main className="flex-grow flex flex-col justify-center">
        <Outlet />
      </main>

      {/* Minimalist Micro-Footer (NO standard heavy multi-column footer) */}
      <footer className="w-full border-t border-neutral-200/80 bg-white/60 py-4 sm:py-6 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p className="font-light">
            © {new Date().getFullYear()} KODE X ATTIRE Atelier. All rights reserved.
          </p>

          <div className="flex items-center space-x-5 text-neutral-500 font-light">
            <Link to="/privacy-policy" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="hover:text-black transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-black transition-colors">
              Client Concierge
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AuthLayout;
