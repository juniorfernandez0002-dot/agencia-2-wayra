export type TravelVibeId =
  | 'todos'
  | 'maravillas'
  | 'aventura'
  | 'montana'
  | 'costa-gastro'
  | 'selva'
  | 'paquetes';

export type DestinationId =
  | 'cusco'
  | 'valle-sagrado'
  | 'lima'
  | 'paracas-huacachina'
  | 'nazca'
  | 'arequipa-colca'
  | 'amazonia-tambopata'
  | 'puno-titicaca';

export interface ItineraryStep {
  timeOrDay: string;
  title: string;
  description: string;
  altitude?: string;
}

export interface TourItem {
  id: string;
  slug: string;
  code: string;
  title: string;
  shortTitle: string;
  tagline: string;
  vibe: Exclude<TravelVibeId, 'todos'>;
  vibeTags: Exclude<TravelVibeId, 'todos'>[];
  destinationSlug: DestinationId;
  destinationName: string;
  regionLabel: string;
  durationDays: number;
  durationLabel: string;
  altitudeMax: string;
  difficulty: 'Relajada' | 'Suave' | 'Moderada' | 'Activa';
  priceUsd: number;
  privatePriceUsd: number;
  originalPriceUsd?: number;
  promoBadge?: string;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  gallery: string[];
  highlights: string[];
  stops: string[];
  itinerary: ItineraryStep[];
  included: string[];
  notIncluded: string[];
}

export interface DestinationInfo {
  id: DestinationId;
  name: string;
  region: string;
  tagline: string;
  altitude: string;
  bestSeason: string;
  climate: string;
  colorHex: string;
  lat: number;
  lng: number;
  heroImage: string;
  summary: string;
  experiences: string[];
}
