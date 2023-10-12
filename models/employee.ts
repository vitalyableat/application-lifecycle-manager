export interface IEmployee {
  id: string;
  name: string;
  surname: string;
  birthDate: string;
  phone: string;
  email: string;
  startDate: string;
  teamId: number;
  position: string;
  level: EmployeeLevel;
  rate: 0.25 | 0.5 | 0.75 | 1;
  freeHours: 0 | 2 | 4 | 6 | 8;
  active: boolean;
}

export type EmployeeLevel =
  | 'Trainee'
  | 'Junior-'
  | 'Junior'
  | 'Junior+'
  | 'Middle-'
  | 'Middle'
  | 'Middle+'
  | 'Senior-'
  | 'Senior'
  | 'Senior+'
  | 'Lead';
