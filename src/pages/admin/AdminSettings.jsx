import { useState } from 'react';
import { PRODUCTS, BRAND_CONFIG } from '../../data/products';
import { DEFAULT_ORDERS, DEFAULT_PROMOS, DEFAULT_INQUIRIES } from '../../data/adminInitialData';
import storage from '../../utils/storage';
import useAuth from '../../hooks/useAuth';

export const AdminSettings = ({ onResetData }) => {
  const { user, logout } = useAuth();
  const [storeConfig, setStoreConfig] = useState(() => {
    return storage.get('store_settings', {
      name: BRAND_CONFIG.name,
      tagline: BRAND_CONFIG.tagline,
      email: BRAND_CONFIG.email,
      phone: BRAND_CONFIG.phone,
      whatsappNumber: BRAND_CONFIG.whatsappNumber,
      address: BRAND_CONFIG.address,
      freeShippingThreshold: 1999,
      standardShippingFee: 99,
      storeStatus: 'Active & Open',
    });
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    storage.set('store_settings', storeConfig);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleFactoryReset = () => {
    if (
      window.confirm(
        'Are you sure you want to restore factory default products, orders, and promo codes? Any custom additions will be reset to default.'
      )
    ) {
      storage.set('products', PRODUCTS);
      storage.set('all_orders', DEFAULT_ORDERS);
      storage.set('promo_codes', DEFAULT_PROMOS);
      storage.set('client_inquiries', DEFAULT_INQUIRIES);
      if (onResetData) onResetData();
      alert('Atelier catalog and demo records restored to factory defaults!');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white">
          Atelier Store Settings
        </h1>
        <p className="text-xs text-neutral-400 font-light mt-0.5">
          Global storefront configurations, concierge contact lines, and logistics parameters.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs flex items-center gap-2">
          <span>✓</span>
          <span>Store settings saved successfully and updated live across the atelier!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-[#141414] border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 text-xs shadow-card">
        
        {/* Section 1: Storefront Identity */}
        <div className="space-y-4">
          <h2 className="font-serif text-base font-medium text-white border-b border-neutral-800 pb-2">
            Storefront Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                Brand Name
              </label>
              <input
                type="text"
                value={storeConfig.name}
                onChange={(e) => setStoreConfig({ ...storeConfig, name: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                Tagline / Motto
              </label>
              <input
                type="text"
                value={storeConfig.tagline}
                onChange={(e) => setStoreConfig({ ...storeConfig, tagline: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Concierge Routing */}
        <div className="space-y-4">
          <h2 className="font-serif text-base font-medium text-white border-b border-neutral-800 pb-2">
            Concierge & Support Routing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                Official Atelier Email
              </label>
              <input
                type="email"
                value={storeConfig.email}
                onChange={(e) => setStoreConfig({ ...storeConfig, email: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                WhatsApp Live Concierge Number
              </label>
              <input
                type="text"
                value={storeConfig.whatsappNumber}
                onChange={(e) => setStoreConfig({ ...storeConfig, whatsappNumber: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                Flagship Studio Address
              </label>
              <input
                type="text"
                value={storeConfig.address}
                onChange={(e) => setStoreConfig({ ...storeConfig, address: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Shipping & Logistics */}
        <div className="space-y-4">
          <h2 className="font-serif text-base font-medium text-white border-b border-neutral-800 pb-2">
            Logistics & Checkout Rules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                Free Express Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={storeConfig.freeShippingThreshold}
                onChange={(e) => setStoreConfig({ ...storeConfig, freeShippingThreshold: Number(e.target.value) })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                value={storeConfig.standardShippingFee}
                onChange={(e) => setStoreConfig({ ...storeConfig, standardShippingFee: Number(e.target.value) })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-brand-gold hover:bg-brand-goldDark text-black font-semibold rounded-xl uppercase tracking-widest text-xs transition-colors shadow-soft"
          >
            Save Global Settings
          </button>
        </div>
      </form>

      {/* Danger Zone: Factory Reset */}
      <div className="bg-[#141414] border border-rose-900/40 rounded-3xl p-6 sm:p-8 space-y-4 text-xs">
        <div>
          <h2 className="font-serif text-base font-medium text-rose-400">
            Catalog & Records Reset
          </h2>
          <p className="text-neutral-400 font-light mt-0.5">
            Reset all product listings, test orders, and promotions back to factory default mock datasets.
          </p>
        </div>

        <button
          type="button"
          onClick={handleFactoryReset}
          className="px-5 py-2.5 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 text-rose-300 font-medium rounded-xl uppercase tracking-wider text-xs transition-colors"
        >
          Reset Catalog to Defaults
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
