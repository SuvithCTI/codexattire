import React from 'react';
import { BRAND_CONFIG } from '../../data/products';

export const WhatsAppBanner = () => {
  const directWhatsAppUrl = `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    'Hello KODE X ATTIRE Studio! I have questions regarding custom T-shirt orders and pricing.'
  )}`;

  return (
    <section className="relative bg-[#0D0D0D] text-white overflow-hidden border-y border-neutral-800">
      {/* Background with texture & subtle gradient overlay */}
      <div
        className="absolute inset-0 z-0 opacity-15 bg-cover bg-right"
        style={{ backgroundImage: "url('/images/custom-studio/whatsapp-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/95 to-[#0D0D0D]/80 z-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Icon + Text */}
          <div className="flex items-center gap-4 sm:gap-6 text-center md:text-left">
            <div className="w-14 h-14 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center shrink-0 shadow-lg">
              <svg className="w-7 h-7 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
                  Live Concierge &bull; Replies within 15 mins
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-white mb-1">
                Need Help or Want to Order?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl">
                Chat with our atelier specialists on WhatsApp for personalized advice, size guidance, quotes and instant mockups.
              </p>
            </div>
          </div>

          {/* Right: Button */}
          <div className="shrink-0">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-neutral-200 text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 shadow-lg hover:shadow-white/10 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Chat on WhatsApp</span>
              <span className="text-sm">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppBanner;
