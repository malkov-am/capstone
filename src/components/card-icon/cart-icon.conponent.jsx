import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount,
} from "./card-icon.styles.jsx";
import { useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";
import { useDispatch } from "react-redux";

const CartIcon = () => {
  const dispath = useDispatch();
  const IsCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const toggleIsCartOpen = () => dispath(setIsCartOpen(!IsCartOpen));
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
