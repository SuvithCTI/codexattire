import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProductsByCategory, BRAND_CONFIG } from '../data/products';
import formatPrice from '../utils/formatPrice';
import useCart from '../hooks/useCart';
import Button from '../components/common/Button';
import ProductGrid from '../components/products/ProductGrid';

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = getProductById(id);

  // States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Initialize selected size when product changes
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedSize(product.sizes?.[0] || 'Standard');
      setQuantity(1);
      setIsAddedSuccess(false);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-24 max-w-xl mx-auto text-center px-4">
        <h2 className="font-serif text-3xl text-brand-black mb-4">Garment Not Found</h2>
        <p className="text-brand-muted text-sm mb-8">
          The requested archival piece may have moved or is temporarily unavailable.
        </p>
        <Button to="/men" variant="primary">
          Return to Menswear
        </Button>
      </div>
    );
  }

  // Related products from the same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  // Real-time stock status calculations
  const currentStock = typeof product.stock === 'number' ? product.stock : (product.inStock !== false ? 15 : 0);
  const isOutOfStock = currentStock === 0 || product.inStock === false;
  const isLowStock = !isOutOfStock && currentStock <= 5;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, {
      size: selectedSize,
      quantity,
    });
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2500);
  };

  const currentImage = product.images?.[selectedImageIndex] || product.images?.[0];

  // WhatsApp concierge pre-filled inquiry message
  const whatsappInquiryUrl = `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    `Hello KODE X ATTIRE concierge, I would like to inquire about the ${product.name} (Ref: ${product.id}, Size: ${selectedSize}).`
  )}`;

  return (
    <div className="py-10 sm:py-16 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-neutral-800 mb-8 uppercase tracking-wider font-medium">
          <Link to="/" className="hover:text-brand-black transition-colors">Home</Link>
          <span>/</span>
          <Link
            to={product.category === 'men' ? '/men' : '/women'}
            className="hover:text-brand-black transition-colors"
          >
            {product.category === 'men' ? 'Men’s Collection' : 'Women’s Collection'}
          </Link>
          <span>/</span>
          <span className="text-brand-black font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Gallery View (Left) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail Column */}
            {product.images && product.images.length > 1 && (
              <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto sm:w-24 shrink-0 pb-2 sm:pb-0 scrollbar-none -mx-1 px-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-[3/4] w-16 sm:w-full rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-brand-gold shadow-md scale-95'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Large Hero Image */}
            <div className="relative flex-grow aspect-[3/4] rounded-2xl overflow-hidden bg-brand-sand border border-brand-border shadow-soft group">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 bg-brand-black/90 text-brand-cream text-xs uppercase tracking-widest px-3 py-1.5 rounded font-medium backdrop-blur-sm">
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* Product Details & Purchase Form (Right) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="border-b border-brand-border/60 pb-6 mb-6">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-neutral-800 font-medium mb-2">
                <span className="uppercase tracking-widest font-semibold text-brand-gold">
                  {product.subCategory}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-500 text-sm">★</span>
                  <span className="font-semibold text-brand-black">{product.rating}</span>
                  <span className="text-neutral-700">({product.reviewsCount} verified client reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-black font-medium leading-tight mb-3">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-2xl font-bold text-brand-black">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-sans text-base text-neutral-600 line-through font-normal">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Complimentary Savings
                  </span>
                )}
              </div>

              {/* Stock Status Indicator */}
              <div className="pt-2">
                {isOutOfStock ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    Sold Out • Currently Unavailable
                  </div>
                ) : isLowStock ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Low Stock • Only {currentStock} Left in Atelier
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    In Stock ({currentStock} available for dispatch)
                  </div>
                )}
              </div>
            </div>

            {/* Editorial Description */}
            <p className="text-sm text-neutral-900 font-normal leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-black">
                    Select Size: <span className="font-medium text-neutral-900">{selectedSize}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`Size Guide for ${product.name}:\n\nXS: Chest 34-36" / Waist 28"\nS: Chest 36-38" / Waist 30"\nM: Chest 38-40" / Waist 32"\nL: Chest 41-43" / Waist 34"\nXL: Chest 44-46" / Waist 36"`)}
                    className="text-xs text-brand-gold hover:underline uppercase tracking-wider font-medium"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`flex-1 min-w-[44px] sm:max-w-[80px] py-3 text-xs font-semibold rounded-lg uppercase tracking-wider transition-all border text-center shrink-0 sm:shrink ${
                        selectedSize === sz
                          ? 'bg-brand-black text-white border-brand-black shadow-sm'
                          : 'bg-white text-brand-dark border-brand-border hover:border-brand-charcoal'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                {/* Quantity Box */}
                <div className="flex items-center border border-brand-border rounded-lg bg-white overflow-hidden shadow-sm">
                  <button
                    type="button"
                    disabled={isOutOfStock || quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-3 text-brand-black hover:bg-brand-sand disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 text-sm font-semibold text-brand-black font-mono min-w-[3rem] text-center">
                    {isOutOfStock ? 0 : quantity}
                  </span>
                  <button
                    type="button"
                    disabled={isOutOfStock || quantity >= currentStock}
                    onClick={() => setQuantity((q) => Math.min(currentStock, q + 1))}
                    className="px-3.5 py-3 text-brand-black hover:bg-brand-sand disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  disabled={isOutOfStock}
                  className="flex-grow shadow-lg"
                >
                  {isOutOfStock ? 'Sold Out' : isAddedSuccess ? '✓ Added to Shopping Bag' : 'Add to Shopping Bag'}
                </Button>
              </div>

              {/* Instant WhatsApp Inquiry Button */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-sand text-brand-black rounded-lg border border-brand-warmBeige hover:bg-brand-beige transition-colors text-xs font-semibold uppercase tracking-widest"
              >
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.8 2.79.8 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.786-5.767-5.786zm3.385 8.163c-.144.405-.838.774-1.17.822-.313.045-.71.062-2.312-.601-1.356-.562-2.228-1.933-2.296-2.023-.067-.09-1.008-1.341-1.008-2.557 0-1.216.636-1.815.861-2.062.225-.247.49-.309.654-.309.163 0 .327.002.469.01.15.008.351-.057.549.418.204.49.697 1.7.758 1.824.061.124.102.269.02.433-.082.163-.123.265-.245.408-.122.143-.257.319-.367.428-.122.123-.25.257-.107.502.143.245.637 1.05 1.369 1.701.942.839 1.737 1.098 1.982 1.22.245.123.388.102.531-.061.143-.163.612-.714.775-.959.163-.245.327-.204.551-.122.225.082 1.429.674 1.674.796.245.122.408.184.469.286.061.102.061.592-.083.997z"/>
                </svg>
                <span>Ask Stylist via WhatsApp</span>
              </a>
            </div>

            {/* Garment Details & Craftsmanship */}
            {product.details && product.details.length > 0 && (
              <div className="border-t border-brand-border/70 pt-6 space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-brand-black">
                  Garment Craftsmanship
                </h4>
                <ul className="text-xs text-neutral-900 space-y-2 list-disc list-inside font-normal">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Recommendation Carousel/Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-10 sm:pt-16 border-t border-brand-border/60 pb-12 lg:pb-0">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-ultraLuxe text-brand-gold font-semibold block mb-1 sm:mb-2">
                Curated Companions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-black">Complete The Ensemble</h2>
            </div>
            <ProductGrid products={relatedProducts} columns={3} />
          </div>
        )}
      </div>

      {/* Sticky Mobile Purchase Bar (Sits right above mobile bottom nav) */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 p-2.5 sm:p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] animate-fade-in">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentImage}
              alt={product.name}
              className="w-10 h-12 object-cover object-center rounded shrink-0 border border-neutral-200"
            />
            <div className="truncate">
              <div className="text-xs font-bold text-black truncate">{product.name}</div>
              <div className="text-xs font-semibold text-neutral-800 flex items-center gap-1.5 mt-0.5">
                <span>{formatPrice(product.price)}</span>
                {selectedSize && (
                  <span className="text-[10px] text-neutral-600 bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded font-mono">
                    {selectedSize}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 transition-all active:scale-95 shadow-md ${
              isOutOfStock
                ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                : isAddedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-black text-white hover:bg-neutral-900'
            }`}
          >
            {isOutOfStock ? 'Sold Out' : isAddedSuccess ? 'Added ✓' : 'Add to Bag'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
