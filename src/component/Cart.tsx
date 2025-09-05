import { CreditCard, Loader2, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useNavigate } from "react-router";
import useGenericGet from "../api/useGenericGet";
import { API_ENDPOINTS } from "../utls/ApiEndPoints";
import { USER_ID } from "../utls/const";
import Loader from "../Comman/Loader";
import useGenericEdit from "../api/useGenericEdit";
import { useQueryClient } from "@tanstack/react-query";
import useGenericDelete from "../api/useGenericDelete";
const Cart = () => {
  const queryClient = useQueryClient();

  const { data: cartCount } = useGenericGet({
    url: `${API_ENDPOINTS.USER}/${USER_ID}/cartCount`,
  });

  const { data: cart, isLoading: isFetchingCart } = useGenericGet({
    url: `${API_ENDPOINTS.CART}/${USER_ID}`,
  });

  const { mutateAsync: changeQuantity, isPending: isChangingQuantity } = useGenericEdit();

  const { mutateAsync: removeItemFromCart, isPending: isRemovingItemFromCart } = useGenericDelete();

  const navigate = useNavigate();

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

  if (isFetchingCart) return <Loader />;
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Shopping Cart ({cartCount?.count || 0}) items</h2>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
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
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cart.totalPriceWithoutTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>
                  ${(cart.totalPriceWithTax - cart.totalPriceWithoutTax).toFixed(2)} ({cart.taxRate * 100}%)
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${cart.totalPriceWithTax.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              //   onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
