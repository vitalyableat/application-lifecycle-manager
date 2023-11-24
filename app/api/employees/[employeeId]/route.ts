import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { SERVER_STATUS } from '@/constants/server-status';
import { EmployeeModel, IEmployee } from '@/models/employee';
import { connectDB } from '@/utils/connect-db';
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
