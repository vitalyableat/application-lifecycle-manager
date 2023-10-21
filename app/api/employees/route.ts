import { NextRequest, NextResponse } from 'next/server';

import { EmployeeModel } from '@/models/employee';
import { connectDB } from '@/utils/connect-db';
import { hashPassword } from '@/utils/hash-password';

export async function POST(request: NextRequest) {
  const employee = await request.json();

  await connectDB();

  const data = await EmployeeModel.create({ ...employee, password: hashPassword('1') });

  return NextResponse.json({ data }, { status: 201 });
}
