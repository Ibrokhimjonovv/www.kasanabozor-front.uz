import { ReactNode } from "react";

interface OnlineShopContextType {
  categories: any[];
  fastSellingProducts: any[];
  newProducts: any[];
  recommendedProducts: any[];
}

interface OnlineShopProviderProps {
  children: ReactNode;
}

export { OnlineShopContextType, OnlineShopProviderProps };
