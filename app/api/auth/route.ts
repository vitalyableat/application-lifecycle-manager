import * as bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import { APP_ROUTE } from '@/constants/app-route';
import { COOKIE_NAME } from '@/constants/cookie-name';
import { EmployeeModel, IEmployeeWithPassword } from '@/models/employee';
import { connectDB } from '@/utils/connect-db';
import { getResponseWithJwtCookies, verifyRefreshToken } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL(APP_ROUTE.LOGIN, request.url));

  response.cookies.delete(COOKIE_NAME.ACCESS_TOKEN);
  response.cookies.delete(COOKIE_NAME.REFRESH_TOKEN);

  return response;
}

export async function POST(request: NextRequest) {
  const { password, email } = await request.json();

  await connectDB();

  const employee: IEmployeeWithPassword | null = await EmployeeModel.findOne({ email });

  if (!employee) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, employee.password);

  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Wrong password' }, { status: 401 });
  }

  const response = NextResponse.json(employee, { status: 200 });

  return getResponseWithJwtCookies(response, employee.email, employee.role);
}

export async function PUT(request: NextRequest) {
  const refreshToken = request.cookies.get(COOKIE_NAME.REFRESH_TOKEN);

  try {
    const { email } = verifyRefreshToken(refreshToken?.value || '');
    const employee: IEmployeeWithPassword | null = await EmployeeModel.findOne({ email });

    if (employee) {
      const response = NextResponse.json(true, { status: 200 });

      return getResponseWithJwtCookies(response, employee.email, employee.role);
    } else {
      throw new Error('No employee found');
    }
  } catch (e) {
    return NextResponse.json(false, { status: 200 });
  }
}
