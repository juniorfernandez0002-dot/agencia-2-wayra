import React from 'react';
import { Link } from 'react-router-dom';
import { BrandMark } from './BrandMark';
import {
  FacebookLogo,
  InstagramLogo,
  TikTokLogo,
  WhatsAppLogo,
  YouTubeLogo
} from './SocialIcons';
import { DESTINATIONS_LIST } from '../data/destinations';
import { useWayra } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { buildWhatsAppUrl } = useWayra();

  return (
    <footer className="bg-[#162A22] text-[#FFFDF8]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-4">
          <Link to="/" className="inline-flex items-center gap-3">
            <BrandMark className="w-10 h-10 shrink-0" />
            <div>
              <span className="font-display text-2xl font-extrabold text-white block leading-none">
                WAYRA
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F4A62A] block mt-1">
                Perú a Color
              </span>
            </div>
          </Link>
          <p className="text-sm text-[#C7D7CF] leading-relaxed">
            Viajes luminosos, minimalistas y humanos por las regiones más increíbles del Perú. Grupos
            pequeños, guías apasionados y soporte cercano 24/7.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <InstagramLogo className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <TikTokLogo className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <YouTubeLogo className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <FacebookLogo className="w-5 h-5" />
            </a>
            <a href={buildWhatsAppUrl('Hola Wayra Perú, quiero hablar con un asesor.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <WhatsAppLogo className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <h4 className="eyebrow-wayra text-[#F4A62A]">Destinos</h4>
          <ul className="space-y-2 text-sm text-[#C7D7CF]">
            {DESTINATIONS_LIST.slice(0, 6).map((d) => (
              <li key={d.id}>
                <Link to={`/catalogo?destino=${d.id}`} className="hover:text-[#F4A62A] transition-colors">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <h4 className="eyebrow-wayra text-[#F4A62A]">Wayra Experiencia</h4>
          <ul className="space-y-2 text-sm text-[#C7D7CF]">
            <li><Link to="/catalogo" className="hover:text-[#F4A62A]">Todas las Experiencias</Link></li>
            <li><Link to="/catalogo?vibe=paquetes" className="hover:text-[#F4A62A]">Paquetes Multidía</Link></li>
            <li><Link to="/nosotros" className="hover:text-[#F4A62A]">Visión, Misión &amp; Equipo</Link></li>
            <li><Link to="/destinos" className="hover:text-[#F4A62A]">Atlas de Regiones</Link></li>
            <li><Link to="/planificador" className="hover:text-[#F4A62A]">Diseñar mi Viaje</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <h4 className="eyebrow-wayra text-[#F4A62A]">Hablemos Hoy</h4>
          <p className="text-xs text-[#C7D7CF]">Cusco · Miraflores Lima</p>
          <p className="text-xs text-white font-semibold">hola@wayraperu.com</p>
          <a
            href={buildWhatsAppUrl('Hola Wayra Perú, necesito ayuda para planear mi aventura.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-full bg-[#25D366]/15 hover:bg-[#0D9F8B] border border-[#25D366]/45 text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors"
          >
            <WhatsAppLogo className="w-4 h-4" />
            <span>WhatsApp Directo</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#C7D7CF]">
          <span>© 2026 WAYRA — Viajes Luminosos del Perú</span>
          <div className="flex items-center gap-3 flex-wrap justify-center text-xs">
            <span>Cusco · Paracas · Arequipa · Tambopata</span>
            <span className="text-white/20">·</span>
            <span className="text-white/40 text-[9.5px] font-sans font-normal tracking-tight">
              Diseñado & Desarrollado por{' '}
              <a
                href="https://www.myfriendinc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 hover:underline transition-colors font-medium"
              >
                My Friend Inc.
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
