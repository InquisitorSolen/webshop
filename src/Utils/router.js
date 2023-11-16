import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../UtilPages/NotFoundPage";
import ShopLayout from "../Layouts/ShopLayout";
import Signup from "../CustomerPages/Signup";
import Cart from "../CustomerPages/CartPage/Cart";
import Profile from "../CustomerPages/Profile";
import Orders from "../AdminPages/Orders";
import ProductsCalls from "../AdminPages/ProductsCalls";
import ProductPageCalls from "../CustomerPages/ProductPage/ProductPageCalls";
import Users from "../AdminPages/Users";
import CartOrder from "../CustomerPages/CartPage/CartOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      { path: "/cart", element: <Cart /> },
      { path: "/cart/order", element: <CartOrder /> },
      { path: "/profile", element: <Profile /> },
      { path: "/product/*", element: <ProductPageCalls /> },
      { path: "/admin/products", element: <ProductsCalls /> },
      { path: "/admin/orders", element: <Orders /> },
      { path: "/admin/users", element: <Users /> },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
