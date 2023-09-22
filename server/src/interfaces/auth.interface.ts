import { Request } from 'express';
import { UserInterface } from '@interfaces/users.interface';

export interface DataStoredInToken {
  id: string;
  email?: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: UserInterface;
}
