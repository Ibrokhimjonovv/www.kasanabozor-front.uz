import React from "react";
import "./discount.scss";
const Discount = ({ product }) => {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  return (
    <div className="priceD">
      <span className={product.price === null ? "oldPrice active" : "oldPrice "}>
        {formatPrice(product.price)} so'm
      </span>
      <span className={product.price_off ? "newPrice active" : "newPrice"}>
      {product.price_off ? `${formatPrice(product.price_off)} so'm` : ""}
      </span>
    </div>
  );
};

export default Discount;
