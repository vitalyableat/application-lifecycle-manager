import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { SERVER_STATUS } from '@/constants/server-status';
import { TaskModel } from '@/models/task';
import { connectDB } from '@/utils/connect-db';
import { verifyAccessToken } from '@/utils/jwt';

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);
  const task = await request.json();

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role } = verifyAccessToken(accessToken.value);

    if (role !== EMPLOYEE_ROLE.PROJECT_MANAGER && role !== EMPLOYEE_ROLE.DEVELOPER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const data = await TaskModel.create(task);

    return NextResponse.json(data, SERVER_STATUS[201]);
  } catch (error) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function PUT(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);
  const task = await request.json();

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role } = verifyAccessToken(accessToken.value);

    if (role !== EMPLOYEE_ROLE.PROJECT_MANAGER && role !== EMPLOYEE_ROLE.DEVELOPER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const data = await TaskModel.findOneAndUpdate({ _id: task.id }, task, { new: true });

    return NextResponse.json(data, SERVER_STATUS[201]);
  } catch (error) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}
