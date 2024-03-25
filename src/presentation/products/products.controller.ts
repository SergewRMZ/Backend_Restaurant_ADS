import { Request, Response } from "express"
import { CustomError, PaginationDto } from "../../domain";
import { CreateProductDto } from '../../domain/dtos/product/create-product.dto';
import { ProductService } from "../services/product-service";
export class ProductController {

  constructor (
    private readonly productService: ProductService
  ) {}


  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({error: error.message})
    }

    console.log(`${error}`);
    return res.status(500).json({error: 'Internal server error'});
  }

  public createProduct = async (req:Request, res:Response) => {
    const [error, createProductDto] = CreateProductDto.create({...req.body, user: req.body.user.id});
    if (error) return res.status(400).json({ error });

    this.productService.createProduct(createProductDto!)
      .then( category => res.status(201).json(category) )
      .catch( error => this.handleError(error, res) );
  }

  public getProducts = async (req:Request, res:Response) => {
    const { page = 1, limit = 10} = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if ( error ) res.status(400).json({ error });

    this.productService.getProducts(paginationDto!)
      .then( product => res.status(201).json(product) )
      .catch( error => this.handleError(error, res) );
  }
}