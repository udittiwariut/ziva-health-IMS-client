import { Package } from "lucide-react";
import useGenericGet from "../api/useGenericGet";
import { API_ENDPOINTS } from "../utls/ApiEndPoints";
import { USER_ID } from "../utls/const";
import Loader from "../Comman/Loader";
import { OrderItems } from "./OrderItems";
import { useState } from "react";

const Order = () => {
  const [status, setOrderStatus] = useState("confirmed");

  const { data: orders, isLoading: isOrderLoading } = useGenericGet({
    url: `${API_ENDPOINTS.ORDER}/${USER_ID}?status=${status}`,
  });
  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Order History</h2>

        {/* Status Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
            Filter by status:
          </label>
          <select
            id="status-filter"
            value={status}
            onChange={handleStatusChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {isOrderLoading ? (
        <Loader />
      ) : !orders || orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No {status !== "all" ? status : ""} orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItems key={order.id || order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
