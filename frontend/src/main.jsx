import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";
import "./index.css";
import { Cart, Home, PlaceOrder } from "./pages/index.js";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<PlaceOrder />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <RouterProvider router={router} />
  </StoreContextProvider>
);
