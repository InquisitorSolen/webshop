import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../404/NotFoundPage";
import CustomerLayout from "../Layouts/CustomerLayout";
import Signup from "../CustomerPages/Signup";
import Cart from "../CustomerPages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [{ path: "/cart", element: <Cart /> }],
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
