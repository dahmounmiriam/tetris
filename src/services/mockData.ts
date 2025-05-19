import { 
  TeamMember, 
  Sprint, 
  IssueType, 
  TeamMemberProductivity,
  TimeTrackingMetric,
  IssueResolutionMetric,
  SprintContributionMetric
} from '../types';

// Mock team members
export const mockTeamMembers: TeamMember[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Alice Williams', email: 'alice.williams@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Charlie Brown', email: 'charlie.brown@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
];

// Mock sprints
export const mockSprints: Sprint[] = [
  { id: '1', name: 'Sprint 1', startDate: '2023-10-01', endDate: '2023-10-14', state: 'closed' },
  { id: '2', name: 'Sprint 2', startDate: '2023-10-15', endDate: '2023-10-28', state: 'closed' },
  { id: '3', name: 'Sprint 3', startDate: '2023-10-29', endDate: '2023-11-11', state: 'active' },
  { id: '4', name: 'Sprint 4', startDate: '2023-11-12', endDate: '2023-11-25', state: 'future' },
];

// Mock issue types
export const mockIssueTypes: IssueType[] = [
  { id: '1', name: 'Bug', iconUrl: 'https://example.com/icons/bug.svg' },
  { id: '2', name: 'Task', iconUrl: 'https://example.com/icons/task.svg' },
  { id: '3', name: 'Story', iconUrl: 'https://example.com/icons/story.svg' },
  { id: '4', name: 'Epic', iconUrl: 'https://example.com/icons/epic.svg' },
];

// Mock team member productivity data
export const mockTeamMemberProductivity: TeamMemberProductivity[] = [
  { teamMemberId: '1', teamMemberName: 'John Doe', sprintId: '1', sprintName: 'Sprint 1', tasksCompleted: 12, storyPointsCompleted: 24, date: '2023-10-14' },
  { teamMemberId: '2', teamMemberName: 'Jane Smith', sprintId: '1', sprintName: 'Sprint 1', tasksCompleted: 10, storyPointsCompleted: 18, date: '2023-10-14' },
  { teamMemberId: '3', teamMemberName: 'Bob Johnson', sprintId: '1', sprintName: 'Sprint 1', tasksCompleted: 8, storyPointsCompleted: 16, date: '2023-10-14' },
  { teamMemberId: '4', teamMemberName: 'Alice Williams', sprintId: '1', sprintName: 'Sprint 1', tasksCompleted: 15, storyPointsCompleted: 30, date: '2023-10-14' },
  { teamMemberId: '5', teamMemberName: 'Charlie Brown', sprintId: '1', sprintName: 'Sprint 1', tasksCompleted: 7, storyPointsCompleted: 14, date: '2023-10-14' },
  
  { teamMemberId: '1', teamMemberName: 'John Doe', sprintId: '2', sprintName: 'Sprint 2', tasksCompleted: 14, storyPointsCompleted: 28, date: '2023-10-28' },
  { teamMemberId: '2', teamMemberName: 'Jane Smith', sprintId: '2', sprintName: 'Sprint 2', tasksCompleted: 9, storyPointsCompleted: 16, date: '2023-10-28' },
  { teamMemberId: '3', teamMemberName: 'Bob Johnson', sprintId: '2', sprintName: 'Sprint 2', tasksCompleted: 11, storyPointsCompleted: 22, date: '2023-10-28' },
  { teamMemberId: '4', teamMemberName: 'Alice Williams', sprintId: '2', sprintName: 'Sprint 2', tasksCompleted: 13, storyPointsCompleted: 26, date: '2023-10-28' },
  { teamMemberId: '5', teamMemberName: 'Charlie Brown', sprintId: '2', sprintName: 'Sprint 2', tasksCompleted: 8, storyPointsCompleted: 16, date: '2023-10-28' },
];

// Mock time tracking metrics
export const mockTimeTrackingMetrics: TimeTrackingMetric[] = [
  { teamMemberId: '1', teamMemberName: 'John Doe', issueId: 'PROJ-101', issueName: 'Fix login bug', issueType: 'Bug', estimatedHours: 4, actualHours: 3.5, date: '2023-10-05' },
  { teamMemberId: '1', teamMemberName: 'John Doe', issueId: 'PROJ-102', issueName: 'Implement user profile', issueType: 'Task', estimatedHours: 8, actualHours: 10, date: '2023-10-08' },
  { teamMemberId: '2', teamMemberName: 'Jane Smith', issueId: 'PROJ-103', issueName: 'Design dashboard layout', issueType: 'Task', estimatedHours: 6, actualHours: 5, date: '2023-10-06' },
  { teamMemberId: '2', teamMemberName: 'Jane Smith', issueId: 'PROJ-104', issueName: 'Add export functionality', issueType: 'Story', estimatedHours: 12, actualHours: 14, date: '2023-10-12' },
  { teamMemberId: '3', teamMemberName: 'Bob Johnson', issueId: 'PROJ-105', issueName: 'Fix navigation bug', issueType: 'Bug', estimatedHours: 3, actualHours: 2, date: '2023-10-07' },
  { teamMemberId: '3', teamMemberName: 'Bob Johnson', issueId: 'PROJ-106', issueName: 'Implement authentication', issueType: 'Story', estimatedHours: 16, actualHours: 20, date: '2023-10-14' },
  { teamMemberId: '4', teamMemberName: 'Alice Williams', issueId: 'PROJ-107', issueName: 'Create API endpoints', issueType: 'Task', estimatedHours: 10, actualHours: 8, date: '2023-10-10' },
  { teamMemberId: '4', teamMemberName: 'Alice Williams', issueId: 'PROJ-108', issueName: 'Optimize database queries', issueType: 'Task', estimatedHours: 8, actualHours: 6, date: '2023-10-13' },
  { teamMemberId: '5', teamMemberName: 'Charlie Brown', issueId: 'PROJ-109', issueName: 'Update documentation', issueType: 'Task', estimatedHours: 5, actualHours: 4, date: '2023-10-09' },
  { teamMemberId: '5', teamMemberName: 'Charlie Brown', issueId: 'PROJ-110', issueName: 'Fix styling issues', issueType: 'Bug', estimatedHours: 4, actualHours: 3, date: '2023-10-11' },
];

// Mock issue resolution metrics
export const mockIssueResolutionMetrics: IssueResolutionMetric[] = [
  { teamMemberId: '1', teamMemberName: 'John Doe', issueId: 'PROJ-101', issueName: 'Fix login bug', issueType: 'Bug', createdDate: '2023-10-03', resolvedDate: '2023-10-05', cycleTimeHours: 48, status: 'Done' },
  { teamMemberId: '1', teamMemberName: 'John Doe', issueId: 'PROJ-102', issueName: 'Implement user profile', issueType: 'Task', createdDate: '2023-10-06', resolvedDate: '2023-10-08', cycleTimeHours: 72, status: 'Done' },
  { teamMemberId: '2', teamMemberName: 'Jane Smith', issueId: 'PROJ-103', issueName: 'Design dashboard layout', issueType: 'Task', createdDate: '2023-10-04', resolvedDate: '2023-10-06', cycleTimeHours: 48, status: 'Done' },
  { teamMemberId: '2', teamMemberName: 'Jane Smith', issueId: 'PROJ-104', issueName: 'Add export functionality', issueType: 'Story', createdDate: '2023-10-09', resolvedDate: '2023-10-12', cycleTimeHours: 96, status: 'Done' },
  { teamMemberId: '3', teamMemberName: 'Bob Johnson', issueId: 'PROJ-105', issueName: 'Fix navigation bug', issueType: 'Bug', createdDate: '2023-10-05', resolvedDate: '2023-10-07', cycleTimeHours: 48, status: 'Done' },
  { teamMemberId: '3', teamMemberName: 'Bob Johnson', issueId: 'PROJ-106', issueName: 'Implement authentication', issueType: 'Story', createdDate: '2023-10-10', resolvedDate: '2023-10-14', cycleTimeHours: 120, status: 'Done' },
  { teamMemberId: '4', teamMemberName: 'Alice Williams', issueId: 'PROJ-107', issueName: 'Create API endpoints', issueType: 'Task', createdDate: '2023-10-07', resolvedDate: '2023-10-10', cycleTimeHours: 72, status: 'Done' },
  { teamMemberId: '4', teamMemberName: 'Alice Williams', issueId: 'PROJ-108', issueName: 'Optimize database queries', issueType: 'Task', createdDate: '2023-10-11', resolvedDate: '2023-10-13', cycleTimeHours: 48, status: 'Done' },
  { teamMemberId: '5', teamMemberName: 'Charlie Brown', issueId: 'PROJ-109', issueName: 'Update documentation', issueType: 'Task', createdDate: '2023-10-06', resolvedDate: '2023-10-09', cycleTimeHours: 72, status: 'Done' },
  { teamMemberId: '5', teamMemberName: 'Charlie Brown', issueId: 'PROJ-110', issueName: 'Fix styling issues', issueType: 'Bug', createdDate: '2023-10-08', resolvedDate: '2023-10-11', cycleTimeHours: 72, status: 'Done' },
];

// Mock sprint contribution metrics
export const mockSprintContributionMetrics: SprintContributionMetric[] = [
  { sprintId: '1', sprintName: 'Sprint 1', teamMemberId: '1', teamMemberName: 'John Doe', tasksCompleted: 12, storyPointsCompleted: 24, percentageContribution: 23.5 },
  { sprintId: '1', sprintName: 'Sprint 1', teamMemberId: '2', teamMemberName: 'Jane Smith', tasksCompleted: 10, storyPointsCompleted: 18, percentageContribution: 17.6 },
  { sprintId: '1', sprintName: 'Sprint 1', teamMemberId: '3', teamMemberName: 'Bob Johnson', tasksCompleted: 8, storyPointsCompleted: 16, percentageContribution: 15.7 },
  { sprintId: '1', sprintName: 'Sprint 1', teamMemberId: '4', teamMemberName: 'Alice Williams', tasksCompleted: 15, storyPointsCompleted: 30, percentageContribution: 29.4 },
  { sprintId: '1', sprintName: 'Sprint 1', teamMemberId: '5', teamMemberName: 'Charlie Brown', tasksCompleted: 7, storyPointsCompleted: 14, percentageContribution: 13.7 },
  
  { sprintId: '2', sprintName: 'Sprint 2', teamMemberId: '1', teamMemberName: 'John Doe', tasksCompleted: 14, storyPointsCompleted: 28, percentageContribution: 25.9 },
  { sprintId: '2', sprintName: 'Sprint 2', teamMemberId: '2', teamMemberName: 'Jane Smith', tasksCompleted: 9, storyPointsCompleted: 16, percentageContribution: 14.8 },
  { sprintId: '2', sprintName: 'Sprint 2', teamMemberId: '3', teamMemberName: 'Bob Johnson', tasksCompleted: 11, storyPointsCompleted: 22, percentageContribution: 20.4 },
  { sprintId: '2', sprintName: 'Sprint 2', teamMemberId: '4', teamMemberName: 'Alice Williams', tasksCompleted: 13, storyPointsCompleted: 26, percentageContribution: 24.1 },
  { sprintId: '2', sprintName: 'Sprint 2', teamMemberId: '5', teamMemberName: 'Charlie Brown', tasksCompleted: 8, storyPointsCompleted: 16, percentageContribution: 14.8 },
];
