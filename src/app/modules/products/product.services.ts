import { Iproduct } from './product.interface';
import { ProductModel } from './product.model';

const addProductInToDB = async (product: Iproduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductToDB = async (searchTerm?: string) => {
  const query = searchTerm
    ? {
        // use $or for match any field name, brand, category. RexExp for case-insensitive search .
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { brand: new RegExp(searchTerm, 'i') },
          { category: new RegExp(searchTerm, 'i') },
        ],
      }
    : {};
  const result = await ProductModel.find(query);
  return result;
};

export const ProductServices = {
  addProductInToDB,
  getAllProductToDB
};
