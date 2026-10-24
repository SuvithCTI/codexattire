import ProductCard from '../products/ProductCard';
import { getFeaturedProducts } from '../../data/products';

export const FeaturedProducts = () => {
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <section className="py-14 sm:py-18 bg-[#181818] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-1.5">
            Featured Products
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light tracking-wide">
            Our latest collection
          </p>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} dark={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
