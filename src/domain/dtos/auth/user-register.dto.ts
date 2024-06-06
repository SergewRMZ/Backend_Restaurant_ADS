import { regularExps } from "../../../config/regular-exp";

export class UserRegisterDto {
  private constructor (
    public name: string,
    public email: string,
    public password: string,
  ) {}

  static create ( object: {[key:string]:any} ):[string?, UserRegisterDto?] {
    const { name, email, password } = object;

    if (!name) return ['Missing name', undefined];
    if (!email) return ['Missing email', undefined];
    if ( !regularExps.email.test( email )) return ['Email is not valid', undefined];
    if (!password) return ['Missing password', undefined];
    if (password.length < 6) return ['Password is too short', undefined];

    return [undefined, new UserRegisterDto (name, email, password)];
  }

}