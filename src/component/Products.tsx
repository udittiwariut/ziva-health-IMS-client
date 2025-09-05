import { useState } from "react";
import { Search, Filter, Loader } from "lucide-react";
import useGenericGet from "../api/useGenericGet";
import { API_ENDPOINTS } from "../utls/ApiEndPoints";

import Product from "./Product";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: productsList, isLoading: isProductLoading } = useGenericGet({ url: `${API_ENDPOINTS.PRODUCT}` });

  console.log(productsList);

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

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
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
