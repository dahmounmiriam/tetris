import React, { useState } from 'react';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface MainLayoutProps {
  title: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          ml: { sm: sidebarOpen ? '240px' : '72px' },
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Header title={title} />
        
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 },
            backgroundColor: 'background.default',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
