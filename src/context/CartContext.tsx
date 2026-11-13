import React, { createContext, useContext, useState } from 'react';

export type CurrencyCode = 'USD' | 'PEN';
const PEN_RATE = 3.72;
const CART_STORAGE_KEY = 'wayra_cart_slugs_v1';
const WHATSAPP_NUMBER = '51984248890';

interface CartContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (usdAmount: number) => string;
  cartSlugs: string[];
  toggleCartSlug: (slug: string) => void;
  clearCart: () => void;
  travelersCount: number;
  setTravelersCount: (n: number) => void;
  travelDate: string;
  setTravelDate: (d: string) => void;
  buildWhatsAppUrl: (message: string) => string;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [travelDate, setTravelDate] = useState<string>('2026-06-15');
  const [cartSlugs, setCartSlugs] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.slice(0, 6);
      }
    } catch {
      // storage unavailable
    }
    return [];
  });

  const formatPrice = (usdAmount: number): string => {
    if (currency === 'PEN') {
      const pen = Math.round(usdAmount * PEN_RATE);
      return `S/ ${pen.toLocaleString('en-US')}`;
    }
    return `USD $${Math.round(usdAmount).toLocaleString('en-US')}`;
  };

  const toggleCartSlug = (slug: string) => {
    setCartSlugs((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug].slice(0, 6);
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const clearCart = () => {
    setCartSlugs([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const buildWhatsAppUrl = (message: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <CartContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        cartSlugs,
        toggleCartSlug,
        clearCart,
        travelersCount,
        setTravelersCount,
        travelDate,
        setTravelDate,
        buildWhatsAppUrl
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useWayra = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useWayra debe usarse dentro de CartProvider');
  return ctx;
};
