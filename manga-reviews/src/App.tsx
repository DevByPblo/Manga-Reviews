// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMangaPage from './pages/AddMangaPage';
import MangaDetailsPage from './pages/MangaDetailsPage';
import SearchPage from './pages/Search';
import NotFound from './pages/NotFound';
import Genres from './pages/Genres';
import './App.css';
import Navbar from './components/Navbar';
import GenreMangaList from './pages/GenreMangaList';

export default function App() {
  return (

    <main >
      <div className='mb-10'>
<Navbar />

      </div>
            
        <Routes>
              <Route path="/" element={<Home />} />       
              <Route path="/addManga" element={<AddMangaPage />} />       
              <Route path="/search" element={<SearchPage />} />       
              <Route path="/manga/:id" element={<MangaDetailsPage />} />         
              <Route path="*" element={<NotFound />} />
              <Route path="/Genres" element={<Genres/>} />
               <Route path="/genre/:id" element={<GenreMangaList />} />
            </Routes>
    </main>
   
  );
}
