import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { getServerStatus } from '@/constants/server-status';
import { getDictionary } from '@/dictionaries';
import { FeatureModel } from '@/models/feature';
import { connectDB } from '@/utils/connect-db';
import { verifyAccessToken } from '@/utils/jwt';

export async function POST(request: NextRequest) {
  const d = getDictionary(request.cookies.get(COOKIE_NAME.LOCALE)?.value);
  const SERVER_STATUS = getServerStatus(d);
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);
  const feature = await request.json();

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role } = verifyAccessToken(accessToken.value);

    if (role !== EMPLOYEE_ROLE.PROJECT_MANAGER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const data = await FeatureModel.create(feature);

    return NextResponse.json(data, SERVER_STATUS[201]);
  } catch (error) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function PUT(request: NextRequest) {
  const d = getDictionary(request.cookies.get(COOKIE_NAME.LOCALE)?.value);
  const SERVER_STATUS = getServerStatus(d);
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);
  const feature = await request.json();

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role } = verifyAccessToken(accessToken.value);

    if (role !== EMPLOYEE_ROLE.PROJECT_MANAGER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const data = await FeatureModel.findOneAndUpdate({ _id: feature.id }, feature, { new: true });

    return NextResponse.json(data, SERVER_STATUS[200]);
  } catch (error) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}
