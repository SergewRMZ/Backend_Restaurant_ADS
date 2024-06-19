import { envs } from "../../config/envs";
import { CategoryModel, MongoDataBase, ProductModel, ReservationModel, UserModel } from "../mongo";
import { seedData } from "./data";

(async() => {

  await MongoDataBase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  });

  await main();


  await MongoDataBase.disconnect();
})();

const randomNumber = (x: number) => {
  return Math.floor(Math.random() * x);
}

async function main () {

  // Eliminar la base de datos
  await Promise.all([
    UserModel.deleteMany(),
    ProductModel.deleteMany(),
    CategoryModel.deleteMany(),
    ReservationModel.deleteMany(),
  ]);

  // Crear usuarios 
  const users = await UserModel.insertMany( seedData.users );

  // Crear categorías
  const categories = await CategoryModel.insertMany (
    seedData.categories.map (category => {
      return {
        ...category,
        user: users[randomNumber(seedData.users.length - 1)]._id
      }
    })
  );

  const products = await ProductModel.insertMany (
    seedData.products.map (product => {
      return {
        ...product,
        user: users[randomNumber(seedData.users.length - 1)]._id,
        category: categories[randomNumber(seedData.users.length - 1)]._id,
      }
    })
  )

  const reservations = await ReservationModel.insertMany (
    seedData.reservations.map (reservation => {
      return {
        ...reservation,
        user: users[randomNumber(seedData.users.length - 1)]._id
      }
    })
  );

  console.log('Semilla ejecutada correctamente');
}