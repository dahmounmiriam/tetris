import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Routes>
        <Route path="/" element={<MainLayout title="Dashboard" />}>
          <Route index element={<Dashboard />} />
          <Route path="productivity" element={<Dashboard />} />
          <Route path="time-tracking" element={<Dashboard />} />
          <Route path="issue-resolution" element={<Dashboard />} />
          <Route path="team-comparison" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </LocalizationProvider>
  );
};

export default App;
