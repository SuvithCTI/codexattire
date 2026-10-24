import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { BRAND_CONFIG } from '../../data/products';

export const Header = () => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState('men'); // 'men' | 'women' | null
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Close mobile drawer and search on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/men?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleQuickSearch = (term) => {
    navigate(`/men?search=${encodeURIComponent(term)}`);
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Men', path: '/men' },
    { label: 'Women', path: '/women' },
    { label: 'Custom Studio', path: '/custom-studio' },
    { label: 'Contact', path: '/contact' },
  ];

  const popularSearches = ['Shirts', 'T-Shirts', 'Kurta Sets', 'Jeans', 'Linen', 'Polo'];

  const menSubCategories = [
    { label: 'All Menswear', path: '/men' },
    { label: 'Shirts', path: '/men?category=Shirts' },
    { label: 'T-Shirts & Polos', path: '/men?category=T-Shirts' },
    { label: 'Pants & Trousers', path: '/men?category=Pants' },
  ];

  const womenSubCategories = [
    { label: 'All Womenswear', path: '/women' },
    { label: 'Tops & Blouses', path: '/women?category=Tops' },
    { label: 'Denim & Jeans', path: '/women?category=Jeans' },
    { label: 'Kurta Sets', path: '/women?category=Kurta%20Sets' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 select-none">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Mobile Animated Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-black hover:text-gray-600 focus:outline-none transition-transform active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-black rounded-full transition-all duration-300 transform origin-left ${
                    mobileMenuOpen ? 'rotate-45 translate-y-0.5' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-black rounded-full transition-opacity duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-black rounded-full transition-all duration-300 transform origin-left ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex flex-col">
              <span className="font-sans font-bold text-lg sm:text-2xl tracking-wider text-black uppercase leading-none">
                KODE X ATTIRE
              </span>
              <span className="text-[7.5px] sm:text-[9px] tracking-[0.26em] uppercase text-gray-700 font-medium font-sans mt-0.5">
                STYLE THAT DEFINES YOU
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-normal transition-colors relative py-2 ${
                    isActive
                      ? 'text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black font-semibold'
                      : 'text-gray-800 hover:text-black'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions (Search, Profile, Admin, Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-6 text-black">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full transition-colors ${
                searchOpen ? 'bg-neutral-100 text-black' : 'text-black hover:text-gray-600'
              }`}
              aria-label="Search Catalog"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Account / Profile Link */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="p-1.5 hover:text-gray-600 transition-colors relative flex items-center"
              aria-label={isAuthenticated ? 'My Account' : 'Sign In or Sign Up'}
              title={isAuthenticated ? `Account: ${user?.fullName}` : 'Sign In or Sign Up'}
            >
              {isAuthenticated && user?.avatarInitials ? (
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-black text-brand-gold text-[10px] sm:text-xs font-semibold flex items-center justify-center border border-brand-warmBeige shadow-sm">
                  {user.avatarInitials}
                </span>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
              {isAuthenticated && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
              )}
            </Link>

            {/* Admin Badge */}
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden sm:inline-block px-2.5 py-1 bg-black text-brand-gold text-[10px] font-bold uppercase tracking-wider rounded-full border border-brand-warmBeige hover:bg-neutral-800 transition-colors"
                title="Atelier Admin Dashboard"
              >
                Admin
              </Link>
            )}

            {/* Cart Icon with Live Count */}
            <Link
              to="/cart"
              className="p-2 -mr-1 hover:text-gray-600 transition-colors relative flex items-center active:scale-95"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-1 right-0 bg-black text-white text-[9px] sm:text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Enhanced Mobile Search Drawer / Expandable Bar */}
        {searchOpen && (
          <div className="py-3 px-1 border-t border-gray-100 animate-fade-in space-y-2.5">
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto flex items-center">
              <input
                type="text"
                placeholder="Search shirts, dresses, jeans, linen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-gray-50 border border-gray-300 rounded-full py-2.5 pl-10 pr-20 text-xs sm:text-sm text-black focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <div className="absolute right-1.5 flex items-center gap-1">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-gray-400 hover:text-black"
                  >
                    ✕
                  </button>
                )}
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-black text-white text-xs rounded-full font-medium active:scale-95 transition-transform"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick 1-Tap Search Tags on Mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400 shrink-0">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleQuickSearch(term)}
                  className="px-2.5 py-1 bg-neutral-100 hover:bg-black hover:text-white rounded-full text-[11px] font-medium text-neutral-700 whitespace-nowrap transition-colors shrink-0"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>

    {/* Slide-In Mobile Drawer with Animated Backdrop (Portaled to document.body for true full-screen overlay) */}
    {typeof document !== 'undefined' &&
      createPortal(
        <div
          className={`fixed inset-0 z-[9999] lg:hidden flex transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel: Slides in smoothly from left with full screen height */}
          <div
            className={`relative w-[85%] max-w-xs bg-white h-[100dvh] shadow-2xl flex flex-col justify-between overflow-y-auto z-10 p-5 transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="space-y-4">
              {/* Drawer Header: Logo + Close */}
              <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
                <div>
                  <span className="font-sans font-bold text-base tracking-wider text-black uppercase block">
                    KODE X ATTIRE
                  </span>
                  <span className="text-[7.5px] tracking-[0.25em] uppercase text-gray-500 font-medium">
                    STYLE THAT DEFINES YOU
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-gray-500 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* In-Drawer Quick Search */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = e.target.elements.drawerSearch.value.trim();
                  if (q) handleQuickSearch(q);
                }}
                className="relative"
              >
                <input
                  type="text"
                  name="drawerSearch"
                  placeholder="Search styles, linen, tees..."
                  className="w-full bg-neutral-100 border border-neutral-200 rounded-xl py-2 pl-8 pr-3 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-all"
                />
                <svg className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </form>

              {/* Department Accordion Navigation */}
              <div className="space-y-1 pt-1">
                {/* Home */}
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isActive ? 'bg-neutral-100 text-black' : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                >
                  <span>Home</span>
                  <span className="text-neutral-400 text-xs">→</span>
                </NavLink>

                {/* Menswear with Expandable Subcategories */}
                <div className="rounded-xl overflow-hidden bg-neutral-50/60 border border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === 'men' ? null : 'men')}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-black"
                  >
                    <span>Menswear</span>
                    <span className={`text-xs transition-transform ${expandedSection === 'men' ? 'rotate-90 text-brand-gold' : 'text-neutral-400'}`}>
                      ▶
                    </span>
                  </button>
                  {expandedSection === 'men' && (
                    <div className="px-3 pb-2.5 pt-0.5 space-y-1 text-xs">
                      {menSubCategories.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 px-2 text-neutral-600 hover:text-black font-medium hover:bg-white rounded-lg transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Womenswear with Expandable Subcategories */}
                <div className="rounded-xl overflow-hidden bg-neutral-50/60 border border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === 'women' ? null : 'women')}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-black"
                  >
                    <span>Womenswear</span>
                    <span className={`text-xs transition-transform ${expandedSection === 'women' ? 'rotate-90 text-brand-gold' : 'text-neutral-400'}`}>
                      ▶
                    </span>
                  </button>
                  {expandedSection === 'women' && (
                    <div className="px-3 pb-2.5 pt-0.5 space-y-1 text-xs">
                      {womenSubCategories.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 px-2 text-neutral-600 hover:text-black font-medium hover:bg-white rounded-lg transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bespoke Studio */}
                <NavLink
                  to="/custom-studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isActive ? 'bg-neutral-100 text-black' : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-gold">✦</span>
                    <span>Custom Studio</span>
                  </div>
                  <span className="text-[9px] bg-brand-gold text-black font-bold uppercase px-1.5 py-0.5 rounded">New</span>
                </NavLink>

                {/* Contact */}
                <NavLink
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isActive ? 'bg-neutral-100 text-black' : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                >
                  <span>Contact Atelier</span>
                  <span className="text-neutral-400 text-xs">→</span>
                </NavLink>

                {/* Admin Portal Shortcut if Admin */}
                {isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-brand-gold bg-black mt-2"
                  >
                    <span>Atelier Admin Dashboard</span>
                    <span className="text-[9px] bg-brand-gold text-black px-1.5 py-0.5 rounded font-bold uppercase">Admin</span>
                  </NavLink>
                )}
              </div>

              {/* Quick Free Shipping Tag */}
              <div className="p-2.5 bg-brand-sand/60 border border-brand-warmBeige/40 rounded-xl text-[10px] text-neutral-700 font-medium flex items-center gap-2">
                <span className="text-brand-gold text-xs">✦</span>
                <span>Free Shipping on all orders above ₹999</span>
              </div>
            </div>

            {/* Bottom Actions: Account & Live Concierge */}
            <div className="pt-3.5 border-t border-gray-100 space-y-2.5">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 p-2 bg-neutral-50 rounded-xl">
                    <span className="w-8 h-8 rounded-full bg-black text-brand-gold text-xs font-bold flex items-center justify-center shrink-0">
                      {user?.avatarInitials || 'U'}
                    </span>
                    <div className="truncate min-w-0">
                      <div className="text-xs font-semibold text-black truncate">{user?.fullName}</div>
                      <div className="text-[10px] text-neutral-500 truncate">{user?.email}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 text-center bg-black text-white rounded-lg text-xs uppercase tracking-wider font-semibold active:scale-95 transition-transform"
                    >
                      Account
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                        navigate('/login');
                      }}
                      className="py-2 text-center border border-neutral-300 text-rose-600 rounded-lg text-xs uppercase tracking-wider font-semibold active:scale-95 transition-transform"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center bg-black text-white rounded-lg text-xs uppercase tracking-wider font-semibold active:scale-95 transition-transform shadow-xs"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center bg-brand-sand border border-brand-warmBeige text-black rounded-lg text-xs uppercase tracking-wider font-semibold active:scale-95 transition-transform"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Direct WhatsApp Concierge Help Button */}
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello KODE X ATTIRE concierge, I would like to inquire about your collections.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-neutral-900 text-white rounded-xl text-xs font-semibold transition-colors hover:bg-neutral-800"
              >
                <svg className="w-3.5 h-3.5 fill-emerald-400" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Live Concierge Chat</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
  </>
  );
};

export default Header;
