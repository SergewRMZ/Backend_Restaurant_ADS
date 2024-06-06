import mongoose, { Schema } from "mongoose";

const reservationSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  numberPeople: {
    type: Number,
    required: true
  }
});

reservationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false, // Eliminar __v
  transform: function ( doc, ret, options ) { // Eliminar el _id
    delete ret._id;
  },
})



export const ReservationModel = mongoose.model('Reservation', reservationSchema);