import { Validators } from "../../../config/validators";

export class CreateReservationDto {
  private constructor (
    public readonly date:string,
    public readonly time:string,
    public readonly user:string, // Id del usuario
    public readonly numberPeople:number
  ) {}

  static create (props: { [key: string]: any }) : [string?, CreateReservationDto?] {
    const {date, time, user, numberPeople } = props;
    if (!date) return ['Missing date'];
    if (!time) return ['Missing time'];
    if (!user) return ['Missing user'];

    if (!Validators.verifyMongoID(user)) return ['User is not valid ID'];
    if (!numberPeople) return ['Missing number of people']
  
    return [undefined, new CreateReservationDto(date, time, user, numberPeople)];
  }
}