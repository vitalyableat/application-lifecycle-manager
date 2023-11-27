import { IEmployee } from '@/models/employee';
import { api } from '@/services';

import { ChangePasswordData, LoginData } from './types';

export const refreshUser = () => api.get<IEmployee>('/auth');

export const login = (data: LoginData) => api.post<IEmployee>('/auth', data);

export const refreshTokens = () => api.put<boolean>('/auth');

export const logout = () => api.delete('/auth');

export const updateUser = (userUpdateData: Partial<IEmployee>) =>
  api.put<IEmployee>(`/employees/${userUpdateData?.id}`, userUpdateData);

export const changePassword = ({ id, ...changePasswordData }: ChangePasswordData & { id: string }) =>
  api.patch(`/employees/${id}`, changePasswordData);
