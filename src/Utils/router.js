import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../UtilPages/NotFoundPage";
import ShopLayout from "../Layouts/ShopLayout";
import Signup from "../CustomerPages/Signup";
import Cart from "../CustomerPages/Cart";
import Profile from "../CustomerPages/Profile";
import Finances from "../AdminPages/Finances";
import Products from "../AdminPages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      { path: "/cart", element: <Cart /> },
      { path: "/profile", element: <Profile /> },
      { path: "/admin/products", element: <Products /> },
      { path: "/admin/finances", element: <Finances /> },
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
