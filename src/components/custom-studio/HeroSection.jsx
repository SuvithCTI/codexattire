import React from 'react';
import { BRAND_CONFIG } from '../../data/products';

export const HeroSection = ({ onScrollToStudio }) => {
  const directWhatsAppUrl = `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    'Hello KODE X ATTIRE Concierge! I want to inquire about designing a custom T-shirt.'
  )}`;

  return (
    <section className="relative bg-[#0A0A0A] text-white overflow-hidden border-b border-neutral-800 min-h-[calc(100vh-5rem)] flex items-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-neutral-800/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column (Order 2 on mobile, Order 1 on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-6 lg:space-y-8">
            {/* Atelier Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-neutral-300">
                BESPOKE CUSTOM ATELIER
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.06] text-white tracking-tight">
              Your Style.<br />
              <span className="italic font-light text-neutral-300">Your Design.</span>
            </h1>

            {/* Description */}
            <p className="text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-light">
              Create personalized T-shirts with custom prints, logos, and text. Crafted on premium 240 GSM heavy combed cotton with high-density screen and DTF printing.
            </p>

            {/* Dual CTA Buttons (2 columns on mobile, flex on desktop) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-2 sm:gap-3.5 pt-2">
              <button
                type="button"
                onClick={onScrollToStudio}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-neutral-200 text-black text-[10px] min-[380px]:text-[11px] sm:text-sm font-semibold tracking-wider sm:tracking-widest uppercase rounded-sm transition-all duration-300 shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 text-center whitespace-nowrap"
              >
                <span>EXPLORE DESIGNS</span>
                <span className="text-xs sm:text-sm">↓</span>
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-7 py-3.5 sm:py-4 bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-neutral-500 text-[10px] min-[380px]:text-[11px] sm:text-sm font-medium tracking-wider uppercase rounded-sm transition-all duration-300 backdrop-blur-sm shadow-sm text-center whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#25D366] shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Highlights Bar */}
            <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-6 sm:gap-8 text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">✦</span>
                <span>240 GSM Combed Cotton</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">✦</span>
                <span>High-Definition Print</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">✦</span>
                <span>From 1 Piece to Bulk</span>
              </div>
            </div>
          </div>

          {/* Right Image Display (Order 1 on mobile, Order 2 on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800/90 bg-neutral-900 group">
              <img
                src="/images/custom-studio/hero-studio-luxury.jpg"
                alt="KODE X ATTIRE Luxury Bespoke Custom Studio T-Shirts"
                className="w-full h-[400px] sm:h-[480px] lg:h-[540px] xl:h-[580px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
