import { IEmployee } from '@/models/employee';
import { api } from '@/services';

import { LoginData } from './types';

export const logout = () => api.get('/auth');

export const login = (data: LoginData) => api.post<IEmployee>('/auth', data);

export const updateTokens = () => api.put<boolean>('/auth');
