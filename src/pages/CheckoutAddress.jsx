import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import formatPrice from '../utils/formatPrice';
import storage from '../utils/storage';
import EmptyState from '../components/common/EmptyState';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi NCR', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const CheckoutAddress = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    subtotal,
    shippingFee,
    isFreeShipping,
    estimatedTax,
  } = useCart();
  const { user, isAuthenticated } = useAuth();

  // Load existing saved address if any
  const savedAddress = storage.get('checkout_address', {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    apartment: '',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    country: 'India',
    addressType: 'Home',
    saveAddress: true,
  });

  const [address, setAddress] = useState(savedAddress);

  // Auto pre-fill from authenticated user profile if fields are empty
  useEffect(() => {
    if (user && (!address.email || !address.firstName)) {
      const parts = (user.fullName || '').split(' ');
      const defaultAddr = user.addresses?.[0];
      setAddress((prev) => ({
        ...prev,
        firstName: prev.firstName || parts[0] || '',
        lastName: prev.lastName || parts.slice(1).join(' ') || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || defaultAddr?.phone || '',
        street: prev.street || defaultAddr?.street || '',
        apartment: prev.apartment || defaultAddr?.apartment || '',
        city: prev.city || defaultAddr?.city || 'Bangalore',
        state: prev.state || defaultAddr?.state || 'Karnataka',
        pincode: prev.pincode || defaultAddr?.pincode || '560001',
      }));
    }
  }, [user]);

  // Promo code
  const [promoCode, setPromoCode] = useState(storage.get('checkout_promo_code', ''));
  const [promoApplied, setPromoApplied] = useState(storage.get('checkout_promo_applied', false));
  const [promoDiscount, setPromoDiscount] = useState(
    storage.get('checkout_promo_applied', false) ? subtotal * 0.1 : 0
  );
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === 'KODEX10' || promoCode.trim().toUpperCase() === 'VIP') {
      const discount = subtotal * 0.1;
      setPromoDiscount(discount);
      setPromoApplied(true);
      storage.set('checkout_promo_code', promoCode.trim().toUpperCase());
      storage.set('checkout_promo_applied', true);
    } else {
      setPromoError('Invalid code. Use "KODEX10" for 10% privilege discount.');
    }
  };

  const finalPayableTotal = Math.max(0, subtotal + shippingFee + estimatedTax - promoDiscount);

  // If cart is empty, show empty state
  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 sm:py-28 bg-[#FAF8F5] min-h-[70vh] flex items-center justify-center px-4">
        <EmptyState
          icon={(
            <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )}
          title="Your Shopping Bag is Empty"
          description="Please add your preferred items before proceeding with shipping address details."
          actionLabel="Explore Collections"
          actionTo="/men"
        />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.firstName || !address.email || !address.phone || !address.street || !address.pincode) {
      alert('Please fill out all required shipping fields.');
      return;
    }

    if (address.pincode.length < 6) {
      alert('Please enter a valid 6-digit PIN code.');
      return;
    }

    // Save to storage
    storage.set('checkout_address', address);
    storage.set('checkout_shipping_fee', shippingFee);
    storage.set('checkout_discount', promoDiscount);

    // Proceed to Next Page: Payment Gateway
    navigate('/checkout/payment');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Return to bag link */}
      <div className="mb-6">
        <Link to="/cart" className="text-xs text-neutral-600 hover:text-black font-semibold inline-flex items-center gap-1.5 transition-colors">
          <span>←</span> Return to Shopping Bag
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Contact & Address (7 Cols) */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* Section 1: Contact Information */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-300 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-black font-semibold">
                  Contact Information
                </h2>
              </div>
              {!isAuthenticated ? (
                <div className="text-xs text-neutral-600">
                  Already a member?{' '}
                  <Link
                    to="/login"
                    state={{ from: '/checkout/address' }}
                    className="font-semibold text-black underline hover:text-brand-gold transition-colors"
                  >
                    Sign in
                  </Link>
                </div>
              ) : (
                <span className="text-[11px] bg-brand-sand border border-brand-warmBeige text-brand-black px-2.5 py-1 rounded-full font-medium">
                  Atelier Member: {user.fullName?.split(' ')[0]}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  placeholder="julian@example.com"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:bg-white transition-all"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block font-normal">Order receipt & tracking updates will be dispatched here.</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                  PHONE NUMBER (SMS / WHATSAPP UPDATES) *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-neutral-300 bg-neutral-100 text-xs font-semibold text-neutral-700">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="98765 43210"
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-r-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-300 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-3">
              <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-black font-semibold">
                Shipping Address
              </h2>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                  FIRST NAME *
                </label>
                <input
                  type="text"
                  required
                  value={address.firstName}
                  onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                  placeholder="Julian"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                  LAST NAME *
                </label>
                <input
                  type="text"
                  required
                  value={address.lastName}
                  onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                  placeholder="Vance"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Street Address */}
            <div className="text-xs">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                STREET ADDRESS (HOUSE / FLAT NO. & STREET NAME) *
              </label>
              <input
                type="text"
                required
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                placeholder="Apartment 4B, 142 Lavender Lane, Indiranagar"
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:bg-white transition-all"
              />
            </div>

            {/* Landmark */}
            <div className="text-xs">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                LANDMARK / SUITE / FLOOR (OPTIONAL)
              </label>
              <input
                type="text"
                value={address.apartment}
                onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                placeholder="Near 100 Feet Road Metro Station"
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:bg-white transition-all"
              />
            </div>

            {/* City, State, PIN */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                  CITY *
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="Bangalore"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                  STATE *
                </label>
                <select
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg px-3 py-2.5 text-xs text-black font-medium focus:outline-none focus:border-black focus:bg-white transition-all cursor-pointer"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                  PIN CODE *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                  placeholder="560001"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Tag Address */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-black">Tag Address:</span>
                {['Home', 'Office', 'Other'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAddress({ ...address, addressType: type })}
                    className={`px-3 py-1 rounded-md text-xs font-semibold border transition-all ${
                      address.addressType === type
                        ? 'bg-black text-white border-black'
                        : 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:border-black'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-800">
                <input
                  type="checkbox"
                  checked={address.saveAddress}
                  onChange={(e) => setAddress({ ...address, saveAddress: e.target.checked })}
                  className="rounded border-neutral-400 text-black focus:ring-black"
                />
                <span>Save this address for express 1-click checkout</span>
              </label>
            </div>

          </div>

          {/* Continue Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg group"
            >
              <span>Continue to Payment Gateway</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>

        </div>

        {/* Right Column: Order Summary (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-neutral-300 p-6 sm:p-7 shadow-lg sticky top-28 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="font-serif text-xl text-black font-semibold">
                Order Summary
              </h3>
              <span className="text-xs text-neutral-600 font-semibold">
                {cartCount} {cartCount === 1 ? 'Garment' : 'Garments'}
              </span>
            </div>

            {/* Garments List */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-neutral-100">
              {cart.map((item) => (
                <div key={item.cartItemId} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="w-14 h-16 rounded-md overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-black truncate">{item.name}</h4>
                    <p className="text-[11px] text-neutral-500">
                      Size: <strong className="text-black font-medium">{item.size}</strong>
                      {item.color && <> • {item.color}</>}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      Qty: <strong className="text-black font-medium">{item.quantity}</strong>
                    </p>
                  </div>
                  <span className="text-xs font-bold text-black">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="border-t border-neutral-200 pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Privilege Code (try KODEX10)"
                  disabled={promoApplied}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg px-3 py-2 text-xs uppercase tracking-wider text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                  className="px-4 py-2 bg-black text-white text-xs uppercase tracking-wider rounded-lg font-bold hover:bg-neutral-800 transition-colors shrink-0 disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                  <span>✓</span> 10% Privilege savings applied!
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600 mt-1.5 font-medium">{promoError}</p>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs text-neutral-700 border-t border-neutral-200 pt-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-semibold text-black">{formatPrice(subtotal)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Privilege Savings (10%)</span>
                  <span>−{formatPrice(promoDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-neutral-600">
                  Estimated Luxury Delivery
                </span>
                <span className="font-semibold text-black">
                  {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-600">Estimated 5% GST</span>
                <span className="font-semibold text-black">{formatPrice(estimatedTax)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-neutral-300 pt-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-black block">Total Payable</span>
                <span className="text-[10px] text-neutral-500 font-normal">Inclusive of all taxes & insurance</span>
              </div>
              <span className="font-serif text-2xl font-bold text-black">
                {formatPrice(finalPayableTotal)}
              </span>
            </div>

            {/* Reassurance */}
            <div className="pt-2 text-[11px] text-neutral-600 space-y-2 border-t border-neutral-200 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-black font-bold">✓</span>
                <span>Complimentary 30-Day Global Exchange Privilege</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black font-bold">✓</span>
                <span>Tamper-evident luxury archival packaging</span>
              </div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
};

export default CheckoutAddress;