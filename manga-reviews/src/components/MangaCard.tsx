import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Manga } from '../types/manga.ts';

interface MangaCardProps {
  manga: Manga;
}

const MangaCard: React.FC<MangaCardProps> = ({ manga }) => {
  return (
    <Link to={`/manga/${manga.id}`} className="block">
      <div className="manga-card h-full bg-white">
        <div className="relative pb-[140%]">
          <img 
            src={manga.coverImage || '/placeholder.svg'} 
            alt={manga.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-1">{manga.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{manga.author}</p>
          <div className="flex items-center">
            <Star className="text-yellow-500 h-4 w-4 mr-1" />
            <span>{manga.averageRating || 'No ratings'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;
