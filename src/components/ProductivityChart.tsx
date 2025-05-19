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

import { TeamMemberProductivity } from '../types';
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

interface ProductivityChartProps {
  data: TeamMemberProductivity[];
  loading?: boolean;
  error?: Error | null;
  height?: number;
}

const ProductivityChart: React.FC<ProductivityChartProps> = ({
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
      // Group data by team member
      const teamMemberMap = new Map<string, TeamMemberProductivity[]>();
      data.forEach(item => {
        if (!teamMemberMap.has(item.teamMemberId)) {
          teamMemberMap.set(item.teamMemberId, []);
        }
        teamMemberMap.get(item.teamMemberId)?.push(item);
      });

      // Get unique sprint names for labels
      const sprintNames = Array.from(new Set(data.map(item => item.sprintName)));

      // Create datasets for each team member
      const datasets = Array.from(teamMemberMap.entries()).map(([_, items], index) => {
        const teamMemberName = items[0].teamMemberName;
        
        // Generate a color based on index
        const hue = (index * 137) % 360; // Golden angle approximation for good distribution
        const color = `hsl(${hue}, 70%, 60%)`;
        
        return {
          label: teamMemberName,
          data: sprintNames.map(sprintName => {
            const sprintData = items.find(item => item.sprintName === sprintName);
            return sprintData ? sprintData.tasksCompleted : 0;
          }),
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        };
      });

      setChartData({
        labels: sprintNames,
        datasets,
      });
    }
  }, [data]);

  const options: ChartOptions<'bar'> = {
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
            return `${context.dataset.label}: ${context.parsed.y} tasks`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tasks Completed',
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
          text: 'Sprint',
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

export default ProductivityChart;
