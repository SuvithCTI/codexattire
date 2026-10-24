import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative w-full bg-[#0A0A0A] text-white overflow-hidden min-h-[calc(100vh-8rem)] min-h-[calc(100dvh-8rem)] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-center">
      {/* Background Hero Image with smooth responsive positioning */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/hero-luxury-banner.jpg"
          alt="KODE X ATTIRE - Style That Defines You"
          className="w-full h-full object-cover object-[75%_center] sm:object-center brightness-[0.92]"
        />
        {/* Cinematic gradient overlays for contrast & seamless transition */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 sm:via-black/60 to-black/30 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40 sm:hidden" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-20 lg:py-32 xl:py-36 min-h-[calc(100vh-8rem)] min-h-[calc(100dvh-8rem)] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-2xl my-auto">
          {/* Subtle Tag / Badge */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-3 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-200">
              NEW SEASON COLLECTION &bull; 2026
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.12] sm:leading-[1.08] tracking-tight mb-3 sm:mb-5 text-white">
            Style That <br />
            <span className="italic font-light text-gray-100">Defines You</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-xs sm:text-sm lg:text-base font-light leading-relaxed mb-5 sm:mb-10 max-w-lg">
            Discover curated contemporary fashion designed for elevated individuality.
            Architectural silhouettes, premium natural textiles, and effortless elegance for every occasion.
          </p>

          {/* Call-To-Action Buttons: 2-column on mobile, inline-flex on desktop */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-4 mb-6 sm:mb-12">
            <Link
              to="/men"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-white text-black px-4 sm:px-8 py-3 sm:py-3.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold hover:bg-neutral-200 transition-all duration-300 shadow-lg hover:shadow-white/10 active:scale-95 text-center"
            >
              <span>SHOP MEN</span>
              <span className="text-xs sm:text-sm">→</span>
            </Link>

            <Link
              to="/women"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-black/40 hover:bg-white text-white hover:text-black border border-white/50 hover:border-white backdrop-blur-sm px-4 sm:px-8 py-3 sm:py-3.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold transition-all duration-300 active:scale-95 text-center"
            >
              <span>SHOP WOMEN</span>
              <span className="text-xs sm:text-sm">→</span>
            </Link>

            <Link
              to="/custom-studio"
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-neutral-900/90 hover:bg-white text-white hover:text-black border border-brand-gold/60 hover:border-white backdrop-blur-sm px-5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold transition-all duration-300 active:scale-95 text-center"
            >
              <span className="text-brand-gold">✦</span>
              <span>CUSTOM STUDIO</span>
            </Link>
          </div>

          {/* Highlights / Trust Metrics */}
          <div className="pt-4 sm:pt-5 border-t border-white/15 flex flex-wrap items-center gap-2.5 sm:gap-10 text-[10px] sm:text-xs uppercase tracking-wider text-gray-300 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="text-brand-gold text-xs">✦</span>
              <span>100% Pure Cotton & Linen</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-brand-gold text-xs">✦</span>
              <span>Free Shipping Over ₹999</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-brand-gold text-xs">✦</span>
              <span>Easy 7-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
