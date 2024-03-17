import { regularExps } from "../../../config/regular-exp";

export class UserLoginDto {
  private constructor (public readonly email: string,
  public readonly password:string) {}

  static create (object: {[key:string]:any}): [string?, UserLoginDto?] {
    const {email, password} = object;

    if (!email) return ['Missing email', undefined];
    if (!password) return ['Missing password', undefined];
    if (!regularExps.email.test( email )) return ['Email is not valid', undefined]
    return [undefined, new UserLoginDto(email, password)];
  }
}