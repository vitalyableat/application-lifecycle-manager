import { model, models, Schema } from 'mongoose';

import { EMPLOYEE_LEVEL } from '@/constants/employee-level';
import { EMPLOYEE_ROLE } from '@/constants/employee-role';

export interface IEmployee {
  id: string;
  name: string;
  surname: string;
  birthDate: string;
  phone: string;
  email: string;
  startDate: Date;
  position: string;
  role: EMPLOYEE_ROLE;
  level: EMPLOYEE_LEVEL;
  active: boolean;
  avatar?: string;
}

export interface IEmployeeWithPassword extends IEmployee {
  password: string;
}

const employeeSchema = new Schema<IEmployeeWithPassword>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  birthDate: { type: String },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  startDate: { type: Date, default: () => new Date() },
  position: { type: String, default: '' },
  role: { type: String, default: EMPLOYEE_ROLE.DEVELOPER, enum: EMPLOYEE_ROLE },
  level: { type: String, default: EMPLOYEE_LEVEL.JUNIOR, enum: EMPLOYEE_LEVEL },
  active: { type: Boolean, default: true },
  avatar: String,
  password: String,
});

employeeSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

export const EmployeeModel = models?.Employee || model<IEmployeeWithPassword>('Employee', employeeSchema);
