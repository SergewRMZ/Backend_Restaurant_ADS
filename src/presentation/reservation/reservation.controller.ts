import { Request, Response } from "express"
import { CustomError } from "../../domain";
import { CreateReservationDto } from '../../domain/dtos/reservation/reservation.dto';
import { ReservationService } from "../services/reservation-service";
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';
import { DeleteReservationDto } from '../../domain/dtos/reservation/reservation-delete.dto';
import { GetReservationUserDto } from "../../domain/dtos/reservation/reservation-get.dto";

export class ReservationController {
  constructor (private readonly reservationService: ReservationService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({error: error.message})
    }

    console.log(`${error}`);
    return res.status(500).json({error: 'Internal server error'});
  }

  public createReservation = async (req:Request, res:Response) => {
    const [error, createReservationDto] = CreateReservationDto.create({...req.body, user: req.body.user.id});
    if (error) return res.status(400).json({ error });

    this.reservationService.createReservation(createReservationDto!)
      .then( reservation => res.status(200).json(reservation))
      .catch( error => this.handleError(error, res));
  }

  public getReservations = async (req:Request, res:Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if ( error ) res.status(400).json({ error });

    this.reservationService.getReservations(paginationDto!)
      .then( reservation => res.status(201).json(reservation) )
      .catch( error => this.handleError(error, res) );
  }

  public deleteReservation = async (req:Request, res:Response) => {
    const [error, deleteReservationDto] = DeleteReservationDto.create(req.params);
    if (error) return res.status(400).json({ error });

    this.reservationService.deleteReservation(deleteReservationDto!)
      .then ( deletedReservation => res.status(201).json('Reservación eliminada correctamente'))
      .catch( error => this.handleError(error, res) );
  }

  public getUserReservation = async (req: Request, res: Response) => {
    const [error, getReservationDto] = GetReservationUserDto.create(req.params);
    if (error) return res.status(400).json({error});
    
    this.reservationService.getUserReservation(getReservationDto!)
      .then( reservations => res.status(201).json(reservations))
      .catch( error => this.handleError(error, res));
  }
}