/**
 * SectionHeading Component
 * Renders luxury typography with subtitle, serif title, and optional description
 */
export const SectionHeading = ({
  subtitle,
  title,
  description,
  align = 'center',
  className = '',
  titleClassName = '',
  children
}) => {
  const alignClasses = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
    right: 'text-right ml-auto items-end'
  };

  return (
    <div className={`flex flex-col max-w-2xl ${alignClasses[align] || alignClasses.center} ${className}`}>
      {subtitle && (
        <span className="text-[11px] font-semibold uppercase tracking-ultraLuxe text-brand-gold mb-2.5 block">
          {subtitle}
        </span>
      )}
      <h2 className={`font-serif text-2xl sm:text-3xl md:text-4xl text-brand-black tracking-tight font-medium ${titleClassName}`}>
        {title}
      </h2>
      <div className={`h-0.5 w-12 bg-brand-gold my-3.5 ${align === 'center' ? 'mx-auto' : ''}`} />
      {description && (
        <p className="text-sm md:text-base text-neutral-900 leading-relaxed font-normal mt-1 max-w-xl">
          {description}
        </p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default SectionHeading;
