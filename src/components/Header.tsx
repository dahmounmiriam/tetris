import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Typography 
          variant={isMobile ? 'h6' : 'h5'} 
          component="h1" 
          sx={{ flexGrow: 1, fontWeight: 500 }}
        >
          {title}
        </Typography>
        
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" size="large">
              <HelpOutlineIcon />
            </IconButton>
            <IconButton color="inherit" size="large">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" size="large">
              <SettingsIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 24 }} />
          </Box>
        )}
        
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
          onClick={handleProfileMenuOpen}
        >
          <Avatar 
            alt="User Avatar" 
            src="https://i.pravatar.cc/150?img=1" 
            sx={{ width: 32, height: 32 }}
          />
          {!isMobile && (
            <>
              <Box sx={{ ml: 1, textAlign: 'left' }}>
                <Typography variant="body2" component="div" sx={{ fontWeight: 500 }}>
                  John Doe
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Project Manager
                </Typography>
              </Box>
              <KeyboardArrowDownIcon sx={{ ml: 0.5, color: 'text.secondary' }} />
            </>
          )}
        </Box>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
