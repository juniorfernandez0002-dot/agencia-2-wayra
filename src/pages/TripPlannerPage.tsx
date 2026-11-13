import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, Sparkles } from 'lucide-react';
import { DESTINATIONS_LIST } from '../data/destinations';
import { TOURS_CATALOG } from '../data/toursData';
import { useWayra } from '../context/CartContext';
import { WhatsAppLogo } from '../components/SocialIcons';

export const TripPlannerPage: React.FC = () => {
  const { cartSlugs, formatPrice, buildWhatsAppUrl } = useWayra();
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['valle-sagrado', 'cusco']);
  const [pace, setPace] = useState<'relajado' | 'equilibrado' | 'intenso'>('equilibrado');
  const [days, setDays] = useState<number>(7);
  const [pax, setPax] = useState<number>(2);
  const [travelerName, setTravelerName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const cartTours = TOURS_CATALOG.filter((t) => cartSlugs.includes(t.slug));
  const toggleRegion = (id: string) =>
    setSelectedRegions((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));

  const estimatedPerPerson =
    days * (pace === 'relajado' ? 145 : pace === 'equilibrado' ? 165 : 195);

  const waSummary = `Hola Wayra Perú! Soy ${travelerName || 'un viajero'}. Quiero armar mi aventura de ${days} días para ${pax} personas en ritmo ${pace}. Regiones: ${selectedRegions.join(
    ', '
  )}. ${
    cartTours.length > 0 ? `Rutas de mi carrito: ${cartTours.map((t) => t.shortTitle).join(', ')}.` : ''
  }`;

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
        <div>
          <span className="eyebrow-wayra text-[#0D9F8B]">Diseñador Interactivo</span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#162A22] mt-1">
            Crea tu viaje ideal paso a paso
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6 bg-white p-6 rounded-3xl border border-[#162A22]/10 shadow-xs">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F26430] block">
                1. ¿Qué regiones te ilusionan?
              </span>
              <div className="flex flex-wrap gap-2">
                {DESTINATIONS_LIST.map((d) => {
                  const active = selectedRegions.includes(d.id);
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => toggleRegion(d.id)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#0D9F8B] text-white'
                          : 'bg-[#FFF6EB] text-[#162A22] hover:bg-[#ECF8F4]'
                      }`}
                    >
                      {d.name.split('&')[0].trim()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F26430] block">
                2. Ritmo del viaje
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'relajado', label: 'Sin Prisas' },
                  { id: 'equilibrado', label: 'Equilibrado' },
                  { id: 'intenso', label: 'Aventura Pura' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPace(opt.id as 'relajado' | 'equilibrado' | 'intenso')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border cursor-pointer transition-colors ${
                      pace === opt.id
                        ? 'bg-[#FFF0E5] border-[#F26430] text-[#162A22]'
                        : 'bg-[#FFFDF8] border-[#162A22]/12 text-[#4C6257]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#162A22] block mb-1">
                  Días de viaje ({days} días)
                </label>
                <input
                  type="range"
                  min={3}
                  max={16}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-[#F26430]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#162A22] block mb-1">
                  Viajeros ({pax} personas)
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={pax}
                  onChange={(e) => setPax(Number(e.target.value))}
                  className="w-full accent-[#0D9F8B]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#162A22] block mb-1">Tu nombre</label>
              <input
                type="text"
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                placeholder="Ej. Camila"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF8] border border-[#162A22]/15 text-sm"
              />
            </div>
          </div>

          <motion.div
            layout
            className="lg:col-span-5 p-6 rounded-3xl bg-[#FFF6EB] border border-[#162A22]/12 space-y-4"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0D9F8B]">
              <Sparkles className="w-4 h-4" /> Tu Resumen Estimado
            </span>

            <div className="num-tabular">
              <span className="text-xs text-[#4C6257] block">
                Estimado por persona ({days}D · ritmo {pace})
              </span>
              <span className="font-display text-3xl font-extrabold text-[#F26430]">
                {formatPrice(estimatedPerPerson)}
              </span>
            </div>

            {cartTours.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-white border border-[#162A22]/10 space-y-1.5">
                <span className="text-xs font-bold text-[#162A22] block">
                  Incluyendo tus rutas del carrito:
                </span>
                {cartTours.map((t) => (
                  <div key={t.id} className="text-xs text-[#0D9F8B] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t.shortTitle}
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="w-full py-3 rounded-full bg-[#162A22] hover:bg-[#F26430] text-white font-bold text-sm transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Propuesta Lista</span>
                </>
              ) : (
                <span>Generar Borrador Visual</span>
              )}
            </button>

            <a
              href={buildWhatsAppUrl(waSummary)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-[#ECF8F4] hover:bg-[#25D366]/20 border border-[#25D366]/50 text-[#162A22] font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <WhatsAppLogo className="w-5 h-5" />
              <span>Enviar por WhatsApp a Wayra</span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
