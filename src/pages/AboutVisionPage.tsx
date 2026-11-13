import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { VisionMissionSection } from '../components/VisionMissionSection';

export const AboutVisionPage: React.FC = () => (
  <div className="bg-[#FFFDF8] min-h-screen">
    <section className="py-12 sm:py-16 max-w-[1440px] mx-auto px-4 sm:px-8 space-y-5">
      <span className="eyebrow-wayra text-[#F26430]">Manifiesto Wayra Perú</span>
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#162A22] max-w-3xl leading-tight">
        Nacimos para devolverle la alegría, la cercanía y el color al viaje por los Andes.
      </h1>
      <p className="text-base text-[#4C6257] max-w-2xl leading-relaxed">
        Operamos directamente desde Cusco y Lima sin intermediarios ni grupos masivos. Aquí
        puedes explorar de manera visual nuestra misión, visión y forma humana de recorrer el Perú.
      </p>
      <Link
        to="/planificador"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F26430] hover:bg-[#D64E1D] text-white font-bold text-sm transition-colors"
      >
        <span>Diseñar mi viaje con Wayra</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>

    <VisionMissionSection />
  </div>
);
