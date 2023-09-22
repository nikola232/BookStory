import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { UserInterface } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { BaseUserDto } from '@dtos/base.dto';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: UserInterface = await this.authService.signup(userData);

      res.status(201).json({ status: true, message: 'Signup success' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: BaseUserDto = req.body;
      const { cookie, findUser, tokenData } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, access: tokenData, message: 'Login success', status: true });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: UserInterface = req.user;
      const logOutUserData: UserInterface = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ status: true, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: any = req.body;
      const signUpUserData = await this.authService.resetPassword(userData);

      res.status(201).json({ status: true, message: 'password has been successfully updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
