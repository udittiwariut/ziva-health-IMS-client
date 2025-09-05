import useGenericEdit from "../api/useGenericEdit";
import { API_ENDPOINTS } from "../utls/ApiEndPoints";
import { DEFAULT_IMAGE, USER_ID } from "../utls/const";
import { Loader } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const Product = ({ product }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: addToCart, isPending: isAddingToCart } = useGenericEdit();

  const handleAddToCart = (productId: string) => {
    addToCart({ url: `${API_ENDPOINTS.CART}/${USER_ID}/${productId}`, body: undefined }).then(() => {
      queryClient.invalidateQueries([`${API_ENDPOINTS.USER}/${USER_ID}/cartCount`] as any);
    });
  };

  return (
    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="text-6xl text-center mb-4">
          {<img className="object-cover object-center h-96 mx-auto" src={product?.image_url || DEFAULT_IMAGE} />}
        </div>

        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-3">{product.sku}</p>

        <div className="flex items-center mb-3">
          <span className="text-base text-gray-500">
            Stock: {product.stock_quantity > 0 ? product.stock_quantity : "Out of Stock"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          {isAddingToCart ? (
            <Loader className="animate-spin" />
          ) : (
            <button
              onClick={() => handleAddToCart(product.id)}
              disabled={product.stock_quantity === 0 || isAddingToCart}
              className={`px-4 py-2 rounded-lg font-medium ${
                product.stock_quantity === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              }`}
            >
              {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
