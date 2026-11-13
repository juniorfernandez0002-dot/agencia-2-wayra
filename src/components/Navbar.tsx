import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Compass,
  Menu,
  ShoppingCart,
  Trash2,
  X
} from 'lucide-react';
import { BrandMark } from './BrandMark';
import { WhatsAppLogo } from './SocialIcons';
import { TOURS_CATALOG } from '../data/toursData';
import { useWayra } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const {
    currency,
    setCurrency,
    formatPrice,
    cartSlugs,
    toggleCartSlug,
    clearCart,
    buildWhatsAppUrl
  } = useWayra();

  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const cartTours = TOURS_CATALOG.filter((t) => cartSlugs.includes(t.slug));
  const cartTotalUsd = cartTours.reduce((acc, item) => acc + item.priceUsd, 0);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCartOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  const navItems = [
    { to: '/destinos', label: 'Destinos' },
    { to: '/catalogo', label: 'Experiencias' },
    { to: '/catalogo?vibe=paquetes', label: 'Paquetes' },
    { to: '/nosotros', label: 'Visión & Misión' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFDF8]/92 backdrop-blur-md border-b border-[#162A22]/8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <BrandMark className="w-10 h-10 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3" />
            <div>
              <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#162A22] leading-none block">
                WAYRA
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0D9F8B] block mt-0.5">
                Perú a Color
              </span>
            </div>
          </Link>

          {/* Center Minimal Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#FFF6EB] border border-[#162A22]/8 rounded-full px-2 py-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive && !location.search.includes('vibe=paquetes')
                      ? 'bg-white text-[#F26430] shadow-xs'
                      : 'text-[#162A22] hover:text-[#F26430]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Currency Switcher */}
            <div
              role="group"
              aria-label="Cambiar moneda"
              className="hidden sm:flex items-center bg-[#FFF6EB] border border-[#162A22]/10 rounded-full p-0.5 text-xs num-tabular"
            >
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-full font-bold transition-colors cursor-pointer ${
                  currency === 'USD' ? 'bg-[#162A22] text-white' : 'text-[#4C6257] hover:text-[#162A22]'
                }`}
              >
                USD
              </button>
              <button
                type="button"
                onClick={() => setCurrency('PEN')}
                className={`px-2.5 py-1 rounded-full font-bold transition-colors cursor-pointer ${
                  currency === 'PEN' ? 'bg-[#162A22] text-white' : 'text-[#4C6257] hover:text-[#162A22]'
                }`}
              >
                PEN
              </button>
            </div>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir carrito (${cartSlugs.length} rutas)`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF6EB] hover:bg-[#FFF0E5] border border-[#162A22]/12 text-[#162A22] text-xs font-bold transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-[#F26430]" />
              <span className="hidden sm:inline">Carrito</span>
              <span className="num-tabular px-1.5 py-0.5 rounded-full bg-[#F26430] text-white text-[11px] leading-none">
                {cartSlugs.length}
              </span>
            </button>

            {/* Official WhatsApp Button */}
            <a
              href={buildWhatsAppUrl('Hola equipo Wayra, me encantaría armar mi viaje por Perú.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF8F4] hover:bg-[#0D9F8B] border border-[#25D366]/40 text-[#162A22] hover:text-white text-xs font-bold transition-colors"
            >
              <WhatsAppLogo className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Builder CTA */}
            <Link
              to="/planificador"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F26430] hover:bg-[#D64E1D] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Diseñar Viaje</span>
            </Link>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menú"
              className="lg:hidden p-2 rounded-full bg-[#FFF6EB] border border-[#162A22]/12 text-[#162A22] cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-[#FFFDF8] border-b border-[#162A22]/10"
            >
              <div className="px-4 py-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="p-3 rounded-xl bg-[#FFF6EB] text-sm font-bold text-[#162A22]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                {/* Native Mobile Currency Bar */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF6EB]/65 border border-[#162A22]/10">
                  <span className="text-xs font-bold text-[#4C6257]">Moneda de viaje</span>
                  <div className="flex items-center gap-1 bg-white rounded-full p-0.5 border border-[#162A22]/10 text-xs num-tabular">
                    <button
                      type="button"
                      onClick={() => setCurrency('USD')}
                      className={`px-3 py-1 rounded-full font-bold cursor-pointer ${
                        currency === 'USD' ? 'bg-[#162A22] text-white' : 'text-[#4C6257]'
                      }`}
                    >
                      USD $
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency('PEN')}
                      className={`px-3 py-1 rounded-full font-bold cursor-pointer ${
                        currency === 'PEN' ? 'bg-[#162A22] text-white' : 'text-[#4C6257]'
                      }`}
                    >
                      PEN S/
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <a
                    href={buildWhatsAppUrl('Hola Wayra, quiero asesoría para viajar por Perú.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-[#ECF8F4] border border-[#25D366]/40 text-[#162A22] text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <WhatsAppLogo className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <Link
                    to="/planificador"
                    className="flex-1 py-2.5 rounded-xl bg-[#F26430] text-white text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Diseñar Viaje</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Slide-Over Animated Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setCartOpen(false);
            }}
            className="fixed inset-0 z-50 bg-[#162A22]/45 backdrop-blur-xs flex justify-end"
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-full max-w-md bg-[#FFFDF8] h-full shadow-2xl border-l border-[#162A22]/10 flex flex-col justify-between"
            >
              <div className="p-5 border-b border-[#162A22]/10 flex items-center justify-between">
                <div>
                  <span className="eyebrow-wayra text-[#0D9F8B] block">Carrito de Viajes</span>
                  <h3 className="font-display text-2xl font-bold text-[#162A22]">
                    Tu Carrito ({cartTours.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Cerrar carrito"
                  className="p-2 rounded-full bg-[#FFF6EB] hover:bg-[#F26430] hover:text-white text-[#162A22] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
                {cartTours.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-[#FFF6EB] text-[#F26430] mx-auto flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-[#162A22]">
                      Tu mochila está vacía
                    </h4>
                    <p className="text-sm text-[#4C6257] max-w-xs mx-auto">
                      Pulsa el carrito en cualquier tour o paquete para armar tu itinerario ideal y cotizar todo junto.
                    </p>
                  </div>
                ) : (
                  cartTours.map((tour) => (
                    <motion.div
                      layout
                      key={tour.id}
                      className="p-3 rounded-2xl bg-white border border-[#162A22]/10 shadow-xs flex gap-3.5 items-center"
                    >
                      <img
                        src={tour.heroImage}
                        alt={tour.shortTitle}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold text-[#0D9F8B] num-tabular">
                          {tour.durationLabel} · {tour.destinationName}
                        </span>
                        <Link
                          to={`/tours/${tour.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="font-display font-bold text-sm text-[#162A22] hover:text-[#F26430] block truncate mt-0.5"
                        >
                          {tour.shortTitle}
                        </Link>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="font-bold text-sm text-[#F26430] num-tabular">
                            {formatPrice(tour.priceUsd)}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleCartSlug(tour.slug)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#4C6257] hover:text-[#F26430] cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Quitar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-5 bg-[#FFF6EB] border-t border-[#162A22]/10 space-y-3">
                {cartTours.length > 0 && (
                  <div className="flex items-center justify-between text-sm font-bold text-[#162A22] num-tabular">
                    <span>Estimado base por persona:</span>
                    <span className="text-lg text-[#F26430]">{formatPrice(cartTotalUsd)}</span>
                  </div>
                )}

                <Link
                  to="/planificador"
                  onClick={() => setCartOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#F26430] hover:bg-[#D64E1D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>Cotizar mi Carrito a Medida</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                {cartTours.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full py-2 text-xs font-semibold text-[#4C6257] hover:text-[#F26430] cursor-pointer"
                  >
                    Vaciar carrito
                  </button>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
