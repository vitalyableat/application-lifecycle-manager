import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';

const generateAccessToken = (payload: { id: string; role: EMPLOYEE_ROLE }): string => {
  return sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: 60 * 60 });
};

const generateRefreshToken = (id: string): string => {
  return sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: 60 * 60 * 24 * 7 });
};

interface AccessJwtPayload extends JwtPayload {
  id: string;
  role: EMPLOYEE_ROLE;
}

export const verifyAccessToken = (accessToken: string): AccessJwtPayload => {
  return verify(accessToken, process.env.JWT_ACCESS_SECRET) as AccessJwtPayload;
};

interface RefreshJwtPayload extends JwtPayload {
  email: string;
}

export const verifyRefreshToken = (refreshToken: string): RefreshJwtPayload => {
  return verify(refreshToken, process.env.JWT_REFRESH_SECRET) as RefreshJwtPayload;
};

export const getResponseWithJwtCookies = (response: NextResponse, id: string, role: EMPLOYEE_ROLE): NextResponse => {
  const accessToken = generateAccessToken({ id, role });
  const refreshToken = generateRefreshToken(id);

  response.cookies.set(COOKIE_NAME.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60,
    path: '/',
  });
  response.cookies.set(COOKIE_NAME.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  return response;
};
