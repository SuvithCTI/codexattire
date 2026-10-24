import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import useCart from '../../hooks/useCart';

export const MainLayout = () => {
  const { pathname } = useLocation();
  const { notification, dismissNotification } = useCart();

  // Scroll to top smoothly on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-black relative">
      {/* Toast Notification Banner - positioned comfortably above bottom nav on mobile */}
      {notification && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-full bg-brand-black text-brand-cream p-4 rounded-xl shadow-2xl border border-brand-gold/40 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold shrink-0 animate-ping" />
            <p className="text-xs font-medium leading-tight">{notification}</p>
          </div>
          <button
            onClick={dismissNotification}
            className="text-brand-warmBeige hover:text-white p-1"
            aria-label="Dismiss Notification"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <Header />

      <main className="flex-grow pb-16 lg:pb-0">
        <Outlet />
      </main>

      <Footer />

      {/* App-like Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default MainLayout;
