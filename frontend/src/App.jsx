import { Outlet, useLocation } from "react-router-dom";

import { Footer, Navbar } from "./components/index.js";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
import { CartContextProvider } from "./context/CartContextProvider.jsx";
import { FoodContextProvider } from "./context/FoodContextProvider.jsx";
import { OrderContextProvider } from "./context/OrderContextProvider.jsx";
import { ThemeProviderContext } from "./context/ThemeContextProvider.jsx";
import { WishlistContextProvider } from "./context/WishlistContextProvider.jsx";
const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <ThemeProviderContext>
      <AuthContextProvider>
        <FoodContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <OrderContextProvider>
                {isAdminRoute ? (
                  <Outlet />
                ) : (
                  <div className="app-container">
                    <Navbar />
                    <Outlet />
                    <Footer />
                  </div>
                )}
              </OrderContextProvider>
            </WishlistContextProvider>
          </CartContextProvider>
        </FoodContextProvider>
      </AuthContextProvider>
    </ThemeProviderContext>
  );
};

export default App;
