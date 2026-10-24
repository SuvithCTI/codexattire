import formatPrice from '../../utils/formatPrice';

export const AdminOverview = ({
  products,
  orders,
  customers,
  inquiries,
  promos,
  setActiveTab,
  onSelectOrder,
  onSaveProducts,
}) => {
  // Calculations
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  const pendingOrders = orders.filter((o) => o.status === 'Processing' || o.status === 'Pending').length;
  const shippedOrders = orders.filter((o) => o.status === 'Shipped').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const pendingInquiries = inquiries.filter((i) => i.status === 'Pending').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-[#1C1612] to-neutral-900 rounded-3xl p-6 sm:p-8 border border-brand-gold/30 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-10 bg-cover bg-center pointer-events-none mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/hero/hero-luxury-banner.jpg')" }}
        />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
              ATELIER COMMAND CONTROL
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-medium">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl">
            Live telemetry for catalog merchandise, client dispatches, concierge requests, and financial performance.
          </p>
        </div>

        {/* Quick stat chips */}
        <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="text-brand-gold font-bold">{pendingOrders}</span>
            <span className="text-neutral-400">Orders Requiring Dispatch</span>
          </div>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">{deliveredOrders}</span>
            <span className="text-neutral-400">Fulfilled Orders</span>
          </div>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">{pendingInquiries}</span>
            <span className="text-neutral-400">Pending Concierge Inquiries</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI 1: Total Revenue */}
        <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-3 hover:border-brand-gold/40 transition-all shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
              Total Gross Revenue
            </span>
            <div className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs">
              ₹
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {formatPrice(totalRevenue)}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <span>↑ 18.4%</span>
              <span className="text-neutral-500 font-light">vs previous 30 days</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-3 hover:border-brand-gold/40 transition-all shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
              Dispatches & Orders
            </span>
            <div className="w-8 h-8 rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center text-xs">
              📦
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {orders.length}
            </div>
            <div className="text-[11px] text-neutral-400 font-light">
              <span className="text-amber-400 font-medium">{pendingOrders} active</span> in atelier queue
            </div>
          </div>
        </div>

        {/* KPI 3: Products in Catalog */}
        <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-3 hover:border-brand-gold/40 transition-all shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
              Active Merchandise
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-xs">
              👕
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {products.length}
            </div>
            <div className="text-[11px] text-neutral-400 font-light">
              Across Men, Women & Bespoke Studio
            </div>
          </div>
        </div>

        {/* KPI 4: Registered Customers */}
        <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-3 hover:border-brand-gold/40 transition-all shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
              Registered Clients
            </span>
            <div className="w-8 h-8 rounded-full bg-purple-500/15 text-purple-400 flex items-center justify-center text-xs">
              👥
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {customers.length}
            </div>
            <div className="text-[11px] text-brand-gold font-medium">
              Noir Privé & Atelier Tiers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
