
import React from 'react';
import Card from './Card';
import type { Day, Activity, Subsection } from '../types';

interface DaySectionProps {
  day: Day;
}

const CalendarDaysIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="list-disc list-outside mr-5 mt-2 space-y-2 text-slate-600">
        {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
);

const SubSectionComponent: React.FC<{ subsection: Subsection }> = ({ subsection }) => (
    <div className="mt-4">
        <h4 className="font-semibold text-slate-700">{subsection.title}</h4>
        <BulletList items={subsection.points} />
    </div>
);

const ActivityComponent: React.FC<{ activity: Activity }> = ({ activity }) => (
    <div className="py-4">
        <h3 className="text-lg font-bold text-teal-700">{activity.title}</h3>
        <p className="mt-1 text-slate-600 leading-relaxed">{activity.description}</p>
        {activity.points && <BulletList items={activity.points} />}
        {activity.subsections && (
            <div className="mt-2 space-y-3">
                {activity.subsections.map((sub, index) => <SubSectionComponent key={index} subsection={sub} />)}
            </div>
        )}
    </div>
);


const DaySection: React.FC<DaySectionProps> = ({ day }) => {
  return (
    <Card>
      <header className="bg-slate-100 p-4 border-b border-slate-200">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="bg-teal-500 text-white rounded-lg p-3 flex items-center justify-center">
             <CalendarDaysIcon />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              اليوم {day.dayNumber}: <span className="font-semibold">{day.title}</span>
            </h2>
            <p className="text-sm font-medium text-slate-500">{day.date}</p>
          </div>
        </div>
      </header>
      <div className="p-6 md:p-8 divide-y divide-slate-200">
        {day.activities.map((activity, index) => (
          <ActivityComponent key={index} activity={activity} />
        ))}
      </div>
    </Card>
  );
};

export default DaySection;
