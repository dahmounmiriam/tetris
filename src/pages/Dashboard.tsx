import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Paper, useMediaQuery, useTheme } from '@mui/material';

import FilterBar from '../components/FilterBar';
import MetricCard from '../components/MetricCard';
import ProductivityChart from '../components/ProductivityChart';
import TimeTrackingChart from '../components/TimeTrackingChart';
import CycleTimeChart from '../components/CycleTimeChart';
import SprintContributionChart from '../components/SprintContributionChart';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

import { 
  useTeamMembers, 
  useSprints, 
  useIssueTypes,
  useTeamMemberProductivity,
  useTimeTrackingMetrics,
  useIssueResolutionMetrics,
  useSprintContributionMetrics
} from '../services/dataService';
import { FilterOptions } from '../types';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';
import { getStartOfMonth, getEndOfMonth } from '../utils/dateUtils';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Initialize filters
  const [filters, setFilters] = useState<FilterOptions>({
    startDate: getStartOfMonth(),
    endDate: getEndOfMonth(),
    sprintId: null,
    teamMemberId: null,
    issueTypeId: null,
  });
  
  // Fetch filter options
  const { data: teamMembersData, loading: teamMembersLoading, error: teamMembersError } = useTeamMembers();
  const { data: sprintsData, loading: sprintsLoading, error: sprintsError } = useSprints();
  const { data: issueTypesData, loading: issueTypesLoading, error: issueTypesError } = useIssueTypes();
  
  // Fetch metrics data
  const { 
    data: productivityData, 
    loading: productivityLoading, 
    error: productivityError 
  } = useTeamMemberProductivity(filters);
  
  const { 
    data: timeTrackingData, 
    loading: timeTrackingLoading, 
    error: timeTrackingError 
  } = useTimeTrackingMetrics(filters);
  
  const { 
    data: issueResolutionData, 
    loading: issueResolutionLoading, 
    error: issueResolutionError 
  } = useIssueResolutionMetrics(filters);
  
  const { 
    data: sprintContributionData, 
    loading: sprintContributionLoading, 
    error: sprintContributionError 
  } = useSprintContributionMetrics(filters.sprintId || '1'); // Default to first sprint if none selected
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const handleExportProductivityCSV = () => {
    if (productivityData?.teamMemberProductivity) {
      exportToCSV(productivityData.teamMemberProductivity, 'productivity');
    }
  };
  
  const handleExportProductivityPDF = () => {
    if (productivityData?.teamMemberProductivity) {
      exportToPDF(
        productivityData.teamMemberProductivity,
        'productivity',
        'Team Member Productivity',
        [
          { header: 'Team Member', dataKey: 'teamMemberName' },
          { header: 'Sprint', dataKey: 'sprintName' },
          { header: 'Tasks Completed', dataKey: 'tasksCompleted' },
          { header: 'Story Points', dataKey: 'storyPointsCompleted' },
        ]
      );
    }
  };
  
  const handleExportTimeTrackingCSV = () => {
    if (timeTrackingData?.timeTrackingMetrics) {
      exportToCSV(timeTrackingData.timeTrackingMetrics, 'time-tracking');
    }
  };
  
  const handleExportIssueResolutionCSV = () => {
    if (issueResolutionData?.issueResolutionMetrics) {
      exportToCSV(issueResolutionData.issueResolutionMetrics, 'issue-resolution');
    }
  };
  
  const handleExportSprintContributionCSV = () => {
    if (sprintContributionData?.sprintContributionMetrics) {
      exportToCSV(sprintContributionData.sprintContributionMetrics, 'sprint-contribution');
    }
  };
  
  // Loading state for filter options
  const filterOptionsLoading = teamMembersLoading || sprintsLoading || issueTypesLoading;
  const filterOptionsError = teamMembersError || sprintsError || issueTypesError;
  
  if (filterOptionsLoading) {
    return <LoadingState text="Loading dashboard..." />;
  }
  
  if (filterOptionsError) {
    return <ErrorState message="Failed to load dashboard data. Please try again later." />;
  }
  
  return (
    <Box>
      <FilterBar
        teamMembers={teamMembersData?.teamMembers || []}
        sprints={sprintsData?.sprints || []}
        issueTypes={issueTypesData?.issueTypes || []}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <Grid container spacing={3}>
        {/* Productivity Chart */}
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Team Productivity"
            subtitle="Tasks completed per sprint"
            height={isMobile ? 350 : 400}
            onExportCSV={handleExportProductivityCSV}
            onExportPDF={handleExportProductivityPDF}
            loading={productivityLoading}
            error={!!productivityError}
          >
            <ProductivityChart
              data={productivityData?.teamMemberProductivity || []}
              loading={productivityLoading}
              error={productivityError}
              height={isMobile ? 280 : 330}
            />
          </MetricCard>
        </Grid>
        
        {/* Time Tracking Chart */}
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Time Tracking"
            subtitle="Estimated vs actual hours"
            height={isMobile ? 350 : 400}
            onExportCSV={handleExportTimeTrackingCSV}
            loading={timeTrackingLoading}
            error={!!timeTrackingError}
          >
            <TimeTrackingChart
              data={timeTrackingData?.timeTrackingMetrics || []}
              loading={timeTrackingLoading}
              error={timeTrackingError}
              height={isMobile ? 280 : 330}
            />
          </MetricCard>
        </Grid>
        
        {/* Issue Resolution Chart */}
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Issue Resolution"
            subtitle="Cycle time by issue type"
            height={isMobile ? 350 : 400}
            onExportCSV={handleExportIssueResolutionCSV}
            loading={issueResolutionLoading}
            error={!!issueResolutionError}
          >
            <CycleTimeChart
              data={issueResolutionData?.issueResolutionMetrics || []}
              loading={issueResolutionLoading}
              error={issueResolutionError}
              height={isMobile ? 280 : 330}
            />
          </MetricCard>
        </Grid>
        
        {/* Sprint Contribution Chart */}
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Sprint Contribution"
            subtitle={`Team member contribution ${filters.sprintId ? `for ${sprintsData?.sprints.find(s => s.id === filters.sprintId)?.name || ''}` : 'by sprint'}`}
            height={isMobile ? 350 : 400}
            onExportCSV={handleExportSprintContributionCSV}
            loading={sprintContributionLoading}
            error={!!sprintContributionError}
          >
            <SprintContributionChart
              data={sprintContributionData?.sprintContributionMetrics || []}
              loading={sprintContributionLoading}
              error={sprintContributionError}
              height={isMobile ? 280 : 330}
            />
          </MetricCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
