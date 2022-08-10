import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { addItemToCard } = useContext(CartContext);
  const { name, price, imageUrl } = product;
  const addProductToCard = () => addItemToCard(product);
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button onClick={addProductToCard} buttonType={"inverted"}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
