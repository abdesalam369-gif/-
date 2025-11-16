import React from 'react';
import Card from './Card';
import SectionHeader from './SectionHeader';
import type { Section } from '../types';

interface IntroductionSectionProps {
  data: Section;
  onTitleChange: (newTitle: string) => void;
  onParagraphChange: (paragraphIndex: number, newValue: string) => void;
}

const InformationCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ data, onTitleChange, onParagraphChange }) => {
  return (
    <Card>
      <div className="p-6 md:p-8">
        <SectionHeader 
            icon={<InformationCircleIcon />} 
            title={data.title}
            onTitleChange={onTitleChange}
        />
        <div className="space-y-4 text-slate-600 leading-relaxed">
          {data.paragraphs.map((paragraph, index) => (
            <p 
                key={index}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onParagraphChange(index, e.currentTarget.innerText)}
            >
                {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default IntroductionSection;