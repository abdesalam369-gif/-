import React from 'react';
import Card from './Card';
import type { Day, Activity, Subsection } from '../types';

interface DaySectionProps {
  day: Day;
  dayIndex: number;
  onDayChange: (dayIndex: number, field: 'title' | 'date', value: string) => void;
  onActivityChange: (dayIndex: number, activityIndex: number, field: 'title' | 'description', value: string) => void;
  onActivityPointChange: (dayIndex: number, activityIndex: number, pointIndex: number, value: string) => void;
  onSubsectionChange: (dayIndex: number, activityIndex: number, subsectionIndex: number, field: 'title', value: string) => void;
  onSubsectionPointChange: (dayIndex: number, activityIndex: number, subsectionIndex: number, pointIndex: number, value: string) => void;
}


const CalendarDaysIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const BulletList: React.FC<{ items: string[]; onPointChange: (index: number, value: string) => void }> = ({ items, onPointChange }) => (
    <ul className="list-disc list-outside mr-5 mt-2 space-y-2 text-slate-600">
        {items.map((item, index) => (
            <li 
                key={index}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onPointChange(index, e.currentTarget.innerText)}
            >
                {item}
            </li>
        ))}
    </ul>
);

const SubSectionComponent: React.FC<{ 
    subsection: Subsection; 
    onTitleChange: (value: string) => void;
    onPointChange: (pointIndex: number, value: string) => void;
}> = ({ subsection, onTitleChange, onPointChange }) => (
    <div className="mt-4">
        <h4 
            className="font-semibold text-slate-700"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTitleChange(e.currentTarget.innerText)}
        >
            {subsection.title}
        </h4>
        <BulletList items={subsection.points} onPointChange={onPointChange} />
    </div>
);

const ActivityComponent: React.FC<{ 
    activity: Activity;
    dayIndex: number;
    activityIndex: number;
    onActivityChange: (dayIndex: number, activityIndex: number, field: 'title' | 'description', value: string) => void;
    onActivityPointChange: (dayIndex: number, activityIndex: number, pointIndex: number, value: string) => void;
    onSubsectionChange: (dayIndex: number, activityIndex: number, subsectionIndex: number, field: 'title', value: string) => void;
    onSubsectionPointChange: (dayIndex: number, activityIndex: number, subsectionIndex: number, pointIndex: number, value: string) => void;
}> = (props) => {
    const { activity, dayIndex, activityIndex, onActivityChange, onActivityPointChange, onSubsectionChange, onSubsectionPointChange } = props;
    return (
        <div className="py-4">
            <h3 
                className="text-lg font-bold text-teal-700"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onActivityChange(dayIndex, activityIndex, 'title', e.currentTarget.innerText)}
            >
                {activity.title}
            </h3>
            <p 
                className="mt-1 text-slate-600 leading-relaxed"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onActivityChange(dayIndex, activityIndex, 'description', e.currentTarget.innerText)}
            >
                {activity.description}
            </p>
            {activity.points && (
                <BulletList 
                    items={activity.points} 
                    onPointChange={(pointIndex, value) => onActivityPointChange(dayIndex, activityIndex, pointIndex, value)}
                />
            )}
            {activity.subsections && (
                <div className="mt-2 space-y-3">
                    {activity.subsections.map((sub, subIndex) => 
                        <SubSectionComponent 
                            key={subIndex} 
                            subsection={sub} 
                            onTitleChange={(value) => onSubsectionChange(dayIndex, activityIndex, subIndex, 'title', value)}
                            onPointChange={(pointIndex, value) => onSubsectionPointChange(dayIndex, activityIndex, subIndex, pointIndex, value)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};


const DaySection: React.FC<DaySectionProps> = (props) => {
  const { day, dayIndex, onDayChange } = props;
  return (
    <Card>
      <header className="bg-slate-100 p-4 border-b border-slate-200">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="bg-teal-500 text-white rounded-lg p-3 flex items-center justify-center">
             <CalendarDaysIcon />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              اليوم {day.dayNumber}: <span 
                className="font-semibold"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onDayChange(dayIndex, 'title', e.currentTarget.innerText)}
              >{day.title}</span>
            </h2>
            <p 
                className="text-sm font-medium text-slate-500"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onDayChange(dayIndex, 'date', e.currentTarget.innerText)}
            >
                {day.date}
            </p>
          </div>
        </div>
      </header>
      <div className="p-6 md:p-8 divide-y divide-slate-200">
        {day.activities.map((activity, activityIndex) => (
          <ActivityComponent key={activityIndex} activity={activity} dayIndex={dayIndex} activityIndex={activityIndex} {...props} />
        ))}
      </div>
    </Card>
  );
};

export default DaySection;