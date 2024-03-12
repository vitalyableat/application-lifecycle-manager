import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { getServerStatus } from '@/constants/server-status';
import { getDictionary } from '@/dictionaries';
import { EmployeeModel } from '@/models/employee';
import { FeatureModel } from '@/models/feature';
import { IProject, ProjectModel } from '@/models/project';
import { TaskModel } from '@/models/task';
import { TimeRecordModel } from '@/models/time-record';
import { connectDB } from '@/utils/connect-db';
import { verifyAccessToken } from '@/utils/jwt';

export async function GET(request: NextRequest, { params }: { params: { projectId: string } }) {
  const d = getDictionary(request.cookies.get(COOKIE_NAME.LOCALE)?.value);
  const SERVER_STATUS = getServerStatus(d);
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role, id } = verifyAccessToken(accessToken.value);

    await connectDB();
    const project = await ProjectModel.findOne({ _id: params.projectId }).populate('employeeIds');
    const employeeIds = project?.employeeIds.map(({ id }: { id: string }) => id);

    if (!project || (role === EMPLOYEE_ROLE.DEVELOPER && !employeeIds.includes(id))) {
      return NextResponse.json(null, SERVER_STATUS[404]);
    }

    return NextResponse.json(
      {
        id: project._id,
        name: project.name,
        status: project.status,
        lifecycleStep: project.lifecycleStep,
        description: project.description,
        startDate: project.startDate,
        employeeIds,
        employees: project.employeeIds,
      },
      SERVER_STATUS[200],
    );
  } catch (e) {
    return NextResponse.json(null, SERVER_STATUS[404]);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { projectId: string } }) {
  const d = getDictionary(request.cookies.get(COOKIE_NAME.LOCALE)?.value);
  const SERVER_STATUS = getServerStatus(d);
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
    const data: IProject | null = await ProjectModel.findOneAndDelete({ _id: params.projectId });

    if (data) {
      await Promise.all(data.employeeIds.map((id) => EmployeeModel.findOneAndUpdate({ _id: id }, { free: true })));
      await FeatureModel.deleteMany({ projectId: params.projectId });
      await TaskModel.deleteMany({ projectId: params.projectId });
      await TimeRecordModel.deleteMany({ projectId: params.projectId });
    }

    return NextResponse.json(data, SERVER_STATUS[200]);
  } catch {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}
