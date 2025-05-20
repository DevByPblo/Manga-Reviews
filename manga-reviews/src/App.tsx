// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMangaPage from './pages/AddMangaPage';
import SearchPage from './Pages/Search';
import './App.css'
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addManga" element={<AddMangaPage />} />
      <Route path="/Search" element={<SearchPage />} />
    </Routes>
  );
}
