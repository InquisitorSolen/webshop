import { AuthProvider } from "./Auth/Auth";
import { RouterProvider } from "react-router-dom";
import router from "./Utils/router";
import store from "./Utils/store";
import { Provider } from "react-redux";
import ShopLayout from "./Layouts/ShopLayout";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router}>
          <ShopLayout />
        </RouterProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
