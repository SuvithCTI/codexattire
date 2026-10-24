import { createContext, useState, useEffect, useMemo } from 'react';
import storage from '../utils/storage';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage
  const [cart, setCart] = useState(() => {
    return storage.get('cart', []);
  });

  const [notification, setNotification] = useState(null);

  // Sync to localStorage on cart change
  useEffect(() => {
    storage.set('cart', cart);
  }, [cart]);

  // Helper to trigger brief toast notification
  const triggerNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((curr) => (curr === message ? null : curr));
    }, 3200);
  };

  /**
   * Adds an item with chosen size and quantity
   */
  const addToCart = (product, { size, quantity = 1, color }) => {
    const chosenSize = size || product.sizes?.[0] || 'Standard';
    const cartItemId = color ? `${product.id}__${chosenSize}__${color}` : `${product.id}__${chosenSize}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      }

      const newItem = {
        cartItemId,
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || '',
        category: product.category,
        size: chosenSize,
        color: color || '',
        quantity: Math.max(1, quantity),
      };

      return [...prevCart, newItem];
    });

    triggerNotification(`Added "${product.name}" (${chosenSize}) to your cart.`);
  };

  /**
   * Updates line item quantity
   */
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /**
   * Removes single line item
   */
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((i) => i.cartItemId === cartItemId);
      if (itemToRemove) {
        triggerNotification(`Removed "${itemToRemove.name}" from cart.`);
      }
      return prevCart.filter((item) => item.cartItemId !== cartItemId);
    });
  };

  /**
   * Clears entire cart
   */
  const clearCart = () => {
    setCart([]);
    triggerNotification('Shopping bag cleared.');
  };

  // Calculated totals
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }, [cart]);

  const shippingThreshold = 999;
  const standardShipping = 99;
  const isFreeShipping = subtotal >= shippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : standardShipping;
  const estimatedTax = subtotal * 0.05; // 5% GST
  const total = subtotal + shippingFee + estimatedTax;

  const value = {
    cart,
    cartCount,
    subtotal,
    shippingFee,
    shippingThreshold,
    isFreeShipping,
    estimatedTax,
    total,
    notification,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    dismissNotification: () => setNotification(null),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
