import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import NotFound from './pages/NotFound';
import RequestManagement from './pages/Admin/RequestManagement/RequestManagement';
import AdminCalendar from './pages/Admin/Calendar/AdminCalendar';
import ViewMore from './pages/Admin/ViewMore/ViewMore';
import TravelRequestsTable from './pages/Admin/RequestTable/TravelRequestsTable';
import TravelRequestDetails from './pages/Admin/ViewMore/TravelRequestDetails';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calendar" element={<AdminCalendar />} />
        <Route path="viewMore" element={<ViewMore />} />
        <Route path="requestTable" element={<TravelRequestsTable />} />
        <Route path="travel-request-details/:requestId" element={<TravelRequestDetails />} />
        <Route path="about" element={<About />} />
        <Route path="users" element={<div className="p-6 bg-white rounded-lg shadow-sm"><h2 className="text-2xl font-semibold text-gray-800">Users Page</h2></div>} />
        <Route path="reports" element={<RequestManagement/>} />
        <Route path="settings" element={<div className="p-6 bg-white rounded-lg shadow-sm"><h2 className="text-2xl font-semibold text-gray-800">Settings Page</h2></div>} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;