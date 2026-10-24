import { useState, useMemo } from 'react';
import formatPrice from '../../utils/formatPrice';

export const AdminProducts = ({ products, onSaveProducts }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStock, setSelectedStock] = useState('all');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    category: 'men',
    subCategory: 'Shirts',
    price: '',
    originalPrice: '',
    stock: 25,
    images: ['/images/products/shirt-white-textured.jpg'],
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    isFeatured: false,
    isNewArrival: true,
    inStock: true,
  };

  const [formData, setFormData] = useState(initialForm);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(search.toLowerCase()));

      const matchCat =
        selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();

      const currentStock = typeof p.stock === 'number' ? p.stock : (p.inStock !== false ? 15 : 0);
      const isItemInStock = currentStock > 0 && p.inStock !== false;

      const matchStock =
        selectedStock === 'all' ||
        (selectedStock === 'instock' && currentStock > 5 && isItemInStock) ||
        (selectedStock === 'lowstock' && currentStock > 0 && currentStock <= 5 && isItemInStock) ||
        (selectedStock === 'outofstock' && (!isItemInStock || currentStock === 0));

      return matchSearch && matchCat && matchStock;
    });
  }, [products, search, selectedCategory, selectedStock]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    const productStock = typeof product.stock === 'number' ? product.stock : (product.inStock !== false ? 15 : 0);
    setFormData({
      name: product.name,
      category: product.category,
      subCategory: product.subCategory || 'General',
      price: product.price,
      originalPrice: product.originalPrice || '',
      stock: productStock,
      images: product.images && product.images.length > 0 ? product.images : ['/images/products/polo-tshirt.jpg'],
      description: product.description || '',
      sizes: product.sizes || ['S', 'M', 'L', 'XL'],
      isFeatured: !!product.isFeatured,
      isNewArrival: !!product.isNewArrival,
      inStock: productStock > 0 && product.inStock !== false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this product from the atelier catalog?')) {
      const updated = products.filter((p) => p.id !== id);
      onSaveProducts(updated);
    }
  };

  const handleAdjustStock = (productId, delta) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const cur = typeof p.stock === 'number' ? p.stock : (p.inStock !== false ? 15 : 0);
        const next = Math.max(0, cur + delta);
        return {
          ...p,
          stock: next,
          inStock: next > 0,
        };
      }
      return p;
    });
    onSaveProducts(updated);
  };

  const handleToggleStock = (product) => {
    const cur = typeof product.stock === 'number' ? product.stock : (product.inStock !== false ? 15 : 0);
    const updated = products.map((p) => {
      if (p.id === product.id) {
        const nextInStock = !p.inStock || cur === 0;
        return {
          ...p,
          inStock: nextInStock,
          stock: nextInStock ? (cur > 0 ? cur : 10) : 0,
        };
      }
      return p;
    });
    onSaveProducts(updated);
  };

  const handleToggleFeatured = (product) => {
    const updated = products.map((p) =>
      p.id === product.id ? { ...p, isFeatured: !p.isFeatured } : p
    );
    onSaveProducts(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price) {
      alert('Please provide product name and price.');
      return;
    }

    const parsedStock = Math.max(0, parseInt(formData.stock, 10) || 0);
    const effectiveInStock = parsedStock > 0 && formData.inStock !== false;

    if (editingProduct) {
      // Update existing
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formData.name,
              category: formData.category,
              subCategory: formData.subCategory,
              price: Number(formData.price),
              originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price) * 1.3,
              stock: parsedStock,
              images: formData.images,
              description: formData.description,
              sizes: typeof formData.sizes === 'string' ? formData.sizes.split(',').map((s) => s.trim()) : formData.sizes,
              isFeatured: formData.isFeatured,
              isNewArrival: formData.isNewArrival,
              inStock: effectiveInStock,
            }
          : p
      );
      onSaveProducts(updated);
    } else {
      // Create new
      const newProduct = {
        id: `prod-${Date.now().toString().slice(-4)}`,
        name: formData.name,
        category: formData.category,
        subCategory: formData.subCategory,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Math.round(Number(formData.price) * 1.35),
        stock: parsedStock,
        rating: 5.0,
        reviewsCount: 1,
        images: formData.images,
        description: formData.description || 'Exclusive luxury atelier attire crafted with fine attention to detail.',
        details: [
          'Handcrafted with signature fabric composition',
          'Tailored comfort silhouette',
          'Care: Specialist dry clean or gentle cold wash',
        ],
        sizes: typeof formData.sizes === 'string' ? formData.sizes.split(',').map((s) => s.trim()) : formData.sizes,
        isFeatured: formData.isFeatured,
        isNewArrival: formData.isNewArrival,
        inStock: effectiveInStock,
      };
      onSaveProducts([newProduct, ...products]);
    }

    setIsModalOpen(false);
  };

  const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress/resize to safe dimensions (max 800px) so it is fast and fits in localStorage
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);

        setFormData((prev) => ({
          ...prev,
          images: [compressedDataUrl, ...(prev.images?.slice(1) || [])],
        }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleToggleSize = (size) => {
    const currentSizes = Array.isArray(formData.sizes)
      ? formData.sizes
      : typeof formData.sizes === 'string'
      ? formData.sizes.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    let updated;
    if (currentSizes.includes(size)) {
      updated = currentSizes.filter((s) => s !== size);
    } else {
      updated = [...currentSizes, size];
    }
    setFormData((prev) => ({ ...prev, sizes: updated }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white">
            Product Catalog Management
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-0.5">
            Add new merchandise, configure sizes, modify prices, and monitor inventory levels.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 bg-brand-gold text-brand-black hover:bg-brand-goldDark hover:text-white rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shadow-soft shrink-0"
        >
          <span>＋</span>
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search merchandise by title or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-neutral-500 focus:outline-none"
          />
          <svg className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <span>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-brand-gold"
            >
              <option value="all">All Categories</option>
              <option value="men">Menswear</option>
              <option value="women">Womenswear</option>
              <option value="custom">Custom Studio</option>
            </select>
          </div>

          {/* Stock Filter */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <span>Stock:</span>
            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-brand-gold"
            >
              <option value="all">All Inventory</option>
              <option value="instock">In Stock (&gt; 5)</option>
              <option value="lowstock">Low Stock (1 - 5)</option>
              <option value="outofstock">Out of Stock (0)</option>
            </select>
          </div>

          <span className="text-xs text-neutral-500 hidden sm:inline">
            Showing <strong className="text-white font-medium">{filteredProducts.length}</strong> items
          </span>
        </div>
      </div>

      {/* Desktop Products Table (hidden on mobile, visible on lg+) */}
      <div className="hidden lg:block bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/60 text-neutral-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-semibold">Merchandise</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Sizes</th>
                <th className="py-3 px-4 font-semibold text-center min-w-[170px]">Stock & Inventory</th>
                <th className="py-3 px-4 font-semibold text-center">Featured</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-neutral-500 text-xs font-light">
                    No products matched your search filter.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const stockCount = typeof product.stock === 'number' ? product.stock : (product.inStock !== false ? 15 : 0);
                  const inStock = stockCount > 0 && product.inStock !== false;
                  const isLow = inStock && stockCount <= 5;
                  return (
                    <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Merchandise Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0] || '/images/products/polo-tshirt.jpg'}
                            alt={product.name}
                            className="w-12 h-14 object-cover rounded-lg border border-neutral-800 bg-neutral-900 shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/products/polo-tshirt.jpg';
                            }}
                          />
                          <div className="space-y-0.5 max-w-xs">
                            <div className="font-medium text-white truncate">{product.name}</div>
                            <div className="font-mono text-[10px] text-neutral-500">{product.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-neutral-300">
                        <span className="capitalize">{product.category}</span>
                        {product.subCategory && (
                          <span className="text-neutral-500 text-[10px] block">
                            {product.subCategory}
                          </span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-white">{formatPrice(product.price)}</div>
                        {product.originalPrice && (
                          <div className="text-[10px] text-neutral-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                        )}
                      </td>

                      {/* Sizes */}
                      <td className="py-3.5 px-4 text-neutral-400">
                        <div className="flex flex-wrap gap-1 max-w-[120px]">
                          {(product.sizes || []).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-neutral-800 text-[9px] text-neutral-300 font-mono">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Stock & Inventory Controls */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          {/* Stock badge */}
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider ${
                                !inStock
                                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                                  : isLow
                                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              }`}
                            >
                              {!inStock ? 'Sold Out' : isLow ? `Low: ${stockCount}` : `${stockCount} in stock`}
                            </span>
                          </div>

                          {/* Inline adjustment controls: [-] [count] [+] [+10] */}
                          <div className="inline-flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 shadow-inner">
                            <button
                              type="button"
                              onClick={() => handleAdjustStock(product.id, -1)}
                              disabled={stockCount <= 0}
                              className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-white disabled:opacity-20 disabled:hover:text-neutral-400 rounded transition-colors text-xs font-bold"
                              title="Decrease 1 unit"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-mono text-[11px] font-semibold text-white">
                              {stockCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAdjustStock(product.id, 1)}
                              className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-white rounded transition-colors text-xs font-bold"
                              title="Increase 1 unit"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAdjustStock(product.id, 10)}
                              className="ml-1 px-1.5 py-0.5 text-[9px] bg-neutral-800 hover:bg-neutral-700 text-brand-gold rounded transition-colors font-mono font-medium"
                              title="Quick Restock +10 units"
                            >
                              +10
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(product)}
                          className={`w-6 h-6 rounded-full inline-flex items-center justify-center transition-all ${
                            product.isFeatured
                              ? 'bg-brand-gold text-black font-bold'
                              : 'bg-neutral-800 text-neutral-600 hover:text-white'
                          }`}
                          title="Toggle Featured item on homepage"
                        >
                          ★
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(product)}
                            className="p-1.5 hover:bg-neutral-800 text-neutral-300 hover:text-brand-gold rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            className="p-1.5 hover:bg-rose-950/40 text-neutral-400 hover:text-rose-400 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Mobile View Alone (lg:hidden) */}
      <div className="lg:hidden space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-8 text-center text-neutral-500 text-xs font-light">
            No products matched your search filter.
          </div>
        ) : (
          filteredProducts.map((product) => {
            const stockCount = typeof product.stock === 'number' ? product.stock : (product.inStock !== false ? 15 : 0);
            const inStock = stockCount > 0 && product.inStock !== false;
            const isLow = inStock && stockCount <= 5;

            return (
              <div
                key={product.id}
                className="bg-[#141414] border border-neutral-800 rounded-2xl p-3.5 space-y-3 shadow-card"
              >
                {/* Top: Thumbnail, Name, Price, and Star */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.images?.[0] || '/images/products/polo-tshirt.jpg'}
                      alt={product.name}
                      className="w-14 h-16 object-cover rounded-xl border border-neutral-800 bg-neutral-900 shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/products/polo-tshirt.jpg';
                      }}
                    />
                    <div className="min-w-0 space-y-1">
                      <div className="font-medium text-white text-xs leading-snug line-clamp-1">
                        {product.name}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                        <span className="font-mono text-neutral-500">{product.id}</span>
                        <span>•</span>
                        <span className="capitalize">{product.category}</span>
                        {product.subCategory && (
                          <>
                            <span>•</span>
                            <span className="text-neutral-500 truncate max-w-[80px]">{product.subCategory}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2 pt-0.5">
                        <span className="text-xs font-bold text-white">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-neutral-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Featured Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(product)}
                    className={`w-7 h-7 rounded-full inline-flex items-center justify-center shrink-0 transition-all ${
                      product.isFeatured
                        ? 'bg-brand-gold text-black font-bold shadow-sm'
                        : 'bg-neutral-800 text-neutral-500 hover:text-white'
                    }`}
                    title="Toggle Featured"
                  >
                    ★
                  </button>
                </div>

                {/* Stock status & Sizes */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-800/60">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider ${
                      !inStock
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        : isLow
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {!inStock ? 'Sold Out' : isLow ? `Low: ${stockCount}` : `${stockCount} in stock`}
                  </span>

                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex items-center gap-1">
                      {product.sizes.slice(0, 3).map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[9px] text-neutral-300 font-mono">
                          {s}
                        </span>
                      ))}
                      {product.sizes.length > 3 && (
                        <span className="text-[9px] text-neutral-500 font-mono">
                          +{product.sizes.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Inventory adjustment & Actions */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-800/60">
                  {/* Stock Stepper */}
                  <div className="inline-flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={() => handleAdjustStock(product.id, -1)}
                      disabled={stockCount <= 0}
                      className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white disabled:opacity-20 rounded transition-colors text-xs font-bold"
                      title="Decrease 1"
                    >
                      −
                    </button>
                    <span className="w-7 text-center font-mono text-[11px] font-semibold text-white">
                      {stockCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAdjustStock(product.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white rounded transition-colors text-xs font-bold"
                      title="Increase 1"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdjustStock(product.id, 10)}
                      className="ml-1 px-1.5 py-0.5 text-[9px] bg-neutral-800 hover:bg-neutral-700 text-brand-gold rounded transition-colors font-mono font-bold"
                      title="Quick Restock +10"
                    >
                      +10
                    </button>
                  </div>

                  {/* Edit and Delete Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(product)}
                      className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 bg-neutral-900 border border-neutral-800 hover:bg-rose-950/40 text-neutral-400 hover:text-rose-400 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Product Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141414] border border-neutral-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 text-white max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close Modal"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold block">
                {editingProduct ? 'EDIT MERCHANDISE' : 'NEW CATALOG ADDITION'}
              </span>
              <h2 className="font-serif text-2xl font-medium text-white">
                {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Atelier Product'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Product Image Upload from File Manager */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                  Product Image
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl">
                  {/* Live Image Preview */}
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-black border border-neutral-700 shrink-0 flex items-center justify-center shadow-inner">
                    {formData.images?.[0] ? (
                      <img
                        src={formData.images[0]}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/products/polo-tshirt.jpg';
                        }}
                      />
                    ) : (
                      <div className="text-center p-2 text-neutral-500">
                        <svg className="w-6 h-6 mx-auto mb-1 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[9px]">No photo</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-grow space-y-2 text-center sm:text-left">
                    <div>
                      <input
                        type="file"
                        id="admin-product-file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="admin-product-file"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-gold hover:bg-brand-goldDark text-brand-black rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all shadow-soft"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Upload From File Manager</span>
                      </label>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400">
                      <span>Choose any PNG, JPG, or WEBP from your device.</span>
                      <button
                        type="button"
                        onClick={() => setShowUrlInput(!showUrlInput)}
                        className="text-brand-gold hover:underline text-[11px] font-medium"
                      >
                        {showUrlInput ? 'Hide URL field' : 'Or use Image URL'}
                      </button>
                    </div>

                    {showUrlInput && (
                      <input
                        type="text"
                        value={formData.images[0] || ''}
                        onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                        placeholder="/images/products/shirt-white-textured.jpg"
                        className="w-full bg-black/60 border border-neutral-700 focus:border-brand-gold rounded-xl px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none font-mono"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Heavyweight French Terry Boxy Tee"
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>

              {/* Category & SubCategory Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="custom">Custom Studio</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                    SubCategory
                  </label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    placeholder="e.g. Shirts, Pants, Tops, Jeans"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Price, Strike Price & Inventory Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 1999"
                    required
                    min="1"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                    Strike Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="Optional strike price"
                    min="0"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                    Stock Units *
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="e.g. 25"
                    required
                    min="0"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Available Sizes Toggle Buttons */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                  Available Sizes (Click to toggle)
                </label>
                <div className="flex flex-wrap gap-2">
                  {STANDARD_SIZES.map((sz) => {
                    const currentSizes = Array.isArray(formData.sizes)
                      ? formData.sizes
                      : typeof formData.sizes === 'string'
                      ? formData.sizes.split(',').map((s) => s.trim())
                      : [];
                    const isSelected = currentSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleToggleSize(sz)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                          isSelected
                            ? 'bg-brand-gold text-black border-brand-gold shadow-sm'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        {sz} {isSelected ? '✓' : '+'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                  Editorial Description
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe silhouette, fabric composition, and detailing..."
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>

              {/* Checkboxes: inStock, isFeatured, isNewArrival */}
              <div className="flex flex-wrap items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 rounded border-neutral-700 text-brand-gold accent-brand-gold"
                  />
                  <span className="text-neutral-300">In Stock for Immediate Order</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded border-neutral-700 text-brand-gold accent-brand-gold"
                  />
                  <span className="text-neutral-300">Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    className="w-4 h-4 rounded border-neutral-700 text-brand-gold accent-brand-gold"
                  />
                  <span className="text-neutral-300">New Arrival Capsule Badge</span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl uppercase tracking-widest font-medium transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-1/2 py-3 bg-brand-gold hover:bg-brand-goldDark text-black font-semibold rounded-xl uppercase tracking-widest transition-colors shadow-soft"
                >
                  {editingProduct ? 'Save Product Changes' : 'Publish Product to Store'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
