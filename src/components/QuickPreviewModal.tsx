import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  Mountain,
  ShoppingCart,
  Star,
  X
} from 'lucide-react';
import type { TourItem } from '../types/travel';
import { useWayra } from '../context/CartContext';

interface QuickPreviewModalProps {
  tour: TourItem | null;
  onClose: () => void;
}

export const QuickPreviewModal: React.FC<QuickPreviewModalProps> = ({ tour, onClose }) => {
  const { formatPrice, cartSlugs, toggleCartSlug } = useWayra();
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    setPhotoIdx(0);
  }, [tour?.id]);

  useEffect(() => {
    if (!tour) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [tour, onClose]);

  const isInCart = tour ? cartSlugs.includes(tour.slug) : false;

  return (
    <AnimatePresence>
      {tour && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 bg-[#162A22]/55 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="w-full max-w-4xl bg-[#FFFDF8] rounded-3xl overflow-hidden shadow-2xl border border-[#162A22]/10 grid md:grid-cols-12 max-h-[90vh]"
          >
            {/* Left Gallery Column */}
            <div className="md:col-span-6 bg-[#162A22] relative flex flex-col justify-between min-h-[260px]">
              <img
                src={tour.gallery[photoIdx] ?? tour.heroImage}
                alt={tour.title}
                className="w-full h-full object-cover min-h-[260px] md:min-h-[420px]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#162A22]/85 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 overflow-x-auto">
                {tour.gallery.map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => setPhotoIdx(i)}
                    className={`w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer transition-transform ${
                      i === photoIdx ? 'border-[#F4A62A] scale-105' : 'border-white/50 opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Interactive Details Column */}
            <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto space-y-5">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ECF8F4] text-[#0D9F8B] font-bold">
                      {tour.regionLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#162A22] num-tabular">
                      <Star className="w-3.5 h-3.5 fill-[#F4A62A] text-[#F4A62A]" />
                      {tour.rating.toFixed(2)} ({tour.reviewsCount})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar vista rápida"
                    className="p-2 rounded-full bg-[#FFF6EB] hover:bg-[#F26430] hover:text-white text-[#162A22] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-extrabold text-[#162A22] leading-tight">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-[#4C6257] mt-2 leading-relaxed">{tour.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-3 text-xs font-semibold text-[#162A22] num-tabular py-2 border-y border-[#162A22]/10">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#F26430]" />
                    {tour.durationLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Mountain className="w-4 h-4 text-[#0D9F8B]" />
                    {tour.altitudeMax}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#F4A62A]" />
                    Dificultad: {tour.difficulty}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="eyebrow-wayra text-[#0D9F8B] block">Lo más especial de esta ruta</span>
                  <ul className="space-y-1.5">
                    {tour.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-[#162A22]">
                        <CheckCircle2 className="w-4 h-4 text-[#0D9F8B] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#162A22]/10 flex flex-wrap items-center justify-between gap-3">
                <div className="num-tabular">
                  <span className="text-[10px] uppercase font-bold text-[#4C6257] block">
                    Desde / Persona
                  </span>
                  <span className="font-display text-2xl font-extrabold text-[#F26430]">
                    {formatPrice(tour.priceUsd)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleCartSlug(tour.slug)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isInCart
                        ? 'bg-[#0D9F8B] text-white'
                        : 'bg-[#FFF6EB] hover:bg-[#F26430] hover:text-white text-[#162A22]'
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{isInCart ? 'En tu Carrito' : 'Agregar al Carrito'}</span>
                  </button>
                  <Link
                    to={`/tours/${tour.slug}`}
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-full bg-[#F26430] hover:bg-[#D64E1D] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Ver Ficha Completa</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
