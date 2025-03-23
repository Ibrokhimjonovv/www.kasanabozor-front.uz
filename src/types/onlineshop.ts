import { ReactNode } from "react";

interface ProductCategoryType {
	guid: string;
	icon?: string;
	title: string;
	meta: string;
}

interface ProductUserType {
	guid: string;
	pfp: string;
	first_name: string;
	last_name: string;
}

interface ProductType {
	guid: string;
	user: ProductUserType;
	category: ProductCategoryType;
	title: string;
	meta: string;
	short_description: string;
	price: string;
	price_discount: string;
	image: string;
}

interface LoadUserProductsProps {
	page?: number;
	number?: number;
}

interface OnlineShopContextType {
  categories: Array<ProductCategoryType>;
  fastSellingProducts: Array<ProductType>;
  newProducts: Array<ProductType>;
  recommendedProducts: Array<ProductType>;
	userProducts: Array<ProductType>;
	loadUserProducts: (props: LoadUserProductsProps) => Promise<void>;
}

interface OnlineShopProviderProps {
  children: ReactNode;
}

export { OnlineShopContextType, OnlineShopProviderProps, LoadUserProductsProps, ProductType };

