import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import { BRAND_CONFIG } from '../data/products';

export const PrivacyPolicy = () => {
  return (
    <div className="py-12 sm:py-20 bg-brand-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Client Discretion & Trust"
          title="Privacy Policy"
          description="At KODE X ATTIRE, safeguarding your personal data and maintaining strict client confidentiality is our steadfast commitment."
          className="mb-12 text-center"
        />

        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-brand-border shadow-card space-y-8 text-neutral-800 text-sm leading-relaxed">
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-medium text-brand-black border-b border-brand-border pb-2">
              1. Information We Collect
            </h3>
            <p className="text-neutral-900 font-normal">
              When you purchase from our atelier, subscribe to our communications, or consult with our client concierge, we may collect:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-neutral-900 font-normal pl-2">
              <li>Contact details (Full name, email address, phone number, and delivery destination).</li>
              <li>Transaction records (Order contents, payment reference IDs, and billing preferences).</li>
              <li>Garment sizing preferences and custom tailoring specifications.</li>
              <li>Technical session diagnostics (Browser type, device details, and cart state).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-xl font-medium text-brand-black border-b border-brand-border pb-2">
              2. How Your Information Is Utilized
            </h3>
            <p className="text-neutral-900 font-normal">
              Your details are employed solely for high-touch service and fulfillment purposes:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-neutral-900 font-normal pl-2">
              <li>Processing, inspecting, packing, and dispatching your orders.</li>
              <li>Delivering direct SMS or WhatsApp order tracking updates and delivery dispatch confirmations.</li>
              <li>Providing dedicated 1-on-1 sizing consultations through our concierge.</li>
              <li>Sharing private drops and collection lookbooks if you explicitly opted into the KODE Privé circle.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-xl font-medium text-brand-black border-b border-brand-border pb-2">
              3. Data Security & Discretion
            </h3>
            <p className="text-neutral-900 font-normal">
              We employ bank-grade 256-bit encryption for all checkout communications and data storage. We do not store full credit card numbers or banking passwords on our local servers. Furthermore, we never monetize, sell, or rent your private records to third-party brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-xl font-medium text-brand-black border-b border-brand-border pb-2">
              4. Cookies & Session Storage
            </h3>
            <p className="text-neutral-900 font-normal">
              We utilize essential local cookies and session persistence to remember your bag items, preferred filter views, and navigation state. You may configure your browser to reject cookies, though certain shopping cart conveniences may be impacted.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-xl font-medium text-brand-black border-b border-brand-border pb-2">
              5. Your Rights & Concierge Inquiries
            </h3>
            <p className="text-neutral-900 font-normal">
              You retain the right to request a summary of your stored personal records or request complete account erasure at any time. For questions regarding client privacy, please connect with our atelier desk:
            </p>
            <div className="pt-2 text-xs text-neutral-900 font-normal space-y-1">
              <p><strong className="text-brand-black font-medium">Email:</strong> {BRAND_CONFIG.email}</p>
              <p><strong className="text-brand-black font-medium">WhatsApp Concierge:</strong> {BRAND_CONFIG.whatsappNumber}</p>
              <p><strong className="text-brand-black font-medium">Atelier:</strong> {BRAND_CONFIG.address}</p>
            </div>
          </section>

          <div className="pt-4 border-t border-brand-border flex items-center justify-between">
            <span className="text-xs text-neutral-400">Effective Date: January 2025</span>
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

export default PrivacyPolicy;
