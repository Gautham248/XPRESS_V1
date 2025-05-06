import { TimelineStep } from '../TravelRequestDetails';

interface StepperComponentProps {
    steps: TimelineStep[];
    isRejected: boolean;
}

export function StepperComponent({ steps, isRejected }: StepperComponentProps) {
    return (
        <div className="w-full lg:w-2/5 bg-white rounded-lg shadow p-6 lg:ml-0">
            <h2 className="text-xl font-semibold mb-6">Request Timeline</h2>

            <div className="relative">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start mb-8 relative">

                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                            <div
                                className={`absolute left-[1.5rem] top-[3rem] h-full w-0.5 ${step.completed ? 'bg-green-100' : 'bg-gray-100'
                                    }`}
                            />
                        )}

                        {/* Circle Indicator */}
                        <div
                            className={`flex items-center justify-center rounded-full w-12 h-12 shrink-0 ${step.active
                                ? 'bg-purple-100 text-purple-500'
                                : step.completed
                                    ? 'bg-green-100 text-green-500'
                                    : 'bg-gray-100 text-gray-300'
                                }`}
                        >
                            {step.id}
                        </div>

                        {/* Status and Description */}
                        <div className="ml-4">
                            <p
                                className={`font-normal`}
                            >
                                {step.status}
                            </p>
                            {step.description && (
                                <p className="text-sm text-gray-500">{step.description}</p>
                            )}
                        </div>
                    </div>
                ))}

                {/* Rejected Step */}
                {isRejected && (
                    <div className="flex items-start mb-8 relative">
                        <div className="flex items-center justify-center rounded-full w-12 h-12 bg-red-100 text-red-600">
                            ✕
                        </div>
                        <div className="ml-4">
                            <p className="font-semibold text-red-600">Rejected</p>
                            <p className="text-sm text-gray-500">Request was declined</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}