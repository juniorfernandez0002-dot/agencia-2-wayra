import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Compass,
  MapPin,
  Search,
  Sparkles,
  Users
} from 'lucide-react';
import { InteractiveHeroStage } from '../components/InteractiveHeroStage';
import { TourVisualCard } from '../components/TourVisualCard';
import { QuickPreviewModal } from '../components/QuickPreviewModal';
import { VisionMissionSection } from '../components/VisionMissionSection';
import { InteractivePeruMapVisual } from '../components/InteractivePeruMapVisual';
import { SocialGatewaySection } from '../components/SocialGatewaySection';
import { SectionTransition } from '../components/SectionTransition';
import { VibeIcon } from '../components/VibeIcon';
import { DESTINATIONS_LIST } from '../data/destinations';
import { TOURS_CATALOG, VIBE_CATEGORIES } from '../data/toursData';
import { PERU_MEDIA } from '../data/mediaAssets';
import type { TourItem, TravelVibeId } from '../types/travel';
import { useWayra } from '../context/CartContext';

const JOURNEY_STEPS = [
  {
    num: '01',
    title: 'Nos cuentas tu ritmo',
    desc: 'Indicas fechas, viajeros y qué emociones buscas: aventura, paisajes tranquilos, gastronomía o selva.',
    tint: 'bg-[#FFF0E5] text-[#F26430]'
  },
  {
    num: '02',
    title: 'Curaduría sin prisas',
    desc: 'Armamos tu secuencia altitudinal para evitar el soroche y aprovechar las mejores horas de luz.',
    tint: 'bg-[#ECF8F4] text-[#0D9F8B]'
  },
  {
    num: '03',
    title: 'Entradas y trenes seguros',
    desc: 'Emitimos tus ingresos oficiales a Machu Picchu Circuito 2 y boletos Vistadome a tu nombre.',
    tint: 'bg-[#FFF6EB] text-[#D64E1D]'
  },
  {
    num: '04',
    title: 'Asistencia alegre 24/7',
    desc: 'Equipo local en Cusco y Lima conectado contigo en todo momento por WhatsApp y en ruta.',
    tint: 'bg-[#EDF6FC] text-[#2978C6]'
  }
];

const GALLERY_STORIES = [
  { image: PERU_MEDIA.machuPicchuMist, place: 'Machu Picchu al Alba', caption: 'Grupos pequeños entrando antes que la multitud.' },
  { image: PERU_MEDIA.huacachina, place: 'Atardecer en Huacachina', caption: 'Buggies 4x4 sobre dunas infinitas de Ica.' },
  { image: PERU_MEDIA.vinicunca, place: 'Vinicunca · 5,036 m', caption: 'Colores minerales vivos bajo el cielo de Vilcanota.' },
  { image: PERU_MEDIA.tambopataMacaws, place: 'Selva de Tambopata', caption: 'Vuelo libre de guacamayos rojos al amanecer.' }
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { travelDate, setTravelDate, travelersCount, setTravelersCount } = useWayra();

  const [searchDest, setSearchDest] = useState<string>('todos');
  const [searchVibe, setSearchVibe] = useState<TravelVibeId>('todos');
  const [activeVibeTab, setActiveVibeTab] = useState<TravelVibeId>('todos');
  const [activeJourneyStep, setActiveJourneyStep] = useState<number>(0);
  const [previewTour, setPreviewTour] = useState<TourItem | null>(null);

  const searchMatchingCount = useMemo(() => {
    return TOURS_CATALOG.filter((t) => {
      const okDest = searchDest === 'todos' || t.destinationSlug === searchDest;
      const okVibe = searchVibe === 'todos' || t.vibeTags.includes(searchVibe);
      return okDest && okVibe;
    }).length;
  }, [searchDest, searchVibe]);

  const displayedCatalog = useMemo(() => {
    if (activeVibeTab === 'todos') return TOURS_CATALOG.slice(0, 6);
    return TOURS_CATALOG.filter((t) => t.vibeTags.includes(activeVibeTab)).slice(0, 6);
  }, [activeVibeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDest !== 'todos') params.set('destino', searchDest);
    if (searchVibe !== 'todos') params.set('vibe', searchVibe);
    if (travelDate) params.set('fecha', travelDate);
    if (travelersCount) params.set('viajeros', String(travelersCount));
    navigate(`/catalogo?${params.toString()}`);
  };

  return (
    <div>
      {/* 1. INTERACTIVE VISUAL EXPANDING HERO + ABOVE-THE-FOLD SEARCH PILL */}
      <InteractiveHeroStage>
        <div className="mt-4 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#162A22]/12 shadow-[0_14px_40px_rgba(22,42,34,0.08)]">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
            <div className="lg:col-span-3">
              <label htmlFor="w-dest" className="block text-[10.5px] font-bold uppercase tracking-wider text-[#4C6257] mb-1">
                1. ¿A qué región vas?
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#F26430] absolute left-3 top-2.5 pointer-events-none" />
                <select
                  id="w-dest"
                  value={searchDest}
                  onChange={(e) => setSearchDest(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FFFDF8] border border-[#162A22]/15 text-xs sm:text-sm font-semibold text-[#162A22] focus:outline-none focus:border-[#F26430] h-[40px]"
                >
                  <option value="todos">Todo el Perú ({DESTINATIONS_LIST.length} regiones)</option>
                  {DESTINATIONS_LIST.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:col-span-3">
              <label htmlFor="w-vibe" className="block text-[10.5px] font-bold uppercase tracking-wider text-[#4C6257] mb-1">
                2. Estilo de Aventura
              </label>
              <div className="relative">
                <Compass className="w-4 h-4 text-[#0D9F8B] absolute left-3 top-2.5 pointer-events-none" />
                <select
                  id="w-vibe"
                  value={searchVibe}
                  onChange={(e) => setSearchVibe(e.target.value as TravelVibeId)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FFFDF8] border border-[#162A22]/15 text-xs sm:text-sm font-semibold text-[#162A22] focus:outline-none focus:border-[#0D9F8B] h-[40px]"
                >
                  {VIBE_CATEGORIES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="w-date" className="block text-[10.5px] font-bold uppercase tracking-wider text-[#4C6257] mb-1">
                3. Fecha Aprox.
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#F26430] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  id="w-date"
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full pl-9 pr-2 py-2 rounded-xl bg-[#FFFDF8] border border-[#162A22]/15 text-xs sm:text-sm font-semibold text-[#162A22] num-tabular focus:outline-none focus:border-[#F26430] h-[40px]"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="w-pax" className="block text-[10.5px] font-bold uppercase tracking-wider text-[#4C6257] mb-1">
                4. Viajeros
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-[#0D9F8B] absolute left-3 top-2.5 pointer-events-none" />
                <select
                  id="w-pax"
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FFFDF8] border border-[#162A22]/15 text-xs sm:text-sm font-semibold text-[#162A22] num-tabular focus:outline-none focus:border-[#0D9F8B] h-[40px]"
                >
                  <option value={1}>1 Viajero</option>
                  <option value={2}>2 Viajeros</option>
                  <option value={4}>4 Viajeros</option>
                  <option value={6}>6+ Grupo</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
              <button
                type="submit"
                className="w-full h-[40px] rounded-xl bg-[#F26430] hover:bg-[#D64E1D] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer num-tabular"
              >
                <Search className="w-4 h-4" />
                <span>Explorar ({searchMatchingCount})</span>
              </button>
            </div>
          </form>
        </div>
      </InteractiveHeroStage>

      {/* 2. INTERACTIVE VIBE FILTER & VISUAL TOUR GRID */}
      <section className="pt-14 pb-10 sm:pt-18 sm:pb-12 bg-[#FFFDF8]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div>
              <span className="eyebrow-wayra text-[#F26430]">Experiencias Curadas</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#162A22] mt-1">
                ¿Qué energía buscas en este viaje?
              </h2>
            </div>

            <div className="flex overflow-x-auto sm:flex-wrap gap-1.5 bg-[#FFF6EB] p-1.5 rounded-full border border-[#162A22]/10 no-scrollbar max-w-full">
              {VIBE_CATEGORIES.map((v) => {
                const isSelected = activeVibeTab === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setActiveVibeTab(v.id as TravelVibeId)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                      isSelected ? 'text-white' : 'text-[#4C6257] hover:text-[#162A22]'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="homeVibePill"
                        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                        className="absolute inset-0 rounded-full bg-[#162A22]"
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-1.5 whitespace-nowrap">
                      <VibeIcon id={v.id as TravelVibeId} className="w-3.5 h-3.5" />
                      <span>{v.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {displayedCatalog.map((tour) => (
              <TourVisualCard
                key={tour.id}
                tour={tour}
                onQuickPreview={(item) => setPreviewTour(item)}
              />
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFF6EB] hover:bg-[#F26430] text-[#162A22] hover:text-white font-bold text-sm border border-[#162A22]/12 transition-colors"
            >
              <span>Ver todas las experiencias ({TOURS_CATALOG.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 1. BESPOKE SCROLL-REACTIVE PAPERCUT TIDE: EXPERIENCIAS -> VISIÓN & MISIÓN */}
      <SectionTransition
        kind="papercut-tide"
        topColor="#FFFDF8"
        midColors={['#FFE4CC', '#CFECE3']}
        bottomColor="#ECF8F4"
      />

      {/* 3. INTERACTIVE VISION & MISSION SHOWCASE */}
      <VisionMissionSection />

      {/* 2. ARCHITECTURAL ROUTE SLOPE WITH WAYPOINT: VISIÓN -> PASO A PASO */}
      <SectionTransition
        kind="route-slope"
        topColor="#ECF8F4"
        bottomColor="#FFF6EB"
      />

      {/* 4. INTERACTIVE STEP-BY-STEP HOW WE DESIGN JOURNEYS */}
      <section className="py-12 sm:py-16 bg-[#FFF6EB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="eyebrow-wayra text-[#0D9F8B]">Proceso Simple &amp; Feliz</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#162A22] mt-1">
                Tu viaje listo en 4 pasos claros
              </h2>
            </div>
            <Link
              to="/planificador"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F26430] hover:underline"
            >
              <Sparkles className="w-4 h-4" /> Empezar a diseñar mi viaje →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {JOURNEY_STEPS.map((st, idx) => {
              const isFocus = activeJourneyStep === idx;
              return (
                <motion.button
                  key={st.num}
                  type="button"
                  onClick={() => setActiveJourneyStep(idx)}
                  onMouseEnter={() => setActiveJourneyStep(idx)}
                  whileHover={{ y: -4 }}
                  className={`text-left p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                    isFocus
                      ? 'bg-white border-[#F26430] shadow-lg'
                      : 'bg-white/75 border-[#162A22]/10 hover:bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold num-tabular ${st.tint}`}>
                      Paso {st.num}
                    </span>
                    <h3 className="font-display text-xl font-extrabold text-[#162A22]">{st.title}</h3>
                    <p className="text-xs sm:text-sm text-[#4C6257] leading-relaxed">{st.desc}</p>
                  </div>
                  <div className={`h-1 w-full rounded-full transition-colors ${isFocus ? 'bg-[#F26430]' : 'bg-[#162A22]/10'}`} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SUNLIT HORIZON ARCH: PASO A PASO -> MAPA VIVO */}
      <SectionTransition
        kind="horizon-arch"
        topColor="#FFF6EB"
        bottomColor="#FFFDF8"
      />

      {/* 5. INTERACTIVE LIVING PERU MAP */}
      <InteractivePeruMapVisual />

      {/* 6. ASYMMETRIC VISUAL MOMENTS BENTO COLLAGE */}
      <section className="py-12 sm:py-16 bg-[#FFFDF8] border-t border-[#162A22]/6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="eyebrow-wayra text-[#F26430]">Postales en Ruta</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#162A22] mt-1">
                Momentos reales con nuestra comunidad
              </h2>
            </div>
            <Link to="/destinos" className="text-sm font-bold text-[#0D9F8B] hover:underline">
              Explorar las 8 regiones →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Large Hero Story Tile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4 }}
              className="md:col-span-6 group relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-sm"
            >
              <img
                src={GALLERY_STORIES[0].image}
                alt={GALLERY_STORIES[0].place}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162A22]/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F4A62A] text-[#162A22] text-[10.5px] font-extrabold mb-1.5">
                  Favorita de Viajeros
                </span>
                <span className="font-display text-2xl font-extrabold block">
                  {GALLERY_STORIES[0].place}
                </span>
                <p className="text-xs sm:text-sm text-white/90 mt-0.5">{GALLERY_STORIES[0].caption}</p>
              </div>
            </motion.div>

            {/* Right Asymmetric Trio */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GALLERY_STORIES.slice(1).map((g, i) => (
                <motion.div
                  key={g.place}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`group relative rounded-3xl overflow-hidden shadow-sm ${
                    i === 2 ? 'sm:col-span-2 h-44' : 'h-48'
                  }`}
                >
                  <img
                    src={g.image}
                    alt={g.place}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#162A22]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <span className="font-display text-base font-extrabold block">{g.place}</span>
                    <p className="text-xs text-white/90 mt-0.5">{g.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. KINETIC DESTINATION RIBBON: POSTALES -> REDES SOCIALES */}
      <SectionTransition
        kind="ticker-terrace"
        topColor="#FFFDF8"
        bottomColor="#FFF6EB"
      />

      {/* 7. SOCIAL GATEWAY */}
      <SocialGatewaySection />

      {/* 5. SCULPTED ANDES PEAKS SILHOUETTE: REDES -> FOOTER */}
      <SectionTransition
        kind="andes-peaks"
        topColor="#FFF6EB"
        midColors={['#CDE9DE', '#1E4C3C']}
        bottomColor="#162A22"
      />

      {/* Interactive Lightbox Preview */}
      <QuickPreviewModal tour={previewTour} onClose={() => setPreviewTour(null)} />
    </div>
  );
};
