import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box, useTheme } from '@mui/material';

import { SprintContributionMetric } from '../types';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface SprintContributionChartProps {
  data: SprintContributionMetric[];
  loading?: boolean;
  error?: Error | null;
  height?: number;
}

const SprintContributionChart: React.FC<SprintContributionChartProps> = ({
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
      // Extract team member names and contribution percentages
      const labels = data.map(item => item.teamMemberName);
      const contributionPercentages = data.map(item => item.percentageContribution);
      
      // Generate colors for each team member
      const backgroundColors = data.map((_, index) => {
        const hue = (index * 137) % 360; // Golden angle approximation for good distribution
        return `hsl(${hue}, 70%, 60%)`;
      });
      
      setChartData({
        labels,
        datasets: [
          {
            label: 'Contribution (%)',
            data: contributionPercentages,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('60%', '70%')),
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data]);

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            return `${context.label}: ${value.toFixed(1)}%`;
          }
        }
      }
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
    <Box sx={{ height, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Pie options={options} data={chartData} />
    </Box>
  );
};

export default SprintContributionChart;
