import { Link } from 'react-router-dom';
import formatPrice from '../utils/formatPrice';
import storage from '../utils/storage';
import { BRAND_CONFIG } from '../data/products';

export const CheckoutConfirmation = () => {
  const order = storage.get('last_order', null);

  if (!order) {
    return (
      <div className="py-20 sm:py-28 max-w-lg mx-auto text-center px-4">
        <h2 className="font-serif text-2xl text-black font-semibold">No Recent Order Found</h2>
        <p className="text-xs text-neutral-600 mt-2">
          It looks like no recent order was found in your current session.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg"
        >
          Return to Storefront
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Hello KODE X ATTIRE concierge, I would like to inquire about tracking updates for my confirmed order ${order.orderId}.`;

  return (
    <div className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl border border-neutral-300 p-6 sm:p-10 shadow-xl space-y-8">
        
        {/* Header Badge */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-600 font-bold block">
            PAYMENT CONFIRMED & INVENTORY ALLOCATED
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Thank You, {order.address.firstName}!
          </h1>

          <p className="text-xs sm:text-sm text-neutral-800 font-medium max-w-lg mx-auto leading-relaxed">
            Your luxury order has been registered into our atelier queue. An official digital invoice and dispatch confirmation have been sent to <strong className="text-black font-bold">{order.address.email}</strong>.
          </p>
        </div>

        {/* Order Details Quick Strip */}
        <div className="bg-[#FAF8F5] rounded-xl p-4 sm:p-5 border border-neutral-300 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-neutral-500 uppercase tracking-wider block text-[10px] font-semibold">
              ORDER NUMBER
            </span>
            <span className="font-mono text-sm sm:text-base font-bold text-black tracking-wider">
              {order.orderId}
            </span>
          </div>

          <div>
            <span className="text-neutral-500 uppercase tracking-wider block text-[10px] font-semibold">
              DATE
            </span>
            <span className="font-semibold text-black">
              {order.date}
            </span>
          </div>

          <div>
            <span className="text-neutral-500 uppercase tracking-wider block text-[10px] font-semibold">
              PAYMENT METHOD
            </span>
            <span className="font-semibold text-black">
              {order.paymentMethod}
            </span>
          </div>

          <div className="sm:text-right">
            <span className="text-neutral-500 uppercase tracking-wider block text-[10px] font-semibold">
              TOTAL PAID
            </span>
            <span className="font-serif text-sm sm:text-base font-bold text-black">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Shipping Address & Delivery Speed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 block">
              SHIPPING ADDRESS
            </span>
            <p className="font-bold text-black">{order.address.firstName} {order.address.lastName}</p>
            <p className="text-neutral-700">{order.address.street}</p>
            {order.address.apartment && <p className="text-neutral-700">{order.address.apartment}</p>}
            <p className="text-neutral-700">{order.address.city}, {order.address.state} - {order.address.pincode}</p>
            <p className="text-neutral-700 font-medium pt-1">Phone: +91 {order.address.phone}</p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 block">
              DELIVERY SCHEDULE
            </span>
            <p className="font-bold text-black">{order.shippingMethod}</p>
            <p className="text-neutral-700 leading-relaxed">
              Estimated Delivery: <strong className="text-black font-semibold">3-4 Business Days</strong>
            </p>
            <p className="text-[11px] text-neutral-600 pt-1 font-normal">
              Individually hand-pressed and sealed in tamper-evident archival packaging with signature verification.
            </p>
          </div>
        </div>

        {/* Ordered Garments Breakdown */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 block">
            ORDERED GARMENTS ({order.itemsCount})
          </span>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {order.items.map((item) => (
              <div key={item.cartItemId} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-14 object-cover rounded bg-neutral-100 border border-neutral-200"
                  />
                  <div>
                    <p className="font-semibold text-black">{item.name}</p>
                    <p className="text-neutral-500 text-[11px]">
                      Size: <strong className="text-black font-medium">{item.size}</strong>
                      {item.color && <> • Color: <strong className="text-black font-medium">{item.color}</strong></>}
                      {' '}• Qty: <strong className="text-black font-medium">{item.quantity}</strong>
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-black">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-black hover:bg-neutral-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
          >
            <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>Track on WhatsApp Concierge</span>
          </a>

          <Link
            to="/men"
            className="flex-1 inline-flex items-center justify-center px-5 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CheckoutConfirmation;