import { Validators } from "../../../config/validators";

export class CreateProductDto {
  private constructor (
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string, // Contener el id del usuario
    public readonly category: string, // Contener el id de la categoría
  ) {
  }

  static create (props: { [key: string]: any }) : [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = props;

    if (!name) return ['Missing name'];
    if (!price) return ['Missing price']; 
    
    if (!user) return ['Missing user']; 
    if (!Validators.verifyMongoID(user)) return ['Use is not valid ID']; 
    
    if (!category) return['Missing Category'];
    if (!Validators.verifyMongoID(category)) return ['Category is not valid ID'];

    return [undefined, new CreateProductDto(name, available, price, description, user, category)];
  }
}