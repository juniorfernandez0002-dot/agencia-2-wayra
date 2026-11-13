import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Clock,
  Eye,
  Mountain,
  ShoppingCart,
  Star
} from 'lucide-react';
import type { TourItem } from '../types/travel';
import { useWayra } from '../context/CartContext';

interface TourVisualCardProps {
  tour: TourItem;
  onQuickPreview?: (tour: TourItem) => void;
}

export const TourVisualCard: React.FC<TourVisualCardProps> = ({ tour, onQuickPreview }) => {
  const { formatPrice, cartSlugs, toggleCartSlug } = useWayra();
  const isInCart = cartSlugs.includes(tour.slug);

  return (
    <article className="group rounded-2xl overflow-hidden bg-white border border-[#162A22]/10 hover:border-[#F26430]/45 shadow-xs hover:shadow-[0_18px_40px_rgba(22,42,34,0.09)] flex flex-col justify-between transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 will-change-transform">
      <div>
        {/* Crisp Full-Bleed Photo Stage */}
        <div className="relative aspect-[16/11] overflow-hidden bg-[#FFF6EB]">
          <img
            src={tour.heroImage}
            alt={tour.shortTitle}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#162A22]/45 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#162A22]/75 via-[#162A22]/20 to-transparent" />

          {/* Top Pills + Actions */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            {tour.promoBadge ? (
              <span className="px-2.5 py-1 rounded-full bg-[#F26430] text-white text-[10.5px] font-bold shadow-sm">
                {tour.promoBadge}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-white/95 text-[#162A22] text-[10.5px] font-bold shadow-xs">
                {tour.destinationName}
              </span>
            )}

            <div className="flex items-center gap-1.5">
              {onQuickPreview && (
                <button
                  type="button"
                  onClick={() => onQuickPreview(tour)}
                  title="Vista rápida interactiva"
                  aria-label={`Vista rápida de ${tour.shortTitle}`}
                  className="p-2 rounded-full bg-white/90 hover:bg-[#0D9F8B] text-[#162A22] hover:text-white shadow-sm transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => toggleCartSlug(tour.slug)}
                aria-pressed={isInCart}
                title={isInCart ? 'En tu carrito' : 'Agregar al carrito'}
                aria-label={isInCart ? `Quitar ${tour.shortTitle} del carrito` : `Agregar ${tour.shortTitle} al carrito`}
                className={`p-2 rounded-full shadow-sm transition-colors cursor-pointer ${
                  isInCart
                    ? 'bg-[#F26430] text-white'
                    : 'bg-white/90 hover:bg-[#F26430] text-[#162A22] hover:text-white'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Photo Telemetry */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2 text-[11px] font-semibold text-white num-tabular">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#F4A62A]" />
              {tour.durationLabel}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#162A22]/75 text-[#F4A62A]">
              <Star className="w-3 h-3 fill-[#F4A62A]" />
              {tour.rating.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Clean Card Body */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#0D9F8B]">
            <span>{tour.regionLabel}</span>
            <span className="inline-flex items-center gap-1 text-[#4C6257] font-medium num-tabular">
              <Mountain className="w-3 h-3 text-[#F26430]" />
              {tour.altitudeMax}
            </span>
          </div>

          <Link to={`/tours/${tour.slug}`} className="block">
            <h3 className="font-display text-lg font-extrabold text-[#162A22] group-hover:text-[#F26430] leading-snug transition-colors">
              {tour.shortTitle}
            </h3>
          </Link>

          <p className="text-xs text-[#4C6257] leading-relaxed line-clamp-2">
            {tour.tagline}
          </p>

          <div className="flex flex-wrap gap-1 pt-0.5">
            {tour.stops.slice(0, 3).map((stop) => (
              <span
                key={stop}
                className="px-2 py-0.5 rounded-full bg-[#FFF6EB] text-[#162A22] text-[10.5px] font-semibold"
              >
                {stop}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Joyful Pricing Footer */}
      <div className="px-4 sm:px-5 py-3.5 bg-[#FFFDF8] border-t border-[#162A22]/8 flex items-center justify-between gap-3">
        <div className="num-tabular">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4C6257] block">
            Desde / Persona
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-extrabold text-[#162A22]">
              {formatPrice(tour.priceUsd)}
            </span>
            {tour.originalPriceUsd && (
              <span className="text-xs line-through text-[#4C6257]/75">
                {formatPrice(tour.originalPriceUsd)}
              </span>
            )}
          </div>
        </div>

        <Link
          to={`/tours/${tour.slug}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#162A22] hover:bg-[#F26430] text-white text-xs font-bold transition-colors"
        >
          <span>Explorar</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
