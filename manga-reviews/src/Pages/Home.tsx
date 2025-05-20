import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

import Navbar from '../components/Navbar';
import MangaCard from '../components/MangaCard';
import { useManga } from '../context/MangaContext';
import type { Manga } from '../types/manga'

const Home: React.FC = () => {
  const { mangas } = useManga();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [topMangaList, setTopMangaList] = useState<Manga[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  {/*fetching top manga*/}

  useEffect(()=>{

    const fetchTopManga = async ()=>{
      
         try {
            const response = await fetch('https://api.jikan.moe/v4/top/manga');
            const data = await response.json();
            const topList: Manga[] = data.data.map((item: any) => ({
                id: String(item.mal_id),
                title: item.title,
                description: item.synopsis || '',
                author: item.authors?.map((a: any) => a.name).join(', ') || 'Unknown',
                coverImage: item.images?.jpg?.image_url || '/placeholder.svg',
                genres: item.genres?.map((g: any) => g.name) || [],
                publicationYear: item.year,
                reviews: [],
                averageRating: item.score || 0,
             }));
             setTopMangaList(topList.slice(0,10));
         }catch (err){
           console.error('Failed to fetch top manga:', err);
         }
    }
    fetchTopManga();

  },[])




 
  const recentMangas = [...mangas]
    .sort((a, b) => {
      const lastA = a.reviews.length
        ? new Date(a.reviews[a.reviews.length - 1].createdAt).getTime()
        : 0;
      const lastB = b.reviews.length
        ? new Date(b.reviews[b.reviews.length - 1].createdAt).getTime()
        : 0;
      return lastB - lastA;
    })
    .slice(0, 5);
 
  const topRatedMangas = [...mangas]
    .filter(m => m.reviews.length > 0)
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 5);

   return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pt-6">
        <div className="max-w-6xl mx-auto px-4 space-y-12">

          {/* Search & Add */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search your manga..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-manga-red"
                />
              </div>
              <button
                type="submit"
                className="bg-manga-red px-6 py-2 rounded-r-lg text-white font-medium hover:bg-red-700 transition"
              >
                Search
              </button>
            </form>
            <Link to="/addManga">
              <button className="flex items-center bg-white border border-manga-red text-manga-red px-6 py-2 rounded-lg hover:bg-manga-red hover:text-white transition">
                <Plus className="mr-2 h-5 w-5" />
                Add Manga
              </button>
            </Link>
          </div>
           {/* Top Rated from Collection */}
          {topRatedMangas.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">My Top Rated Manga</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {topRatedMangas.map(m => (
                  <MangaCard key={m.id} manga={m} />
                ))}
              </div>
            </section>
          )}

          {/* Top Manga from API */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">World Top Manga</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {topMangaList.map(m => (
                <MangaCard key={m.id} manga={m} />
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          {recentMangas.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {recentMangas.map(m => (
                  <MangaCard key={m.id} manga={m} />
                ))}
              </div>
            </section>
          )}

         
        </div>
      </main>
    </>
  );
};

export default Home;