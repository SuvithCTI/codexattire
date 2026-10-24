import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import { BRAND_CONFIG } from '../data/products';

export const TermsConditions = () => {
  return (
    <div className="py-12 sm:py-20 bg-brand-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Atelier Policies & Guidelines"
          title="Terms & Conditions"
          description="Please review our terms of sale, garment care guidelines, and client service standards governing your experience with KODE X ATTIRE."
          className="mb-12 text-center"
        />

        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-brand-border shadow-card space-y-8 text-neutral-800 text-sm leading-relaxed">
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-medium text-brand-black border-b border-brand-border pb-2">
              1. Atelier Overview & Acceptance
            </h3>
            <p className="text-neutral-900 font-normal">
              By accessing our store, browsing our collections, or submitting an order with KODE X ATTIRE, you acknowledge and agree to comply with these terms. All prices are listed in Indian Rupees (INR ₹) inclusive of applicable goods & services taxation unless specified otherwise.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-xl font-medium text-brand-black border-b border-brand-border pb-2">
              2. Orders, Payment & Availability
            </h3>
            <p className="text-neutral-900 font-normal">
              All collections are subject to fabric batch availability. Upon order placement, an instant acknowledgment is sent to your registered contact channel. While we strive for absolute accuracy in color representation, screen calibrations across devices may introduce minor color variations from natural textiles.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-xl font-medium text-brand-black border-b border-brand-border pb-2">
              3. Express Delivery & Logistics
            </h3>
            <p className="text-neutral-900 font-normal">
              Orders are packaged and dispatched from our atelier within 24 to 48 business hours. Deliveries across metro cities generally arrive within 2–4 business days. Standard orders above ₹999 qualify for complimentary express dispatch.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-xl font-medium text-brand-black border-b border-brand-border pb-2">
              4. 7-Day Size Exchanges & Returns
            </h3>
            <p className="text-neutral-900 font-normal">
              If a piece does not provide the desired fit, you may request an exchange within 7 days from the documented delivery date. Garments must be unworn, unwashed, unaltered, and retained with original brand tags and packaging.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-xl font-medium text-brand-black border-b border-brand-border pb-2">
              5. Intellectual Property
            </h3>
            <p className="text-neutral-900 font-normal">
              The KODE X ATTIRE trademark, bespoke silhouettes, lookbook photography, graphics, and brand styling remain the exclusive intellectual property of KODE X ATTIRE. Unauthorized commercial duplication or distribution is prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-xl font-medium text-brand-black border-b border-brand-border pb-2">
              6. Client Care & Dispute Resolution
            </h3>
            <p className="text-neutral-900 font-normal">
              These terms are governed by the laws of India. For any client inquiries or assistance regarding an order, our concierge team is readily accessible via:
            </p>
            <div className="pt-2 text-xs text-neutral-900 font-normal space-y-1">
              <p><strong className="text-brand-black font-medium">Concierge Desk:</strong> {BRAND_CONFIG.phone}</p>
              <p><strong className="text-brand-black font-medium">Email:</strong> {BRAND_CONFIG.email}</p>
              <p><strong className="text-brand-black font-medium">WhatsApp:</strong> {BRAND_CONFIG.whatsappNumber}</p>
            </div>
          </section>

          <div className="pt-4 border-t border-brand-border flex items-center justify-between">
            <span className="text-xs text-neutral-400">Last Revised: January 2025</span>
            <Link
              to="/contact"
              className="text-xs uppercase tracking-widest font-semibold text-brand-black hover:text-brand-gold transition-colors"
            >
              Contact Concierge →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
