import * as mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import * as process from 'process';

export async function POST(req: NextRequest, res: NextResponse) {
  const MONGODB_URI = process.env.MONGODB_URI;
  let client;

  try {
    client = await mongoose.connect(MONGODB_URI);
  } catch (e) {
    console.log(e, 'Error connecting to DB');
  }

  const data = await req.json();
  const { email, password } = data;
}
