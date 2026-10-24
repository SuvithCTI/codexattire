import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import storage from '../utils/storage';

export const AuthContext = createContext(null);

const DEFAULT_USERS = [
  {
    id: 'usr_admin_01',
    fullName: 'Atelier Director (Admin)',
    email: 'admin@kodexattire.com',
    phone: '+91 98765 00000',
    password: 'admin',
    role: 'admin',
    joinedDate: 'January 2024',
    tier: 'Executive Administrator',
    avatarInitials: 'AD',
    addresses: [],
    orders: [],
  },
  {
    id: 'usr_demo123',
    fullName: 'Alex Mercer',
    email: 'alex.mercer@example.com',
    phone: '+91 98765 43210',
    password: 'Password123!',
    role: 'client',
    joinedDate: 'October 2024',
    tier: 'Noir Atelier Member',
    avatarInitials: 'AM',
    addresses: [
      {
        id: 'addr_1',
        firstName: 'Alex',
        lastName: 'Mercer',
        email: 'alex.mercer@example.com',
        phone: '+91 98765 43210',
        street: '12 Richmond Residency, Lavelle Road',
        apartment: 'Penthouse 4B',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        addressType: 'Home',
        isDefault: true,
      },
    ],
    orders: [
      {
        id: 'KDX-8921-BLR',
        date: '20 Oct 2024',
        total: 5499,
        status: 'Delivered',
        paymentMethod: 'UPI',
        items: [
          {
            name: 'Heavyweight French Terry Boxy Tee',
            quantity: 1,
            size: 'L',
            color: 'Onyx Black',
            price: 2499,
          },
          {
            name: 'Tailored Relaxed Pleated Trousers',
            quantity: 1,
            size: '32',
            color: 'Bone White',
            price: 3000,
          },
        ],
      },
    ],
  },
];

export const AuthProvider = ({ children }) => {
  // Registered accounts stored in localStorage
  const [users, setUsers] = useState(() => {
    const saved = storage.get('registered_users', null);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      storage.set('registered_users', DEFAULT_USERS);
      return DEFAULT_USERS;
    }
    // Ensure default admin and demo users are present even if storage was initialized previously
    const hasAdmin = saved.some((u) => u.email.toLowerCase() === 'admin@kodexattire.com');
    if (!hasAdmin) {
      const merged = [DEFAULT_USERS[0], ...saved];
      storage.set('registered_users', merged);
      return merged;
    }
    return saved;
  });

  // Current logged in user
  const [user, setUser] = useState(() => {
    return storage.get('auth_user', null);
  });

  const [notification, setNotification] = useState(null);

  const triggerNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  }, []);

  // Sync users to storage
  useEffect(() => {
    storage.set('registered_users', users);
  }, [users]);

  // Sync current user to storage
  useEffect(() => {
    if (user) {
      storage.set('auth_user', user);
    } else {
      storage.remove('auth_user');
    }
  }, [user]);

  /**
   * Helper to derive initials from a full name
   */
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  /**
   * Login with email and password
   */
  const login = async (email, password, rememberMe = true) => {
    // Artificial slight delay for realistic luxury UX response feel
    await new Promise((resolve) => setTimeout(resolve, 350));

    const normalizedEmail = email.trim().toLowerCase();

    // Direct Admin Login bypass
    if (
      (normalizedEmail === 'admin@kodexattire.com' || normalizedEmail === 'admin') &&
      password === 'admin'
    ) {
      const adminUser = DEFAULT_USERS[0];
      setUser(adminUser);
      setUsers((prev) => (prev.some((u) => u.email === adminUser.email) ? prev : [adminUser, ...prev]));
      triggerNotification('Welcome back, Atelier Director!', 'success');
      return { success: true, user: adminUser };
    }

    const existing = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail || (normalizedEmail === 'admin' && u.role === 'admin')
    );

    if (!existing) {
      return {
        success: false,
        error: 'No account found with this email address. Please sign up first.',
      };
    }

    if (existing.password !== password) {
      return {
        success: false,
        error: 'Incorrect password. Please verify and try again.',
      };
    }

    const authenticatedUser = {
      ...existing,
      avatarInitials: existing.avatarInitials || getInitials(existing.fullName),
    };

    setUser(authenticatedUser);
    triggerNotification(`Welcome back, ${authenticatedUser.fullName.split(' ')[0]}!`, 'success');
    return { success: true, user: authenticatedUser };
  };

  /**
   * Signup new account
   */
  const signup = async ({ fullName, email, phone, password }) => {
    await new Promise((resolve) => setTimeout(resolve, 350));

    const normalizedEmail = email.trim().toLowerCase();
    const existing = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (existing) {
      return {
        success: false,
        error: 'An account with this email address already exists. Please log in.',
      };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || '',
      password: password,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      tier: 'Atelier Member',
      avatarInitials: getInitials(fullName),
      addresses: [],
      orders: [],
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    triggerNotification(`Welcome to KODE X ATTIRE, ${newUser.fullName.split(' ')[0]}!`, 'success');
    return { success: true, user: newUser };
  };

  /**
   * Logout current user
   */
  const logout = () => {
    const firstName = user?.fullName?.split(' ')[0] || 'User';
    setUser(null);
    storage.remove('auth_user');
    triggerNotification(`Signed out successfully. Have a great day, ${firstName}!`, 'info');
  };

  /**
   * Update profile info
   */
  const updateProfile = (updates) => {
    if (!user) return { success: false, error: 'No user is currently logged in' };

    const updatedUser = {
      ...user,
      ...updates,
      avatarInitials: updates.fullName ? getInitials(updates.fullName) : user.avatarInitials,
    };

    setUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    triggerNotification('Profile updated successfully!', 'success');
    return { success: true, user: updatedUser };
  };

  /**
   * Password reset simulation
   */
  const requestPasswordReset = async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const normalizedEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!existing) {
      return {
        success: false,
        error: 'We could not find an account associated with that email.',
      };
    }

    return {
      success: true,
      message: `A secure password reset link has been dispatched to ${normalizedEmail}.`,
    };
  };

  /**
   * Admin actions
   */
  const deleteUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    triggerNotification('User removed from atelier registry', 'info');
  };

  const updateUserTier = (userId, newTier) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, tier: newTier } : u)));
    triggerNotification(`Client tier updated to ${newTier}`, 'success');
  };

  const loginAsAdmin = () => {
    const adminUser = users.find((u) => u.role === 'admin') || DEFAULT_USERS[0];
    setUser(adminUser);
    triggerNotification('Switched to Atelier Admin Mode', 'success');
    return adminUser;
  };

  const isAdmin = user?.role === 'admin' || user?.email === 'admin@kodexattire.com';

  const value = useMemo(
    () => ({
      user,
      users,
      isAuthenticated: !!user,
      isAdmin,
      login,
      signup,
      logout,
      updateProfile,
      requestPasswordReset,
      triggerNotification,
      deleteUser,
      updateUserTier,
      loginAsAdmin,
    }),
    [user, users, isAdmin, triggerNotification]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}

      {/* Global Auth Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-black text-brand-cream border border-brand-warmBeige/40 shadow-luxe px-5 py-3.5 rounded-lg text-sm animate-fade-in-up">
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              notification.type === 'success'
                ? 'bg-emerald-400 ring-4 ring-emerald-400/20'
                : notification.type === 'error'
                ? 'bg-rose-500 ring-4 ring-rose-500/20'
                : 'bg-brand-gold ring-4 ring-brand-gold/20'
            }`}
          />
          <p className="font-light tracking-wide text-xs sm:text-sm">{notification.message}</p>
          <button
            onClick={() => setNotification(null)}
            className="text-neutral-400 hover:text-white ml-2 text-xs uppercase tracking-wider transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
