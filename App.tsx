
import React from 'react';
import { reportData } from './data';
import type { ReportData } from './types';
import Header from './components/Header';
import IntroductionSection from './components/IntroductionSection';
import DaySection from './components/DaySection';
import ConclusionSection from './components/ConclusionSection';
import RecommendationsSection from './components/RecommendationsSection';

const PrintIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);


const App: React.FC = () => {
  const data: ReportData = reportData;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased">
       <div className="print-button-container fixed bottom-8 right-8 z-50">
        <button
          onClick={() => window.print()}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-5 rounded-full shadow-lg flex items-center transition-transform transform hover:scale-105"
          aria-label="Print Report"
        >
          <span>طباعة</span>
          <PrintIcon />
        </button>
      </div>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Header 
          title={data.title}
          subtitle={data.subtitle}
          dateRange={data.dateRange}
        />

        <IntroductionSection data={data.introduction} />

        {data.days.map((day, index) => (
          <DaySection key={index} day={day} />
        ))}

        <ConclusionSection data={data.conclusion} />

        <RecommendationsSection data={data.recommendations} />

        <footer className="text-center text-sm text-slate-500 py-8">
          <p>تم تنسيق هذا التقرير بواسطة تطبيق الويب الحديث</p>
        </footer>
      </main>
    </div>
  );
};

export default App;