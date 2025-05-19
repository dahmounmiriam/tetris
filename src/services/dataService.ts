import { useQuery } from '@apollo/client';
import { 
  GET_TEAM_MEMBERS, 
  GET_SPRINTS, 
  GET_ISSUE_TYPES,
  GET_TEAM_MEMBER_PRODUCTIVITY,
  GET_TIME_TRACKING_METRICS,
  GET_ISSUE_RESOLUTION_METRICS,
  GET_SPRINT_CONTRIBUTION_METRICS
} from './queries';
import {
  mockTeamMembers,
  mockSprints,
  mockIssueTypes,
  mockTeamMemberProductivity,
  mockTimeTrackingMetrics,
  mockIssueResolutionMetrics,
  mockSprintContributionMetrics
} from './mockData';
import { FilterOptions } from '../types';

// Use mock data in development mode
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

// Hook to fetch team members
export const useTeamMembers = () => {
  const { loading, error, data } = useQuery(GET_TEAM_MEMBERS, {
    skip: USE_MOCK_DATA
  });
  
  return {
    loading: USE_MOCK_DATA ? false : loading,
    error: USE_MOCK_DATA ? null : error,
    data: USE_MOCK_DATA ? { teamMembers: mockTeamMembers } : data
  };
};

// Hook to fetch sprints
export const useSprints = () => {
  const { loading, error, data } = useQuery(GET_SPRINTS, {
    skip: USE_MOCK_DATA
  });
  
  return {
    loading: USE_MOCK_DATA ? false : loading,
    error: USE_MOCK_DATA ? null : error,
    data: USE_MOCK_DATA ? { sprints: mockSprints } : data
  };
};

// Hook to fetch issue types
export const useIssueTypes = () => {
  const { loading, error, data } = useQuery(GET_ISSUE_TYPES, {
    skip: USE_MOCK_DATA
  });
  
  return {
    loading: USE_MOCK_DATA ? false : loading,
    error: USE_MOCK_DATA ? null : error,
    data: USE_MOCK_DATA ? { issueTypes: mockIssueTypes } : data
  };
};

// Hook to fetch team member productivity
export const useTeamMemberProductivity = (filters: FilterOptions) => {
  const { loading, error, data } = useQuery(GET_TEAM_MEMBER_PRODUCTIVITY, {
    variables: {
      teamMemberId: filters.teamMemberId,
      sprintId: filters.sprintId,
      startDate: filters.startDate,
      endDate: filters.endDate
    },
    skip: USE_MOCK_DATA
  });
  
  // Filter mock data based on filters
  const filteredMockData = mockTeamMemberProductivity.filter(item => {
    if (filters.teamMemberId && item.teamMemberId !== filters.teamMemberId) return false;
    if (filters.sprintId && item.sprintId !== filters.sprintId) return false;
    // Add date filtering if needed
    return true;
  });
  
  return {
    loading: USE_MOCK_DATA ? false : loading,
    error: USE_MOCK_DATA ? null : error,
    data: USE_MOCK_DATA ? { teamMemberProductivity: filteredMockData } : data
  };
};

// Hook to fetch time tracking metrics
export const useTimeTrackingMetrics = (filters: FilterOptions) => {
  const { loading, error, data } = useQuery(GET_TIME_TRACKING_METRICS, {
    variables: {
      teamMemberId: filters.teamMemberId,
      sprintId: filters.sprintId,
      startDate: filters.startDate,
      endDate: filters.endDate
    },
    skip: USE_MOCK_DATA
  });
  
  // Filter mock data based on filters
  const filteredMockData = mockTimeTrackingMetrics.filter(item => {
    if (filters.teamMemberId && item.teamMemberId !== filters.teamMemberId) return false;
    // Add more filtering as needed
    return true;
  });
  
  return {
    loading: USE_MOCK_DATA ? false : loading,
    error: USE_MOCK_DATA ? null : error,
    data: USE_MOCK_DATA ? { timeTrackingMetrics: filteredMockData } : data
  };
};

// Hook to fetch issue resolution metrics
export const useIssueResolutionMetrics = (filters: FilterOptions) => {
  const { loading, error, data } = useQuery(GET_ISSUE_RESOLUTION_METRICS, {
    variables: {
      teamMemberId: filters.teamMemberId,
      sprintId: filters.sprintId,
      issueTypeId: filters.issueTypeId,
      startDate: filters.startDate,
      endDate: filters.endDate
    },
    skip: USE_MOCK_DATA
  });
  
  // Filter mock data based on filters
  const filteredMockData = mockIssueResolutionMetrics.filter(item => {
    if (filters.teamMemberId && item.teamMemberId !== filters.teamMemberId) return false;
    if (filters.issueTypeId) {
      const issueType = mockIssueTypes.find(type => type.id === filters.issueTypeId);
      if (issueType && item.issueType !== issueType.name) return false;
    }
    // Add more filtering as needed
    return true;
  });
  
  return {
    loading: USE_MOCK_DATA ? false : loading,
    error: USE_MOCK_DATA ? null : error,
    data: USE_MOCK_DATA ? { issueResolutionMetrics: filteredMockData } : data
  };
};

// Hook to fetch sprint contribution metrics
export const useSprintContributionMetrics = (sprintId: string) => {
  const { loading, error, data } = useQuery(GET_SPRINT_CONTRIBUTION_METRICS, {
    variables: { sprintId },
    skip: USE_MOCK_DATA || !sprintId
  });
  
  // Filter mock data based on sprint ID
  const filteredMockData = mockSprintContributionMetrics.filter(item => 
    item.sprintId === sprintId
  );
  
  return {
    loading: USE_MOCK_DATA ? false : loading,
    error: USE_MOCK_DATA ? null : error,
    data: USE_MOCK_DATA ? { sprintContributionMetrics: filteredMockData } : data
  };
};
