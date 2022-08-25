import React from "react";
import { CategoryContainer, CategoryBodyContainer, BackgroundImage } from "./category-item.styles.jsx";

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <CategoryContainer>
      <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
      <CategoryBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </CategoryBodyContainer>
    </CategoryContainer>
  );
};

export default CategoryItem;
