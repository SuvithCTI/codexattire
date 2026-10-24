export const ProductFilters = ({
  categories = [],
  selectedCategory = 'All',
  onSelectCategory,
  selectedSort = 'featured',
  onSelectSort,
}) => {
  const sortOptions = [
    { label: 'Featured & Editorial', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Newest Arrivals', value: 'newest' },
  ];

  return (
    <div className="bg-white border border-brand-border/70 rounded-xl p-3 sm:p-5 mb-6 sm:mb-8 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        {/* Category Pills with smooth horizontal touch-scroll */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1">
          {categories.map((cat) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.toLowerCase() ||
              (selectedCategory === 'All' && cat.startsWith('All'));
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat.startsWith('All') ? 'All' : cat)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-brand-black text-brand-cream shadow-sm scale-100'
                    : 'bg-brand-sand text-brand-dark hover:bg-brand-beige'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
          <label htmlFor="sort-select" className="text-[11px] sm:text-xs uppercase tracking-wider text-brand-muted font-bold shrink-0">
            Sort By:
          </label>
          <select
            id="sort-select"
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value)}
            className="bg-brand-sand border border-brand-border text-xs rounded-lg px-2.5 sm:px-3 py-1.5 font-medium text-brand-black focus:outline-none focus:border-brand-gold cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
