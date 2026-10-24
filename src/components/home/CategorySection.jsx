import { Link } from 'react-router-dom';

export const CategorySection = () => {
  return (
    <section className="py-14 sm:py-18 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-black font-normal mb-1.5">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-neutral-900 font-medium">
            Find your perfect style
          </p>
        </div>

        {/* Two Wide Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Men Category Card */}
          <div className="relative rounded-xl overflow-hidden h-[240px] sm:h-[350px] lg:h-[380px] bg-neutral-900 group">
            <img
              src="/images/men/men-category.jpg"
              alt="Men Category"
              className="w-full h-full object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

            <div className="absolute inset-y-0 left-0 p-5 sm:p-8 lg:p-10 flex flex-col justify-center text-white z-10 max-w-sm">
              <h3 className="font-serif text-2xl sm:text-4xl font-normal mb-1 sm:mb-2">
                Men
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 font-light mb-4 sm:mb-6 tracking-wide">
                Shirts &nbsp;|&nbsp; T-Shirts &nbsp;|&nbsp; Pants
              </p>
              <div>
                <Link
                  to="/men"
                  className="inline-flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2.5 text-xs uppercase tracking-widest font-bold hover:bg-gray-100 transition-colors shadow-sm active:scale-95"
                >
                  <span>SHOP NOW</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Women Category Card */}
          <div className="relative rounded-xl overflow-hidden h-[240px] sm:h-[350px] lg:h-[380px] bg-neutral-900 group">
            <img
              src="/images/women/women-category.jpg"
              alt="Women Category"
              className="w-full h-full object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

            <div className="absolute inset-y-0 left-0 p-5 sm:p-8 lg:p-10 flex flex-col justify-center text-white z-10 max-w-sm">
              <h3 className="font-serif text-2xl sm:text-4xl font-normal mb-1 sm:mb-2">
                Women
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 font-light mb-4 sm:mb-6 tracking-wide">
                Tops &nbsp;|&nbsp; Jeans &nbsp;|&nbsp; Kurta Sets
              </p>
              <div>
                <Link
                  to="/women"
                  className="inline-flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2.5 text-xs uppercase tracking-widest font-bold hover:bg-gray-100 transition-colors shadow-sm active:scale-95"
                >
                  <span>SHOP NOW</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Custom T-Shirt Studio Atelier Banner */}
        <div className="mt-4 sm:mt-6 rounded-xl overflow-hidden relative bg-[#0D0D0D] border border-neutral-800 p-5 sm:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          <div className="max-w-2xl text-white space-y-1">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold block">
              CUSTOM T-SHIRT STUDIO
            </span>
            <h3 className="font-serif text-xl sm:text-3xl font-normal text-white">
              Your Style. Your Design.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed pt-1">
              Create personalized T-shirts with custom prints, logos, and text. Pick from Round Neck, Oversized, and Polo in premium combed cotton.
            </p>
          </div>
          <div className="w-full md:w-auto shrink-0 pt-1 md:pt-0">
            <Link
              to="/custom-studio"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black px-6 sm:px-7 py-3 text-xs uppercase tracking-widest font-bold transition-all shadow-sm active:scale-95"
            >
              <span>DESIGN YOUR T-SHIRT</span>
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
