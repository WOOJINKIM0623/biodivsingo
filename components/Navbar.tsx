import React from 'react';
import { AppView } from '../types';
import { UI_TEXT } from '../constants';

interface NavbarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { view: AppView.Reporting, label: UI_TEXT.NAV_REPORT },
    { view: AppView.Learning, label: UI_TEXT.NAV_LEARN },
    { view: AppView.Examples, label: UI_TEXT.NAV_EXAMPLES }, // Added new nav item
  ];

  return (
    <nav className="bg-green-700 text-white shadow-md mb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="https://picsum.photos/seed/haemi_logo/40/40" alt="App Logo" className="h-8 w-8 rounded-full mr-3"/>
            <h1 className="text-xl font-semibold">{UI_TEXT.APP_TITLE}</h1>
          </div>
          <div className="flex space-x-2 md:space-x-4">
            {navItems.map(item => (
              <button
                key={item.view}
                onClick={() => onViewChange(item.view)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                  ${currentView === item.view 
                    ? 'bg-green-900 text-white' 
                    : 'text-green-100 hover:bg-green-600 hover:text-white'}`}
                aria-current={currentView === item.view ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
