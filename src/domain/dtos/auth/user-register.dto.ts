import { regularExps } from "../../../config/regular-exp";

export class UserRegisterDto {
  private constructor (
    public name: string,
    public email: string,
    public password: string,
    public role: string
  ) {}

  static create ( object: {[key:string]:any} ):[string?, UserRegisterDto?] {
    const { name, email, password, rol } = object;
    const role = rol ? rol : 'USER_ROLE';
    if (!name) return ['Missing name', undefined];
    if (!email) return ['Missing email', undefined];
    if ( !regularExps.email.test( email )) return ['Email is not valid', undefined];
    if (!password) return ['Missing password', undefined];
    if (password.length < 6) return ['Password is too short', undefined];

    return [undefined, new UserRegisterDto (name, email, password, role)];
  }

}