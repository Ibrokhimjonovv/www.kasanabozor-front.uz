import React from "react";
import "./discount.scss";
const Discount = ({ product }) => {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  return (
    <div className="priceD">
      <span
        className={product.newPrice === null ? "oldPrice active" : "oldPrice "}
      >
        {formatPrice(product.oldPrice)} so'm
      </span>
      <span className={product.newPrice ? "newPrice active" : "newPrice"}>
      {product.newPrice
      ? `${formatPrice(product.newPrice)} so'm`
      : ""}
      </span>
    </div>
  );
};

export default Discount;
