export interface TravelRequestTableRow {
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
    reportingManager: string; // Added this field from the first file
  }
  
  // Helper function to get status color
  export const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Manager Approved':
        return 'bg-purple-100 text-purple-800';
      case 'Tickets Dispatched':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Tickets Selected':
        return 'bg-blue-100 text-blue-800';
      case 'DU Head Approved':
        return 'bg-indigo-100 text-indigo-800';
      case 'In-transit':
        return 'bg-orange-100 text-orange-800';
      case 'Returned':
        return 'bg-teal-100 text-teal-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Dummy data for the table
  export const dummyTravelRequests: TravelRequestTableRow[] = [
    {
      requestId: "REQ001",
      name: "Advait Anil Kumar",
      department: "DU3",
      projectCode: "PRJ003",
      travelType: "International",
      source: "India",
      destination: "USA",
      travelDates: {
        departureDate: "2025-01-10",
        returnDate: "2025-03-15"
      },
      status: "Pending",
      reportingManager: "Robert Thompson"
    },
    {
      requestId: "REQ002",
      name: "Jane Smith",
      department: "DU1",
      projectCode: "PC001",
      travelType: "Domestic",
      source: "San Francisco",
      destination: "Boston",
      travelDates: {
        departureDate: "2025-01-20",
        returnDate: "2025-01-29"
      },
      status: "Manager Approved",
      reportingManager: "Lisa Martinez"
    },
    {
      requestId: "REQ003",
      name: "Michael Johnson",
      department: "DU2",
      projectCode: "PC002",
      travelType: "International",
      source: "Chicago",
      destination: "Miami",
      travelDates: {
        departureDate: "2025-02-01",
        returnDate: "2025-02-08"
      },
      status: "Pending",
      reportingManager: "Thomas Lee"
    },
    {
      requestId: "REQ004",
      name: "Emily Brown",
      department: "DU2",
      projectCode: "PC003",
      travelType: "Domestic",
      source: "Seattle",
      destination: "Austin",
      travelDates: {
        departureDate: "2025-02-15",
        returnDate: "2025-02-20"
      },
      status: "Pending",
      reportingManager: "Sarah Davis"
    },
    {
      requestId: "REQ005",
      name: "David Wilson",
      department: "DU3",
      projectCode: "PC003",
      travelType: "Domestic",
      source: "Denver",
      destination: "Orlando",
      travelDates: {
        departureDate: "2025-01-25",
        returnDate: "2025-02-01"
      },
      status: "Tickets Dispatched",
      reportingManager: "James Wilson"
    },
    {
      requestId: "REQ006",
      name: "Sarah White",
      department: "DU1",
      projectCode: "PC003",
      travelType: "International",
      source: "Houston",
      destination: "Phoenix",
      travelDates: {
        departureDate: "2025-01-15",
        returnDate: "2025-01-22"
      },
      status: "Rejected",
      reportingManager: "Emma Brown"
    },
    {
      requestId: "REQ007",
      name: "Abigail House",
      department: "DU4",
      projectCode: "PC004",
      travelType: "International",
      source: "Chicago",
      destination: "Miami",
      travelDates: {
        departureDate: "2025-01-30",
        returnDate: "2025-02-06"
      },
      status: "Rejected",
      reportingManager: "Michael Chen"
    },
    {
      requestId: "REQ008",
      name: "John Doe",
      department: "DU3",
      projectCode: "PC005",
      travelType: "International",
      source: "New York",
      destination: "Los Angeles",
      travelDates: {
        departureDate: "2025-03-01",
        returnDate: "2025-03-07"
      },
      status: "Pending",
      reportingManager: "Jennifer Adams"
    },
    {
      requestId: "REQ009",
      name: "Jane Smith",
      department: "DU2",
      projectCode: "PC005",
      travelType: "Domestic",
      source: "San Francisco",
      destination: "Boston",
      travelDates: {
        departureDate: "2025-02-10",
        returnDate: "2025-02-17"
      },
      status: "Manager Approved",
      reportingManager: "David Kim"
    },
    {
      requestId: "REQ010",
      name: "Michael Johnson",
      department: "DU1",
      projectCode: "PC006",
      travelType: "International",
      source: "Chicago",
      destination: "Miami",
      travelDates: {
        departureDate: "2025-02-18",
        returnDate: "2025-02-24"
      },
      status: "Tickets Dispatched",
      reportingManager: "Laura Taylor"
    },
    {
      requestId: "REQ011",
      name: "Emily Brown",
      department: "DU3",
      projectCode: "PC006",
      travelType: "Domestic",
      source: "Seattle",
      destination: "Austin",
      travelDates: {
        departureDate: "2025-03-05",
        returnDate: "2025-03-10"
      },
      status: "Pending",
      reportingManager: "Chris Patel"
    },
    {
      requestId: "REQ012",
      name: "David Wilson",
      department: "DU4",
      projectCode: "PC007",
      travelType: "Domestic",
      source: "Denver",
      destination: "Orlando",
      travelDates: {
        departureDate: "2025-03-12",
        returnDate: "2025-03-19"
      },
      status: "Tickets Dispatched",
      reportingManager: "Anna Rodriguez"
    }
  ];
  