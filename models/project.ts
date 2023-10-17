export interface IProject {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  employeeIds: string[];
  status: ProjectStatusType;
}

export type ProjectStatusType =
  | 'Active'
  | 'On Hold'
  | 'Completed'
  | 'Abandoned'
  | 'Reopened'
  | 'Pending Approval'
  | 'Cancelled';
