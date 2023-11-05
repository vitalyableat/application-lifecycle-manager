import { IEmployee } from '@/models/employee';
import { api } from '@/services';

import { LoginData } from './types';

export const refreshUser = () => api.get<IEmployee>('/auth');

export const login = (data: LoginData) => api.post<IEmployee>('/auth', data);

export const refreshTokens = () => api.put<boolean>('/auth');

export const logout = () => api.delete('/auth');
