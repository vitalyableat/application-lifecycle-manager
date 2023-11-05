import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string): string => bcrypt.hashSync(password, bcrypt.genSaltSync(3));
