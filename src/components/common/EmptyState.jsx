import Button from './Button';

/**
 * EmptyState component for graceful blank slates (empty cart, no search results, etc.)
 */
export const EmptyState = ({
  icon,
  title = 'No items found',
  description = 'We couldn\'t find what you are looking for. Please try adjusting your filters or browse our collections.',
  actionLabel,
  actionTo,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 md:p-16 bg-white border border-brand-border rounded-lg max-w-xl mx-auto shadow-card ${className}`}>
      <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center text-brand-gold mb-5">
        {icon || (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )}
      </div>

      <h3 className="font-serif text-xl sm:text-2xl text-brand-black mb-2">
        {title}
      </h3>

      <p className="text-neutral-900 text-sm leading-relaxed max-w-md mb-6 font-normal">
        {description}
      </p>

      {(actionLabel && (actionTo || onAction)) && (
        <Button
          to={actionTo}
          onClick={onAction}
          variant="primary"
          size="md"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
