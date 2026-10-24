import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import ProductSearch from '../components/products/ProductSearch';
import { getProductsByCategory, CATEGORIES } from '../data/products';

export const Women = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allWomenProducts = useMemo(() => getProductsByCategory('women'), []);

  // State initialized from URL params if present
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || 'All');
  const [selectedSort, setSelectedSort] = useState(() => searchParams.get('sort') || 'featured');

  // Sync state when URL params change
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCategory = searchParams.get('category');
    const urlSort = searchParams.get('sort');

    if (urlSearch !== null) setSearchQuery(urlSearch);
    if (urlCategory !== null) setSelectedCategory(urlCategory);
    if (urlSort !== null) setSelectedSort(urlSort);
  }, [searchParams]);

  // Handle category change & update URL
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  // Handle search change & update URL
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSort('featured');
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return allWomenProducts
      .filter((p) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesDesc = p.description.toLowerCase().includes(q);
          const matchesCat = p.subCategory.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesCat) return false;
        }

        // Category filter
        if (selectedCategory !== 'All') {
          if (p.subCategory.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'price-asc') return a.price - b.price;
        if (selectedSort === 'price-desc') return b.price - a.price;
        if (selectedSort === 'rating') return b.rating - a.rating;
        if (selectedSort === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [allWomenProducts, searchQuery, selectedCategory, selectedSort]);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Page Banner Header with Light Pink Background */}
      <div className="bg-[#FCE7F3]/70 border-b border-pink-200 py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              align="left"
              subtitle="Women’s Department"
              title="Fluid Drapery & Modern Silhouettes"
              description="Contemporary tops, curated denim, and artisanal kurta sets tailored for the modern muse."
            />

            <ProductSearch
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              placeholder="Search tops, jeans, kurta sets..."
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Filter Toolbar */}
        <ProductFilters
          categories={CATEGORIES.women}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
        />

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          emptyTitle="No womenswear pieces found"
          emptyDescription={`We couldn't find any designs matching "${searchQuery || selectedCategory}". Try adjusting your criteria or exploring another category.`}
          onResetFilters={handleResetFilters}
          columns={3}
        />
      </div>
    </div>
  );
};

export default Women;
