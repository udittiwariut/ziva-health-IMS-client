import React, { useState } from "react";
import { Search, Filter, Star } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 79.99,
      stock: 15,
      category: "Electronics",
      image: "🎧",
      rating: 4.5,
      description: "Premium wireless headphones with noise cancellation",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      stock: 8,
      category: "Electronics",
      image: "⌚",
      rating: 4.3,
      description: "Feature-rich smartwatch with health tracking",
    },
    {
      id: 3,
      name: "Coffee Maker",
      price: 89.99,
      stock: 12,
      category: "Home",
      image: "☕",
      rating: 4.7,
      description: "Automatic drip coffee maker with timer",
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 129.99,
      stock: 0,
      category: "Sports",
      image: "👟",
      rating: 4.6,
      description: "Lightweight running shoes for all terrains",
    },
    {
      id: 5,
      name: "Desk Lamp",
      price: 45.99,
      stock: 20,
      category: "Home",
      image: "💡",
      rating: 4.2,
      description: "LED desk lamp with adjustable brightness",
    },
    {
      id: 6,
      name: "Yoga Mat",
      price: 29.99,
      stock: 25,
      category: "Sports",
      image: "🧘",
      rating: 4.4,
      description: "Non-slip yoga mat for all exercise types",
    },
  ]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="text-6xl text-center mb-4">{product.image}</div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-3">{product.description}</p>

              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                </div>
                <span className="ml-4 text-sm text-gray-500">
                  Stock: {product.stock > 0 ? product.stock : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    product.stock === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  }`}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
