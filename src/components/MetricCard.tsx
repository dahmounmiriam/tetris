import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  Box, 
  IconButton, 
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface MetricCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  height?: number | string;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  loading?: boolean;
  error?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  subtitle,
  children,
  height = 'auto',
  onExportCSV,
  onExportPDF,
  loading = false,
  error = false,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleExportCSV = () => {
    if (onExportCSV) {
      onExportCSV();
    }
    handleClose();
  };
  
  const handleExportPDF = () => {
    if (onExportPDF) {
      onExportPDF();
    }
    handleClose();
  };
  
  return (
    <Card 
      sx={{ 
        height, 
        display: 'flex', 
        flexDirection: 'column',
        opacity: loading || error ? 0.7 : 1,
        transition: 'opacity 0.3s'
      }}
    >
      <CardHeader
        title={
          <Typography variant={isMobile ? 'h6' : 'h5'} component="div">
            {title}
          </Typography>
        }
        subheader={subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        action={
          (onExportCSV || onExportPDF) && (
            <>
              <IconButton
                aria-label="more"
                aria-controls="metric-card-menu"
                aria-haspopup="true"
                onClick={handleClick}
                disabled={loading || error}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="metric-card-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                {onExportCSV && (
                  <MenuItem onClick={handleExportCSV}>
                    <FileDownloadIcon fontSize="small" sx={{ mr: 1 }} />
                    Export as CSV
                  </MenuItem>
                )}
                {onExportPDF && (
                  <MenuItem onClick={handleExportPDF}>
                    <FileDownloadIcon fontSize="small" sx={{ mr: 1 }} />
                    Export as PDF
                  </MenuItem>
                )}
              </Menu>
            </>
          )
        }
      />
      <Divider />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
