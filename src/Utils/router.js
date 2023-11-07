import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../UtilPages/NotFoundPage";
import ShopLayout from "../Layouts/ShopLayout";
import Signup from "../CustomerPages/Signup";
import Cart from "../CustomerPages/Cart";
import Profile from "../CustomerPages/Profile";
import Finances from "../AdminPages/Finances";
import ProductsCalls from "../AdminPages/ProductsCalls";
import ProductPageCalls from "../CustomerPages/ProductPage/ProductPageCalls";
import Users from "../AdminPages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      { path: "/cart", element: <Cart /> },
      { path: "/profile", element: <Profile /> },
      { path: "/product/*", element: <ProductPageCalls /> },
      { path: "/admin/products", element: <ProductsCalls /> },
      { path: "/admin/finances", element: <Finances /> },
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
