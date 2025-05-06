import React from 'react';
import type { TimelineStepProps } from './types';
import { formatDate } from './utils';

export const TimelineStep: React.FC<TimelineStepProps> = ({
    number,
    title,
    date,
    state,
    isLast,
}) => {
    const formattedDate = date ? formatDate(date) : null;

    const colorClasses = {
        completed: {
            circle: 'bg-green-100 text-green-600',
            text: 'text-black',
        },
        next: {
            circle: 'bg-purple-100 text-purple-600',
            text: 'text-black',
        },
        upcoming: {
            circle: 'bg-gray-100 text-gray-400',
            text: 'text-black',
        },
    };

    const { circle, text } = colorClasses[state];

    return (
        <div className="flex items-start relative min-h-[90px]">
            <div className="flex flex-col items-center mr-5 relative">
                <div
                    className={`w-[50px] h-[50px] text-[20px] font-normal rounded-full flex items-center justify-center ${circle}`}
                >
                    {number}
                </div>
                {!isLast && <div className="absolute top-[50px] w-[2px] h-[60px] bg-gray-200"></div>}
            </div>

            <div className="pb-5">
                <p className={`text-[14.5px] font-semibold mt-[7px] text-left ${text}`}>
                    {title}
                </p>
                {formattedDate && (
                    <p className={`text-[14.5px] mt-1 ${state === 'upcoming' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formattedDate}
                    </p>
                )}
            </div>
        </div>
    );
};
