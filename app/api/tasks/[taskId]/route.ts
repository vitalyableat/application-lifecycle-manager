import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { getServerStatus } from '@/constants/server-status';
import { getDictionary } from '@/dictionaries';
import { ITask, TaskModel } from '@/models/task';
import { TimeRecordModel } from '@/models/time-record';
import { connectDB } from '@/utils/connect-db';
import { verifyAccessToken } from '@/utils/jwt';

export async function GET(request: NextRequest, { params }: { params: { taskId: string } }) {
  const d = getDictionary(request.cookies.get(COOKIE_NAME.LOCALE)?.value);
  const SERVER_STATUS = getServerStatus(d);
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    verifyAccessToken(accessToken.value);

    await connectDB();
    const tasks: ITask[] = await TaskModel.find({ projectId: params.taskId })
      .sort('title')
      .collation({ locale: 'en_US', numericOrdering: true });

    return NextResponse.json(tasks, SERVER_STATUS[200]);
  } catch (e) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { taskId: string } }) {
  const d = getDictionary(request.cookies.get(COOKIE_NAME.LOCALE)?.value);
  const SERVER_STATUS = getServerStatus(d);
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role } = verifyAccessToken(accessToken.value);

    if (role !== EMPLOYEE_ROLE.PROJECT_MANAGER && role !== EMPLOYEE_ROLE.DEVELOPER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const data = await TaskModel.findOneAndDelete({ _id: params.taskId });

    if (data) {
      await TimeRecordModel.deleteMany({ taskId: params.taskId });
    }

    return NextResponse.json(data, SERVER_STATUS[200]);
  } catch {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}
