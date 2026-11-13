import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  MapPin,
  Sparkles,
  Star,
  Sun
} from 'lucide-react';
import { TOURS_CATALOG } from '../data/toursData';
import { PERU_MEDIA } from '../data/mediaAssets';
import { useWayra } from '../context/CartContext';

interface InteractiveHeroStageProps {
  children?: React.ReactNode;
}

const ACCORDION_DESTINATIONS = [
  {
    id: 'machu-picchu',
    label: 'Machu Picchu',
    region: 'Valle Sagrado',
    title: 'Machu Picchu & Tren 360°',
    altitude: '2,430 m',
    slug: 'machu-picchu-amanecer-tren-panoramico-full-day',
    image: PERU_MEDIA.machuPicchuClassic
  },
  {
    id: 'vinicunca',
    label: '7 Colores',
    region: 'Vilcanota',
    title: 'Vinicunca & Valle Rojo',
    altitude: '5,036 m',
    slug: 'montana-siete-colores-vinicunca-valle-rojo-primera-luz',
    image: PERU_MEDIA.vinicunca
  },
  {
    id: 'huacachina',
    label: 'Huacachina',
    region: 'Costa Sur',
    title: 'Paracas & Huacachina',
    altitude: '0 – 420 m',
    slug: 'paracas-ballestas-buggies-huacachina-fiesta-dunas',
    image: PERU_MEDIA.huacachina
  },
  {
    id: 'tambopata',
    label: 'Tambopata',
    region: 'Amazonía Viva',
    title: 'Selva & Guacamayos',
    altitude: '183 m',
    slug: 'selva-tambopata-lago-sandoval-guacamayos-eco-lodge',
    image: PERU_MEDIA.tambopataMacaws
  }
];

export const InteractiveHeroStage: React.FC<InteractiveHeroStageProps> = ({ children }) => {
  const { formatPrice } = useWayra();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || prefersReduced) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ACCORDION_DESTINATIONS.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative bg-[#FFFDF8] bg-sun-dots overflow-hidden border-b border-[#162A22]/8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-24 w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(244,166,42,0.14)_0%,rgba(242,100,48,0.05)_50%,transparent_75%)]"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-4 pb-5 lg:pt-6 lg:pb-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* LEFT EDITORIAL COLUMN */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0E5] border border-[#F26430]/25 text-[#D64E1D] text-xs font-bold shadow-2xs">
              <Sun className="w-3.5 h-3.5 text-[#F4A62A] fill-[#F4A62A]" />
              <span>Hola Perú · Viajes Alegres &amp; Auténticos</span>
            </div>

            <h1 className="font-display text-3xl sm:text-[44px] xl:text-[50px] font-extrabold text-[#162A22] leading-[1.05]">
              Descubre el Perú <span className="text-[#F26430]">a todo color</span>, sin prisas y{' '}
              <span className="text-[#0D9F8B]">a tu manera</span>.
            </h1>

            <p className="text-sm sm:text-[15.5px] text-[#4C6257] leading-relaxed max-w-lg">
              Más que paquetes turísticos: experiencias vivas diseñadas con guías locales, grupos
              pequeños y rutas flexibles entre el Pacífico, los Andes y la Amazonía.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <Link
                to="/catalogo"
                className="px-5 sm:px-6 py-3 rounded-full bg-[#F26430] hover:bg-[#D64E1D] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span>Ver Experiencias ({TOURS_CATALOG.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/nosotros"
                className="px-4 sm:px-5 py-3 rounded-full bg-white hover:bg-[#ECF8F4] border border-[#162A22]/15 text-[#162A22] font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors duration-200"
              >
                <Compass className="w-4 h-4 text-[#0D9F8B]" />
                <span>Nuestra Visión &amp; Misión</span>
              </Link>
            </div>

            {/* Minimal Friendly Trust Bar */}
            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#4C6257] num-tabular">
              <span className="inline-flex items-center gap-1 font-bold text-[#162A22]">
                <Star className="w-3.5 h-3.5 fill-[#F4A62A] text-[#F4A62A]" />
                4.96 · Felicidad Viajera
              </span>
              <span className="hidden sm:inline">·</span>
              <span>Máx. 8 personas por grupo</span>
              <span className="hidden sm:inline">·</span>
              <span>8 regiones del Perú</span>
            </div>
          </div>

          {/* RIGHT COLUMN: NATIVE MOBILE SWIPE CAROUSEL (< sm) + BUTTER-SMOOTH GPU ACCORDION (sm+) */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="lg:col-span-7 min-w-0"
          >
            {/* 1. Native Mobile Swipe-Snap Horizontal Showcase (< sm) */}
            <div className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 no-scrollbar">
              {ACCORDION_DESTINATIONS.map((item) => {
                const matchedTour = TOURS_CATALOG.find((t) => t.slug === item.slug);
                const price = matchedTour?.priceUsd ?? 190;
                return (
                  <div
                    key={item.id}
                    className="w-[84%] shrink-0 snap-center relative h-[250px] rounded-2xl overflow-hidden shadow-md bg-[#162A22]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#162A22]/90 via-[#162A22]/25 to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 text-[#162A22] text-[10.5px] font-bold">
                        <MapPin className="w-3 h-3 text-[#F26430]" />
                        {item.region} · {item.altitude}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-[#F4A62A] block">
                          {matchedTour?.durationLabel ?? 'Full Day'}
                        </span>
                        <Link
                          to={`/tours/${item.slug}`}
                          className="font-display text-base font-extrabold text-white leading-tight block"
                        >
                          {item.title}
                        </Link>
                      </div>
                      <Link
                        to={`/tours/${item.slug}`}
                        className="px-3 py-1.5 rounded-full bg-[#F26430] text-white text-xs font-bold shrink-0 inline-flex items-center gap-1 num-tabular"
                      >
                        <span>{formatPrice(price)}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. Ultra-Smooth Native GPU CSS Accordion for Tablet & Desktop (sm+) */}
            <div className="hidden sm:flex gap-2.5 h-[330px] lg:h-[368px]">
              {ACCORDION_DESTINATIONS.map((item, idx) => {
                const isExpanded = idx === activeIndex;
                const matchedTour = TOURS_CATALOG.find((t) => t.slug === item.slug);
                const price = matchedTour?.priceUsd ?? 190;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    style={{ flexGrow: isExpanded ? 3.8 : 0.9 }}
                    className="accordion-panel-smooth relative rounded-2xl overflow-hidden cursor-pointer shadow-lg min-w-0 basis-0 bg-[#162A22]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      decoding="async"
                      fetchPriority={idx === 0 ? 'high' : 'auto'}
                      className={`w-full h-full object-cover transition-transform duration-500 ease-out will-change-transform ${
                        isExpanded ? 'scale-105 brightness-105' : 'scale-100 brightness-90 saturate-90'
                      }`}
                    />

                    <div
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                        isExpanded
                          ? 'bg-gradient-to-t from-[#162A22]/90 via-[#162A22]/25 to-transparent'
                          : 'bg-[#162A22]/35 hover:bg-[#162A22]/20'
                      }`}
                    />

                    {/* Collapsed Vertical Tag */}
                    <div
                      className={`absolute inset-0 flex items-end justify-center pb-5 px-2 transition-opacity duration-200 pointer-events-none ${
                        isExpanded ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      <span
                        style={{ writingMode: 'vertical-rl' }}
                        className="rotate-180 text-white font-display font-bold text-sm tracking-wide drop-shadow-md whitespace-nowrap"
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* Expanded Full Content */}
                    <div
                      className={`absolute inset-0 p-4 sm:p-5 flex flex-col justify-between transition-opacity duration-300 ${
                        isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#162A22] text-[11px] font-bold shadow-xs whitespace-nowrap">
                          <MapPin className="w-3 h-3 text-[#F26430]" />
                          {item.region} · {item.altitude}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4A62A] text-[#162A22] text-[11px] font-extrabold shadow-xs whitespace-nowrap">
                          <Sparkles className="w-3 h-3" /> {item.label}
                        </span>
                      </div>

                      <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-[#F4A62A] block">
                            {matchedTour?.durationLabel ?? 'Full Day'}
                          </span>
                          <Link
                            to={`/tours/${item.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="font-display text-base sm:text-lg xl:text-[20px] font-extrabold text-white hover:text-[#F4A62A] leading-tight block transition-colors"
                          >
                            {item.title}
                          </Link>
                        </div>

                        <Link
                          to={`/tours/${item.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F26430] hover:bg-[#D64E1D] text-white text-xs font-bold shrink-0 shadow-md num-tabular transition-colors"
                        >
                          <span>{formatPrice(price)}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* DOCKED ABOVE-THE-FOLD SEARCH BAR */}
        <div>{children}</div>
      </div>
    </section>
  );
};
