export interface IEmployee {
  id: string;
  name: string;
  surname: string;
  birthDate: string;
  phone: string;
  email: string;
  username: string;
  startDate: string;
  teamId: number;
  position: string;
  level: EmployeeLevel;
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
