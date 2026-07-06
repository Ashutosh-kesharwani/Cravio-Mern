import { useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import { StoreContext } from "./storeContext.js";
// Store Context Provider Func
// children -> ui component need value of storeContext
const StoreContextProvider = ({ children }) => {
  /* 
  Instead of directly using useStateHook in foodItem for storing food item got selected
  > We are going to store it in contextSpace . and we are going to store them in form of object
  > i.e when user select like salad . then it store it in form of salad.itemId:1 this way
  */
  const [cartItems, setCartItems] = useState({});
  const addToCart = (itemId) => {
    // if item got added for first time , we can know that search that item in our obj if not present -> undefined
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      // As if value >0 , then all selected item me se uss item ko find and uski count inc by 1
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  // We have stored our food list data which we have store in our assets , in our context store to use it in any component written in context provider
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
