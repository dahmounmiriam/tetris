// Team Member type
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

// Sprint type
export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  state: 'active' | 'closed' | 'future';
}

// Issue Type
export interface IssueType {
  id: string;
  name: string;
  iconUrl: string;
}

// Team Member Productivity
export interface TeamMemberProductivity {
  teamMemberId: string;
  teamMemberName: string;
  sprintId: string;
  sprintName: string;
  tasksCompleted: number;
  storyPointsCompleted: number;
  date: string;
}

// Time Tracking Metric
export interface TimeTrackingMetric {
  teamMemberId: string;
  teamMemberName: string;
  issueId: string;
  issueName: string;
  issueType: string;
  estimatedHours: number;
  actualHours: number;
  date: string;
}

// Issue Resolution Metric
export interface IssueResolutionMetric {
  teamMemberId: string;
  teamMemberName: string;
  issueId: string;
  issueName: string;
  issueType: string;
  createdDate: string;
  resolvedDate: string;
  cycleTimeHours: number;
  status: string;
}

// Sprint Contribution Metric
export interface SprintContributionMetric {
  sprintId: string;
  sprintName: string;
  teamMemberId: string;
  teamMemberName: string;
  tasksCompleted: number;
  storyPointsCompleted: number;
  percentageContribution: number;
}

// Filter Options
export interface FilterOptions {
  startDate: string | null;
  endDate: string | null;
  sprintId: string | null;
  teamMemberId: string | null;
  issueTypeId: string | null;
}

// Chart Data
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}
