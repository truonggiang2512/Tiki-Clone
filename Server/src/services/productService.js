

const createNew = async (reqBody) => {
  try {
    // xu ly logic du lieu tuy dac thu du an 
    const newProduct = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Goi toi tang model de xu ly luu ban ghi newProduct vao trong database
    //...
    // lam them cac xu ly locigc khac voi cac collection khac tuy vao du an 
    return newProduct
  } catch (error) {
    throw error
  }
}
export const productService = {
  createNew
}

