# XPRESS Travel Request Management System Documentation

## Overview
XPRESS is a comprehensive travel request management system built with React and TypeScript, featuring a modern UI powered by Tailwind CSS. The system efficiently handles both domestic and international travel requests across different delivery units.

## Core Components

### 1. Travel Request Data Management
- **Location**: `src/utils/travelRequestData.ts`
- **Key Features**:
  - Strongly typed interfaces for travel request data
  - Status management with visual indicators
  - Comprehensive dummy data for testing and development

#### TravelRequestTableRow Interface
```typescript
interface TravelRequestTableRow {
    requestId: string;
    name: string;
    projectCode: string;
    travelType: string;
    source: string;
    destination: string;
    travelDates: {
      departureDate: string;
      returnDate: string;
    };
    status: string;
    department?: string;
    reportingManager: string;
}
```

### 2. Data Table Component
- **Location**: `src/pages/Admin/RequestTable/components/DataTable.tsx`
- **Features**:
  - Dynamic column visibility control
  - Interactive row click handling
  - Responsive design with horizontal scrolling
  - Status-based color coding
  - Date formatting support

### 3. Calendar Modal
- **Location**: `src/pages/Admin/Calendar/CalendarModal/CalendarModalProps.tsx`
- **Features**:
  - Employee detail display
  - Travel type categorization
  - Delivery unit mapping
  - Modal state management
  - Responsive design

## Status Management
The system implements a comprehensive status system with visual indicators:
- Pending: Yellow background
- Manager Approved: Purple background
- Tickets Dispatched: Green background
- Rejected: Red background
- Tickets Selected: Blue background
- DU Head Approved: Indigo background
- In-transit: Orange background
- Returned: Teal background
- Closed: Gray background

## Project Structure
```
src/
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   └── Sidebar.tsx
├── pages/
│   ├── Admin/
│   ├── Dashboard.tsx
│   ├── Home.tsx
│   └── NotFound.tsx
└── utils/
    └── travelRequestData.ts
```

## Technical Implementation

### Data Management
- TypeScript interfaces ensure type safety across the application
- Modular data structures for easy maintenance and scalability
- Centralized data management in utils directory

### UI Components
- Tailwind CSS for responsive and modern design
- Component-based architecture for reusability
- Consistent styling patterns across the application

### State Management
- React useState for local component state
- Props drilling for component communication
- Type-safe prop definitions

## Future Enhancements
1. Integration with backend API
2. Advanced filtering and search capabilities
3. Real-time notifications
4. Export functionality for reports
5. Enhanced user role management

## Development Guidelines
1. Follow TypeScript best practices
2. Maintain consistent component structure
3. Use Tailwind CSS utility classes
4. Implement proper error handling
5. Write comprehensive documentation for new features