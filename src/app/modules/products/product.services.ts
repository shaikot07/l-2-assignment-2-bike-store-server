import { Iproduct } from './product.interface';
import { ProductModel } from './product.model';

const addProductInToDB = async (product: Iproduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductToDB = async (searchTerm?: string) => {
  const query = searchTerm
    ? {
        // use $or for match any field name, brand, category. and RexExp for case-insensitive search
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { brand: new RegExp(searchTerm, 'i') },
          { category: new RegExp(searchTerm, 'i') },
        ],
      }
    : {};
  const result = await ProductModel.find(query);

  if (result.length === 0) {
    return 'no matches found';
  }

  return result;
};

const getProductById = async (id: string) => {
  const result = await ProductModel.findById(id);

  return result;
};

const updatedProduct = async (id: string, productData: Partial<Iproduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, productData, {
    new: true,
  });
  return result;
};

const deletedProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  addProductInToDB,
  getAllProductToDB,
  getProductById,
  updatedProduct,
  deletedProduct,
};
