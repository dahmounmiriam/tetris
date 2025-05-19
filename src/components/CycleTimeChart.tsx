import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, useTheme } from '@mui/material';
import { format, parseISO } from 'date-fns';

import { IssueResolutionMetric } from '../types';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CycleTimeChartProps {
  data: IssueResolutionMetric[];
  loading?: boolean;
  error?: Error | null;
  height?: number;
}

const CycleTimeChart: React.FC<CycleTimeChartProps> = ({
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
      // Sort data by resolved date
      const sortedData = [...data].sort((a, b) => 
        new Date(a.resolvedDate).getTime() - new Date(b.resolvedDate).getTime()
      );

      // Create labels from resolved dates
      const labels = sortedData.map(item => format(parseISO(item.resolvedDate), 'MMM d'));

      // Group data by issue type
      const issueTypeMap = new Map<string, IssueResolutionMetric[]>();
      sortedData.forEach(item => {
        if (!issueTypeMap.has(item.issueType)) {
          issueTypeMap.set(item.issueType, []);
        }
        issueTypeMap.get(item.issueType)?.push(item);
      });

      // Create datasets for each issue type
      const datasets = Array.from(issueTypeMap.entries()).map(([issueType, items], index) => {
        // Generate a color based on index
        const hue = (index * 137) % 360; // Golden angle approximation for good distribution
        const color = `hsl(${hue}, 70%, 60%)`;
        
        return {
          label: issueType,
          data: labels.map(label => {
            const matchingItem = items.find(item => 
              format(parseISO(item.resolvedDate), 'MMM d') === label
            );
            return matchingItem ? matchingItem.cycleTimeHours / 24 : null; // Convert to days
          }),
          backgroundColor: color,
          borderColor: color,
          borderWidth: 2,
          tension: 0.4,
        };
      });

      setChartData({
        labels,
        datasets,
      });
    }
  }, [data]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
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
            const value = context.parsed.y;
            return `${context.dataset.label}: ${value.toFixed(1)} days`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cycle Time (Days)',
          color: theme.palette.text.secondary,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Resolution Date',
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
      <Line options={options} data={chartData} />
    </Box>
  );
};

export default CycleTimeChart;
