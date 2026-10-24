import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import formatPrice from '../utils/formatPrice';
import storage from '../utils/storage';

const POPULAR_BANKS = [
  { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC' },
  { id: 'icici', name: 'ICICI Bank', code: 'ICICI' },
  { id: 'sbi', name: 'State Bank of India', code: 'SBI' },
  { id: 'axis', name: 'Axis Bank', code: 'AXIS' },
  { id: 'kotak', name: 'Kotak Mahindra', code: 'KOTAK' },
];

export const CheckoutPayment = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    subtotal,
    estimatedTax,
    clearCart,
  } = useCart();

  // Load saved shipping address and method from Step 1
  const address = storage.get('checkout_address', null);
  const shippingMethod = storage.get('checkout_shipping_method', 'standard');
  const shippingFee = storage.get('checkout_shipping_fee', 0);
  const promoDiscount = storage.get('checkout_discount', 0);

  // If no cart or no address, bounce back
  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 max-w-lg mx-auto text-center px-4">
        <h2 className="font-serif text-2xl text-black font-semibold">Your Bag is Empty</h2>
        <p className="text-xs text-neutral-600 mt-2">Please select garments before proceeding to payment.</p>
        <Link to="/men" className="mt-4 inline-block px-6 py-2.5 bg-black text-white text-xs font-bold uppercase rounded-lg">
          Explore Menswear
        </Link>
      </div>
    );
  }

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [upiOption, setUpiOption] = useState('id'); // 'id' | 'qr'
  const [upiId, setUpiId] = useState('');
  const [selectedApp, setSelectedApp] = useState('gpay');

  // Card details
  const [cardData, setCardData] = useState({
    number: '',
    name: address?.firstName ? `${address.firstName} ${address.lastName}`.toUpperCase() : '',
    expiry: '',
    cvv: '',
    saveCard: true,
  });

  // Net banking details
  const [selectedBank, setSelectedBank] = useState('hdfc');

  // COD confirmation
  const [codConfirmed, setCodConfirmed] = useState(false);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);

  const finalPayableTotal = Math.max(0, subtotal + shippingFee + estimatedTax - promoDiscount);

  // Format Card Number
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData({ ...cardData, number: formatted });
  };

  // Format Expiry Date
  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setCardData({ ...cardData, expiry: raw });
  };

  // Card Brand Detection
  const cardBrand = useMemo(() => {
    const clean = cardData.number.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(clean)) return 'Mastercard';
    if (/^3[47]/.test(clean)) return 'American Express';
    if (/^(60|65|81|82)/.test(clean)) return 'RuPay';
    return 'Card';
  }, [cardData.number]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (paymentMethod === 'upi' && upiOption === 'id' && !upiId.trim()) {
      alert('Please enter a valid UPI ID (e.g. yourname@okhdfcbank).');
      return;
    }

    if (paymentMethod === 'card') {
      const cleanNum = cardData.number.replace(/\s/g, '');
      if (cleanNum.length < 15 || !cardData.name || !cardData.expiry || !cardData.cvv) {
        alert('Please enter complete credit/debit card details.');
        return;
      }
    }

    const orderSnapshot = {
      orderId: `KDX-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...cart],
      itemsCount: cartCount,
      subtotal,
      shippingFee,
      shippingMethod: 'Complimentary Luxury Delivery',
      tax: estimatedTax,
      discount: promoDiscount,
      total: finalPayableTotal,
      address: address || {
        firstName: 'Valued',
        lastName: 'Client',
        email: 'client@example.com',
        phone: '9876543210',
        street: 'Bangalore Flagship',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
      },
      paymentMethod:
        paymentMethod === 'upi'
          ? `UPI (${upiOption === 'id' ? upiId : `${selectedApp.toUpperCase()} QR`})`
          : paymentMethod === 'card'
          ? `${cardBrand} (Ending in ${cardData.number.slice(-4) || '••••'})`
          : paymentMethod === 'netbanking'
          ? `Net Banking (${selectedBank.toUpperCase()})`
          : 'Cash / UPI on Delivery (COD)',
    };

    setIsProcessing(true);

    setTimeout(() => {
      // Store completed order snapshot for the confirmation page
      storage.set('last_order', orderSnapshot);

      // Append to global orders list for Admin Dashboard
      const existingOrders = storage.get('all_orders', []);
      const newOrders = [orderSnapshot, ...existingOrders];
      storage.set('all_orders', newOrders);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('kodex_orders_updated', { detail: newOrders }));
      }

      // Automatically deduct purchased quantities from live stock inventory
      const currentProducts = storage.get('products', []);
      if (currentProducts && currentProducts.length > 0) {
        const updatedProducts = currentProducts.map((prod) => {
          const purchasedItem = cart.find((item) => item.id === prod.id);
          if (purchasedItem) {
            const currentStock = prod.stock !== undefined ? prod.stock : 20;
            const newStock = Math.max(0, currentStock - (purchasedItem.quantity || 1));
            return {
              ...prod,
              stock: newStock,
              inStock: newStock > 0,
            };
          }
          return prod;
        });
        storage.set('products', updatedProducts);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('kodex_products_updated', { detail: updatedProducts }));
        }
      }

      clearCart();
      setIsProcessing(false);
      navigate('/checkout/confirmation');
    }, 1800);
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Return to shipping address link */}
      <div className="mb-6 flex items-center justify-between">
        <Link to="/checkout/address" className="text-xs text-neutral-600 hover:text-black font-semibold inline-flex items-center gap-1.5 transition-colors">
          <span>←</span> Edit Shipping Address
        </Link>
      </div>

      {/* Processing Modal Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-neutral-300 space-y-4">
            <div className="w-14 h-14 border-4 border-neutral-200 border-t-black rounded-full animate-spin mx-auto" />
            <h3 className="font-serif text-xl text-black font-semibold">Authorizing Payment</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              Connecting to secure payment gateway & securing your garments... Please do not close or reload.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Delivery Recap + Payment Gateway (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Delivery Address Summary Card */}
          {address && (
            <div className="bg-white rounded-2xl p-5 border border-neutral-300 shadow-sm flex items-start justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 block">
                  DELIVERING TO
                </span>
                <p className="font-bold text-black text-sm">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-neutral-700">
                  {address.street}{address.apartment ? `, ${address.apartment}` : ''}, {address.city}, {address.state} - {address.pincode}
                </p>
                <p className="text-neutral-600 font-medium">
                  Phone: +91 {address.phone} • Email: {address.email}
                </p>
              </div>

              <Link
                to="/checkout/address"
                className="text-xs font-bold text-black hover:underline shrink-0 uppercase tracking-wider"
              >
                Change
              </Link>
            </div>
          )}

          {/* Payment Gateway Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-300 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-black font-semibold">
                  Select Payment Gateway
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span>100% Encrypted</span>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Tab: UPI */}
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-20 ${
                  paymentMethod === 'upi'
                    ? 'border-black bg-neutral-50 ring-2 ring-black shadow-sm'
                    : 'border-neutral-300 hover:border-neutral-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-bold text-black uppercase tracking-wider">UPI / QR</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">FAST</span>
                </div>
                <span className="text-[11px] text-neutral-600 font-normal">GPay, PhonePe, Paytm</span>
              </button>

              {/* Tab: Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-20 ${
                  paymentMethod === 'card'
                    ? 'border-black bg-neutral-50 ring-2 ring-black shadow-sm'
                    : 'border-neutral-300 hover:border-neutral-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-bold text-black uppercase tracking-wider">CARDS</span>
                  <span className="text-[10px] text-neutral-500 font-mono">VISA/MC</span>
                </div>
                <span className="text-[11px] text-neutral-600 font-normal">Credit & Debit</span>
              </button>

              {/* Tab: Net Banking */}
              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-20 ${
                  paymentMethod === 'netbanking'
                    ? 'border-black bg-neutral-50 ring-2 ring-black shadow-sm'
                    : 'border-neutral-300 hover:border-neutral-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-bold text-black uppercase tracking-wider">NET BANKING</span>
                </div>
                <span className="text-[11px] text-neutral-600 font-normal">50+ Indian Banks</span>
              </button>

              {/* Tab: COD */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-20 ${
                  paymentMethod === 'cod'
                    ? 'border-black bg-neutral-50 ring-2 ring-black shadow-sm'
                    : 'border-neutral-300 hover:border-neutral-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-bold text-black uppercase tracking-wider">COD</span>
                  <span className="text-[10px] bg-neutral-200 text-neutral-800 font-semibold px-1 rounded">CASH</span>
                </div>
                <span className="text-[11px] text-neutral-600 font-normal">Pay on Delivery</span>
              </button>
            </div>

            {/* TAB 1: UPI CONTENT */}
            {paymentMethod === 'upi' && (
              <div className="p-5 bg-[#FAF8F5] rounded-xl border border-neutral-300 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-black uppercase tracking-wider">
                    Direct UPI Transfer (Zero Surcharge)
                  </span>
                  <div className="flex items-center gap-1.5">
                    {['gpay', 'phonepe', 'paytm'].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className={`px-2 py-1 text-[10px] font-bold uppercase rounded border transition-all ${
                          selectedApp === app
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-neutral-700 border-neutral-300'
                        }`}
                      >
                        {app === 'gpay' ? 'Google Pay' : app === 'phonepe' ? 'PhonePe' : 'Paytm'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submode Switcher */}
                <div className="flex gap-4 border-b border-neutral-300 pb-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setUpiOption('id')}
                    className={`font-bold transition-colors pb-1 border-b-2 ${
                      upiOption === 'id' ? 'border-black text-black' : 'border-transparent text-neutral-500'
                    }`}
                  >
                    Enter UPI ID / VPA
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpiOption('qr')}
                    className={`font-bold transition-colors pb-1 border-b-2 ${
                      upiOption === 'qr' ? 'border-black text-black' : 'border-transparent text-neutral-500'
                    }`}
                  >
                    Scan QR Code
                  </button>
                </div>

                {upiOption === 'id' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                        ENTER UPI ID *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@okhdfcbank or 9876543210@paytm"
                          className="w-full bg-white border border-neutral-400 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (upiId.includes('@')) {
                              alert(`UPI ID "${upiId}" verified successfully!`);
                            } else {
                              alert('Please enter a valid format, e.g. yourname@okhdfcbank');
                            }
                          }}
                          className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-black text-xs font-bold rounded-lg uppercase tracking-wider shrink-0 transition-colors"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-neutral-600 font-normal">
                      A payment request will be triggered to your UPI app. Approve within 5 minutes.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-5 bg-white p-4 rounded-xl border border-neutral-300">
                    <div className="w-32 h-32 bg-neutral-900 rounded-lg p-2.5 flex flex-col items-center justify-center text-white shrink-0">
                      <div className="w-full h-full bg-white p-1 rounded grid grid-cols-6 gap-1">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-xs ${
                              (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 5 || i === 30 || i === 35
                                ? 'bg-black'
                                : 'bg-neutral-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs space-y-1.5 text-center sm:text-left">
                      <span className="font-bold text-black block">Scan with Any UPI App</span>
                      <p className="text-neutral-600 text-[11px] leading-relaxed">
                        Open Google Pay, PhonePe, Paytm, or BHIM on your smartphone, scan this QR code, and authorize payment of <strong className="text-black font-bold">{formatPrice(finalPayableTotal)}</strong>.
                      </p>
                      <span className="text-[10px] text-emerald-700 font-semibold block pt-1">
                        ✓ Verified KODE X ATTIRE Merchant Account
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: CARDS CONTENT */}
            {paymentMethod === 'card' && (
              <div className="p-5 bg-[#FAF8F5] rounded-xl border border-neutral-300 space-y-4">
                {/* Virtual Card Graphic */}
                <div className="max-w-xs mx-auto bg-gradient-to-tr from-[#1E1915] via-[#2F2721] to-[#120F0D] text-white rounded-xl p-4 shadow-lg border border-neutral-700/60 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif tracking-widest text-[11px] text-[#D8C2A7]">KODE X ATTIRE</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-300">{cardBrand}</span>
                  </div>
                  <div className="font-mono text-sm tracking-widest text-neutral-100 py-1">
                    {cardData.number || '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex items-end justify-between text-[10px] font-mono text-neutral-300 uppercase">
                    <div>
                      <span className="text-[8px] text-neutral-400 block">CARDHOLDER</span>
                      <span>{cardData.name || 'JULIAN VANCE'}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-neutral-400 block">EXPIRES</span>
                      <span>{cardData.expiry || 'MM/YY'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Inputs */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                      CARD NUMBER *
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardData.number}
                      onChange={handleCardNumberChange}
                      placeholder="4532 8901 2345 6789"
                      className="w-full bg-white border border-neutral-400 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                      NAME ON CARD *
                    </label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                      placeholder="JULIAN VANCE"
                      className="w-full bg-white border border-neutral-400 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                        EXPIRY DATE (MM/YY) *
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={handleExpiryChange}
                        placeholder="12/28"
                        className="w-full bg-white border border-neutral-400 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                        SECURITY CODE (CVV) *
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                        placeholder="•••"
                        className="w-full bg-white border border-neutral-400 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black font-mono tracking-widest"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1 text-neutral-800">
                    <input
                      type="checkbox"
                      checked={cardData.saveCard}
                      onChange={(e) => setCardData({ ...cardData, saveCard: e.target.checked })}
                      className="rounded border-neutral-400 text-black focus:ring-black"
                    />
                    <span className="text-[11px]">Save card securely in compliance with RBI card-on-file guidelines</span>
                  </label>
                </div>
              </div>
            )}

            {/* TAB 3: NET BANKING CONTENT */}
            {paymentMethod === 'netbanking' && (
              <div className="p-5 bg-[#FAF8F5] rounded-xl border border-neutral-300 space-y-4">
                <span className="text-xs font-bold text-black uppercase tracking-wider block">
                  Select Your Bank
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {POPULAR_BANKS.map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedBank(bank.id)}
                      className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                        selectedBank === bank.id
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                      }`}
                    >
                      <span>{bank.name}</span>
                      <span className={`text-[10px] font-mono ${selectedBank === bank.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {bank.code}
                      </span>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                    OR CHOOSE OTHER INDIAN BANKS
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-white border border-neutral-400 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium focus:outline-none focus:border-black cursor-pointer"
                  >
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                    <option value="bob">Bank of Baroda</option>
                    <option value="canara">Canara Bank</option>
                    <option value="idbi">IDBI Bank</option>
                    <option value="yes">YES Bank</option>
                    <option value="indusind">IndusInd Bank</option>
                  </select>
                </div>
              </div>
            )}

            {/* TAB 4: COD CONTENT */}
            {paymentMethod === 'cod' && (
              <div className="p-5 bg-[#FAF8F5] rounded-xl border border-neutral-300 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-black uppercase tracking-wider">
                  <span>Cash on Delivery Available</span>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed font-normal">
                  Pay via Cash or UPI to our courier agent upon receiving your KODE X ATTIRE parcel. Please keep <strong className="text-black font-bold">{formatPrice(finalPayableTotal)}</strong> ready.
                </p>

                <label className="flex items-start gap-2.5 cursor-pointer pt-2 text-xs text-neutral-800">
                  <input
                    type="checkbox"
                    checked={codConfirmed}
                    onChange={(e) => setCodConfirmed(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-400 text-black focus:ring-black"
                  />
                  <span>
                    I confirm that I will be available at this delivery address to receive the parcel.
                  </span>
                </label>
              </div>
            )}

          </div>

          {/* Place Order CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg group"
            >
              <span>Authorize & Place Order • {formatPrice(finalPayableTotal)}</span>
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

            {/* Items List */}
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

            {/* Breakdown */}
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
                <span className="text-[10px] text-neutral-500 font-normal">All taxes & insurance included</span>
              </div>
              <span className="font-serif text-2xl font-bold text-black">
                {formatPrice(finalPayableTotal)}
              </span>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 text-[11px] text-neutral-600 space-y-2 border-t border-neutral-200 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-black font-bold">✓</span>
                <span>PCI-DSS Level 1 Encrypted Payment Security</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black font-bold">✓</span>
                <span>Discreet tamper-evident packaging guarantee</span>
              </div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
};

export default CheckoutPayment;