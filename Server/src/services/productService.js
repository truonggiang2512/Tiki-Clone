import { ObjectId } from "mongodb"
import { productModel } from "~/models/productModel"
import { slugify } from "~/utils/formatter"

const createNew = async (req) => {
  try {
    const reqBody = req.body;
    const sellerId = req.user.useId;
    // xu ly logic du lieu tuy dac thu du an 
    const newProduct = {
      ...reqBody,
      sellerId,
      finalPrice: reqBody.discount ? reqBody.price - (reqBody.price * (reqBody.discount / 100)) : reqBody.price,
      updatedAt: null,
      slug: slugify(reqBody.name),
      _destroy: false
    }
    await productModel.PRODUCT_COLLECTION_SCHEMA.validateAsync(newProduct, { abortEarly: false })
    // Goi toi tang model de xu ly luu ban ghi newProduct vao trong database
    const createdProduct = await productModel.createNew(newProduct)

    // lay collection product sau khi goi 
    const getNewProduct = await productModel.findOneById(createdProduct.insertedId)
    //...
    // lam them cac xu ly locigc khac voi cac collection khac tuy vao du an 
    return getNewProduct
  } catch (error) {
    throw error
  }
}
const getAll = async () => {
  try {
    const getAllProduct = await productModel.getAllProduct();
    return getAllProduct.filter((item) => item._destroy !== true).map((item) => {
      const { _destroy, ...res } = item
      return res
    })
  } catch (error) {
    throw error
  }
}
const getAllSellerProduct = async (req) => {
  try {
    const { userId } = req.user;
    const getAllProduct = await productModel.getSellerProduct(userId);
    return getAllProduct.filter((item) => item._destroy !== true).map((item) => {
      const { _destroy, ...res } = item
      return res
    })
  } catch (error) {
    throw error
  }
}
const editOneById = async (reqBody, productId) => {
  try {
    const newProduct = {
      ...reqBody,
      finalPrice: reqBody.discount ? reqBody.price - (reqBody.price * (reqBody.discount / 100)) : reqBody.price,
      updatedAt: new Date().getTime(),
    }
    await productModel.editOneById(newProduct, productId)
    return await productModel.findOneById(ObjectId.createFromHexString(productId));
  } catch (error) {
    throw error
  }

}
const deleteOne = async (productId) => {
  try {
    // const getProductById = await productModel.findOneById(ObjectId.createFromHexString(productId))
    const newProduct = {
      // ...getProductById,
      _destroy: true,
    }
    return await productModel.editOneById(newProduct, productId)
  } catch (error) {
    throw error
  }
}
const getDetailProduct = async (productId) => {
  try {
    const { product: data, relatedProducts: relatedData } = await productModel.getDetailProduct(ObjectId.createFromHexString(productId))
    const product = { ...data };
    delete product._destroy;
    const relatedProduct = relatedData.map((item) => {
      const { _destroy, ...res } = item;
      return res;
    })
    return { product, relatedProduct }
  } catch (error) {
    throw error
  }
}
export const productService = {
  getAll,
  getAllSellerProduct,
  createNew,
  editOneById,
  deleteOne,
  getDetailProduct
}

