import mongoose from "mongoose";

export class Validators {
  static verifyMongoID (ID: string) {
    return mongoose.isValidObjectId(ID);
  }
}