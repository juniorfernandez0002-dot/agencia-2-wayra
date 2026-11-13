import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import {
  FacebookLogo,
  InstagramLogo,
  TikTokLogo,
  WhatsAppLogo,
  YouTubeLogo
} from './SocialIcons';
import { useWayra } from '../context/CartContext';

export const SocialGatewaySection: React.FC = () => {
  const { buildWhatsAppUrl } = useWayra();

  const channels = [
    {
      name: 'Instagram',
      handle: '@wayra.peru',
      desc: 'Postales diarias & Reels',
      href: 'https://www.instagram.com/',
      icon: <InstagramLogo className="w-8 h-8 shrink-0" />,
      bgTint: 'hover:bg-[#FFF0F6] hover:border-[#D6249F]/35'
    },
    {
      name: 'TikTok',
      handle: '@wayraperu',
      desc: 'Aventuras en 60 seg',
      href: 'https://www.tiktok.com/',
      icon: <TikTokLogo className="w-8 h-8 shrink-0" />,
      bgTint: 'hover:bg-[#EFF7F2] hover:border-[#162A22]/35'
    },
    {
      name: 'YouTube',
      handle: '@wayratravel',
      desc: 'Guías 4K & trenes',
      href: 'https://www.youtube.com/',
      icon: <YouTubeLogo className="w-8 h-8 shrink-0" />,
      bgTint: 'hover:bg-[#FFF1F0] hover:border-[#FF0000]/35'
    },
    {
      name: 'Facebook',
      handle: '/wayraperu',
      desc: 'Comunidad viajera',
      href: 'https://www.facebook.com/',
      icon: <FacebookLogo className="w-8 h-8 shrink-0" />,
      bgTint: 'hover:bg-[#EDF6FC] hover:border-[#1877F2]/35'
    },
    {
      name: 'WhatsApp',
      handle: 'Directo 24/7',
      desc: '+51 984 248 890',
      href: buildWhatsAppUrl('Hola Wayra Perú, vengo desde su pasarela de redes y quiero información.'),
      icon: <WhatsAppLogo className="w-8 h-8 shrink-0" />,
      bgTint: 'hover:bg-[#ECF8F4] hover:border-[#25D366]/55'
    }
  ];

  return (
    <section className="py-12 sm:py-14 bg-[#FFF6EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="eyebrow-wayra text-[#0D9F8B]">Pasarela de Redes Sociales</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#162A22] mt-1">
              Acompáñanos en cada ruta en vivo
            </h2>
          </div>
          <p className="text-sm text-[#4C6257]">
            Historias reales desde Machu Picchu, Paracas, Cusco y Tambopata todos los días.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {channels.map((c, idx) => (
            <motion.a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className={`group p-4 rounded-2xl bg-white border border-[#162A22]/10 ${c.bgTint} shadow-xs flex items-center justify-between gap-3 transition-colors`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {c.icon}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-sm font-bold text-[#162A22]">{c.name}</span>
                    <span className="text-[11px] font-medium text-[#4C6257] truncate">{c.handle}</span>
                  </div>
                  <p className="text-xs text-[#4C6257] truncate mt-0.5">{c.desc}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#4C6257] group-hover:text-[#F26430] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
