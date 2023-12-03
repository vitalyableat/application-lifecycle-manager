import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';
import { SERVER_STATUS } from '@/constants/server-status';
import { EmployeeModel } from '@/models/employee';
import { IProject, ProjectModel } from '@/models/project';
import { connectDB } from '@/utils/connect-db';
import { verifyAccessToken } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role, id } = verifyAccessToken(accessToken.value);

    await connectDB();
    const projects: IProject[] = await ProjectModel.find().sort('name');

    if (role === EMPLOYEE_ROLE.DEVELOPER) {
      return NextResponse.json(
        projects.filter(({ employeeIds }) => employeeIds.includes(id)),
        SERVER_STATUS[200],
      );
    }

    return NextResponse.json(projects, SERVER_STATUS[200]);
  } catch (e) {
    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);
  const project = await request.json();

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role } = verifyAccessToken(accessToken.value);

    if (role !== EMPLOYEE_ROLE.PROJECT_MANAGER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const data: IProject = await ProjectModel.create(project);

    await Promise.all(data.employeeIds.map((id) => EmployeeModel.findOneAndUpdate({ _id: id }, { free: false })));

    return NextResponse.json(data, SERVER_STATUS[201]);
  } catch (error) {
    if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
      const [key, value] = Object.entries(error.keyValue)[0];

      return NextResponse.json(null, {
        status: 409,
        statusText: `Project with ${key} ${value} already exists`,
      });
    }

    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}

export async function PUT(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN);
  const project = await request.json();

  if (!accessToken?.value) {
    return NextResponse.json(null, SERVER_STATUS[401]);
  }

  try {
    const { role } = verifyAccessToken(accessToken.value);

    if (role !== EMPLOYEE_ROLE.PROJECT_MANAGER) {
      return NextResponse.json(null, SERVER_STATUS[403]);
    }

    await connectDB();
    const oldProject: IProject | null = await ProjectModel.findById(project.id);

    if (oldProject) {
      await Promise.all(
        oldProject.employeeIds.map((id) => EmployeeModel.findOneAndUpdate({ _id: id }, { free: true })),
      );
    }

    const data: IProject | null = await ProjectModel.findOneAndUpdate({ _id: project.id }, project, { new: true });

    if (data) {
      await Promise.all(data.employeeIds.map((id) => EmployeeModel.findOneAndUpdate({ _id: id }, { free: false })));
    }

    return NextResponse.json(data, SERVER_STATUS[201]);
  } catch (error) {
    if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
      const [key, value] = Object.entries(error.keyValue)[0];

      return NextResponse.json(null, {
        status: 409,
        statusText: `Project with ${key} ${value} already exists`,
      });
    }

    return NextResponse.json(null, SERVER_STATUS[500]);
  }
}
