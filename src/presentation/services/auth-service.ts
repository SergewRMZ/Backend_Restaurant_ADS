import { UserModel } from "../../data";
import { CustomError, UserEntity, UserLoginDto, UserRegisterDto } from "../../domain";
import { bcryptAdapter } from '../../config/bcrypt';
import { JwtAdapter } from "../../config/jwt.adapter";
import { EmailService } from "./email-service";
import { envs } from "../../config/envs";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthService {
  constructor (private readonly emailService: EmailService) {}

  public async registerUser (userRegisterDto: UserRegisterDto) {
    const existUser = await UserModel.findOne({ email: userRegisterDto.email });
    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const user = new UserModel(userRegisterDto);
      user.password = bcryptAdapter.hash(userRegisterDto.password);
      await user.save();

      // Email de confirmación 
      await this.sendEmailValidationLink(user.email);
      const { password, ...rest } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer('Error while creating JWT'); 

      return {
        user: rest,
        token: token
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser (userLoginDto: UserLoginDto) {
    try {
      const existUser = await UserModel.findOne({email: userLoginDto.email});
      console.log('loginUser', existUser);
      
      if (!existUser) throw CustomError.badRequest('Email already not exists');
      const isMatch = bcryptAdapter.compare(userLoginDto.password, existUser.password);
      
      if (!isMatch) throw CustomError.badRequest('Password is not valid');
      const {password, ...userEntity} = UserEntity.fromObject(existUser);

      const token = await JwtAdapter.generateToken({ id: existUser.id, email: existUser.email });
      if (!token) throw CustomError.internalServer('Error while creating JWT');

      return {
        user: userEntity,
        token: token
      }
      
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  private sendEmailValidationLink = async ( email: string ) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer('Error getting token');

    const link = `${envs.WERSERVICE_URL}/auth/validate-email/${ token }`;
    // console.log(link);
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link </p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email, 
      subject: 'Validate your email',
      htmlBody: html,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw CustomError.internalServer('Error sending email');

    return true;
  }

  
  public validateEmail = async (token:string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorized('Invalid Token');
    
    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer('Email not in token');

    const user = await UserModel.findOne({email});
    if (!user) throw CustomError.internalServer('User not exists');
    
    user.emailValidated = true;
    await user.save();

    return true;
  } 
}