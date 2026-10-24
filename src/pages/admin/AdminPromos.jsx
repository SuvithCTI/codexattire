import { useState } from 'react';

export const AdminPromos = ({ promos, onSavePromos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountPercent: 15,
    minSpend: 999,
    active: true,
    description: '',
    expiryDate: '31 Dec 2026',
  });

  const handleToggleActive = (code) => {
    const updated = promos.map((p) => (p.code === code ? { ...p, active: !p.active } : p));
    onSavePromos(updated);
  };

  const handleDelete = (code) => {
    if (window.confirm(`Delete promo code "${code}"?`)) {
      const updated = promos.filter((p) => p.code !== code);
      onSavePromos(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    const normalizedCode = formData.code.trim().toUpperCase();

    // Check duplicate
    if (promos.some((p) => p.code === normalizedCode)) {
      alert('A promo code with this name already exists.');
      return;
    }

    const newPromo = {
      code: normalizedCode,
      discountPercent: Number(formData.discountPercent),
      minSpend: Number(formData.minSpend) || 0,
      active: formData.active,
      description: formData.description || `Exclusive ${formData.discountPercent}% discount voucher.`,
      expiryDate: formData.expiryDate || 'Ongoing',
      usageCount: 0,
    };

    onSavePromos([newPromo, ...promos]);
    setIsModalOpen(false);
    setFormData({
      code: '',
      discountPercent: 15,
      minSpend: 999,
      active: true,
      description: '',
      expiryDate: '31 Dec 2026',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white">
            Promotional Codes & Concessions
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-0.5">
            Configure discount vouchers, seasonal promotion codes, and minimum order requirements.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-brand-gold text-brand-black hover:bg-brand-goldDark hover:text-white rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shadow-soft shrink-0"
        >
          <span>＋</span>
          <span>Create Promo Code</span>
        </button>
      </div>

      {/* Promos Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {promos.map((promo) => (
          <div
            key={promo.code}
            className={`bg-[#141414] border rounded-2xl p-5 space-y-4 transition-all relative ${
              promo.active
                ? 'border-neutral-800 hover:border-brand-gold/50 shadow-card'
                : 'border-neutral-800/50 opacity-65'
            }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-white tracking-wider bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-xl">
                  {promo.code}
                </span>
                <span className="text-xs text-brand-gold font-bold">{promo.discountPercent}% OFF</span>
              </div>

              <button
                type="button"
                onClick={() => handleToggleActive(promo.code)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  promo.active
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                }`}
              >
                {promo.active ? 'Active' : 'Inactive'}
              </button>
            </div>

            <p className="text-xs text-neutral-400 font-light line-clamp-2">
              {promo.description}
            </p>

            <div className="pt-2 border-t border-neutral-800/80 grid grid-cols-2 gap-2 text-[11px] text-neutral-400">
              <div>
                <span className="text-neutral-500 text-[10px] block uppercase">Min Spend</span>
                <span className="text-white font-medium">₹{promo.minSpend}</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[10px] block uppercase">Used Count</span>
                <span className="text-brand-gold font-bold">{promo.usageCount || 0} times</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-neutral-500">Expires: {promo.expiryDate}</span>
              <button
                type="button"
                onClick={() => handleDelete(promo.code)}
                className="text-[11px] text-rose-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141414] border border-neutral-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 text-white shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-neutral-400 hover:text-white"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold block">
                ATELIER CAMPAIGN
              </span>
              <h2 className="font-serif text-2xl font-medium text-white">
                New Promotion Code
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                  Promo Code *
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. FESTIVE20"
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white uppercase font-mono tracking-wider focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                    Discount (%) *
                  </label>
                  <input
                    type="number"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                    required
                    min="1"
                    max="90"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                    Min Order (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.minSpend}
                    onChange={(e) => setFormData({ ...formData, minSpend: e.target.value })}
                    min="0"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                  Description / Purpose
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Diwali festive 20% concession for all clients"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="promoActive"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-gold accent-brand-gold"
                />
                <label htmlFor="promoActive" className="text-neutral-300 cursor-pointer">
                  Activate code immediately for checkout
                </label>
              </div>

              <div className="flex gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-3 bg-neutral-800 text-white rounded-xl uppercase tracking-wider font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-brand-gold text-black rounded-xl uppercase tracking-wider font-semibold hover:bg-brand-goldDark"
                >
                  Publish Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPromos;
