import React from 'react';
import CustomButton from './CustomButton';
import { Plus, Search, Clapperboard } from 'lucide-react';
import { useManga } from '../context/MangaContext';
import ToggleButton from './ui/ToggleButton';

interface NavLink {
  type: string;
  link: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navlinks: NavLink[] = [
  { type: 'Home',      link: '/'                     },
  { type: 'Search',    link: '/search', icon: Search },
  { type: 'Genres',    link: '/genres', icon: Clapperboard },
  // { type: 'Add Manga', link: '/addManga', icon: Plus  },
];

const Navbar: React.FC = () => {
  const { toggleNsfw, nsfwEnabled } = useManga();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between h-16 gap-3 sm:gap-0">
        
     
         
           <a href="/" className="flex-shrink-0 justify-">
          <h2 className="text-3xl font-bold text-[#fff9eb] select-none cursor-pointer">ReviewRōmaji</h2>
        </a>

           
        <div className="flex items-center gap-4">
      

          <ul className="flex flex-wrap gap-6 items-center">
            {navlinks.map(({ type, link, icon: Icon }) => (
              <li key={link}>
                <a
                  href={link}
                  className="flex items-center text-black text-lg hover:text-gray-700 transition"
                >
                  {Icon && <Icon className="h-5 w-5 mr-1" />}
                  {type}
                </a>
              </li>
            ))}
          </ul>
        </div>
{/* 
        <CustomButton text="Login" color="black-500" /> */}
         <ToggleButton checked={nsfwEnabled} onChange={toggleNsfw}>
            {nsfwEnabled ? 'Family' : 'NSFW'}
          </ToggleButton>
        
      </div>
    </nav>
  );
};

export default Navbar;
