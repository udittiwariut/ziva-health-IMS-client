import { CheckCircle, X } from "lucide-react";

const getStatusIcon = (status) => {
  switch (status) {
    case "cancelled":
      return <X className="w-6 h-6 text-red-500 " />;
    case "confirmed":
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    default:
      return <CheckCircle className="w-4 h-4 text-gray-500" />;
  }
};

export default getStatusIcon;
