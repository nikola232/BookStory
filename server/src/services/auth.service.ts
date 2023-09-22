import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { ResetPasswordUser } from '@dtos/resetPasswordUser.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { UserInterface } from '@interfaces/users.interface';
import { DB } from 'databases';
import { isEmpty } from '@utils/util';
import passwordValidator from 'password-validator';
import { BaseUserDto } from '@dtos/base.dto';

class AuthService {

  public async signup(userData: CreateUserDto): Promise<UserInterface> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: UserInterface = await DB.User.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    // Validate password
    const schema = new passwordValidator();
    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have uppercase letters
      .has()
      .digits() // Must have digits
      .has()
      .symbols() // Must have at least one special character
      .has()
      .not()
      .spaces(); // Should not have spaces

    const isValid = schema.validate(userData.password);
    if (!isValid)
      throw new HttpException(
        409,
        `Your password must be have at least 8 letters, uppercase and lowercase letters, digits, at least one special character, should not have spaces`,
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: UserInterface = await DB.User.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: BaseUserDto): Promise<{ cookie: string; findUser: UserInterface; tokenData: TokenData }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: UserInterface = await DB.User.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `Your password is incorrect or this account doesn't exist.`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, `Your password is incorrect or this account doesn't exist.`);

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser, tokenData };
  }

  public async logout(userData: UserInterface): Promise<UserInterface> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    
    const findUser: UserInterface = await DB.User.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }

  public async resetPassword(userData: ResetPasswordUser): Promise<UserInterface> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    console.log('userData', userData)
    const findUser: UserInterface = await DB.User.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `Your old password is incorrect or this account doesn't exist.`);
    console.log('findUser', findUser.password)
    const isPasswordMatching: boolean = await compare(userData.oldPassword, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, `Your old password is incorrect or this account doesn't exist.`);
    console.log('isPasswordMatching', isPasswordMatching)
    // Validate password
    const schema = new passwordValidator();
    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have uppercase letters
      .has()
      .digits() // Must have digits
      .has()
      .symbols() // Must have at least one special character
      .has()
      .not()
      .spaces(); // Should not have spaces

    const isValid = schema.validate(userData.newPassword);
    if (!isValid) {
      throw new HttpException(
        409,
        `Your password must be have at least min 8 characters, uppercase letter, uppercase letter, have digits, at least one special character and should not have spaces`,
      );
    }

    const hashedPassword = await hash(userData.newPassword, 10);
    const createUserData: UserInterface = await DB.User.update({ password: hashedPassword }, { where: { id: findUser.id } });

    return createUserData;
  }

  public createToken(user: UserInterface): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id, email: user.email };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
