import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { SERVER_STATUS } from '@/constants/server-status';
import { ITimeRecord, TimeRecordModel } from '@/models/time-record';
import { connectDB } from '@/utils/connect-db';
import { verifyAccessToken } from '@/utils/jwt';

export async function GET(request: NextRequest, { params }: { params: { timeRecordId: string } }) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    verifyAccessToken(accessToken.value);

    await connectDB();
    const timeRecords: ITimeRecord[] = await TimeRecordModel.find({ projectId: params.timeRecordId }).sort({
      date: -1,
      time: -1,
    });

    return NextResponse.json(timeRecords, SERVER_STATUS[200]);
  } catch (e) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { timeRecordId: string } }) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role, id } = verifyAccessToken(accessToken.value);

    if (role !== EMPLOYEE_ROLE.DEVELOPER && role !== EMPLOYEE_ROLE.PROJECT_MANAGER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const tr = await TimeRecordModel.findById(params.timeRecordId);

    if (tr.employeeId !== id && role !== EMPLOYEE_ROLE.PROJECT_MANAGER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    const data = await TimeRecordModel.findOneAndDelete({ _id: params.timeRecordId });

    return NextResponse.json(data, SERVER_STATUS[200]);
  } catch {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}
