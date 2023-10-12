export interface IProject {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  employees: IProjectEmployee[];
  sprintTimeout: 1 | 2 | 3 | 4;
}

export interface IProjectEmployee {
  id: number;
  startDate: string;
  endDate: string;
  rate: 0.25 | 0.5 | 0.75 | 1;
}
