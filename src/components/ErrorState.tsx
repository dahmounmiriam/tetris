import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = 'An error occurred while loading data.', 
  onRetry 
}) => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        borderRadius: 2,
        bgcolor: 'error.light',
        color: 'error.contrastText'
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 48, mb: 2, color: 'error.main' }} />
      <Typography variant="h6" gutterBottom align="center">
        Oops! Something went wrong
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 3 }}>
        {message}
      </Typography>
      {onRetry && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </Paper>
  );
};

export default ErrorState;
