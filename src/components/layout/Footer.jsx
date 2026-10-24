import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../../data/products';

export const Footer = () => {
  const [activeModal, setActiveModal] = useState(null); // 'shipping' | 'privacy' | 'terms'

  const whatsappInquiryUrl = `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    'Hello KODE X ATTIRE Concierge, I would like to inquire about your collections and client services.'
  )}`;

  return (
    <footer className="bg-[#0D0D0D] text-white border-t border-neutral-800 selection:bg-brand-gold selection:text-black">
      {/* Main Multi-Column Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Atelier & About (5 Cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <Link to="/" className="inline-block group">
              <span className="font-sans font-bold text-xl sm:text-2xl tracking-wider text-white uppercase block transition-colors group-hover:text-brand-gold">
                KODE X ATTIRE
              </span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-brand-gold font-medium font-sans">
                STYLE THAT DEFINES YOU
              </span>
            </Link>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Contemporary streetwear and refined everyday essentials crafted with deliberate intention and enduring quality.
            </p>

            {/* Studio Info List */}
            <div className="space-y-1.5 text-xs text-neutral-300 font-light">
              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-brand-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{BRAND_CONFIG.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-brand-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${BRAND_CONFIG.email}`} className="hover:text-brand-gold transition-colors">
                  {BRAND_CONFIG.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-brand-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-neutral-400">{BRAND_CONFIG.hours}</span>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <div className="pt-1">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-900 border border-neutral-700 hover:border-brand-gold text-white rounded-lg text-xs font-medium tracking-wide transition-all hover:bg-neutral-800"
              >
                <svg className="w-3.5 h-3.5 fill-emerald-500 shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Live Concierge Chat</span>
              </a>
            </div>
          </div>

          {/* Column 2: Page Navigations (4 Cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-light text-neutral-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-brand-gold transition-colors" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/men" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-brand-gold transition-colors" />
                  Men
                </Link>
              </li>
              <li>
                <Link to="/women" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-brand-gold transition-colors" />
                  Women
                </Link>
              </li>
              <li>
                <Link to="/custom-studio" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-brand-gold transition-colors" />
                  Custom Studio
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-brand-gold transition-colors" />
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-brand-gold transition-colors" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-brand-gold transition-colors" />
                  Account / Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Channels & Presence (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Connect With Us
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Follow our visual diary for runway inspirations, editorial campaigns, and behind-the-scenes craft.
            </p>

            {/* Social Icons Grid */}
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-brand-gold hover:bg-neutral-800 transition-all"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-brand-gold hover:bg-neutral-800 transition-all"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-emerald-400 hover:border-emerald-500 hover:bg-neutral-800 transition-all"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-brand-gold hover:bg-neutral-800 transition-all"
                aria-label="X (Twitter)"
                title="X (Twitter)"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-red-400 hover:border-red-500 hover:bg-neutral-800 transition-all"
                aria-label="Pinterest"
                title="Pinterest"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 00-4.37 23.18c-.05-.98-.09-2.5.02-3.58l.78-3.32s-.2-.39-.2-.97c0-.91.53-1.59 1.18-1.59.56 0 .83.42.83.92 0 .56-.36 1.4-.54 2.18-.15.65.33 1.18.97 1.18 1.17 0 2.07-1.23 2.07-3.01 0-1.57-1.13-2.67-2.74-2.67-1.87 0-2.96 1.4-2.96 2.85 0 .56.22 1.17.49 1.5.05.07.06.12.04.19l-.18.77c-.03.13-.1.18-.23.12-1-.46-1.62-1.92-1.62-3.09 0-2.52 1.83-4.83 5.28-4.83 2.77 0 4.93 1.98 4.93 4.62 0 2.76-1.74 4.97-4.15 4.97-.81 0-1.57-.42-1.83-.92l-.5 1.9c-.18.69-.67 1.56-1 2.09A12 12 0 1012 0z"/>
                </svg>
              </a>
            </div>

            <div className="pt-1.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-400 font-light">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Live Client Concierge Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Links */}
      <div className="border-t border-neutral-900 py-4 pb-10 lg:pb-4 bg-black text-[11px] text-neutral-500 font-light">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} KODE X ATTIRE. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-neutral-400">
              <button
                type="button"
                onClick={() => setActiveModal('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('terms')}
                className="hover:text-white transition-colors"
              >
                Terms and Conditions
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('shipping')}
                className="hover:text-white transition-colors"
              >
                Shipping Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Informational Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 text-neutral-200 shadow-2xl relative flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Icon */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-900 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto pr-2 space-y-4 flex-1">
              {activeModal === 'privacy' && (
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">Security & Discretion</span>
                  <h3 className="font-serif text-2xl text-white">Privacy Policy</h3>
                  <div className="text-xs text-neutral-300 space-y-3 font-light leading-relaxed">
                    <p>
                      At <strong className="text-white font-medium">KODE X ATTIRE</strong>, client privacy and discretion are foundational to our atelier ethos. We treat your personal information with absolute confidentiality.
                    </p>
                    <div className="space-y-1 pt-1">
                      <h4 className="text-white font-medium text-xs">1. Information Collection</h4>
                      <p className="text-neutral-400">We collect your name, shipping address, contact phone, and sizing specifications solely to handcraft, tailor, and deliver your garment orders.</p>
                    </div>
                    <div className="space-y-1 pt-1">
                      <h4 className="text-white font-medium text-xs">2. Bank-Grade Security</h4>
                      <p className="text-neutral-400">Transactions are encrypted with bank-grade 256-bit SSL protocols. We never store raw card numbers or share your private data with unvetted third parties.</p>
                    </div>
                    <div className="space-y-1 pt-1">
                      <h4 className="text-white font-medium text-xs">3. Client Rights & Erasure</h4>
                      <p className="text-neutral-400">You retain the right to inspect your account details or request full record deletion by contacting our atelier concierge at any time.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'terms' && (
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">Atelier Guidelines</span>
                  <h3 className="font-serif text-2xl text-white">Terms & Conditions</h3>
                  <div className="text-xs text-neutral-300 space-y-3 font-light leading-relaxed">
                    <p>
                      Welcome to <strong className="text-white font-medium">KODE X ATTIRE</strong>. By browsing our collections or submitting an order, you agree to our terms of service and purchase conditions.
                    </p>
                    <div className="space-y-1 pt-1">
                      <h4 className="text-white font-medium text-xs">1. Orders & Pricing</h4>
                      <p className="text-neutral-400">All prices are displayed in Indian Rupees (INR ₹). Garment availability depends on small-batch fabric runs and artisan production schedules.</p>
                    </div>
                    <div className="space-y-1 pt-1">
                      <h4 className="text-white font-medium text-xs">2. 7-Day Size Exchanges</h4>
                      <p className="text-neutral-400">We provide doorstep size exchanges within 7 days of delivery for unworn, unwashed pieces with all original brand tags intact.</p>
                    </div>
                    <div className="space-y-1 pt-1">
                      <h4 className="text-white font-medium text-xs">3. Intellectual Property</h4>
                      <p className="text-neutral-400">All tailoring silhouettes, original lookbook photography, graphics, and trademarks are owned exclusively by KODE X ATTIRE.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'shipping' && (
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">Atelier Logistics</span>
                  <h3 className="font-serif text-2xl text-white">Shipping & Express Delivery</h3>
                  <div className="text-xs text-neutral-300 space-y-3 font-light leading-relaxed">
                    <p>
                      <strong className="text-white font-medium">Complimentary Shipping:</strong> Orders above ₹999 qualify for complimentary express courier dispatch across India.
                    </p>
                    <p>
                      <strong className="text-white font-medium">Dispatch Timeline:</strong> Hand-inspected and dispatched within 24 to 48 business hours from our studio.
                    </p>
                    <p>
                      <strong className="text-white font-medium">Estimated Delivery:</strong> Metro destinations arrive in 2–4 business days; other regions in 4–6 business days.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions: Understand & Close */}
            <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white text-xs font-medium rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 bg-brand-gold hover:bg-brand-goldDark text-brand-black hover:text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-all shadow-md active:scale-95"
              >
                Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
