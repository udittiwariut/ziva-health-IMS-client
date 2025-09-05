import { CreditCard, Loader2, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useNavigate } from "react-router";
import useGenericGet from "../api/useGenericGet";
import { API_ENDPOINTS } from "../utls/ApiEndPoints";
import { USER_ID } from "../utls/const";
import Loader from "../Comman/Loader";
import { useState } from "react";
import CardDetailModal from "./CardDetailModal";
import CartItem from "./CartItem";
import usePlaceOrder from "../api/usePlaceOrder";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState();

  const [orderId, setOrderId] = useState();

  const { mutateAsync: checkOut, isPending: isPendingCheckOut } = usePlaceOrder({
    onSuccess: (orderStatus) => {
      setOrderId(orderStatus.orderId);

      setIsModalOpen(true);
    },
  });

  const { data: cartCount, isLoading: isFetchingCartCount } = useGenericGet({
    url: `${API_ENDPOINTS.USER}/${USER_ID}/cartCount`,
  });

  const { data: cart, isLoading: isFetchingCart } = useGenericGet({
    url: `${API_ENDPOINTS.CART}/${USER_ID}`,
  });

  const navigate = useNavigate();

  const handleCheckOut = () => {
    checkOut();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  console.log(orderId);

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
              <CartItem item={item} />
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
              type="button"
              disabled={cartCount?.count === 0 || isFetchingCartCount}
              onClick={handleCheckOut}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Checkout
            </button>
          </div>
        </div>
      )}
      {isModalOpen ? <CardDetailModal orderId={orderId} handleCloseModal={handleCloseModal} /> : null}
    </div>
  );
};

export default Cart;
