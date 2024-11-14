import { cartModel } from "~/models/cartModel"

const calculateCartData = (items) => {
  let totalQuantity = 0;
  let grandTotal = 0;

  items.forEach(item => {
    totalQuantity += item.quantity;
    grandTotal += item.price * item.quantity;
  });

  return { totalQuantity, grandTotal };
};



const getCart = async () => {

}
const addToCart = async (req) => {
  const { userId } = req.user;
  const items = req.body.items;
  try {
    // Tính toán tổng số lượng và tổng tiền
    const { totalQuantity, grandTotal } = calculateCartData(items);

    // Gọi model để upsert giỏ hàng
    const cartData = {
      userId,
      items,
      totalQuantity,
      grandTotal,
      updatedAt: new Date().getTime(),
    };
    await cartModel.CART_COLLECTION_SCHEMA.validateAsync(cartData, { abortEarly: false })
    return await cartModel.upsertCart(userId, cartData);
  } catch (error) {
    throw new Error(error);
  }

};

export const cartService = {
  getCart,
  addToCart
}