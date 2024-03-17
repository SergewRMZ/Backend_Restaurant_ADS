import { UserModel } from "../../data";
import { CustomError, UserEntity, UserLoginDto, UserRegisterDto } from "../../domain";
import { bcrypAdapter } from '../../config/bcrypt';
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthService {
  constructor () {}

  public async registerUser (userRegisterDto: UserRegisterDto) {
    const existUser = await UserModel.findOne({ email: userRegisterDto.email });
    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const user = new UserModel(userRegisterDto);
      user.password = bcrypAdapter.hash(userRegisterDto.password);
      await user.save();

      // JWT <-- Autenticar al usuario o indetificación

      // Email de confirmación 
      
      const { password, ...rest } = UserEntity.fromObject(user);
      return {
        user: rest,
        token: 'ABCD'
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser (userLoginDto: UserLoginDto) {
    try {
      const existUser = await UserModel.findOne({email: userLoginDto.email});
      console.log(existUser);
      if (!existUser) throw CustomError.badRequest('Email already not exists');
      const isMatch = bcrypAdapter.compare(userLoginDto.password, existUser.password);
      
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
}