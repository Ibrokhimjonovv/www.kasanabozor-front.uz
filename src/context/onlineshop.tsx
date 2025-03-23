import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { onlineShopApi } from "../server";
import {
	LoadUserProductsProps,
  OnlineShopContextType,
  OnlineShopProviderProps,
} from "@/types/onlineshop";

const OnlineShopContext = createContext<OnlineShopContextType|undefined>(undefined);

const OnlineShopProvider = ({ children }: OnlineShopProviderProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [fastSellingProducts, setFastSellingProducts] = useState<any[]>([]);
  const [newProducts, setNewProducts] = useState<any[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
	const [userProducts, setUserProducts] = useState<any[]>([]);

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

	
	const loadUserProducts = async ({ page = 1, number = 10 }: LoadUserProductsProps = {}): Promise<void> => {
		try {
			const response = await axios.get(`${onlineShopApi}user-products/?page=${page}&number=${number}`);
			console.log(response);
			if (response.status === 200) {
				setUserProducts(response.data);
			} else {
				console.warn(`Unexpected response status: ${response.status}`);
			}
		} catch (error) {
			console.error('Failed to load user products:', error);
		}
	};

  return (
    <OnlineShopContext.Provider
      value={{
        categories,
        fastSellingProducts,
        newProducts,
        recommendedProducts,
				userProducts,
				loadUserProducts
      }}
    >
      {children}
    </OnlineShopContext.Provider>
  );
};

export const useOnlineShopContext = (): OnlineShopContextType => {
  const context = useContext(OnlineShopContext);
  if (!context) {
    throw new Error("useOnlineShopContext must be used within a OnlineShopProvider");
  }
  return context;
};

export { OnlineShopContext, OnlineShopProvider };

