import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { SERVER_STATUS } from '@/constants/server-status';
import { EmployeeModel, IEmployee, IEmployeeWithPassword } from '@/models/employee';
import { ChangePasswordData } from '@/services/auth/types';
import { connectDB } from '@/utils/connect-db';
import { hashPassword } from '@/utils/hash-password';
import { verifyAccessToken } from '@/utils/jwt';

export async function GET(request: NextRequest, { params }: { params: { employeeId: string } }) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    verifyAccessToken(accessToken.value);

    await connectDB();
    const employee: IEmployee | null = await EmployeeModel.findOne({ _id: params.employeeId });

    if (!employee) {
      return NextResponse.json(null, SERVER_STATUS[404]);
    }

    return NextResponse.json(employee, SERVER_STATUS[200]);
  } catch (e) {
    return NextResponse.json(null, SERVER_STATUS[404]);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { employeeId: string } }) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);
  const user = await request.json();

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { id } = verifyAccessToken(accessToken.value);

    if (id !== params.employeeId) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const data = await EmployeeModel.findOneAndUpdate({ _id: id }, user, { new: true });

    return NextResponse.json(data, SERVER_STATUS[201]);
  } catch (error) {
    if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
      const [key, value] = Object.entries(error.keyValue)[0];

      return NextResponse.json(null, {
        status: 409,
        statusText: `Employee with ${key} ${value} already exists`,
      });
    }

    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { employeeId: string } }) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);
  const { oldPassword, newPassword }: ChangePasswordData = await request.json();

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { id } = verifyAccessToken(accessToken.value);

    if (id !== params.employeeId) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    if (oldPassword === newPassword) {
      return NextResponse.json(null, { status: 400, statusText: 'New password cannot match the previous one' });
    }

    await connectDB();
    const employee: IEmployeeWithPassword | null = await EmployeeModel.findOne({ _id: id });

    if (!employee) {
      return NextResponse.json(null, SERVER_STATUS[404]);
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, employee.password);

    if (!isPasswordValid) {
      return NextResponse.json(null, { status: 400, statusText: 'Invalid Password' });
    }

    await EmployeeModel.findOneAndUpdate({ _id: id }, { password: hashPassword(newPassword) });

    return NextResponse.json(null, SERVER_STATUS[200]);
  } catch (error) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}
