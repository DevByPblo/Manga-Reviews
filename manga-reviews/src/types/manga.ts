
export interface Manga {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  genres: string[];
  publicationYear?: number;
  reviews: Review[];
  averageRating: number;
}

export interface Review {
  id: string;
  mangaId: string;
  userId: string;
  username: string;
  rating: number;
  content: string;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
}
