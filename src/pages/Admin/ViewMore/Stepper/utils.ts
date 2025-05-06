import type { RequestData } from "./types";

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    return date.toLocaleDateString('en-US', options);
};

export const requestData: RequestData = {
    REQ001: [
        { status: 'Pending', approved_by: null, date: '2025-03-14T16:00:00' },
        { status: 'Manager Approved', approved_by: 'manager', date: '2025-03-15T09:10:00' },
        { status: 'Tickets Selected', approved_by: 'coordinator', date: '2025-03-15T09:15:00' },
        { status: 'DU Head Approved', approved_by: 'department_head', date: '2025-03-16T10:30:00' },
        { status: 'Tickets Dispatched', approved_by: 'logistics', date: '2025-03-17T12:35:00' },
        { status: 'In-transit', approved_by: 'courier', date: '2025-03-18T08:45:00' },
        { status: 'Returned', approved_by: 'recipient', date: '2025-03-19T11:00:00' },
        { status: 'Closed', approved_by: 'system', date: '2025-03-19T11:49:00' },
    ],
    REQ002: [
        { status: 'Pending', approved_by: null, date: '2025-04-01T10:00:00' },
        { status: 'Manager Approved', approved_by: 'manager', date: '2025-04-02T11:30:00' },
        { status: 'Tickets Selected', approved_by: 'coordinator', date: '2025-04-02T14:45:00' },
    ],
};