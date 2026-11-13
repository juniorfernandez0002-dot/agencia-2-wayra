import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mountain, Sun } from 'lucide-react';
import { DESTINATIONS_LIST } from '../data/destinations';

export const DestinationsPage: React.FC = () => (
  <div className="bg-[#FFFDF8] min-h-screen py-12 sm:py-16">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-10">
      <div className="max-w-2xl space-y-3">
        <span className="eyebrow-wayra text-[#0D9F8B]">Atlas Visual Wayra</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#162A22]">
          8 Regiones Llenas de Luz y Aventura
        </h1>
        <p className="text-base text-[#4C6257]">
          Elige tu punto de partida entre desiertos junto al mar, cordilleras multicolores y lagunas amazónicas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DESTINATIONS_LIST.map((dest, idx) => (
          <motion.article
            key={dest.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl overflow-hidden bg-white border border-[#162A22]/10 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[11px] font-bold text-[#162A22]">
                  {dest.region}
                </span>
              </div>
              <div className="p-5 space-y-2.5">
                <h2 className="font-display text-xl font-extrabold text-[#162A22]">{dest.name}</h2>
                <p className="text-xs text-[#4C6257] leading-relaxed">{dest.summary}</p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold text-[#162A22] num-tabular">
                  <span className="inline-flex items-center gap-1 text-[#0D9F8B]">
                    <Mountain className="w-3.5 h-3.5" /> {dest.altitude}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#F26430]">
                    <Sun className="w-3.5 h-3.5" /> {dest.bestSeason.split('(')[0].trim()}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-5 py-3.5 bg-[#FFF6EB] border-t border-[#162A22]/8">
              <Link
                to={`/catalogo?destino=${dest.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F26430] hover:underline"
              >
                <span>Ver experiencias en {dest.name.split('&')[0].trim()}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </div>
);
