import { Link } from 'react-router-dom';

export const NewArrivals = () => {
  return (
    <section className="bg-[#0F0F0F] text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[300px] sm:min-h-[340px]">
          {/* Left Text Column */}
          <div className="md:col-span-6 py-12 sm:py-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal mb-3">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light mb-8 max-w-sm">
              Fresh styles. Better fits. Just for you.
            </p>
            <div>
              <Link
                to="/men"
                className="inline-flex items-center gap-2 bg-white text-black px-7 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-gray-100 transition-colors shadow-sm"
              >
                <span>SHOP NOW</span>
                <span className="text-sm">→</span>
              </Link>
            </div>
          </div>

          {/* Right Image Column: Stack of folded jeans with KODE X ATTIRE cap */}
          <div className="md:col-span-6 h-full flex items-center justify-end relative">
            <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden rounded-md flex items-center justify-center">
              <img
                src="/images/banners/new-arrivals.jpg"
                alt="New Arrivals Jeans and Accessories"
                className="w-full h-full object-cover object-center brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-transparent to-transparent hidden md:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
