import { CheckCircle, Clock, Package, Truck } from "lucide-react";

const getStatusIcon = (status) => {
  switch (status) {
    case "processing":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "shipped":
      return <Truck className="w-4 h-4 text-blue-500" />;
    case "delivered":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    default:
      return <Package className="w-4 h-4 text-gray-500" />;
  }
};

export default getStatusIcon;
