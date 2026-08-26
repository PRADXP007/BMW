import React from 'react';
import { SmoothScroll } from '../components/layout/SmoothScroll';
import '../index.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#131313] text-white font-mono min-h-screen overflow-x-hidden antialiased selection:bg-[#E4492E] selection:text-white">
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
};

export default RootLayout;
