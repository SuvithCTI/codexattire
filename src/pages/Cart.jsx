import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import formatPrice from '../utils/formatPrice';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { BRAND_CONFIG } from '../data/products';

export const Cart = () => {
  const {
    cart,
    cartCount,
    subtotal,
    shippingFee,
    shippingThreshold,
    isFreeShipping,
    estimatedTax,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // Calculate free shipping progress percentage
  const freeShippingProgress = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, shippingThreshold - subtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === 'KODEX10' || promoCode.trim().toUpperCase() === 'VIP') {
      const discount = subtotal * 0.1;
      setPromoDiscount(discount);
      setPromoApplied(true);
    } else {
      setPromoError('Invalid promotion code. Try "KODEX10" for 10% privilege discount.');
    }
  };

  const finalPayableTotal = Math.max(0, total - promoDiscount);

  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 sm:py-28 bg-brand-cream min-h-[70vh] flex items-center justify-center px-4">
        <EmptyState
          icon={(
            <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )}
          title="Your Shopping Bag is Empty"
          description="You haven't selected any garments yet. Explore our curated menswear and womenswear collections to discover modern minimalist tailoring."
          actionLabel="Explore New Arrivals"
          actionTo="/men"
        />
      </div>
    );
  }

  // Generate WhatsApp order message with selected items
  const whatsappCartMessage = `Hello KODE X ATTIRE concierge, I would like to place an order for my shopping bag:\n\n${cart
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.size}${item.color ? ` / ${item.color}` : ''}) x ${item.quantity} - ${formatPrice(item.price * item.quantity)}`
    )
    .join('\n')}\n\nEstimated Total: ${formatPrice(finalPayableTotal)}`;

  return (
    <div className="py-12 sm:py-16 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-brand-border">
          <div>
            <span className="text-[11px] uppercase tracking-ultraLuxe text-brand-gold font-semibold block mb-1">
              Your Wardrobe Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-black">Shopping Bag</h1>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-4 text-xs">
            <span className="text-brand-muted font-light">
              {cartCount} {cartCount === 1 ? 'garment' : 'garments'} selected
            </span>
            <button
              type="button"
              onClick={clearCart}
              className="text-brand-muted hover:text-red-700 underline underline-offset-4"
            >
              Clear Bag
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-white p-4 rounded-xl border border-brand-border shadow-sm mb-8">
          <div className="flex items-center justify-between text-xs font-medium mb-2">
            <span>
              {isFreeShipping ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <span>✓</span> You have unlocked complimentary worldwide express delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="text-brand-black">{formatPrice(remainingForFreeShipping)}</strong> more to receive complimentary express delivery.
                </span>
              )}
            </span>
            <span className="text-brand-muted">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-brand-sand rounded-full h-2 overflow-hidden">
            <div
              className="bg-brand-gold h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List (Left) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white rounded-xl border border-brand-border/70 p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-card transition-all hover:border-brand-warmBeige"
              >
                {/* Image & Details */}
                <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto">
                  <Link
                    to={`/product/${item.id}`}
                    className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden bg-brand-sand shrink-0 border border-brand-border"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </Link>

                  <div className="flex-grow space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-brand-gold font-medium">
                      {item.category === 'men' ? 'Menswear' : 'Womenswear'}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg text-brand-black font-medium hover:text-brand-gold transition-colors">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-brand-muted pt-1">
                      <span>Size: <strong className="text-brand-dark font-medium">{item.size}</strong></span>
                      {item.color && (
                        <>
                          <span>•</span>
                          <span>Color: <strong className="text-brand-dark font-medium">{item.color}</strong></span>
                        </>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-brand-black pt-1 sm:hidden">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Line Item Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-border/40">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-brand-border rounded-lg bg-brand-sand overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="px-3 py-1.5 text-brand-black hover:bg-brand-beige transition-colors text-sm font-medium"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 text-xs font-semibold font-mono text-brand-black min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="px-3 py-1.5 text-brand-black hover:bg-brand-beige transition-colors text-sm font-medium"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[5rem]">
                    <span className="text-sm sm:text-base font-semibold text-brand-black block">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-[11px] text-brand-muted font-light block">
                        {formatPrice(item.price)} each
                      </span>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-1.5 text-brand-muted hover:text-red-700 transition-colors"
                    aria-label={`Remove ${item.name} from bag`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4 flex items-center justify-between">
              <Button to="/men" variant="outline" size="sm">
                ← Continue Shopping
              </Button>
            </div>
          </div>

          {/* Order Summary Sidebar (Right) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-brand-border p-6 shadow-card sticky top-28 space-y-6">
              <h2 className="font-serif text-xl text-brand-black border-b border-brand-border pb-4">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <div>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Privilege Code (try KODEX10)"
                    disabled={promoApplied}
                    className="w-full bg-brand-sand border border-brand-border rounded px-3 py-2 text-xs uppercase tracking-wider text-brand-black focus:outline-none focus:border-brand-gold disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="px-4 py-2 bg-brand-black text-brand-cream text-xs uppercase tracking-wider rounded font-medium hover:bg-brand-charcoal transition-colors shrink-0 disabled:opacity-50"
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-700 font-medium mt-1.5">
                    ✓ 10% Privilege savings applied!
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-600 mt-1.5 font-light">{promoError}</p>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs text-brand-charcoal border-y border-brand-border/60 py-4">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Subtotal ({cartCount} items)</span>
                  <span className="font-medium text-brand-black">{formatPrice(subtotal)}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>VIP Privilege (10%)</span>
                    <span>−{formatPrice(promoDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-brand-muted">Estimated Luxury Delivery</span>
                  <span className="font-medium text-brand-black">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-brand-muted">Estimated Sales Tax (8%)</span>
                  <span className="font-medium text-brand-black">{formatPrice(estimatedTax)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-sm font-semibold uppercase tracking-wider text-brand-black">Total Due</span>
                <span className="font-serif text-2xl font-bold text-brand-black">
                  {formatPrice(finalPayableTotal)}
                </span>
              </div>

              {/* Checkout Action Button */}
              <div className="space-y-3">
                <Button
                  to="/checkout/address"
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Proceed to Checkout
                </Button>

                {/* Instant WhatsApp Order Option */}
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(whatsappCartMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-brand-sand text-brand-black rounded-lg border border-brand-warmBeige hover:bg-brand-beige transition-colors text-xs font-semibold uppercase tracking-wider"
                >
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.8 2.79.8 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.786-5.767-5.786zm3.385 8.163c-.144.405-.838.774-1.17.822-.313.045-.71.062-2.312-.601-1.356-.562-2.228-1.933-2.296-2.023-.067-.09-1.008-1.341-1.008-2.557 0-1.216.636-1.815.861-2.062.225-.247.49-.309.654-.309.163 0 .327.002.469.01.15.008.351-.057.549.418.204.49.697 1.7.758 1.824.061.124.102.269.02.433-.082.163-.123.265-.245.408-.122.143-.257.319-.367.428-.122.123-.25.257-.107.502.143.245.637 1.05 1.369 1.701.942.839 1.737 1.098 1.982 1.22.245.123.388.102.531-.061.143-.163.612-.714.775-.959.163-.245.327-.204.551-.122.225.082 1.429.674 1.674.796.245.122.408.184.469.286.061.102.061.592-.083.997z"/>
                  </svg>
                  <span>Order via WhatsApp Concierge</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="pt-2 text-[11px] text-brand-muted space-y-2 border-t border-brand-border/40 font-light">
                <div className="flex items-center gap-2">
                  <span className="text-brand-gold">✦</span>
                  <span>Discreet, tamper-evident archival packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-gold">✦</span>
                  <span>Encrypted transaction protocol</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-gold">✦</span>
                  <span>Complimentary 30-day global exchange privilege</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Checkout Bar (Sits directly above mobile bottom nav) */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] animate-fade-in">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
              Total Due ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </div>
            <div className="font-serif text-lg font-bold text-black leading-tight">
              {formatPrice(finalPayableTotal)}
            </div>
          </div>

          <Link
            to="/checkout/address"
            className="flex-grow max-w-[200px] text-center py-2.5 px-4 bg-black text-white text-xs uppercase tracking-wider font-bold rounded-lg shadow-md active:scale-95 transition-transform"
          >
            Checkout →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
