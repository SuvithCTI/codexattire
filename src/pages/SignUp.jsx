import { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, isAuthenticated } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const redirectPath = location.state?.from || '/account';

  // Password strength evaluation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score: 2, label: 'Moderate', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  }, [password]);

  // If already authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center px-4 py-10">
        <div className="bg-white p-7 sm:p-9 rounded-2xl shadow-luxe border border-brand-warmBeige/40 max-w-md w-full text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-brand-black text-brand-gold font-serif text-2xl font-bold flex items-center justify-center mx-auto">
            ✓
          </div>
          <div>
            <h2 className="font-serif text-2xl text-black font-semibold">You're already a member</h2>
            <p className="text-neutral-600 text-xs sm:text-sm mt-1">
              Your account is active. Explore your personalized atelier dashboard or browse collections.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link
              to="/account"
              className="w-full py-3 bg-brand-black text-white hover:bg-neutral-800 text-xs uppercase tracking-widest font-medium rounded-lg transition-colors"
            >
              Go to My Account
            </Link>
            <Link
              to="/men"
              className="w-full py-3 bg-brand-sand text-brand-black hover:bg-brand-beige text-xs uppercase tracking-widest font-medium rounded-lg transition-colors border border-brand-warmBeige"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both entries.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    const result = await signup({ fullName, email, phone, password });
    setIsLoading(false);

    if (result.success) {
      navigate(redirectPath, { replace: true });
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="min-h-[82vh] bg-[#FAF8F5] flex flex-col justify-center py-6 sm:py-10 relative overflow-hidden">
      {/* Subtle Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('/images/banners/contact-atelier-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/95 to-[#FAF8F5] pointer-events-none" />

      {/* Increased Length (Wider container max-w-2xl) & Reduced Height */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 w-full my-auto">
        <div className="bg-white rounded-3xl shadow-luxe border border-brand-warmBeige/40 p-6 sm:px-10 sm:py-7 space-y-4">
          
          {/* Segmented Mode Switcher */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-2xl border border-neutral-200 max-w-md mx-auto w-full">
            <Link
              to="/login"
              state={{ from: redirectPath }}
              className="w-1/2 py-2 rounded-xl text-neutral-600 hover:text-black hover:bg-white/60 text-xs font-semibold uppercase tracking-wider transition-all text-center"
            >
              Sign In
            </Link>
            <button
              type="button"
              className="w-1/2 py-2 rounded-xl bg-black text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all text-center"
            >
              Create Account
            </button>
          </div>

          {/* Header */}
          <div className="space-y-0.5 text-center">
            <h1 className="font-serif text-2xl sm:text-3xl text-black font-semibold tracking-tight">
              Create Account
            </h1>
            <p className="text-neutral-500 text-xs font-light">
              Join KODE X ATTIRE to enjoy bespoke privileges and order tracking.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2">
              <svg className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Row 1: Full Name & Email Address (2 Columns for compact height) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-black">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maya Sharma"
                  required
                  autoComplete="name"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-black focus:bg-white rounded-xl px-3.5 py-2 text-sm text-black placeholder-neutral-400 transition-colors focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-black">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  autoComplete="email"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-black focus:bg-white rounded-xl px-3.5 py-2 text-sm text-black placeholder-neutral-400 transition-colors focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2: Phone Number */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-black">
                  Phone Number
                </label>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Optional</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-black focus:bg-white rounded-xl px-3.5 py-2 text-sm text-black placeholder-neutral-400 transition-colors focus:outline-none"
              />
            </div>

            {/* Row 3: Password & Confirm Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-black">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  {passwordStrength.label && (
                    <span className="text-[10px] text-neutral-500 font-medium">
                      {passwordStrength.label}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    required
                    autoComplete="new-password"
                    className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-black focus:bg-white rounded-xl px-3.5 py-2 text-sm text-black placeholder-neutral-400 transition-colors focus:outline-none pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                    aria-label="Toggle password view"
                  >
                    {showPassword ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {password && (
                  <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden mt-0.5">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.score / 3) * 100}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-black">
                  Confirm <span className="text-rose-500">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  required
                  autoComplete="new-password"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-black focus:bg-white rounded-xl px-3.5 py-2 text-sm text-black placeholder-neutral-400 transition-colors focus:outline-none"
                />
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="space-y-1.5 pt-0.5">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-black focus:ring-black accent-black shrink-0"
                />
                <span className="text-[11px] text-neutral-600 font-light leading-snug">
                  I agree to the{' '}
                  <Link to="/terms-and-conditions" target="_blank" className="text-black font-medium underline hover:text-brand-gold">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" target="_blank" className="text-black font-medium underline hover:text-brand-gold">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-black focus:ring-black accent-black shrink-0"
                />
                <span className="text-[11px] text-neutral-600 font-light leading-snug">
                  Receive bespoke invitations to seasonal capsules and private atelier events.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-1.5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-brand-black hover:bg-neutral-800 active:bg-black text-brand-cream text-xs uppercase tracking-[0.2em] font-medium rounded-xl transition-all shadow-soft disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Creating Profile...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </div>
          </form>

          {/* Bottom Switch to Login */}
          <div className="pt-1 text-center border-t border-neutral-100">
            <p className="text-xs text-neutral-600 font-light">
              Already have an account?{' '}
              <Link
                to="/login"
                state={{ from: redirectPath }}
                className="font-semibold text-black underline underline-offset-4 hover:text-brand-gold transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
