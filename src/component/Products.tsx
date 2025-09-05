import { useState } from "react";
import { Search, Filter } from "lucide-react";
import useGenericGet from "../api/useGenericGet";
import { API_ENDPOINTS } from "../utls/ApiEndPoints";
import * as Slider from "@radix-ui/react-slider";

import Product from "./Product";
import { useDebounce } from "@uidotdev/usehooks";
import Loader from "../Comman/Loader";

const getProductFilterUrl = ({ category, searchTerm, minPrice, maxPrice }) => {
  let baseQueryUrl = API_ENDPOINTS.PRODUCT + "?";

  if (searchTerm) baseQueryUrl = baseQueryUrl + "search=" + searchTerm + "&";

  if (category && category != "All") baseQueryUrl = baseQueryUrl + "category=" + category + "&";

  baseQueryUrl = baseQueryUrl + "minPrice=" + minPrice + "&";
  baseQueryUrl = baseQueryUrl + "maxPrice=" + maxPrice;

  return baseQueryUrl;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  const categories = [
    "All",
    "Vitamins",
    "Minerals",
    "Supplements",
    "Proteins",
    "Herbal Products",
    "Immunity Boosters",
    "Sports Nutrition",
  ];

  const url = getProductFilterUrl({
    category: selectedCategory,
    searchTerm,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
  });

  const debouncedUrl = useDebounce(url, 700);

  const { data: productsList, isLoading: isProductLoading } = useGenericGet({ url: debouncedUrl });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Price Range</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-24 border rounded p-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Min"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-24 border rounded p-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {isProductLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsList.map((product) => (
            <Product product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
