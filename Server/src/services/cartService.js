import { StatusCodes } from "http-status-codes";
import { cartModel } from "~/models/cartModel"
import ApiError from "~/utils/ApiError";

const calculateCartData = (items) => {
  let totalQuantity = 0;
  let grandTotal = 0;

  items.forEach(item => {
    totalQuantity += item.quantity;
    grandTotal += item.price * item.quantity;
  });

  return { totalQuantity, grandTotal };
};

const getCartByUserId = async (userId) => {
  try {
    return await cartModel.getCartByUserId(userId)
  } catch (error) {
    throw new Error(error)
  }
}

// API để cập nhật số lượng sản phẩm trong giỏ hàng
const updateItemQuantity = async (req) => {
  try {
    const { userId } = req.user;
    const { productId, quantity } = req.body;
    // Kiểm tra nếu số lượng >= 1
    if (quantity < 1) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Quantity must be greater than 0');
    }

    // Lấy giỏ hàng hiện tại
    const cart = await cartModel.getCartByUserId(userId);

    // Tìm sản phẩm trong giỏ hàng
    const productIndex = cart.items.findIndex(item => item.productId === productId);

    if (productIndex !== -1) {
      // Cập nhật số lượng sản phẩm
      cart.items[productIndex].quantity = quantity;

      // Tính lại tổng số lượng và tổng tiền
      const { totalQuantity, grandTotal } = calculateCartData(cart.items);

      // Cập nhật giỏ hàng
      cart.totalQuantity = totalQuantity;
      cart.grandTotal = grandTotal;

      // Lưu giỏ hàng vào DB
      return await cartModel.upsertCart(userId, cart);
    } else {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found in cart');
    }
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
  }
};


const removeItemFromCart = async (req) => {
  const { userId } = req.user;
  const { productId } = req.body;
  try {
    const cart = await cartModel.getCartByUserId(userId)
    const productIndex = cart.items.findIndex(item => item.productId === productId);
    if (productIndex !== -1) {
      // Xoá sản phẩm khỏi giỏ hàng
      cart.items.splice(productIndex, 1);

      // Tính lại tổng số lượng và tổng tiền
      const { totalQuantity, grandTotal } = calculateCartData(cart.items);

      // Cập nhật giỏ hàng
      cart.totalQuantity = totalQuantity;
      cart.grandTotal = grandTotal;

      // Lưu giỏ hàng vào DB
      return await cartModel.upsertCart(userId, cart);
    } else {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found in cart');
    }
  } catch (error) {
    throw error
  }
}
const addToCart = async (req) => {
  const { userId } = req.user;
  const items = req.body.items;
  try {
    // Tính toán tổng số lượng và tổng tiền
    const { totalQuantity, grandTotal } = calculateCartData(items);

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
  getCartByUserId,
  addToCart,
  removeItemFromCart,
  updateItemQuantity
}