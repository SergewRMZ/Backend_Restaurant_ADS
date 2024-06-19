import { CustomError, PaginationDto } from '../../domain';
import { ReservationModel } from '../../data/mongo/models/reservation.model';
import { CreateReservationDto } from '../../domain/dtos/reservation/reservation.dto';
import { DeleteReservationDto } from '../../domain/dtos/reservation/reservation-delete.dto';
import { GetReservationUserDto } from '../../domain/dtos/reservation/reservation-get.dto';

export class ReservationService {
  constructor () { }
  async createReservation (createReservationDto: CreateReservationDto) {
    const { date, time } = createReservationDto;
    const existsReservation = await ReservationModel.findOne({ date, time });
    console.log('La reservación existe', existsReservation);
    if (existsReservation) {
      throw CustomError.badRequest('Una reservación con la misma fecha y hora ya existe');
    }

    else {
      try {
        const reservation = new ReservationModel(createReservationDto);
        console.log('Reservación creada', reservation);
        await reservation.save();
        return reservation;
      }
      
      catch (error) {
        throw CustomError.internalServer(`${error}`);
      } 
    }    
  }

  async getReservations (paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, reservations] = await Promise.all([
        ReservationModel.countDocuments(),
        ReservationModel
          .find()
          .skip( (page - 1) * limit ).limit(limit)
          .populate('user')
      ]);

      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/reservation?page=${ (page +  1) }&limit=${limit}`,
        previous: ( page - 1 > 0 ) ? `/api/reservation?page=${ (page - 1) }&limit=${limit}` : null,
        reservations: reservations,
      }

    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }

  async deleteReservation (deleteReservationDto: DeleteReservationDto) {
    try {

      const deletedReservation = await ReservationModel.findById(deleteReservationDto.id);

      if (deletedReservation) {
        console.log('se encontró');
        await ReservationModel.deleteOne({ _id: deleteReservationDto.id });
        return deletedReservation;
      }

      else {
        throw CustomError.notFound('Reservación no encontrada');
      }

    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }

  async getUserReservation (getReservationUserDto: GetReservationUserDto) {
    try {
      const reservations = await ReservationModel.find({ user: getReservationUserDto.id }).populate('user');
      return reservations;
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}