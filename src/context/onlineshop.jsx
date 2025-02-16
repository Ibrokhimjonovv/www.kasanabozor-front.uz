import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { onlineShopApi } from "../SuperVars";


const OnlineShopContext = createContext();

const OnlineShopProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [fastSellingProducts, setFastSellingProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${onlineShopApi}home-data/`);
            if (response.status == 200) {
                setCategories(response.data.categories);
                setFastSellingProducts(response.data.fast_selling_products);
                setNewProducts(response.data.new_products);
                setRecommendedProducts(response.data.recommended_products);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <OnlineShopContext.Provider value={{
                categories,
                fastSellingProducts,
                newProducts,
                recommendedProducts
            }}>
                { children }
            </OnlineShopContext.Provider>
        </>
    );
}

export {
    OnlineShopContext,
    OnlineShopProvider
};
