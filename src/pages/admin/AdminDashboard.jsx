import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
  getAdminProducts,
  saveAdminProducts,
  getAdminOrders,
  saveAdminOrders,
  getAdminPromos,
  saveAdminPromos,
  getAdminInquiries,
  saveAdminInquiries,
} from '../../data/adminInitialData';

import AdminOverview from './AdminOverview';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminCustomers from './AdminCustomers';
import AdminInquiries from './AdminInquiries';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loginAsAdmin, logout } = useAuth();

  // Active Tab: 'overview' | 'products' | 'orders' | 'customers' | 'promos' | 'inquiries' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Live Data States
  const [products, setProducts] = useState(() => getAdminProducts());
  const [orders, setOrders] = useState(() => getAdminOrders());
  const [promos, setPromos] = useState(() => getAdminPromos());
  const [inquiries, setInquiries] = useState(() => getAdminInquiries());

  // Selected Order for quick inspection
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sync with live custom events from checkout or storefront
  useEffect(() => {
    const handleProductsUpdate = (e) => setProducts(e.detail);
    const handleOrdersUpdate = (e) => setOrders(e.detail);
    const handleInquiriesUpdate = (e) => setInquiries(e.detail);

    window.addEventListener('kodex_products_updated', handleProductsUpdate);
    window.addEventListener('kodex_orders_updated', handleOrdersUpdate);
    window.addEventListener('kodex_inquiries_updated', handleInquiriesUpdate);

    return () => {
      window.removeEventListener('kodex_products_updated', handleProductsUpdate);
      window.removeEventListener('kodex_orders_updated', handleOrdersUpdate);
      window.removeEventListener('kodex_inquiries_updated', handleInquiriesUpdate);
    };
  }, []);

  // Save wrappers
  const handleSaveProducts = (newProducts) => {
    setProducts(newProducts);
    saveAdminProducts(newProducts);
  };

  const handleSaveOrders = (newOrders) => {
    setOrders(newOrders);
    saveAdminOrders(newOrders);
  };

  const handleSavePromos = (newPromos) => {
    setPromos(newPromos);
    saveAdminPromos(newPromos);
  };

  const handleSaveInquiries = (newInquiries) => {
    setInquiries(newInquiries);
    saveAdminInquiries(newInquiries);
  };

  const handleResetData = () => {
    setProducts(getAdminProducts());
    setOrders(getAdminOrders());
    setPromos(getAdminPromos());
    setInquiries(getAdminInquiries());
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'products', label: 'Merchandise', icon: '👕', badge: products.length },
    { id: 'orders', label: 'Orders & Dispatches', icon: '📦', badge: orders.filter((o) => o.status === 'Processing' || o.status === 'Pending').length },
    { id: 'customers', label: 'Client Accounts', icon: '👥' },
    { id: 'inquiries', label: 'Concierge Inquiries', icon: '💬', badge: inquiries.filter((i) => i.status === 'Pending').length },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col font-sans selection:bg-brand-gold selection:text-black">
      
      {/* Top Header Bar - Structured & Aligned with Sidebar */}
      <header className="sticky top-0 z-40 bg-[#141414] border-b border-neutral-800 h-16 sm:h-20 flex items-center justify-between px-3 sm:px-6 lg:px-0">
        
        {/* Left: Logo & Mobile Menu (w-64 on desktop to align directly with sidebar) */}
        <div className="flex items-center gap-2 sm:gap-3 lg:w-64 lg:h-full lg:px-6 lg:border-r border-neutral-800 shrink-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-white lg:hidden rounded-lg hover:bg-neutral-800 transition-colors shrink-0"
            aria-label="Toggle navigation drawer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/" className="flex flex-col group justify-center">
            <span className="font-sans font-bold text-sm sm:text-base lg:text-lg tracking-wider text-white uppercase group-hover:text-brand-gold transition-colors leading-tight">
              KODE X ATTIRE
            </span>
            <span className="text-[7.5px] sm:text-[8px] tracking-[0.25em] uppercase text-brand-gold font-medium leading-none mt-0.5">
              ATELIER ADMIN SUITE
            </span>
          </Link>
        </div>

        {/* Center / Right: Main Header Bar Content */}
        <div className="flex items-center justify-end lg:justify-between flex-1 h-full lg:px-8 gap-3 sm:gap-4 pl-2">
          
          {/* Active Section Breadcrumb & Status Indicator (Desktop only) */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-500 font-medium">Dashboard</span>
              <span className="text-neutral-600">/</span>
              <span className="text-white font-semibold capitalize">
                {navItems.find((n) => n.id === activeTab)?.label || activeTab}
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Storefront
            </span>
          </div>

          {/* Right Action Controls - Uniform heights & perfect vertical centering */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
            {/* Link to public storefront */}
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 sm:px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-300 hover:text-white rounded-lg text-[11px] sm:text-xs uppercase tracking-wider transition-all font-medium shrink-0"
              title="Return to customer storefront"
            >
              <span>←</span>
              <span className="hidden sm:inline">Storefront</span>
              <span className="sm:hidden">Store</span>
            </Link>

            {/* Quick Admin Auth helper pill if not logged in */}
            {!isAdmin ? (
              <button
                onClick={loginAsAdmin}
                className="h-8 px-2.5 sm:px-3 bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold border border-brand-gold/40 rounded-lg text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all shrink-0"
              >
                Enable Admin
              </button>
            ) : (
              <div className="flex items-center gap-2 pl-1 sm:pl-2 sm:border-l border-neutral-800 shrink-0">
                <div className="w-8 h-8 rounded-full bg-brand-gold text-black font-bold font-serif flex items-center justify-center text-xs shadow-sm shrink-0">
                  {user?.avatarInitials || 'AD'}
                </div>
                <div className="hidden md:block text-left">
                  <div className="font-semibold text-white text-xs leading-tight truncate max-w-[120px]">{user?.fullName || 'Atelier Admin'}</div>
                  <div className="text-[9.5px] text-brand-gold uppercase tracking-wider font-medium">Administrator</div>
                </div>
              </div>
            )}

            {/* Sign Out Button - exact 32x32px matching avatar */}
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-rose-400 hover:bg-neutral-900 rounded-lg transition-colors shrink-0"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

        </div>

      </header>

      {/* Main Layout Body: Sidebar + Dynamic Panel */}
      <div className="flex-grow flex">
        
        {/* Desktop Sidebar Navigation */}
        <aside className="w-64 bg-[#141414] border-r border-neutral-800/80 p-4 hidden lg:flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
              Operations Navigation
            </div>

            <nav className="space-y-1 text-xs font-medium">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all text-left ${
                      isActive
                        ? 'bg-neutral-800 text-white font-semibold shadow-soft border border-neutral-700/80'
                        : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-brand-gold text-black'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Info */}
          <div className="p-3 bg-neutral-900/60 rounded-2xl border border-neutral-800 space-y-2 text-xs text-neutral-400">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-neutral-500">Atelier Suite</span>
              <span className="text-[10px] text-emerald-400">v2.4 Active</span>
            </div>
            <p className="text-[11px] font-light leading-snug">
              Connected to live local storage database. Changes update storefront immediately.
            </p>
          </div>
        </aside>

        {/* Mobile Drawer with smooth slide-in and backdrop dismiss */}
        <div
          className={`fixed inset-0 z-50 flex lg:hidden transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className={`relative w-72 bg-[#141414] border-r border-neutral-800 p-5 flex flex-col justify-between space-y-6 z-10 transform transition-transform duration-300 ease-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="font-serif font-medium text-white text-base">Atelier Dashboard</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  ✕
                </button>
              </div>

              <nav className="space-y-1 text-xs font-medium">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all text-left ${
                      activeTab === item.id
                        ? 'bg-neutral-800 text-white font-semibold'
                        : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-gold text-black">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="w-full py-2.5 text-center bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white rounded-xl text-xs uppercase tracking-wider font-medium"
            >
              ← Return to Storefront
            </Link>
          </div>
        </div>

        {/* Main Content Viewport */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {activeTab === 'overview' && (
            <AdminOverview
              products={products}
              orders={orders}
              customers={orders}
              inquiries={inquiries}
              promos={promos}
              setActiveTab={setActiveTab}
              onSaveProducts={handleSaveProducts}
              onSelectOrder={(order) => {
                setSelectedOrder(order);
                setActiveTab('orders');
              }}
            />
          )}

          {activeTab === 'products' && (
            <AdminProducts
              products={products}
              onSaveProducts={handleSaveProducts}
            />
          )}

          {activeTab === 'orders' && (
            <AdminOrders
              orders={orders}
              onSaveOrders={handleSaveOrders}
              selectedOrder={selectedOrder}
              onCloseSelectedOrder={() => setSelectedOrder(null)}
              onSelectOrder={(order) => setSelectedOrder(order)}
            />
          )}

          {activeTab === 'customers' && (
            <AdminCustomers
              orders={orders}
            />
          )}

          {activeTab === 'inquiries' && (
            <AdminInquiries
              inquiries={inquiries}
              onSaveInquiries={handleSaveInquiries}
            />
          )}
        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;
