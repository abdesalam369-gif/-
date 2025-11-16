
import React from 'react';
import Card from './Card';
import SectionHeader from './SectionHeader';
import type { SectionWithPoints } from '../types';

interface ConclusionSectionProps {
  data: SectionWithPoints;
}

const ClipboardListIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const ConclusionSection: React.FC<ConclusionSectionProps> = ({ data }) => {
  const intro = data.points[0];
  const listItems = data.points.slice(1);

  return (
    <Card>
      <div className="p-6 md:p-8">
        <SectionHeader icon={<ClipboardListIcon />} title={data.title} />
        <p className="text-slate-600 leading-relaxed mb-4">{intro}</p>
        <ul className="space-y-3">
          {listItems.map((point, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-teal-500 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              <span className="text-slate-600">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default ConclusionSection;
