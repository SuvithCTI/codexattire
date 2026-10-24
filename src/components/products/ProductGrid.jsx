import ProductCard from './ProductCard';
import EmptyState from '../common/EmptyState';

export const ProductGrid = ({
  products = [],
  loading = false,
  emptyTitle = 'No products found',
  emptyDescription = 'There are no pieces matching your current filters. Try resetting your criteria or exploring other departments.',
  onResetFilters,
  columns = 3, // 2, 3, or 4
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="bg-white rounded-xl overflow-hidden border border-brand-border/60">
            <div className="aspect-[3/4] bg-brand-sand/70 w-full" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-brand-sand rounded w-1/3" />
              <div className="h-5 bg-brand-sand rounded w-3/4" />
              <div className="h-4 bg-brand-sand rounded w-1/4 pt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onResetFilters ? 'Clear All Filters' : 'Explore Collections'}
        actionTo={onResetFilters ? undefined : '/men'}
        onAction={onResetFilters}
      />
    );
  }

  const columnClass = {
    2: 'grid-cols-2 sm:grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  }[columns] || 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${columnClass} gap-3 sm:gap-6 lg:gap-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
