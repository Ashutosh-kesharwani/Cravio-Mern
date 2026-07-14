import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";
import "./index.css";
import {
  Cart,
  Home,
  MyOrders,
  PlaceOrder,
  VerifyOrder,
} from "./pages/index.js";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<PlaceOrder />} />
      <Route path="/orders/verify" element={<VerifyOrder />} />
      <Route path="/my-orders" element={<MyOrders />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <ToastContainer />
    <RouterProvider router={router} />
  </StoreContextProvider>
);
