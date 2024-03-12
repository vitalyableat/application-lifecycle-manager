import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { SERVER_STATUS } from '@/constants/server-status';
import { FeatureModel, IFeature } from '@/models/feature';
import { TaskModel } from '@/models/task';
import { TimeRecordModel } from '@/models/time-record';
import { connectDB } from '@/utils/connect-db';
import { verifyAccessToken } from '@/utils/jwt';

export async function GET(request: NextRequest, { params }: { params: { featureId: string } }) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    verifyAccessToken(accessToken.value);

    await connectDB();
    const features: IFeature[] = await FeatureModel.find({ projectId: params.featureId })
      .sort('title')
      .collation({ locale: 'en_US', numericOrdering: true });

    return NextResponse.json(features, SERVER_STATUS[200]);
  } catch (e) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { featureId: string } }) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role } = verifyAccessToken(accessToken.value);

    if (role !== EMPLOYEE_ROLE.PROJECT_MANAGER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const data = await FeatureModel.findOneAndDelete({ _id: params.featureId });

    if (data) {
      await TaskModel.deleteMany({ featureId: params.featureId });
      await TimeRecordModel.deleteMany({ featureId: params.featureId });
    }

    return NextResponse.json(data, SERVER_STATUS[200]);
  } catch {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}
