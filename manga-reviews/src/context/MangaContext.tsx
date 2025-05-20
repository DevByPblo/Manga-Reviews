import React, { createContext, useState, useEffect, useContext } from 'react';
import type { Manga, Review } from '../types/manga';

interface MangaContextType {
  mangas: Manga[];
  addManga: (manga: Omit<Manga, 'id' | 'reviews' | 'averageRating'>) => void;
  getManga: (id: string) => Manga | undefined;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  searchManga: (query: string) => Manga[];
  searchOnline: (query: string) => Promise<any[]>;
  importOnlineManga: (manga: any) => void;
}

const MangaContext = createContext<MangaContextType | undefined>(undefined);

const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return parseFloat((sum / reviews.length).toFixed(1));
};

const sampleMangas: Manga[] = [
  // ... (same sample data) ...
];

export const MangaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mangas, setMangas] = useState<Manga[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mangas');
    if (saved) {
      try {
        const parsed: Manga[] = JSON.parse(saved);
        const formatted = parsed.map(m => ({
          ...m,
          reviews: m.reviews.map(r => ({ ...r, createdAt: new Date(r.createdAt) }))
        }));
        setMangas(formatted);
      } catch {
        setMangas(sampleMangas);
      }
    } else {
      setMangas(sampleMangas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mangas', JSON.stringify(mangas));
  }, [mangas]);

  const addManga = (mangaData: Omit<Manga, 'id' | 'reviews' | 'averageRating'>) => {
    const newManga: Manga = {
      ...mangaData,
      id: crypto.randomUUID(),
      reviews: [],
      averageRating: 0,
    };
    setMangas(prev => [...prev, newManga]);
  };

  const getManga = (id: string): Manga | undefined => mangas.find(m => m.id === id);

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setMangas(prev => prev.map(manga => {
      if (manga.id === reviewData.mangaId) {
        const updated = [...manga.reviews, newReview];
        return { ...manga, reviews: updated, averageRating: calculateAverageRating(updated) };
      }
      return manga;
    }));
  };

  const searchManga = (query: string): Manga[] => {
    if (!query) return mangas;
    const q = query.toLowerCase();
    return mangas.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.author.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.genres.some(g => g.toLowerCase().includes(q))
    );
  };

  const searchOnline = async (query: string): Promise<any[]> => {
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&sfw=true`
      );
      const data = await res.json();
      console.log(data);
      return data.data || [];
    } catch {
      return [];
    }
  };

  const importOnlineManga = (mangaData: any) => {
    const newManga: Manga = {
      id: crypto.randomUUID(),
      title: mangaData.title,
      description: mangaData.synopsis || 'No description available.',
      author: mangaData.authors?.map((a: any) => a.name).join(', ') || 'Unknown',
      coverImage: mangaData.images?.jpg?.image_url || '',
      genres: mangaData.genres?.map((g: any) => g.name) || [],
      publicationYear: mangaData.published?.prop?.from?.year,
      reviews: [],
      averageRating: 0,
    };
    setMangas(prev => prev.some(m => m.title === newManga.title) ? prev : [...prev, newManga]);
  };

  return (
    <MangaContext.Provider value={{
      mangas,
      addManga,
      getManga,
      addReview,
      searchManga,
      searchOnline,
      importOnlineManga,
    }}>
      {children}
    </MangaContext.Provider>
  );
};

export const useManga = (): MangaContextType => {
  const context = useContext(MangaContext);
  if (!context) {
    throw new Error('useManga must be used within a MangaProvider');
  }
  return context;
};
