import { NavLink, useLocation } from 'react-router-dom';
import useCart from '../../hooks/useCart';

export const MobileBottomNav = () => {
  const { cartCount } = useCart();
  const { pathname } = useLocation();

  const navItems = [
    {
      to: '/',
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      to: '/men',
      label: 'Men',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      to: '/women',
      label: 'Women',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      to: '/custom-studio',
      label: 'Studio',
      isAccent: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      to: '/cart',
      label: 'Bag',
      badge: cartCount,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      aria-label="Mobile Navigation Bar"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-neutral-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.07)] transition-all select-none"
    >
      <nav className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const isActive = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 relative transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-black'
                  : 'text-neutral-400 hover:text-black'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <div className={`transition-transform duration-200 ${isActive ? 'scale-110 text-black' : ''}`}>
                  {item.icon}
                </div>

                {/* Cart Count Badge with subtle pulse */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-black text-white text-[9px] font-bold rounded-full min-w-[17px] h-[17px] px-1 flex items-center justify-center ring-2 ring-white shadow-xs">
                    {item.badge}
                  </span>
                )}

                {/* Studio Accent Dot */}
                {item.isAccent && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-brand-gold ring-1 ring-white" />
                )}
              </div>

              <span
                className={`text-[10px] tracking-tight mt-1 transition-colors ${
                  isActive ? 'font-bold text-black' : 'text-neutral-500 font-medium'
                }`}
              >
                {item.label}
              </span>

              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute top-0 w-8 h-[2.5px] bg-black rounded-full" />
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default MobileBottomNav;
