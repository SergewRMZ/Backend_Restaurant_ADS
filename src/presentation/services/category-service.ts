import { CategoryModel } from '../../data';
import { CustomError, PaginationDto, UserEntity } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
export class CategoryService {
  constructor () {
    
  }

  async createCategory (createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });
    if (categoryExists) throw CustomError.badRequest('Category already exists');

    try {
      
      const category = new CategoryModel({
        name: createCategoryDto.name,
        available: createCategoryDto.available,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getCategories ( paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      // const total = await CategoryModel.countDocuments();
      // const categories = await CategoryModel.find()
      //   .skip( (page - 1) * limit )
      //   .limit( limit )

      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find().skip( (page - 1) * limit ).limit(limit)
      ]);


      return {
        page: page,
        limit: limit,
        total: total,

        categories: categories.map( category => ({
          id: category.id,
          name: category.name,
          available: category.available
        }))
      }
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}