import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (boolean) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
};

export const setCartItems = (cartItems) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
};

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((item) => {
    return item.id === productToAdd.id;
  });
  if (existingCartItem) {
    return cartItems.map((item) => {
      return item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find((item) => {
    return item.id === productToRemove.id;
  });
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => {
      return item.id !== productToRemove.id;
    });
  } else {
    return cartItems.map((item) => {
      return item.id === productToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });
  }
};

const clearCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((item) => {
    return item.id !== productToRemove.id;
  });
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
    cartItems: newCartItems,
  });
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
    cartItems: newCartItems,
  });
};

export const clearItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = clearCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
    cartItems: newCartItems,
  });
};
