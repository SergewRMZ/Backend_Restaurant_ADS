import mongoose from "mongoose";
interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDataBase {
  static async connect (options: ConnectionOptions) {
    const {mongoUrl, dbName} = options;

    try {
      mongoose.connect(mongoUrl, {dbName: dbName});

      console.log('Conectado a la base de datos');
      return true;
    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }
  }

  static async disconnect () {
    await mongoose.disconnect();
  }
}