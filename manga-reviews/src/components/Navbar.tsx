import React from 'react';
import CustomButton from './CustomButton';
import { Plus, Search } from 'lucide-react';

 
interface NavLink {
  type: string;
  link: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

 
const navlinks: NavLink[] = [
  { type: 'Home',      link: '/'                     },
  { type: 'Add Manga', link: '/addManga', icon: Plus  },
  { type: 'Search',    link: '/Search', icon: Search },
];

 
const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <h2 className="text-3xl font-bold">ReviewRōmaji</h2>

        <ul className="flex gap-8 items-center">
          {navlinks.map((nav, idx) => (
            <li key={idx}>
              <a href={nav.link} className="flex items-center text-black text-lg hover:text-gray-700">
                {nav.icon && <nav.icon className="h-5 w-5 mr-1" />}
                {nav.type}
              </a>
            </li>
          ))}
        </ul>

        <CustomButton text="Login" color="black-500" />
      </div>
    </nav>
  );
};

export default Navbar;
