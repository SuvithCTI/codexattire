import { Link } from 'react-router-dom';

/**
 * Reusable luxury Button component supporting multiple variants, sizes, and router links
 */
export const Button = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  icon = null,
  iconPosition = 'left',
  ...rest
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs select-none';

  const variantClasses = {
    primary:
      'bg-brand-black text-brand-cream border border-brand-black hover:bg-brand-charcoal hover:border-brand-charcoal active:bg-black shadow-soft',
    secondary:
      'bg-brand-sand text-brand-black border border-brand-warmBeige hover:bg-brand-beige active:bg-brand-warmBeige',
    outline:
      'bg-transparent text-brand-black border border-brand-black hover:bg-brand-black hover:text-brand-cream active:bg-brand-charcoal',
    gold:
      'bg-brand-gold text-brand-black border border-brand-gold hover:bg-brand-goldDark hover:text-white active:bg-brand-goldDark shadow-soft',
    ghost:
      'bg-transparent text-brand-black hover:text-brand-gold hover:bg-brand-sand/50 border border-transparent',
    white:
      'bg-white text-brand-black border border-white hover:bg-brand-cream hover:border-brand-cream shadow-soft'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-[11px] gap-1.5',
    md: 'px-6 py-3.5 text-xs gap-2',
    lg: 'px-8 py-4 text-xs gap-2.5 font-semibold tracking-wider'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${widthClass} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${combinedClasses}`} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`group ${combinedClasses}`} target={rest.target || '_self'} rel="noreferrer" {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`group ${combinedClasses}`}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
