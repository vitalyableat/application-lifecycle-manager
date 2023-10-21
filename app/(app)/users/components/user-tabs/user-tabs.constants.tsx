import { EMPLOYEE_LEVEL, IEmployee } from '@/models/employee';

export const MOCKED_USERS: IEmployee[] = [
  {
    id: '1',
    name: 'Daniel',
    surname: 'Blane',
    birthDate: new Date(),
    phone: '+375 29 173 9141',
    email: 'danielblane@gmail.com',
    startDate: new Date(),
    position: 'React Developer',
    level: EMPLOYEE_LEVEL.LEAD,
    active: true,
  },
];
