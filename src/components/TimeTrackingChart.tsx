import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, useTheme } from '@mui/material';

import { TimeTrackingMetric } from '../types';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TimeTrackingChartProps {
  data: TimeTrackingMetric[];
  loading?: boolean;
  error?: Error | null;
  height?: number;
}

const TimeTrackingChart: React.FC<TimeTrackingChartProps> = ({
  data,
  loading = false,
  error = null,
  height = 300,
}) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (data && data.length > 0) {
      // Get unique issue names for labels
      const issueNames = data.map(item => `${item.issueId}: ${item.issueName.substring(0, 20)}${item.issueName.length > 20 ? '...' : ''}`);

      // Create datasets for estimated and actual hours
      const estimatedHours = data.map(item => item.estimatedHours);
      const actualHours = data.map(item => item.actualHours);

      setChartData({
        labels: issueNames,
        datasets: [
          {
            label: 'Estimated Hours',
            data: estimatedHours,
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.dark,
            borderWidth: 1,
          },
          {
            label: 'Actual Hours',
            data: actualHours,
            backgroundColor: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.dark,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data, theme]);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.x} hours`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
          color: theme.palette.text.secondary,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Issue',
          color: theme.palette.text.secondary,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
    },
  };

  if (loading) {
    return <LoadingState height={height} />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!data || data.length === 0) {
    return (
      <Box 
        sx={{ 
          height, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'text.secondary',
          fontSize: '0.875rem',
        }}
      >
        No data available
      </Box>
    );
  }

  return (
    <Box sx={{ height, width: '100%' }}>
      <Bar options={options} data={chartData} />
    </Box>
  );
};

export default TimeTrackingChart;
