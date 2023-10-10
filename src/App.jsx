import { AuthProvider } from "./Auth/Auth";
import { Outlet, RouterProvider } from "react-router-dom";
import router from "./Utils/router";
import store from "./Utils/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
