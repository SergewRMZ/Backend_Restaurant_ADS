import { Request, Response } from "express"
import { CustomError, UserLoginDto, UserRegisterDto } from '../../domain/';
import { AuthService } from "../services/auth-service";
export class AuthController {
  constructor (public readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({error: error.message})
    }

    console.log(`${error}`);
    return res.status(500).json({error: 'Internal server error'});
  }

  public registerUser = (req:Request, res:Response) => {
    const [error, userRegisterDto] = UserRegisterDto.create(req.body);
    if (error) return res.status(400).json({error});
    
    this.authService.registerUser(userRegisterDto!)
      .then((user) => res.json(user))
      .catch( error => this.handleError(error, res));
  }

  public loginUser = (req:Request, res:Response) => {
    const [error, userLoginDto] = UserLoginDto.create(req.body);
    if (error) return res.status(400).json({error});

    this.authService.loginUser(userLoginDto!)
      .then((user) => res.json(user))
      .catch( error => this.handleError(error, res));
  }

  public validateEmail = (req:Request, res:Response) => {
    res.json('Validate Email');
  }
}