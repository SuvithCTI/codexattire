import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, requestPasswordReset, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');

  const redirectPath = (location.state?.from && location.state.from !== '/account') ? location.state.from : '/';

  // If already authenticated
  if (isAuthenticated && user) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center px-4 py-10">
        <div className="bg-white p-7 sm:p-9 rounded-2xl shadow-luxe border border-brand-warmBeige/40 max-w-md w-full text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-brand-black text-brand-gold font-serif text-2xl font-bold flex items-center justify-center mx-auto">
            {user.avatarInitials || 'U'}
          </div>
          <div>
            <h2 className="font-serif text-2xl text-black font-semibold">You're already signed in</h2>
            <p className="text-neutral-600 text-xs sm:text-sm mt-1">
              Logged in as <span className="font-medium text-black">{user.fullName}</span> ({user.email})
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
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both your email and password.');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password, rememberMe);
    setIsLoading(false);

    if (result.success) {
      if (result.user?.role === 'admin' || result.user?.email === 'admin@kodexattire.com') {
        navigate('/admin', { replace: true });
      } else {
        navigate(redirectPath, { replace: true });
      }
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (!forgotEmail.trim()) {
      setForgotError('Please enter your email address.');
      return;
    }

    setForgotLoading(true);
    const res = await requestPasswordReset(forgotEmail);
    setForgotLoading(false);

    if (res.success) {
      setForgotSuccess(res.message);
    } else {
      setForgotError(res.error);
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

      {/* Increased Length (Wider container max-w-xl) & Reduced Height */}
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 w-full my-auto">
        <div className="bg-white rounded-3xl shadow-luxe border border-brand-warmBeige/40 p-6 sm:px-10 sm:py-7 space-y-4">
          
          {/* Segmented Mode Switcher */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-2xl border border-neutral-200 max-w-md mx-auto w-full">
            <button
              type="button"
              className="w-1/2 py-2 rounded-xl bg-black text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all text-center"
            >
              Sign In
            </button>
            <Link
              to="/signup"
              state={{ from: redirectPath }}
              className="w-1/2 py-2 rounded-xl text-neutral-600 hover:text-black hover:bg-white/60 text-xs font-semibold uppercase tracking-wider transition-all text-center"
            >
              Create Account
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-0.5 text-center">
            <h1 className="font-serif text-2xl sm:text-3xl text-black font-semibold tracking-tight">
              Sign In
            </h1>
            <p className="text-neutral-500 text-xs font-light">
              Enter your email address and password to access your account.
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
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-black">
                Email / Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com or admin"
                  required
                  autoComplete="username"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-black focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 transition-colors focus:outline-none"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-black">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs text-neutral-500 hover:text-black font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-black focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 transition-colors focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black accent-black"
                />
                <span className="text-xs text-neutral-600 font-light select-none">
                  Stay signed in on this device
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
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>
          </form>

          {/* Bottom Switch to Sign Up */}
          <div className="pt-1 text-center border-t border-neutral-100">
            <p className="text-xs text-neutral-600 font-light">
              New to KODE X ATTIRE?{' '}
              <Link
                to="/signup"
                state={{ from: redirectPath }}
                className="font-semibold text-black underline underline-offset-4 hover:text-brand-gold transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-brand-warmBeige relative">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setForgotSuccess('');
                setForgotError('');
              }}
              className="absolute right-5 top-5 text-neutral-400 hover:text-black transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold block">
                PASSWORD RECOVERY
              </span>
              <h3 className="font-serif text-2xl text-black font-semibold">
                Reset your password
              </h3>
              <p className="text-xs text-neutral-500 font-light">
                Enter your registered email address and we'll dispatch a secure recovery link.
              </p>
            </div>

            {forgotSuccess ? (
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs space-y-1">
                  <div className="font-semibold">Reset Link Sent</div>
                  <div>{forgotSuccess}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="w-full py-3 bg-black text-white rounded-xl text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
                {forgotError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
                    {forgotError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-1.5">
                    Account Email
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-black focus:bg-white rounded-xl px-4 py-3 text-sm text-black placeholder-neutral-400 transition-colors focus:outline-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="w-1/2 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs uppercase tracking-widest font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-1/2 py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs uppercase tracking-widest font-medium transition-colors disabled:opacity-50"
                  >
                    {forgotLoading ? 'Sending...' : 'Send Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
