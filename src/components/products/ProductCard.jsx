import { useState } from 'react';
import { Link } from 'react-router-dom';
import formatPrice from '../../utils/formatPrice';
import useCart from '../../hooks/useCart';

export const ProductCard = ({ product, dark = false }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const selectedSize = product.sizes?.[0] || 'Standard';
  const primaryImage = product.images?.[0] || '';

  const isOutOfStock = product.stock === 0 || product.inStock === false;
  const isLowStock = !isOutOfStock && product.stock !== undefined && product.stock <= 5;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, {
      size: selectedSize,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className={`flex flex-col rounded-none transition-all duration-200 ${
      dark ? 'bg-transparent text-white' : 'bg-white text-black hover:border-gray-200'
    }`}>
      {/* Product Image Frame */}
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-neutral-900 mb-2 sm:mb-3 rounded-sm group"
      >
        <img
          src={primaryImage}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ${
            isOutOfStock ? 'opacity-40 grayscale' : ''
          }`}
        />

        {/* Sold out overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center p-2 text-center">
            <span className="bg-neutral-950/90 text-neutral-300 border border-neutral-700 px-2 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}

        {/* Low Stock Badge */}
        {isLowStock && (
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-amber-500/95 text-black text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm">
            {product.stock} Left
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="flex flex-col flex-grow">
        <h3 className={`text-[11px] sm:text-[13px] font-medium leading-tight mb-1 truncate ${
          dark ? 'text-white' : 'text-black'
        }`}>
          <Link to={`/product/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        {/* Price */}
        <div className={`text-xs sm:text-sm font-bold mb-2 sm:mb-3 ${
          dark ? 'text-gray-100' : 'text-black'
        }`}>
          {formatPrice(product.price)}
        </div>

        {/* Solid Full-Width Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold rounded-sm uppercase tracking-wider transition-all mt-auto active:scale-95 ${
            isOutOfStock
              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed dark:bg-neutral-800 dark:text-neutral-500'
              : added
              ? 'bg-emerald-600 text-white'
              : dark
              ? 'bg-white text-black hover:bg-neutral-200 shadow-sm'
              : 'bg-black text-white hover:bg-neutral-800'
          }`}
        >
          {isOutOfStock ? 'Sold Out' : added ? 'Added ✓' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
