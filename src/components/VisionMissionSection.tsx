import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, HeartHandshake, Leaf, Sparkles, Sun, Users } from 'lucide-react';
import { PERU_MEDIA } from '../data/mediaAssets';

interface PillarTab {
  id: 'mision' | 'vision' | 'manifiesto';
  tabLabel: string;
  eyebrow: string;
  headline: string;
  body: string;
  image: string;
  badge: string;
  highlights: { title: string; detail: string; icon: React.ReactNode }[];
}

const PILLARS: PillarTab[] = [
  {
    id: 'mision',
    tabLabel: 'Nuestra Misión',
    eyebrow: 'Propósito en cada kilometro',
    headline: 'Convertir cada ruta en un recuerdo luminoso, humano y sin apuros.',
    body: 'Creemos que viajar por el Perú no debe ser correr detrás de un reloj ni hacer filas interminables. Diseñamos itinerarios vivos en grupos de máximo 8 personas, con guías locales apasionados y horarios pensados para disfrutar la luz del día.',
    image: PERU_MEDIA.ausangate,
    badge: 'Grupos máx. 8 viajeros',
    highlights: [
      {
        title: 'Ritmo Humano',
        detail: 'Madrugamos solo cuando vale la pena ver un amanecer vacío, nunca por logística rígida.',
        icon: <Sun className="w-5 h-5 text-[#F4A62A]" />
      },
      {
        title: 'Conexión Real',
        detail: 'Almuerzos en casas taller de Chinchero, cafetales locales y navegación con isleños en Titicaca.',
        icon: <HeartHandshake className="w-5 h-5 text-[#F26430]" />
      }
    ]
  },
  {
    id: 'vision',
    tabLabel: 'Nuestra Visión',
    eyebrow: 'Mirando el 2030',
    headline: 'Ser la comunidad viajera más alegre y responsable de los Andes.',
    body: 'Soñamos con un turismo que deje los senderos más cuidados que ayer y fortalezca la economía directa de arrieros, artesanas, lancheros y familias anfitrionas desde Paracas hasta Tambopata.',
    image: PERU_MEDIA.lagoSandoval,
    badge: '100% Operación Directa',
    highlights: [
      {
        title: 'Impacto Local Justo',
        detail: 'El 78% del valor de cada travesía permanece directamente en emprendedores de la región visitada.',
        icon: <Leaf className="w-5 h-5 text-[#0D9F8B]" />
      },
      {
        title: 'Huella Consciente',
        detail: 'Botellas reutilizables en ruta, cero plásticos de un solo uso y senderismo con respeto ecológico.',
        icon: <Sparkles className="w-5 h-5 text-[#F26430]" />
      }
    ]
  },
  {
    id: 'manifiesto',
    tabLabel: 'Cómo Viajamos',
    eyebrow: 'Estilo Wayra',
    headline: 'Transparencia alegre desde el primer saludo hasta tu vuelo de regreso.',
    body: 'Olvida los cargos sorpresa y los correos robotizados. Desde que nos escribes cuentas con especialistas reales en Cusco y Lima, precios visibles en USD y Soles y soporte por WhatsApp las 24 horas.',
    image: PERU_MEDIA.playaRojaParacas,
    badge: 'Asistencia 24/7 en Ruta',
    highlights: [
      {
        title: 'Guías Que Inspiran',
        detail: 'Historiadores, biólogos y fotógrafos locales que aman contar anécdotas más allá del folleto.',
        icon: <Users className="w-5 h-5 text-[#2978C6]" />
      },
      {
        title: 'Libertad Creativa',
        detail: 'Combina rutas grupales alegres con días privados hechos exactamente a tu medida.',
        icon: <Compass className="w-5 h-5 text-[#0D9F8B]" />
      }
    ]
  }
];

export const VisionMissionSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<'mision' | 'vision' | 'manifiesto'>('mision');
  const activePillar = PILLARS.find((p) => p.id === activeTabId) ?? PILLARS[0];

  return (
    <section className="py-12 sm:py-16 bg-[#ECF8F4] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-10">
        {/* Top Interactive Switcher Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="eyebrow-wayra text-[#0D9F8B]">Visión, Misión &amp; Espíritu</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#162A22] mt-1">
              Viajar bonito cambia cómo miras el mundo
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filosofía de Wayra Perú"
            className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white border border-[#162A22]/10 shadow-xs overflow-x-auto no-scrollbar max-w-full"
          >
            {PILLARS.map((tab) => {
              const isSelected = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                    isSelected ? 'text-white' : 'text-[#4C6257] hover:text-[#162A22]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="visionTabBg"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#0D9F8B]"
                    />
                  )}
                  <span className="relative z-10">{tab.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Split Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-5 sm:p-8 border border-[#162A22]/10 shadow-sm"
          >
            {/* Visual Photographic Showcase */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-[#FFF6EB]">
              <motion.img
                src={activePillar.image}
                alt={activePillar.headline}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 text-[#162A22] text-xs font-extrabold shadow-md">
                {activePillar.badge}
              </span>
            </div>

            {/* Interactive Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="eyebrow-wayra text-[#F26430] block">{activePillar.eyebrow}</span>
                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-[#162A22] leading-tight">
                  {activePillar.headline}
                </h3>
                <p className="text-sm sm:text-base text-[#4C6257] leading-relaxed">
                  {activePillar.body}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {activePillar.highlights.map((h) => (
                  <motion.div
                    key={h.title}
                    whileHover={{ y: -2 }}
                    className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#162A22]/10 space-y-2"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFF6EB] flex items-center justify-center">
                      {h.icon}
                    </div>
                    <h4 className="font-display text-base font-bold text-[#162A22]">{h.title}</h4>
                    <p className="text-xs text-[#4C6257] leading-relaxed">{h.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
