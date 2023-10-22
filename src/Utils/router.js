import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../UtilPages/NotFoundPage";
import ShopLayout from "../Layouts/ShopLayout";
import Signup from "../CustomerPages/Signup";
import Cart from "../CustomerPages/Cart";
import Profile from "../CustomerPages/Profile";
import Finances from "../AdminPages/Finances";
import ProductsCalls from "../AdminPages/ProductsCalls";
import ProductPage from "../CustomerPages/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      { path: "/cart", element: <Cart /> },
      { path: "/profile", element: <Profile /> },
      { path: "/product/*", element: <ProductPage /> },
      { path: "/admin/products", element: <ProductsCalls /> },
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
