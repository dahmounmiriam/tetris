import React from 'react';
import { Box, CircularProgress, Typography, Skeleton } from '@mui/material';

interface LoadingStateProps {
  type?: 'spinner' | 'skeleton';
  height?: number | string;
  text?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  type = 'spinner', 
  height = 400, 
  text = 'Loading data...' 
}) => {
  if (type === 'skeleton') {
    return (
      <Box sx={{ width: '100%', height }}>
        <Skeleton variant="rectangular" width="100%" height="70%" />
        <Box sx={{ pt: 1 }}>
          <Skeleton width="60%" />
          <Skeleton width="80%" />
          <Skeleton width="40%" />
        </Box>
      </Box>
    );
  }
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        height,
        width: '100%'
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {text}
      </Typography>
    </Box>
  );
};

export default LoadingState;
