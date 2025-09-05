import { Loader2, Minus, Plus, X } from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";
import useGenericDelete from "../api/useGenericDelete";
import useGenericEdit from "../api/useGenericEdit";
import { API_ENDPOINTS } from "../utls/ApiEndPoints";
import { USER_ID } from "../utls/const";

const CartItem = ({ item }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: changeQuantity, isPending: isChangingQuantity } = useGenericEdit();

  const { mutateAsync: removeItemFromCart, isPending: isRemovingItemFromCart } = useGenericDelete();
  const handleQuantity = (productId: string, qtyChange: string) => {
    const url = `${API_ENDPOINTS.CART}/${USER_ID}/${productId}?qtyChange=${qtyChange}`;

    changeQuantity({ url: url, body: undefined }).then((data) => {
      queryClient.invalidateQueries([`${API_ENDPOINTS.CART}/${USER_ID}`] as any);
    });
  };

  const removeItem = (cartItemId: string) => {
    const url = `${API_ENDPOINTS.CART}/${USER_ID}/${cartItemId}`;

    removeItemFromCart({ url }).then(() => {
      queryClient.invalidateQueries([`${API_ENDPOINTS.CART}/${USER_ID}`] as any);
    });
  };
  return (
    <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <div className="text-4xl">{item.image}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{item.product?.name}</h3>
          <p className="text-gray-600">${item.product.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={isChangingQuantity}
            onClick={() => handleQuantity(item.product_id, "DEC")}
            className="w-8 h-8 cursor-pointer rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium">{item.quantity}</span>
          <button
            disabled={isChangingQuantity}
            onClick={() => handleQuantity(item.product_id, "INC")}
            className="w-8 h-8 cursor-pointer rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="text-lg font-semibold">${item.itemTotalWithoutTax.toFixed(2)}</div>
        <button
          onClick={() => removeItem(item._id)}
          className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
        >
          {isRemovingItemFromCart ? <Loader2 className="spin" /> : <X className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
