import { Outlet, Link } from "react-router";
import { ShoppingCart } from "lucide-react"; // example icon
import useGenericGet from "../api/useGenericGet";
import { API_ENDPOINTS } from "../utls/ApiEndPoints";
import { USER_ID } from "../utls/const";

const Layout = () => {
  const { data: cartCount, isLoading: isFeatchingCartCount } = useGenericGet({
    url: `${API_ENDPOINTS.USER}/${USER_ID}/cartCount`,
  });

  return (
    <div className="min-h-screen  bg-gray-100 w-full">
      <nav className="fixed top-0 w-full bg-white shadow-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-blue-600">ShopDemo</div>

            <div className="flex space-x-4">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg font-medium transition-colors text-gray-600 hover:text-gray-900"
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="px-4 py-2 rounded-lg font-medium transition-colors relative text-gray-600 hover:text-gray-900"
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                  {!isFeatchingCartCount && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount.count}
                    </span>
                  )}
                </div>
              </Link>
              <Link
                to="/orders"
                className="px-4 py-2 rounded-lg font-medium transition-colors text-gray-600 hover:text-gray-900"
              >
                Orders
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="p-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
