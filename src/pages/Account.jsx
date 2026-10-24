import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import formatPrice from '../utils/formatPrice';

export const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile } = useAuth();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'orders' | 'addresses' | 'preferences'

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
  });

  // If not logged in, prompt or redirect to login
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center px-4 py-16">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-luxe border border-brand-warmBeige/40 max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-black font-semibold">Sign in Required</h2>
            <p className="text-neutral-600 text-sm mt-1">
              Please sign in to access your bespoke orders, saved measurements, and concierge profile.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              state={{ from: '/account' }}
              className="w-full py-3.5 bg-brand-black text-white hover:bg-neutral-800 text-xs uppercase tracking-widest font-medium rounded-lg transition-colors"
            >
              Sign In to Atelier
            </Link>
            <Link
              to="/signup"
              state={{ from: '/account' }}
              className="w-full py-3.5 bg-brand-sand text-brand-black hover:bg-brand-beige text-xs uppercase tracking-widest font-medium rounded-lg transition-colors border border-brand-warmBeige"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      fullName: formData.fullName,
      phone: formData.phone,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-14 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-500">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black font-semibold">Client Atelier Account</span>
        </div>

        {/* Hero Profile Card */}
        <div className="bg-[#141414] text-white rounded-3xl p-6 sm:p-10 shadow-luxe border border-white/10 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-luminosity"
            style={{ backgroundImage: "url('/images/banners/contact-atelier-bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Avatar Initial Circle */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-brand-charcoal to-brand-gold/30 border-2 border-brand-gold text-brand-cream font-serif text-2xl sm:text-3xl font-bold flex items-center justify-center shadow-lg shrink-0">
                {user.avatarInitials || 'U'}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                    {user.tier || 'Noir Atelier Member'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-medium">Active</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                  {user.fullName}
                </h1>
                <p className="text-xs text-neutral-400 font-light">
                  {user.email} • Client since {user.joinedDate || '2024'}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 pt-2 md:pt-0">
              <Link
                to="/men"
                className="px-4 py-2.5 bg-neutral-900 border border-neutral-700 hover:border-brand-gold text-white rounded-xl text-xs uppercase tracking-widest font-medium transition-all"
              >
                Shop Atelier
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2.5 bg-white/10 hover:bg-rose-950/40 hover:text-rose-400 border border-white/15 hover:border-rose-800 text-neutral-300 rounded-xl text-xs uppercase tracking-widest font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content with Navigation Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Navigation Sidebar Tabs - Horizontal scroll on mobile, vertical on desktop */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-2 sm:p-3 shadow-card border border-brand-warmBeige/40 overflow-x-auto scrollbar-none">
            <nav className="flex lg:flex-col gap-1 sm:space-y-1 min-w-max lg:min-w-0">
              {[
                {
                  id: 'profile',
                  label: 'Personal Profile',
                  icon: (
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ),
                },
                {
                  id: 'orders',
                  label: 'Orders & Dispatches',
                  badge: user.orders?.length || 0,
                  icon: (
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  ),
                },
                {
                  id: 'addresses',
                  label: 'Saved Addresses',
                  icon: (
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
                {
                  id: 'preferences',
                  label: 'Security & Preferences',
                  icon: (
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap text-left ${
                      isActive
                        ? 'bg-brand-black text-white shadow-soft font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-brand-gold' : 'text-neutral-400'}>
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-1 ${
                          isActive ? 'bg-brand-gold text-black' : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="hidden lg:block pt-2 border-t border-neutral-100">
                <Link
                  to="/custom-studio"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium uppercase tracking-wider text-neutral-700 hover:bg-brand-sand/50 transition-colors"
                >
                  <span className="text-brand-gold">✦</span>
                  <span>Bespoke Studio</span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Tab Content Display */}
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-brand-warmBeige/40">
            
            {/* TAB 1: PROFILE */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <div>
                    <h2 className="font-serif text-2xl text-black font-semibold">
                      Client Profile Details
                    </h2>
                    <p className="text-xs text-neutral-500 font-light mt-0.5">
                      Personal identity and contact preferences for atelier dispatches.
                    </p>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border border-neutral-300 hover:border-black rounded-xl text-xs uppercase tracking-wider font-medium text-black transition-colors"
                    >
                      Edit Info
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-neutral-500 hover:text-black transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-black">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-black rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-black">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-black rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs uppercase tracking-widest font-medium transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs uppercase tracking-widest font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-4 bg-brand-cream/60 rounded-2xl border border-brand-warmBeige/30 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Full Name
                      </span>
                      <p className="text-sm font-semibold text-black">{user.fullName}</p>
                    </div>

                    <div className="p-4 bg-brand-cream/60 rounded-2xl border border-brand-warmBeige/30 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Email Address
                      </span>
                      <p className="text-sm font-semibold text-black">{user.email}</p>
                    </div>

                    <div className="p-4 bg-brand-cream/60 rounded-2xl border border-brand-warmBeige/30 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Phone Number
                      </span>
                      <p className="text-sm font-semibold text-black">
                        {user.phone || 'No phone number linked'}
                      </p>
                    </div>

                    <div className="p-4 bg-brand-cream/60 rounded-2xl border border-brand-warmBeige/30 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Member Status
                      </span>
                      <p className="text-sm font-semibold text-brand-goldDark">
                        {user.tier || 'Noir Atelier Member'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Concierge Perks Banner */}
                <div className="mt-8 p-5 bg-[#141414] text-white rounded-2xl space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-white">Private Concierge Assistance</h3>
                    <p className="text-xs text-neutral-400 font-light">
                      Need custom fittings or direct styling guidance? Contact our atelier concierge via WhatsApp.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="px-4 py-2.5 bg-brand-gold text-brand-black hover:bg-brand-goldDark hover:text-white rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shrink-0 text-center"
                  >
                    Contact Concierge
                  </Link>
                </div>
              </div>
            )}

            {/* TAB 2: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-neutral-100">
                  <h2 className="font-serif text-2xl text-black font-semibold">
                    Order History & Dispatches
                  </h2>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">
                    Track existing orders, delivery statuses, and invoices.
                  </p>
                </div>

                {(!user.orders || user.orders.length === 0) ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm text-black">No Orders Placed Yet</h3>
                      <p className="text-xs text-neutral-500">
                        When you place an order, its real-time dispatch progress will appear here.
                      </p>
                    </div>
                    <Link
                      to="/men"
                      className="inline-block px-5 py-2.5 bg-black text-white text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-colors"
                    >
                      Explore Menswear
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-neutral-200 rounded-2xl p-5 hover:border-black/30 transition-all space-y-4 bg-[#FCFBF9]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-200">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                              Order ID
                            </span>
                            <div className="font-mono text-sm font-semibold text-black">{order.id}</div>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                              Date
                            </span>
                            <div className="text-xs text-neutral-800">{order.date}</div>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                              Total
                            </span>
                            <div className="text-sm font-bold text-black">{formatPrice(order.total)}</div>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                              Status
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Order items */}
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs py-1">
                              <div className="space-y-0.5">
                                <span className="font-medium text-black">{item.name}</span>
                                <div className="text-neutral-500 text-[11px]">
                                  Qty: {item.quantity} • Size: {item.size} • Color: {item.color}
                                </div>
                              </div>
                              <span className="font-medium text-neutral-900">{formatPrice(item.price)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <div>
                    <h2 className="font-serif text-2xl text-black font-semibold">
                      Saved Delivery Addresses
                    </h2>
                    <p className="text-xs text-neutral-500 font-light mt-0.5">
                      Manage shipping destinations for seamless 1-click checkout.
                    </p>
                  </div>
                  <Link
                    to="/checkout/address"
                    className="px-4 py-2 bg-black text-white hover:bg-neutral-800 rounded-xl text-xs uppercase tracking-wider font-medium transition-colors"
                  >
                    + Manage in Checkout
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="p-5 border-2 border-brand-warmBeige/80 bg-brand-cream/40 rounded-2xl space-y-2 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-black">
                            {addr.addressType || 'Home'}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-brand-black text-brand-gold px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-800 font-medium">
                          {addr.firstName} {addr.lastName}
                        </div>
                        <div className="text-xs text-neutral-600 font-light space-y-0.5">
                          <div>{addr.street}</div>
                          {addr.apartment && <div>{addr.apartment}</div>}
                          <div>{addr.city}, {addr.state} - {addr.pincode}</div>
                          <div>India</div>
                          <div className="pt-1 text-neutral-700">Phone: {addr.phone}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-neutral-500 text-xs">
                      No addresses saved yet. They will automatically be recorded when you checkout!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: PREFERENCES */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-neutral-100">
                  <h2 className="font-serif text-2xl text-black font-semibold">
                    Security & Preferences
                  </h2>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">
                    Account credentials, communication subscriptions, and privacy.
                  </p>
                </div>

                <div className="space-y-5 max-w-lg">
                  <div className="p-4 border border-neutral-200 rounded-2xl space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                      Password Protection
                    </h3>
                    <p className="text-xs text-neutral-500 font-light">
                      Your password is encrypted and stored securely.
                    </p>
                    <button
                      type="button"
                      onClick={() => alert('Password reset verification email dispatched to ' + user.email)}
                      className="px-4 py-2 border border-neutral-300 hover:border-black rounded-xl text-xs uppercase tracking-wider font-medium text-black transition-colors"
                    >
                      Request Password Reset Email
                    </button>
                  </div>

                  <div className="p-4 border border-neutral-200 rounded-2xl space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                      Editorial & Newsletter Subscriptions
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black accent-black"
                      />
                      <span className="text-xs text-neutral-700 font-light">
                        Receive seasonal lookbooks & private atelier invitation alerts
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-5 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors"
                    >
                      Sign Out of All Sessions
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Account;
