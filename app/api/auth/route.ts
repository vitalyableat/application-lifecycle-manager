import * as bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import { EmployeeModel, IEmployeeWithPassword } from '@/models/employee';
import { connectDB } from '@/utils/connect-db';
import { generateAccessToken, generateRefreshToken } from '@/utils/jwt';

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

  const accessToken = generateAccessToken({ email: employee.email, role: employee.role });
  const refreshToken = generateRefreshToken(employee.email);

  return NextResponse.json({ data: employee, accessToken, refreshToken }, { status: 200 });
}
