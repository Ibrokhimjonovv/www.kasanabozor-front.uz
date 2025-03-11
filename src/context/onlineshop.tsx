import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { onlineShopApi } from "../server";
import {
  OnlineShopContextType,
  OnlineShopProviderProps,
} from "@/types/onlineshop";

const OnlineShopContext = createContext<OnlineShopContextType>({
  categories: [],
  fastSellingProducts: [],
  newProducts: [],
  recommendedProducts: [],
});

const OnlineShopProvider = ({ children }: OnlineShopProviderProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [fastSellingProducts, setFastSellingProducts] = useState<any[]>([]);
  const [newProducts, setNewProducts] = useState<any[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${onlineShopApi}home-data/`);
      if (response.status === 200) {
        setCategories(response.data.categories);
        setFastSellingProducts(response.data.fast_selling_products);
        setNewProducts(response.data.new_products);
        setRecommendedProducts(response.data.recommended_products);
      }
    };

    fetchData();
  }, []);

  return (
    <OnlineShopContext.Provider
      value={{
        categories,
        fastSellingProducts,
        newProducts,
        recommendedProducts,
      }}
    >
      {children}
    </OnlineShopContext.Provider>
  );
};

export { OnlineShopContext, OnlineShopProvider };
