import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, Search } from 'lucide-react';
import { TOURS_CATALOG, VIBE_CATEGORIES } from '../data/toursData';
import { DESTINATIONS_LIST } from '../data/destinations';
import { TourVisualCard } from '../components/TourVisualCard';
import { QuickPreviewModal } from '../components/QuickPreviewModal';
import { VibeIcon } from '../components/VibeIcon';
import type { TourItem, TravelVibeId } from '../types/travel';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDest = searchParams.get('destino') ?? 'todos';
  const initialVibe = (searchParams.get('vibe') as TravelVibeId) ?? 'todos';

  const [destFilter, setDestFilter] = useState<string>(initialDest);
  const [vibeFilter, setVibeFilter] = useState<TravelVibeId>(initialVibe);
  const [query, setQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [previewTour, setPreviewTour] = useState<TourItem | null>(null);

  const filtered = useMemo(() => {
    const base = TOURS_CATALOG.filter((t) => {
      const okDest = destFilter === 'todos' || t.destinationSlug === destFilter;
      const okVibe = vibeFilter === 'todos' || t.vibeTags.includes(vibeFilter);
      const okQuery =
        !query.trim() ||
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.destinationName.toLowerCase().includes(query.toLowerCase());
      return okDest && okVibe && okQuery;
    });

    if (sortBy === 'price-asc') return [...base].sort((a, b) => a.priceUsd - b.priceUsd);
    if (sortBy === 'price-desc') return [...base].sort((a, b) => b.priceUsd - a.priceUsd);
    return [...base].sort((a, b) => b.rating - a.rating);
  }, [destFilter, vibeFilter, query, sortBy]);

  const resetFilters = () => {
    setDestFilter('todos');
    setVibeFilter('todos');
    setQuery('');
    setSearchParams({});
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#162A22]/10 pb-6">
          <div>
            <span className="eyebrow-wayra text-[#0D9F8B]">Catálogo Visual Wayra</span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#162A22] mt-1">
              Experiencias &amp; Rutas por Perú
            </h1>
          </div>
          <span className="text-sm font-bold text-[#F26430] num-tabular">
            {filtered.length} experiencias encontradas
          </span>
        </div>

        {/* Interactive Filter Toolbar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF6EB] border border-[#162A22]/10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-[#4C6257] absolute left-3.5 top-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar destino, Machu Picchu, dunas, ceviche..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#162A22]/15 text-sm text-[#162A22] focus:outline-none focus:border-[#F26430]"
              />
            </div>

            <div className="lg:col-span-4">
              <select
                value={destFilter}
                onChange={(e) => setDestFilter(e.target.value)}
                aria-label="Filtrar por región"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#162A22]/15 text-sm font-semibold text-[#162A22]"
              >
                <option value="todos">Todas las regiones ({DESTINATIONS_LIST.length})</option>
                {DESTINATIONS_LIST.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'price-asc' | 'price-desc')}
                aria-label="Ordenar"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#162A22]/15 text-sm font-semibold text-[#162A22]"
              >
                <option value="popular">Mejor valoradas</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {VIBE_CATEGORIES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVibeFilter(v.id as TravelVibeId)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                    vibeFilter === v.id
                      ? 'bg-[#162A22] text-white'
                      : 'bg-white text-[#162A22] hover:bg-[#ECF8F4]'
                  }`}
                >
                  <VibeIcon id={v.id as TravelVibeId} className="w-3.5 h-3.5" />
                  <span>{v.label}</span>
                </button>
              ))}
            </div>

            {(destFilter !== 'todos' || vibeFilter !== 'todos' || query) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F26430] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((tour) => (
            <TourVisualCard
              key={tour.id}
              tour={tour}
              onQuickPreview={(item) => setPreviewTour(item)}
            />
          ))}
        </div>
      </div>

      <QuickPreviewModal tour={previewTour} onClose={() => setPreviewTour(null)} />
    </div>
  );
};
