import { useState } from 'react';
import { BRAND_CONFIG } from '../data/products';
import storage from '../utils/storage';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Private Client Concierge',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Save inquiry to Admin Inquiries list
    const inquiries = storage.get('client_inquiries', []);
    const newInquiry = {
      id: `inq_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      name: formData.name || 'Valued Client',
      email: formData.email,
      phone: formData.phone || 'N/A',
      inquiryType: formData.inquiryType,
      message: formData.message,
      status: 'Pending',
    };
    const updated = [newInquiry, ...inquiries];
    storage.set('client_inquiries', updated);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('kodex_inquiries_updated', { detail: updated }));
    }
  };

  const directWhatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    `Hello KODE X ATTIRE concierge, I would like to inquire about your collections and private client services.`
  )}`;

  return (
    <div className="relative min-h-screen bg-[#F5EFEB] overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* High-Resolution Atelier Photo Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/banners/contact-atelier-bg.jpg')",
        }}
      />

      {/* Gentle Softening Overlays for Contrast & Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/40 via-white/70 to-white/95 lg:from-white/20 lg:via-white/60 lg:to-white/90" />
      <div className="absolute inset-0 z-0 bg-[#F5EFEB]/20 backdrop-blur-[1px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-black block">
            ATELIER CLIENT SERVICES
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-black font-medium leading-[1.1] tracking-tight">
            Connect with Our Concierge
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dark WhatsApp Live Concierge Card */}
            <div className="bg-[#1C1612] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E0C6A0] font-bold">
                  INSTANT VIP CHANNEL
                </span>
              </div>

              <h2 className="font-serif text-2xl text-white font-medium">
                WhatsApp Live Concierge
              </h2>

              <p className="text-xs text-neutral-200 font-normal leading-relaxed">
                Receive direct garment photos, sizing advice, and expedited reservations directly on WhatsApp.
              </p>

              <div className="pt-1">
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E4D1BB] hover:bg-[#D5BC9E] text-black rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm group"
                >
                  <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>CHAT ON WHATSAPP +91 98765 43210</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>

            {/* Light Flagship Atelier Details Card */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 shadow-lg border border-neutral-300 space-y-4">
              <h3 className="font-serif text-lg sm:text-xl text-black font-semibold border-b border-neutral-300 pb-2.5">
                Flagship Atelier & Offices
              </h3>

              <div className="space-y-3.5 text-xs">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EAE3D2] flex items-center justify-center text-[#825C2C] shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-black block uppercase tracking-wider text-[11px]">
                      MADISON AVENUE ATELIER
                    </span>
                    <span className="text-black font-medium leading-relaxed block mt-0.5">
                      {BRAND_CONFIG.address}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EAE3D2] flex items-center justify-center text-[#825C2C] shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-black block uppercase tracking-wider text-[11px]">
                      DIRECT CORRESPONDENCE
                    </span>
                    <a
                      href={`mailto:${BRAND_CONFIG.email}`}
                      className="text-black hover:text-[#825C2C] font-semibold transition-colors underline underline-offset-2 block mt-0.5"
                    >
                      {BRAND_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EAE3D2] flex items-center justify-center text-[#825C2C] shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-black block uppercase tracking-wider text-[11px]">
                      OPERATING HOURS
                    </span>
                    <span className="text-black font-medium leading-relaxed block mt-0.5">
                      {BRAND_CONFIG.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Client Dispatch Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] rounded-2xl p-7 sm:p-9 border border-neutral-300 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-black font-semibold">
                    Message Dispatched
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-900 max-w-md mx-auto font-medium leading-relaxed">
                    Thank you, {formData.name}. Your correspondence has been directed to our senior atelier concierge. An advisor will respond within 4 business hours.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          inquiryType: 'Private Client Concierge',
                          message: '',
                        });
                      }}
                      className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all text-black"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-2">
                    <h2 className="font-serif text-2xl sm:text-3xl text-black font-semibold">
                      Direct Client Dispatch
                    </h2>
                    <p className="text-xs text-neutral-800 font-medium mt-1">
                      Complete this brief form to connect with our atelier specialists.
                    </p>
                  </div>

                  {/* Name & Email (Two Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Full Name"
                        className="w-full bg-white border border-neutral-400 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-white border border-neutral-400 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Inquiry Purpose (Two Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                        TELEPHONE (OPTIONAL)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white border border-neutral-400 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                        INQUIRY PURPOSE
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-white border border-neutral-400 rounded-lg px-3.5 py-2.5 text-xs text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all cursor-pointer"
                      >
                        <option value="Private Client Concierge">Private Client Concierge</option>
                        <option value="Garment Sizing & Fit">Garment Sizing & Fit Consultation</option>
                        <option value="Custom T-Shirt Studio">Custom T-Shirt Studio Inquiry</option>
                        <option value="Atelier Appointment">Madison Avenue Atelier Visit</option>
                        <option value="Order Tracking">Existing Order Status</option>
                        <option value="Press & Editorial">Press, Editorial & Media</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5">
                      YOUR MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please convey how we may assist you..."
                      className="w-full bg-white border border-neutral-400 rounded-lg p-3 text-xs text-black font-medium placeholder-neutral-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-y leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#1C1612] hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all shadow-md group"
                    >
                      <span>TRANSMIT MESSAGE TO CONCIERGE</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
