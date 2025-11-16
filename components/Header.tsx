
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  dateRange: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, dateRange }) => {
  return (
    <header className="text-center py-8 mb-4 border-b-2 border-teal-500">
      <h1 className="text-4xl md:text-5xl font-extrabold text-teal-700 tracking-wide">
        {title}
      </h1>
      <p className="mt-3 text-lg md:text-xl font-medium text-slate-600">
        {subtitle}
      </p>
      <p className="mt-2 text-md text-slate-500 font-semibold bg-teal-50 inline-block px-4 py-1 rounded-full">
        {dateRange}
      </p>
    </header>
  );
};

export default Header;
