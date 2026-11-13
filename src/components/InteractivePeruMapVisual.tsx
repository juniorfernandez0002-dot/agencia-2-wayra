import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import L from 'leaflet';
import { ArrowRight, Calendar, MapPin, Mountain, Sun } from 'lucide-react';
import { DESTINATIONS_LIST } from '../data/destinations';
import { TOURS_CATALOG } from '../data/toursData';
import type { DestinationId } from '../types/travel';
import peruAdm1 from '../data/peruAdm1.json';
import { useWayra } from '../context/CartContext';

export const InteractivePeruMapVisual: React.FC = () => {
  const { formatPrice } = useWayra();
  const [selectedId, setSelectedId] = useState<DestinationId>('valle-sagrado');
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.CircleMarker>>({});

  const selectedDest = useMemo(
    () => DESTINATIONS_LIST.find((d) => d.id === selectedId) ?? DESTINATIONS_LIST[0],
    [selectedId]
  );

  const matchingTours = useMemo(
    () => TOURS_CATALOG.filter((t) => t.destinationSlug === selectedId).slice(0, 2),
    [selectedId]
  );

  // Initialize crisp Sunlit Vector Atlas with Leaflet
  useEffect(() => {
    const el = mapRef.current;
    if (!el || leafletInstanceRef.current) return;

    const map = L.map(el, {
      center: [-11.5, -74.5],
      zoom: 5,
      minZoom: 4,
      maxZoom: 8,
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: false
    });
    leafletInstanceRef.current = map;

    const admLayer = L.geoJSON(peruAdm1 as GeoJSON.GeoJsonObject, {
      style: {
        fillColor: '#DCEEE6',
        fillOpacity: 0.92,
        color: '#0D9F8B',
        weight: 1.1,
        opacity: 0.45
      }
    }).addTo(map);

    map.fitBounds(admLayer.getBounds(), { padding: [18, 18] });

    // Route curve through Peru highlights
    const routeCoords: [number, number][] = [
      [-12.1211, -77.0297],
      [-14.0875, -75.7626],
      [-14.8289, -74.9386],
      [-15.6143, -71.9082],
      [-15.8402, -70.0219],
      [-13.5319, -71.9675],
      [-13.1631, -72.545],
      [-12.5933, -69.1891]
    ];
    L.polyline(routeCoords, {
      color: '#F26430',
      weight: 2.5,
      dashArray: '6 6',
      opacity: 0.75
    }).addTo(map);

    DESTINATIONS_LIST.forEach((dest) => {
      const marker = L.circleMarker([dest.lat, dest.lng], {
        radius: dest.id === selectedId ? 11 : 7.5,
        fillColor: dest.id === selectedId ? '#F26430' : '#0D9F8B',
        color: '#FFFFFF',
        weight: 2.5,
        fillOpacity: 1
      })
        .bindTooltip(dest.name, { direction: 'top', offset: [0, -8] })
        .on('click', () => setSelectedId(dest.id))
        .addTo(map);

      markersRef.current[dest.id] = marker;
    });

    return () => {
      map.remove();
      leafletInstanceRef.current = null;
    };
  }, []);

  // Update active marker highlight & smooth pan
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isSelected = id === selectedId;
      marker.setRadius(isSelected ? 12 : 7.5);
      marker.setStyle({
        fillColor: isSelected ? '#F26430' : '#0D9F8B',
        color: '#FFFFFF',
        weight: isSelected ? 3 : 2
      });
      if (isSelected) marker.bringToFront();
    });
  }, [selectedId]);

  return (
    <section className="py-16 sm:py-20 bg-[#FFFDF8]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-wayra text-[#F26430]">Mapa Vivo del Perú</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#162A22] mt-1">
              Explora nuestras 8 regiones tocando el mapa
            </h2>
          </div>
          <div className="flex overflow-x-auto sm:flex-wrap gap-1.5 pb-1 sm:pb-0 no-scrollbar">
            {DESTINATIONS_LIST.map((dest) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => setSelectedId(dest.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  selectedId === dest.id
                    ? 'bg-[#F26430] text-white shadow-xs'
                    : 'bg-[#FFF6EB] text-[#162A22] hover:bg-[#ECF8F4]'
                }`}
              >
                {dest.name.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Interactive Sunlit Map */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#162A22]/12 shadow-sm min-h-[290px] sm:min-h-[420px] lg:min-h-[450px] bg-[#EDF6FC] relative">
            <div ref={mapRef} className="w-full h-full min-h-[290px] sm:min-h-[420px] lg:min-h-[450px]" />
            <div className="pointer-events-none absolute bottom-3 left-3 z-[400] px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-[#162A22]/10 text-[11px] font-bold text-[#162A22] shadow-xs">
              Haz clic en cualquier punto del Perú
            </div>
          </div>

          {/* Animated Destination Explorer Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDest.id}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full rounded-3xl overflow-hidden bg-white border border-[#162A22]/12 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-[#FFF6EB]">
                    <img
                      src={selectedDest.heroImage}
                      alt={selectedDest.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#162A22]/85 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-[#F4A62A] block">
                          {selectedDest.region}
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                          {selectedDest.name}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 text-[#162A22] text-xs font-bold num-tabular shrink-0">
                        <Mountain className="w-3.5 h-3.5 text-[#0D9F8B]" />
                        {selectedDest.altitude}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-sm text-[#4C6257] leading-relaxed">
                      {selectedDest.summary}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[#FFF6EB] flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#F26430] shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#4C6257] block">
                            Mejor Época
                          </span>
                          <span className="font-bold text-[#162A22]">{selectedDest.bestSeason}</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#ECF8F4] flex items-center gap-2.5">
                        <Sun className="w-4 h-4 text-[#0D9F8B] shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#4C6257] block">
                            Clima Habitual
                          </span>
                          <span className="font-bold text-[#162A22]">{selectedDest.climate}</span>
                        </div>
                      </div>
                    </div>

                    {matchingTours.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <span className="eyebrow-wayra text-[#0D9F8B] block">
                          Experiencias en esta región
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {matchingTours.map((mt) => (
                            <Link
                              key={mt.id}
                              to={`/tours/${mt.slug}`}
                              className="p-3 rounded-xl bg-[#FFFDF8] border border-[#162A22]/10 hover:border-[#F26430] flex items-center justify-between gap-2 transition-colors"
                            >
                              <div className="min-w-0">
                                <span className="font-bold text-xs text-[#162A22] truncate block">
                                  {mt.shortTitle}
                                </span>
                                <span className="text-[11px] text-[#4C6257] num-tabular">
                                  {mt.durationLabel}
                                </span>
                              </div>
                              <span className="font-bold text-xs text-[#F26430] num-tabular shrink-0">
                                {formatPrice(mt.priceUsd)}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-4 bg-[#FFFDF8] border-t border-[#162A22]/10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4C6257]">
                    <MapPin className="w-3.5 h-3.5 text-[#F26430]" />
                    Salidas disponibles todo el año
                  </span>
                  <Link
                    to={`/catalogo?destino=${selectedDest.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F26430] hover:underline"
                  >
                    <span>Ver rutas en esta región</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
