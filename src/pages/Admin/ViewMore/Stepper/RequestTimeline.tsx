import { useState, useEffect } from 'react';
import { TimelineStep } from './TimelineStep';
import { masterStatuses, type StepItem } from './types';
import { requestData } from './utils';

export const RequestTimeline: React.FC = () => {
  const [requestId, setRequestId] = useState<string>('REQ001');
  const [requestSteps, setRequestSteps] = useState<StepItem[]>([]);

  useEffect(() => {
    setRequestSteps(requestData[requestId] || []);
  }, [requestId]);

  const completedMap = new Map<string, string>();
  requestSteps.forEach((step) => {
    completedMap.set(step.status, step.date);
  });

  const lastCompletedIndex = masterStatuses.findIndex(
    (status) => !completedMap.has(status)
  );

  return (
    <div className="max-w-[350px] max-h-auto  bg-white rounded-[10px] shadow-md p-5 font-[Montserrat]">
      <h1 className="text-left text-[20px] font-bold mb-4">Request Timeline</h1>
      
      <div className="mb-4">
        <select
          className="w-full p-2 text-xs border border-gray-300 rounded-md"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
        >
          {Object.keys(requestData).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        {masterStatuses.map((status, index) => {
          let state: 'completed' | 'next' | 'upcoming' = 'upcoming';

          if (completedMap.has(status)) {
            state = 'completed';
          } else if (index === lastCompletedIndex) {
            state = 'next';
          }

          return (
            <TimelineStep
              key={status}
              number={index + 1}
              title={status}
              date={completedMap.get(status) || null}
              state={state}
              isLast={index === masterStatuses.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RequestTimeline;
