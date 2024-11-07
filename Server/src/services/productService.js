import { productModel } from "~/models/productModel"
import { slugify } from "~/utils/formatter"

const createNew = async (reqBody) => {
  try {
    // xu ly logic du lieu tuy dac thu du an 
    const newProduct = {
      ...reqBody,
      finalPrice: reqBody.discount ? reqBody.price - (reqBody.price * (reqBody.discount / 100)) : reqBody.price,
      updatedAt: null,
      slug: slugify(reqBody.name)
    }

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
export const productService = {
  createNew
}

