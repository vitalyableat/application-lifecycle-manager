export interface ITask {
  id: string;
  userStoryId: number;
  employeeId: number;
  sprintId: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Testing' | 'Done';
  estimation: number;
  startDateTime: string;
  endDateTime: string;
}
