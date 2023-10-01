import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../CustomerPages/NotFoundPage";
import CustomerLayout from "../Layouts/CustomerLayout";
import Signup from "../CustomerPages/Signup";
import Cart from "../CustomerPages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/cart", element: <Cart /> },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
