import React, { ReactNode } from 'react';
import { School } from 'lucide-react';
import { SCHOOL_NAME } from '../constants';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative flex flex-col font-sans text-gray-800 bg-gray-50 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?blur=2" 
          alt="School Background" 
          className="w-full h-full object-cover"
        />
        {/* SMP Navy Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-800/80"></div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl z-0"></div>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md mb-8 text-center animate-fade-in-down">
          <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-full mb-4 ring-2 ring-white/20 shadow-lg">
            <School className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
            {SCHOOL_NAME}
          </h1>
          <p className="text-blue-100 mt-2 text-lg">Portal E-Rapor Digital</p>
        </div>
        
        {children}
      </main>

      <footer className="relative z-10 p-4 text-center text-blue-200 text-sm">
        <p>&copy; {new Date().getFullYear()} {SCHOOL_NAME}. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
};
