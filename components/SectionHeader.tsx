
import React from 'react';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title }) => {
  return (
    <div className="flex items-center space-x-3 rtl:space-x-reverse border-r-4 border-teal-500 pr-4 mb-6">
      <span className="text-teal-500">{icon}</span>
      <h2 className="text-2xl font-bold text-slate-700">{title}</h2>
    </div>
  );
};

export default SectionHeader;
