import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../UtilPages/NotFoundPage";
import CustomerLayout from "../Layouts/CustomerLayout";
import AdminLayout from "../Layouts/AdminLayout";
import Signup from "../CustomerPages/Signup";
import Cart from "../CustomerPages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [{ path: "/cart", element: <Cart /> }],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [],
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
