import jwt from 'jsonwebtoken';

import { EMPLOYEE_ROLE } from '@/constants/employee-role';

export const generateAccessToken = (payload: { email: string; role: EMPLOYEE_ROLE }): string => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (email: string): string => {
  return jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};
