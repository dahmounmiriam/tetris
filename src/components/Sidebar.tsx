import React, { useState } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Box, 
  Typography, 
  Divider,
  useTheme,
  useMediaQuery,
  Collapse
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  
  const menuItems = [
    { 
      path: '/', 
      text: 'Dashboard', 
      icon: <DashboardIcon /> 
    },
    { 
      path: '/productivity', 
      text: 'Productivity', 
      icon: <BarChartIcon /> 
    },
    { 
      path: '/time-tracking', 
      text: 'Time Tracking', 
      icon: <AccessTimeIcon /> 
    },
    { 
      path: '/issue-resolution', 
      text: 'Issue Resolution', 
      icon: <SpeedIcon /> 
    },
    { 
      path: '/team-comparison', 
      text: 'Team Comparison', 
      icon: <GroupIcon /> 
    },
  ];
  
  const drawer = (
    <>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <Typography variant="h6" noWrap component="div">
          TeamProgress
        </Typography>
        {isMobile && (
          <IconButton onClick={onToggle}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.path} 
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: '8px',
              mx: 1,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </>
  );
  
  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={open}
            onClose={onToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                backgroundColor: theme.palette.background.paper,
              },
            }}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: open ? drawerWidth : 72,
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: open ? 'space-between' : 'center',
              p: 2
            }}
          >
            {open && (
              <Typography variant="h6" noWrap component="div">
                TeamProgress
              </Typography>
            )}
            <IconButton onClick={onToggle}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.path} 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: '8px',
                  mx: 1,
                  mb: 0.5,
                  justifyContent: open ? 'initial' : 'center',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: location.pathname === item.path ? 'primary.main' : 'inherit',
                    minWidth: open ? 56 : 'auto',
                    mr: open ? 'auto' : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
