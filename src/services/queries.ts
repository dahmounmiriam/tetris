import { gql } from '@apollo/client';

// Query to fetch team members
export const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers {
    teamMembers {
      id
      name
      email
      avatarUrl
    }
  }
`;

// Query to fetch sprints
export const GET_SPRINTS = gql`
  query GetSprints {
    sprints {
      id
      name
      startDate
      endDate
      state
    }
  }
`;

// Query to fetch issue types
export const GET_ISSUE_TYPES = gql`
  query GetIssueTypes {
    issueTypes {
      id
      name
      iconUrl
    }
  }
`;

// Query to fetch team member productivity
export const GET_TEAM_MEMBER_PRODUCTIVITY = gql`
  query GetTeamMemberProductivity(
    $teamMemberId: ID
    $sprintId: ID
    $startDate: String
    $endDate: String
  ) {
    teamMemberProductivity(
      teamMemberId: $teamMemberId
      sprintId: $sprintId
      startDate: $startDate
      endDate: $endDate
    ) {
      teamMemberId
      teamMemberName
      sprintId
      sprintName
      tasksCompleted
      storyPointsCompleted
      date
    }
  }
`;

// Query to fetch time tracking metrics
export const GET_TIME_TRACKING_METRICS = gql`
  query GetTimeTrackingMetrics(
    $teamMemberId: ID
    $sprintId: ID
    $startDate: String
    $endDate: String
  ) {
    timeTrackingMetrics(
      teamMemberId: $teamMemberId
      sprintId: $sprintId
      startDate: $startDate
      endDate: $endDate
    ) {
      teamMemberId
      teamMemberName
      issueId
      issueName
      issueType
      estimatedHours
      actualHours
      date
    }
  }
`;

// Query to fetch issue resolution metrics
export const GET_ISSUE_RESOLUTION_METRICS = gql`
  query GetIssueResolutionMetrics(
    $teamMemberId: ID
    $sprintId: ID
    $issueTypeId: ID
    $startDate: String
    $endDate: String
  ) {
    issueResolutionMetrics(
      teamMemberId: $teamMemberId
      sprintId: $sprintId
      issueTypeId: $issueTypeId
      startDate: $startDate
      endDate: $endDate
    ) {
      teamMemberId
      teamMemberName
      issueId
      issueName
      issueType
      createdDate
      resolvedDate
      cycleTimeHours
      status
    }
  }
`;

// Query to fetch sprint contribution metrics
export const GET_SPRINT_CONTRIBUTION_METRICS = gql`
  query GetSprintContributionMetrics($sprintId: ID!) {
    sprintContributionMetrics(sprintId: $sprintId) {
      sprintId
      sprintName
      teamMemberId
      teamMemberName
      tasksCompleted
      storyPointsCompleted
      percentageContribution
    }
  }
`;
