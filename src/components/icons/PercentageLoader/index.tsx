import {FC} from 'react';
import {cn} from '@/utils/cn'; 

interface LoaderProps {
  percentage: number; // This prop represents the progress from 0 to 100
  size: 'small' | 'default';
}

export const PercentageLoader: FC<LoaderProps> = ({ percentage, size = 'default' }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
  
    return (
      <svg
        className={cn('text-blue-600', { 'size-9': size === 'small', 'size-24': size === 'default' })}
        viewBox="0 0 100 100"
      >
        <circle
          className="opacity-25"
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#98A2B3"
          strokeWidth="6"
          transform="rotate(-90 50 50)"
        />
        <circle
          className="stroke-current opacity-75 transition-all duration-200 ease-linear"
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#1570EF"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
    );
  };