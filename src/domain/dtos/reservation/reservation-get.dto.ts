import { Validators } from "../../../config/validators";

export class GetReservationUserDto {
  private constructor (public readonly id: string) {}

  static create (object: {[key:string]:any}): [string?, GetReservationUserDto?] {
    const { id } = object;
    if (!id) return ['Missing reservation id', undefined];
    if (!Validators.verifyMongoID(id)) return ['ID provides, is not Mongo ID', undefined];
    return [undefined, new GetReservationUserDto(id)];
  }
}