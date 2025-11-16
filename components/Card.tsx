
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden my-6 transition-shadow duration-300 hover:shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
