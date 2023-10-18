export interface ITask {
  id: string;
  userStoryId: string;
  employeeId: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Testing' | 'Done';
  estimation: number;
  startDateTime: string;
  endDateTime: string;
}
