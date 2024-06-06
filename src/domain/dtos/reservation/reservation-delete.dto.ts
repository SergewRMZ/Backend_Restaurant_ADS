import { Validators } from "../../../config/validators";

export class DeleteReservationDto {
  private constructor (public readonly id: string) {}

  static create (object: {[key:string]:any}): [string?, DeleteReservationDto?] {
    const { id } = object;
    if (!id) return ['Missing reservation id', undefined];
    if (!Validators.verifyMongoID(id)) return ['ID provides, is not Mongo ID', undefined];
    return [undefined, new DeleteReservationDto(id)];
  }
}