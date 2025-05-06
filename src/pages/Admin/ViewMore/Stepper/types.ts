export interface StepItem {
    status: string;
    approved_by: string | null;
    date: string;
}

export interface RequestData {
    [key: string]: StepItem[];
}

export interface TimelineStepProps {
    number: number;
    title: string;
    date: string | null;
    state: 'completed' | 'next' | 'upcoming';
    isLast: boolean;
}

export const masterStatuses: string[] = [
    'Pending',
    'Manager Approved',
    'Tickets Selected',
    'DU Head Approved',
    'Tickets Dispatched',
    'In-transit',
    'Returned',
    'Closed',
];