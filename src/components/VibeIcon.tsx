import React from 'react';
import {
  Compass,
  Landmark,
  Luggage,
  Mountain,
  Sparkles,
  Trees,
  Utensils
} from 'lucide-react';
import type { TravelVibeId } from '../types/travel';

export const VibeIcon: React.FC<{ id: TravelVibeId; className?: string }> = ({
  id,
  className = 'w-3.5 h-3.5'
}) => {
  switch (id) {
    case 'paquetes':
      return <Luggage className={className} />;
    case 'maravillas':
      return <Landmark className={className} />;
    case 'aventura':
      return <Compass className={className} />;
    case 'montana':
      return <Mountain className={className} />;
    case 'costa-gastro':
      return <Utensils className={className} />;
    case 'selva':
      return <Trees className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};
