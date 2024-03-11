import * as bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import { APP_ROUTE } from '@/constants/app-route';
import { COOKIE_NAME } from '@/constants/cookie-name';
import { getServerStatus } from '@/constants/server-status';
import { getDictionary } from '@/dictionaries';
import { EmployeeModel, IEmployeeWithPassword } from '@/models/employee';
import { connectDB } from '@/utils/connect-db';
import { getResponseWithJwtCookies, verifyAccessToken, verifyRefreshToken } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  const d = getDictionary(request.cookies.get(COOKIE_NAME.LOCALE)?.value);
  const SERVER_STATUS = getServerStatus(d);
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { id } = verifyAccessToken(accessToken.value);

    await connectDB();
    const employee: IEmployeeWithPassword | null = await EmployeeModel.findOne({ _id: id });

    if (employee) {
      return NextResponse.json(employee, SERVER_STATUS[200]);
    } else {
      return NextResponse.json(null, SERVER_STATUS[404]);
    }
  } catch (e) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function POST(request: NextRequest) {
  const d = getDictionary(request.cookies.get(COOKIE_NAME.LOCALE)?.value);
  const SERVER_STATUS = getServerStatus(d);
  const { password, email } = await request.json();

  try {
    await connectDB();

    const employee: IEmployeeWithPassword | null = await EmployeeModel.findOne({ email });

    if (!employee) {
      return NextResponse.json(null, { status: 400, statusText: d.server.wrongEmailOrPassword });
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      return NextResponse.json(null, { status: 400, statusText: d.server.wrongEmailOrPassword });
    }

    if (!employee.active) {
      return NextResponse.json(null, { status: 403, statusText: d.server.accountInactive });
    }

    const response = await NextResponse.json(employee, SERVER_STATUS[200]);

    return getResponseWithJwtCookies(response, employee.id, employee.role);
  } catch (e) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function PUT(request: NextRequest) {
  const d = getDictionary(request.cookies.get(COOKIE_NAME.LOCALE)?.value);
  const SERVER_STATUS = getServerStatus(d);
  const refreshToken = request.cookies.get(COOKIE_NAME.REFRESH_TOKEN);

  if (!refreshToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[403]);
  }

  try {
    const { id } = verifyRefreshToken(refreshToken.value);

    await connectDB();
    const employee: IEmployeeWithPassword | null = await EmployeeModel.findOne({ _id: id });

    if (employee) {
      const response = NextResponse.json(true, SERVER_STATUS[200]);

      return getResponseWithJwtCookies(response, employee.id, employee.role);
    } else {
      return NextResponse.json(null, SERVER_STATUS[404]);
    }
  } catch (e) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.redirect(new URL(APP_ROUTE.LOGIN, request.url));

  response.cookies.delete(COOKIE_NAME.ACCESS_TOKEN);
  response.cookies.delete(COOKIE_NAME.REFRESH_TOKEN);

  return response;
}
