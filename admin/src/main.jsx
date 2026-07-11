import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "./index.css";
import { AddFood, ListFoods, Orders } from "./pages/index.js";

//Router Config
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/add-food" element={<AddFood />} />
      <Route path="/list-food" element={<ListFoods />} />
      <Route path="/orders" element={<Orders />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>
);
