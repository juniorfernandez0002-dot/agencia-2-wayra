import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock,
  Minus,
  Mountain,
  Plus,
  ShoppingCart,
  Star,
  XCircle
} from 'lucide-react';
import { TOURS_CATALOG } from '../data/toursData';
import { useWayra } from '../context/CartContext';
import { WhatsAppLogo } from '../components/SocialIcons';

export const TourDetailPage: React.FC = () => {
  const { slug } = useParams();
  const tour = TOURS_CATALOG.find((t) => t.slug === slug) ?? TOURS_CATALOG[0];

  const { formatPrice, cartSlugs, toggleCartSlug, buildWhatsAppUrl } = useWayra();
  const [photoIdx, setPhotoIdx] = useState(0);
  const [modality, setModality] = useState<'grupal' | 'privado'>('grupal');
  const [pax, setPax] = useState<number>(2);
  const [openStepIdx, setOpenStepIdx] = useState<number>(0);

  const isInCart = cartSlugs.includes(tour.slug);
  const unitPrice = modality === 'grupal' ? tour.priceUsd : tour.privatePriceUsd;
  const totalUsd = unitPrice * pax;

  const waMsg = `Hola Wayra Perú, quiero reservar/cotizar "${tour.title}" (${tour.code}) en formato ${
    modality === 'grupal' ? 'Grupal Pequeño' : 'Privado a Medida'
  } para ${pax} viajero(s). Estimado: ${formatPrice(totalUsd)}.`;

  return (
    <div className="bg-[#FFFDF8] min-h-screen pb-24 lg:pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#4C6257] hover:text-[#F26430]"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al catálogo
          </Link>
          <span className="px-3 py-1 rounded-full bg-[#FFF6EB] text-[#F26430] text-xs font-bold num-tabular">
            {tour.code} · {tour.regionLabel}
          </span>
        </div>

        {/* Header + Interactive Photo Gallery */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECF8F4] text-[#0D9F8B]">
                  <Star className="w-3.5 h-3.5 fill-[#F4A62A] text-[#F4A62A]" />
                  {tour.rating.toFixed(2)} ({tour.reviewsCount} reseñas)
                </span>
                <span className="inline-flex items-center gap-1 text-[#4C6257] num-tabular">
                  <Clock className="w-3.5 h-3.5 text-[#F26430]" /> {tour.durationLabel}
                </span>
                <span className="inline-flex items-center gap-1 text-[#4C6257] num-tabular">
                  <Mountain className="w-3.5 h-3.5 text-[#0D9F8B]" /> {tour.altitudeMax}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#162A22] leading-tight">
                {tour.title}
              </h1>
              <p className="text-base text-[#4C6257] leading-relaxed">{tour.tagline}</p>
            </div>

            {/* Interactive Gallery Switcher */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#FFF6EB] shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={tour.gallery[photoIdx] ?? tour.heroImage}
                    src={tour.gallery[photoIdx] ?? tour.heroImage}
                    alt={tour.title}
                    initial={{ opacity: 0.4, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <div className="flex gap-2.5 overflow-x-auto">
                {tour.gallery.map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    onClick={() => setPhotoIdx(idx)}
                    className={`w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                      idx === photoIdx ? 'border-[#F26430] scale-102' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Itinerary Accordion */}
            <div className="space-y-4 pt-4">
              <h2 className="font-display text-2xl font-extrabold text-[#162A22]">
                Tu Recorrido Paso a Paso
              </h2>
              <div className="space-y-2.5">
                {tour.itinerary.map((step, idx) => {
                  const isOpen = openStepIdx === idx;
                  return (
                    <div
                      key={step.title}
                      className="rounded-2xl bg-white border border-[#162A22]/10 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenStepIdx(isOpen ? -1 : idx)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#FFFDF8]"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="px-3 py-1 rounded-full bg-[#FFF6EB] text-[#F26430] text-xs font-extrabold num-tabular shrink-0">
                            {step.timeOrDay}
                          </span>
                          <span className="font-display text-base sm:text-lg font-bold text-[#162A22] truncate">
                            {step.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-[#4C6257] shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1 text-sm text-[#4C6257] leading-relaxed border-t border-[#162A22]/8">
                              {step.description}
                              {step.altitude && (
                                <span className="inline-block ml-2 px-2 py-0.5 rounded-full bg-[#ECF8F4] text-[#0D9F8B] text-xs font-bold num-tabular">
                                  Altitud: {step.altitude}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Included vs Not Included */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#ECF8F4] border border-[#0D9F8B]/20 space-y-2.5">
                <h3 className="font-display text-base font-extrabold text-[#162A22]">Qué incluye</h3>
                <ul className="space-y-1.5">
                  {tour.included.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#162A22]">
                      <CheckCircle2 className="w-4 h-4 text-[#0D9F8B] shrink-0 mt-0.5" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-[#FFF6EB] border border-[#F26430]/20 space-y-2.5">
                <h3 className="font-display text-base font-extrabold text-[#162A22]">No incluido</h3>
                <ul className="space-y-1.5">
                  {tour.notIncluded.map((n) => (
                    <li key={n} className="flex items-start gap-2 text-xs text-[#4C6257]">
                      <XCircle className="w-4 h-4 text-[#F26430] shrink-0 mt-0.5" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sticky Interactive Booking Box */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#162A22]/12 shadow-lg space-y-5">
              <div className="flex items-end justify-between border-b border-[#162A22]/10 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4C6257] block">
                    Total estimado ({pax} {pax === 1 ? 'viajero' : 'viajeros'})
                  </span>
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#F26430] num-tabular">
                    {formatPrice(totalUsd)}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#0D9F8B] num-tabular">
                  {formatPrice(unitPrice)} / pax
                </span>
              </div>

              {/* Modality Switcher */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#162A22] block">Elige modalidad</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setModality('grupal')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      modality === 'grupal'
                        ? 'bg-[#FFF0E5] border-[#F26430] text-[#162A22]'
                        : 'bg-[#FFFDF8] border-[#162A22]/12 text-[#4C6257]'
                    }`}
                  >
                    <span className="font-bold text-xs block">Grupo Pequeño</span>
                    <span className="text-sm font-extrabold text-[#F26430] num-tabular">
                      {formatPrice(tour.priceUsd)}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModality('privado')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      modality === 'privado'
                        ? 'bg-[#ECF8F4] border-[#0D9F8B] text-[#162A22]'
                        : 'bg-[#FFFDF8] border-[#162A22]/12 text-[#4C6257]'
                    }`}
                  >
                    <span className="font-bold text-xs block">Privado a Medida</span>
                    <span className="text-sm font-extrabold text-[#0D9F8B] num-tabular">
                      {formatPrice(tour.privatePriceUsd)}
                    </span>
                  </button>
                </div>
              </div>

              {/* Travelers Stepper */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FFFDF8] border border-[#162A22]/12">
                <span className="text-xs font-bold text-[#162A22]">Número de viajeros</span>
                <div className="flex items-center gap-3 num-tabular">
                  <button
                    type="button"
                    onClick={() => setPax((p) => Math.max(1, p - 1))}
                    className="w-8 h-8 rounded-full bg-[#FFF6EB] hover:bg-[#F26430] hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-base w-6 text-center">{pax}</span>
                  <button
                    type="button"
                    onClick={() => setPax((p) => Math.min(12, p + 1))}
                    className="w-8 h-8 rounded-full bg-[#FFF6EB] hover:bg-[#F26430] hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => toggleCartSlug(tour.slug)}
                  className={`w-full py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    isInCart
                      ? 'bg-[#0D9F8B] text-white'
                      : 'bg-[#162A22] hover:bg-[#F26430] text-white'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{isInCart ? 'Agregado al Carrito' : 'Agregar al Carrito'}</span>
                </button>

                <a
                  href={buildWhatsAppUrl(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#ECF8F4] hover:bg-[#25D366]/20 border border-[#25D366]/50 text-[#162A22] font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <WhatsAppLogo className="w-5 h-5" />
                  <span>Consultar Disponibilidad por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Native Mobile Sticky Conversion Dock (< lg) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FFFDF8]/95 backdrop-blur-md border-t border-[#162A22]/12 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-8px_24px_rgba(22,42,34,0.08)]">
        <div className="num-tabular min-w-0">
          <span className="text-[10px] font-bold uppercase text-[#4C6257] block">
            Total ({pax} pax)
          </span>
          <span className="font-display text-lg font-extrabold text-[#F26430] block leading-tight">
            {formatPrice(totalUsd)}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => toggleCartSlug(tour.slug)}
            aria-label={isInCart ? 'Quitar del carrito' : 'Agregar al carrito'}
            className={`p-2.5 rounded-full border cursor-pointer ${
              isInCart ? 'bg-[#0D9F8B] border-[#0D9F8B] text-white' : 'bg-[#FFF6EB] border-[#162A22]/15 text-[#162A22]'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
          <a
            href={buildWhatsAppUrl(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full bg-[#F26430] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
          >
            <WhatsAppLogo className="w-4 h-4" />
            <span>Cotizar</span>
          </a>
        </div>
      </div>
    </div>
  );
};
