import React, { useState } from 'react';
import { reportData as initialReportData } from './data';
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

const EditNotification: React.FC = () => (
  <div className="edit-notification bg-teal-50 border-b-2 border-teal-200 text-center p-3 text-sm text-teal-800 font-semibold sticky top-0 z-40">
    <p>ملاحظة: يمكنك الضغط على أي نص في التقرير لتعديله مباشرة.</p>
  </div>
);


const App: React.FC = () => {
  const [data, setData] = useState<ReportData>(initialReportData);

  const handleUpdate = (updateFn: (draft: ReportData) => void) => {
    setData(currentData => {
      const newData = JSON.parse(JSON.stringify(currentData));
      updateFn(newData);
      return newData;
    });
  };

  const handleHeaderChange = (field: 'title' | 'subtitle' | 'dateRange', value: string) => {
    handleUpdate(draft => { draft[field] = value; });
  };

  const handleIntroductionChange = (paragraphIndex: number, value: string) => {
    handleUpdate(draft => { draft.introduction.paragraphs[paragraphIndex] = value; });
  };
  
  const handleSectionTitleChange = (section: 'introduction' | 'conclusion' | 'recommendations', value: string) => {
    handleUpdate(draft => { draft[section].title = value; });
  };

  const handleDayChange = (dayIndex: number, field: 'title' | 'date', value: string) => {
    handleUpdate(draft => { draft.days[dayIndex][field] = value; });
  };
  
  const handleActivityChange = (dayIndex: number, activityIndex: number, field: 'title' | 'description', value: string) => {
    handleUpdate(draft => { draft.days[dayIndex].activities[activityIndex][field] = value; });
  };

  const handleActivityPointChange = (dayIndex: number, activityIndex: number, pointIndex: number, value: string) => {
    handleUpdate(draft => {
      if (draft.days[dayIndex].activities[activityIndex].points) {
        draft.days[dayIndex].activities[activityIndex].points![pointIndex] = value;
      }
    });
  };
  
  const handleSubsectionChange = (dayIndex: number, activityIndex: number, subsectionIndex: number, field: 'title', value: string) => {
    handleUpdate(draft => {
        if(draft.days[dayIndex].activities[activityIndex].subsections) {
            draft.days[dayIndex].activities[activityIndex].subsections![subsectionIndex][field] = value;
        }
    });
  };

  const handleSubsectionPointChange = (dayIndex: number, activityIndex: number, subsectionIndex: number, pointIndex: number, value: string) => {
    handleUpdate(draft => {
        if(draft.days[dayIndex].activities[activityIndex].subsections) {
            draft.days[dayIndex].activities[activityIndex].subsections![subsectionIndex].points[pointIndex] = value;
        }
    });
  };

  const handleConclusionPointChange = (pointIndex: number, value: string) => {
    handleUpdate(draft => { draft.conclusion.points[pointIndex] = value; });
  };

  const handleRecommendationPointChange = (pointIndex: number, value: string) => {
    handleUpdate(draft => { draft.recommendations.points[pointIndex] = value; });
  };


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
      
      <EditNotification />

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Header 
          title={data.title}
          subtitle={data.subtitle}
          dateRange={data.dateRange}
          onDataChange={handleHeaderChange}
        />

        <IntroductionSection 
          data={data.introduction}
          onParagraphChange={handleIntroductionChange}
          onTitleChange={(value) => handleSectionTitleChange('introduction', value)}
        />

        {data.days.map((day, dayIndex) => (
          <DaySection 
            key={dayIndex} 
            day={day} 
            dayIndex={dayIndex}
            onDayChange={handleDayChange}
            onActivityChange={handleActivityChange}
            onActivityPointChange={handleActivityPointChange}
            onSubsectionChange={handleSubsectionChange}
            onSubsectionPointChange={handleSubsectionPointChange}
          />
        ))}

        <ConclusionSection 
          data={data.conclusion}
          onPointChange={handleConclusionPointChange}
          onTitleChange={(value) => handleSectionTitleChange('conclusion', value)}
        />

        <RecommendationsSection 
          data={data.recommendations}
          onPointChange={handleRecommendationPointChange}
          onTitleChange={(value) => handleSectionTitleChange('recommendations', value)}
        />

        <footer className="text-center text-sm text-slate-500 py-8">
          <p>تم تنسيق هذا التقرير بواسطة تطبيق الويب الحديث. جميع النصوص قابلة للتعديل.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;