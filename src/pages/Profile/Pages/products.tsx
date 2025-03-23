import React, { useEffect, useState } from "react";
// import CheckboxWidget from "@/components/Widgets/utils";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useOnlineShopContext} from "@/context/onlineshop";
import {onlineShopApi} from "@/server";
import {ProductType} from "@/types/onlineshop";
import { Grid } from 'gridjs-react';
import { h } from "gridjs";
import CheckboxWidget from "@/components/Widgets/utils";


interface CategoryTagProps {
	meta: string;
	icon?: string;
	title: string;
}

const CategoryTag: React.FC<CategoryTagProps> = (props) => {
	return (
		<>
			<Link to={`/category/${props.meta}`} className="flex items-center justify-center max-w-fit py-1.5 px-3 bg-tbrand text-brand rounded-full">
				{props.icon && <span className="icon"><img src={props.icon} alt="" className="w-3.5 h-3.5 mr-2"/></span>}
				<span className="text">{props.title}</span>
			</Link>
		</>
	);
}


const ProductsListPage: React.FC = () => {
	const {t} = useTranslation();
  const [selectAllToggleValue, setSelectAllToggleValue] = useState<boolean>(false);
	const {userProducts, loadUserProducts} = useOnlineShopContext();
	const [listProducts, setListProducts] = useState<Array<Array<any>>>([]);
	const [selectedProducts, setSelectedProducts] = useState<Array<string>>([]);
	const formatter = new Intl.NumberFormat('en', {notation: 'compact', compactDisplay: 'short'});

	useEffect(() => {
		loadUserProducts({});
	}, []);

	useEffect(() => {
		setListProducts(userProducts.map(value => ([
			<img src={`${onlineShopApi?.split('/api')[0]}${value.image}`} alt="" className="w-8 h-8"/>,
			value.title,
			<CategoryTag {...value.category}/>,
			`${formatter.format(parseInt(value.price))} USZ`,
			"No reyting",
			"Active",
			<button>...</button>
		])));
	}, [userProducts]);

	const selectProduct = (product: ProductType) => {
		setSelectedProducts((prev) => prev.filter((value) => !(value === product.guid)));
	}

  return (
    <>
      <div className="page-title flex w-full items-center justify-between mb-6">
        <h2 className="title text-4xl font-bold">Maxsulotlarim</h2>
      </div>

      <div className="content list-products overflow-x-auto">
			{ /*<table className="w-full text-brand border-collapse">
          <thead className="w-full bg-tbrand border-b border-tborder">
            <tr className="bg-tbrand">
              <td className="p-1.5 max-w-6 min-w-6"><CheckboxWidget htmlFor="select-all-toggle-checkbox" checked={selectAllToggleValue} onChange={(e) => {setSelectAllToggleValue(e.target.checked);}} /></td>
							<td className="p-1.5 max-w-8 min-w-8">{t("Image[of]")}</td>
							<td className="p-1.5">{t("Name[of]")}</td>
							<td className="p-1.5">{t("Category")}</td>
							<td className="p-1.5">{t("Price")}</td>
							<td className="p-1.5">{t("Rating[of]")}</td>
							<td className="p-1.5">{t("Active[status]")}</td>
							<td className="p-1.5">{t("Actions")}</td>
						</tr>
          </thead>
					<tbody>
						{listProducts?.map((values, index) => <tr key={index} className={"border-b border-tborder bg-white"}>
							<td className="p-1.5 max-w-6 min-w-6"><CheckboxWidget htmlFor={`select-product-${index}`} checked={selectedProducts[index] == userProducts[index].guid} onChange={() => {selectProduct(userProducts[index]);}} /></td>
							{values.map((value, index) => <td className={index === 1 ? "p-1.5 max-w-42 truncate whitespace-nowrap overflow-hidden" : index === 0 ? "p-0" : "p-1.5"} key={index}>{value}</td>)}
						</tr>)}
					</tbody>
        </table> */}

				<div className="table w-full h-full">
			 		<Grid
						data={listProducts.map((value, index) => (["Checkbox", ...value]))}
						columns={['Check', 'Image', 'Name', 'Category', 'Price', 'Rating', 'Active', 'Actions']}
						autoWidth={false}
						search={false}
						pagination={{limit: 1}}
						resizable={true}
						className={{
							table: "w-full",
							th: "p-3 text-start",
							tr: "bg-tbrand border-b border-tborder",
							td: "p-3"
						}}
					/>
				</div>
      </div>
    </>
  );
};

export default ProductsListPage;

