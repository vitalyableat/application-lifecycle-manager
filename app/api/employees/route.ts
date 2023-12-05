import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { SERVER_STATUS } from '@/constants/server-status';
import { EmployeeModel, IEmployee } from '@/models/employee';
import { connectDB } from '@/utils/connect-db';
import { hashPassword } from '@/utils/hash-password';
import { verifyAccessToken } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    verifyAccessToken(accessToken.value);

    await connectDB();
    const employees: IEmployee[] = await EmployeeModel.find({ role: EMPLOYEE_ROLE.DEVELOPER }).sort({
      name: 1,
      surname: 1,
    });

    return NextResponse.json(employees, SERVER_STATUS[200]);
  } catch (e) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);
  const employee = await request.json();

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role } = verifyAccessToken(accessToken.value);

    if (role !== EMPLOYEE_ROLE.RESOURCE_MANAGER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const data = await EmployeeModel.create({ ...employee, password: hashPassword('1111') });

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

export async function PUT(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);
  const employee = await request.json();

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role } = verifyAccessToken(accessToken.value);

    if (role !== EMPLOYEE_ROLE.RESOURCE_MANAGER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const data = await EmployeeModel.findOneAndUpdate({ _id: employee.id }, employee, { new: true });

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
