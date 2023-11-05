import { IEmployee } from '@/models/employee';
import { api } from '@/services';

export const getUser = () => api.get<IEmployee>('/employees');
