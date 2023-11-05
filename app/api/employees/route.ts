import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { EmployeeModel, IEmployeeWithPassword } from '@/models/employee';
import { connectDB } from '@/utils/connect-db';
import { hashPassword } from '@/utils/hash-password';
import { verifyAccessToken } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  try {
    const { email } = verifyAccessToken(accessToken?.value || '');
    const employee: IEmployeeWithPassword | null = await EmployeeModel.findOne({ email });

    if (employee) {
      return NextResponse.json(employee, { status: 200 });
    } else {
      throw new Error('No employee found');
    }
  } catch (e) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  const employee = await request.json();

  await connectDB();

  const data = await EmployeeModel.create({ ...employee, password: hashPassword('1111') });

  return NextResponse.json({ data }, { status: 201 });
}
