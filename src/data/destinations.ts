import type { DestinationInfo } from '../types/travel';
import { PERU_MEDIA } from './mediaAssets';

export const DESTINATIONS_LIST: DestinationInfo[] = [
  {
    id: 'valle-sagrado',
    name: 'Machu Picchu & Valle Sagrado',
    region: 'Cusco · Ceja de Selva',
    tagline: 'Ciudadela Inca entre montañas verdes, terrazas milenarias y trenes panorámicos.',
    altitude: '2,430 – 3,500 m s.n.m.',
    bestSeason: 'Abril a Noviembre (cielo despejado)',
    climate: 'Templado luminoso 12°C – 22°C',
    colorHex: '#0D9F8B',
    lat: -13.1631,
    lng: -72.545,
    heroImage: PERU_MEDIA.machuPicchuClassic,
    summary:
      'El corazón más vibrante de los Andes: pueblos vivos como Ollantaytambo y Pisac, andenerías circulares de Moray y la maravilla mundial de Machu Picchu.',
    experiences: ['Circuito 2 Clásico', 'Tren Vistadome 360°', 'Salineras de Maras', 'Camino Inca Corto']
  },
  {
    id: 'cusco',
    name: 'Cusco & Alta Montaña',
    region: 'Sierra Sur',
    tagline: 'Calles empedradas, mercados coloridos y cordilleras pintadas por minerales.',
    altitude: '3,399 – 5,036 m s.n.m.',
    bestSeason: 'Mayo a Octubre',
    climate: 'Fresco y soleado 6°C – 19°C',
    colorHex: '#F26430',
    lat: -13.5319,
    lng: -71.9675,
    heroImage: PERU_MEDIA.vinicunca,
    summary:
      'Capital histórica viva donde el arte barroco reposa sobre muros incas, rodeada de joyas naturales como la Montaña de 7 Colores y las 7 Lagunas de Ausangate.',
    experiences: ['Vinicunca & Valle Rojo', 'Ausangate 7 Lagunas', 'San Pedro & Cacao', 'Sacsayhuamán']
  },
  {
    id: 'paracas-huacachina',
    name: 'Paracas & Oasis Huacachina',
    region: 'Costa Sur · Ica',
    tagline: 'Acantilados dorados frente al Pacífico, pingüinos de Humboldt y dunas infinitas.',
    altitude: '0 – 420 m s.n.m.',
    bestSeason: 'Todo el año (sol 330 días)',
    climate: 'Cálido costero 19°C – 29°C',
    colorHex: '#F4A62A',
    lat: -14.0875,
    lng: -75.7626,
    heroImage: PERU_MEDIA.huacachina,
    summary:
      'Pura diversión al aire libre: navega entre lobos marinos en las Islas Ballestas, recorre la Playa Roja y siente la adrenalina en buggies 4x4 sobre las dunas de Huacachina.',
    experiences: ['Islas Ballestas en Yate', 'Buggies & Sandboard', 'Playa Roja Reserva', 'Cata de Pisco Artesanal']
  },
  {
    id: 'lima',
    name: 'Lima Costera & Gastronomía',
    region: 'Costa Central',
    tagline: 'Malecón verde frente al mar, barrios bohemios y la capital culinaria de América.',
    altitude: '0 – 161 m s.n.m.',
    bestSeason: 'Diciembre a Abril (verano pleno)',
    climate: 'Brisa marina 17°C – 27°C',
    colorHex: '#2978C6',
    lat: -12.1211,
    lng: -77.0297,
    heroImage: PERU_MEDIA.mirafloresCosta,
    summary:
      'Una ciudad vibrante mirando al Pacífico: cata de ceviches frente a los acantilados de Miraflores, arte callejero en Barranco y casonas virreinales.',
    experiences: ['Barranco & Arte Urbano', 'Mercado + Taller Ceviche', 'Miraflores Costa Verde', 'Circuito del Agua']
  },
  {
    id: 'arequipa-colca',
    name: 'Arequipa & Cañón del Colca',
    region: 'Andes Volcánicos del Sur',
    tagline: 'Arquitectura en sillar blanco bajo tres volcanes y el vuelo majestuoso del cóndor.',
    altitude: '2,335 – 4,910 m s.n.m.',
    bestSeason: 'Abril a Noviembre',
    climate: 'Seco luminoso 10°C – 23°C',
    colorHex: '#E05A47',
    lat: -15.6143,
    lng: -71.9082,
    heroImage: PERU_MEDIA.arequipaCatalina,
    summary:
      'El contraste perfecto de altura gradual: monasterios color carmesí y azul añil en Arequipa, aguas termales y miradores naturales sobre uno de los cañones más profundos del planeta.',
    experiences: ['Monasterio Santa Catalina', 'Mirador Cruz del Cóndor', 'Aguas Termales La Calera', 'Ruta de Miradores Misti']
  },
  {
    id: 'amazonia-tambopata',
    name: 'Amazonía Viva en Tambopata',
    region: 'Selva Sur · Madre de Dios',
    tagline: 'Lagos en espejo, guacamayos multicolores al amanecer y puentes sobre copas gigantes.',
    altitude: '183 m s.n.m.',
    bestSeason: 'Mayo a Octubre',
    climate: 'Tropical vivo 23°C – 32°C',
    colorHex: '#15803D',
    lat: -12.5933,
    lng: -69.1891,
    heroImage: PERU_MEDIA.tambopataMacaws,
    summary:
      'Desconexión alegre en eco-lodges rodeados de biodiversidad: remo silencioso en el Lago Sandoval entre nutrias gigantes y caminatas nocturnas seguras.',
    experiences: ['Lago Sandoval en Canoa', 'Collpa de Guacamayos', 'Canopy sobre 35 metros', 'Eco-Lodge Privado']
  },
  {
    id: 'puno-titicaca',
    name: 'Lago Titicaca & Islas Vivas',
    region: 'Altiplano Sur',
    tagline: 'El lago navegable más alto del mundo entre totorales dorados y cielo azul intenso.',
    altitude: '3,812 m s.n.m.',
    bestSeason: 'Mayo a Octubre',
    climate: 'Altiplánico soleado 4°C – 16°C',
    colorHex: '#2563EB',
    lat: -15.8402,
    lng: -70.0219,
    heroImage: PERU_MEDIA.titicacaUros,
    summary:
      'Encuentros cálidos y coloridos sobre islas flotantes tejidas con totora en Uros y caminatas suaves por los senderos de piedra de la Isla Taquile.',
    experiences: ['Islas Flotantes Uros', 'Arte Textil Taquile', 'Lancha Veloz Titicaca', 'Ruta del Sol Cusco–Puno']
  },
  {
    id: 'nazca',
    name: 'Líneas de Nazca & Desierto',
    region: 'Desierto Sur · Ica',
    tagline: 'Geoglifos milenarios observados desde el aire bajo luz cristalina del desierto.',
    altitude: '520 m s.n.m.',
    bestSeason: 'Todo el año',
    climate: 'Desértico soleado 18°C – 31°C',
    colorHex: '#C27803',
    lat: -14.8289,
    lng: -74.9386,
    heroImage: PERU_MEDIA.nazcaLines,
    summary:
      'Sobrevolar el Colibrí, el Mono y el Cóndor en avionetas con ventana panorámica individual y descubrir los ingeniosos acueductos en espiral de Cantalloc.',
    experiences: ['Sobrevuelo Clásico 35 min', 'Acueductos de Cantalloc', 'Mirador Metálico Panamericana', 'Combo Paracas + Nazca']
  }
];
