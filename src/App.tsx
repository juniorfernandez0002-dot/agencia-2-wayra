import React, { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { CartProvider, useWayra } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppLogo } from './components/SocialIcons';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { AboutVisionPage } from './pages/AboutVisionPage';
import { TripPlannerPage } from './pages/TripPlannerPage';

const ScrollTopOnRoute: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

const FloatingWhatsAppButton: React.FC = () => {
  const { buildWhatsAppUrl } = useWayra();
  return (
    <a
      href={buildWhatsAppUrl('Hola Wayra Perú, deseo información sobre viajes en Perú.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Directo Wayra"
      className="fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] shadow-xl border-2 border-white flex items-center justify-center transition-transform hover:scale-110"
    >
      <WhatsAppLogo className="w-9 h-9" />
    </a>
  );
};

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <HashRouter>
          <ScrollTopOnRoute />
          <div className="min-h-screen flex flex-col bg-[#FFFDF8] text-[#162A22] overflow-x-clip">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/tours/:slug" element={<TourDetailPage />} />
              <Route path="/destinos" element={<DestinationsPage />} />
              <Route path="/nosotros" element={<AboutVisionPage />} />
              <Route path="/planificador" element={<TripPlannerPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsAppButton />
        </div>
      </HashRouter>
    </CartProvider>
    </MotionConfig>
  );
}

export default App;
