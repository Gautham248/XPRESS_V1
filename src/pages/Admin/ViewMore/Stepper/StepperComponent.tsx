import { TimelineStep } from '../TravelRequestDetails';
import { X } from 'lucide-react';

interface StepperComponentProps {
    steps: TimelineStep[];
    isRejected: boolean;
}

export function StepperComponent({ steps, isRejected }: StepperComponentProps) {
    const modifiedSteps = isRejected
        ? [
            {
                id: 0,
                status: 'Rejected',
                description: 'Request was declined',
                date: new Date().toLocaleDateString('en-US', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                active: true,
                completed: false
            },
            ...steps
        ]
        : steps;

    return (
        <div className="w-full lg:w-2/5 bg-white rounded-lg shadow p-6 lg:ml-0">
            <h2 className="text-xl font-semibold mb-6">Request Timeline</h2>
            <div className="relative">
                {modifiedSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start mb-8 relative">
                        {/* Connector Line */}
                        {index < modifiedSteps.length - 1 && (
                            <div
                                className={`absolute left-[1.5rem] top-[3rem] h-full w-0.5 ${
                                    step.status === 'Rejected'
                                        ? 'bg-red-100'
                                        : isRejected
                                            ? 'bg-gray-200'
                                            : step.completed
                                                ? 'bg-green-100'
                                                : 'bg-gray-100'
                                }`}
                            />
                        )}
                        {/* Circle Indicator */}
                        <div
                            className={`flex items-center justify-center rounded-full w-12 h-12 shrink-0
                                ${
                                    step.status === 'Rejected'
                                        ? 'bg-red-100 text-red-600'
                                        : isRejected
                                            ? 'bg-gray-100 text-gray-400'
                                            : step.active
                                                ? 'bg-purple-100 text-purple-500'
                                                : step.completed
                                                    ? 'bg-green-100 text-green-500'
                                                    : 'bg-gray-100 text-gray-300'
                                }`}
                        >
                            {step.status === 'Rejected' ? <X className="w-5 h-5" /> : step.id}
                        </div>
                        {/* Status and Description */}
                        <div className="ml-4">
                            <p
                                className={`${
                                    step.status === 'Rejected'
                                        ? 'font-semibold text-red-600'
                                        : isRejected
                                            ? 'text-gray-400 font-normal'
                                            : step.active
                                                ? 'font-normal text-purple-600'
                                                : step.completed
                                                    ? 'font-normal text-green-600'
                                                    : 'font-normal text-gray-400'
                                }`}
                            >
                                {step.status}
                            </p>
                            {/* Dynamic Description */}
                            {(step.description || step.date) && (
                                <p className={`text-sm ${
                                    step.status === 'Rejected'
                                        ? 'text-red-500'
                                        : isRejected
                                            ? 'text-gray-400 font-normal' : 'text-gray-400 font-normal'
                                }`}>
                                    {step.active ? step.description : step.date}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}