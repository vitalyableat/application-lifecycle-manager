import { model, Schema } from 'mongoose';

export interface IEmployee {
  id: string;
  name: string;
  surname: string;
  birthDate: Date;
  phone: string;
  email: string;
  startDate: Date;
  position: string;
  level: EMPLOYEE_LEVEL;
  active: boolean;
  avatar?: string;
}

export enum EMPLOYEE_LEVEL {
  TRAINEE = 'Trainee',
  JUNIOR = 'Junior',
  MIDDLE = 'Middle',
  SENIOR = 'Senior',
  LEAD = 'Lead',
}

const employeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  birthDate: { type: Date, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  startDate: { type: Date, default: () => new Date() },
  position: { type: String, required: true },
  level: { type: String, required: true, enum: EMPLOYEE_LEVEL },
  active: { type: Boolean, default: true },
  avatar: String,
});

export const EmployeeModel = model<IEmployee>('Employee', employeeSchema);
