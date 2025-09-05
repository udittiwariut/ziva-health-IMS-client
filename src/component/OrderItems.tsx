import { X, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import getStatusIcon from "../Comman/OrderStatusIcon";
import useGenericEdit from "../api/useGenericEdit";
import { API_ENDPOINTS } from "../utls/ApiEndPoints";
import { USER_ID } from "../utls/const";

export const OrderItems = ({ order }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: cancelOrder, isPending: isCancelingOrder } = useGenericEdit();

  const handleCancelOrder = (orderId) => {
    const url = `${API_ENDPOINTS.ORDER}/${orderId}/status?status=cancelled`;

    cancelOrder({
      url: url,
      body: undefined,
    })
      .then((data) => {
        queryClient.invalidateQueries([`${API_ENDPOINTS.ORDER}/${USER_ID}`]);
      })
      .catch((error) => {
        console.error("Failed to cancel order:", error);
      });
  };

  const canCancelOrder = order.orderStatus === "confirmed";

  return (
    <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">Order #{order._id}</h3>
          <p className="text-gray-600">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <div className="flex items-center gap-2">
            {getStatusIcon(order.orderStatus)}
            <span className="font-medium capitalize">{order.status}</span>
          </div>

          {/* Cancel Order Button */}
          {canCancelOrder && (
            <button
              onClick={() => handleCancelOrder(order._id)}
              disabled={isCancelingOrder}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isCancelingOrder
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
              }`}
            >
              {isCancelingOrder ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                <>
                  <X className="w-4 h-4" />
                  Cancel Order
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="space-y-2 mb-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>${item.price_at_time.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <span>Total:</span>
          <span>${order.totalPriceWithoutTax.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
