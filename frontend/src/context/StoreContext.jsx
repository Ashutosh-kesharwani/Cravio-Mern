import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios.js";
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

  // User State preserver code
  const [user, setUser] = useState(null);

  // After realoding the page if after fetching the response from curr-user
  // if it gives value user data , means abhi user ne loggedIn hi hai abhi logout nhi kiya usne
  // so uski state preserve rhne do
  // On each reload this func get executed
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // send get req at current user route
        const response = await api.get("/users/current-user");
        // If we get user then set it
        setUser(response.data.data);
        true;
      } catch {
        // if error 401 , means either user is logged out or refreshToken is expired
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  // This will run automatically when user is loggedOut or refreshToken is expired
  /* 
  Whenever axios interceptor 
  Now whenever Axios dispatches
window.dispatchEvent(new Event("auth:logout"));
this runs automatically.
  */
  useEffect(() => {
    const handleLogout = () => {
      setUser(null);

      toast.error("Session expired. Please login again.");
    };

    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  const addToCart = async (itemId) => {
    // if item got added for first time , we can know that search that item in our obj if not present -> undefined
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      // As if value >0 , then all selected item me se uss item ko find and uski count inc by 1
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // If user is authenticated means he has user data
    // Update the cartData for that user
    // Now here as we are using cookie so we dont have to explicitly pass the token in header
    // As now if we add any item in cartData then that will store in Db also , so that even when we refresh our page our data will stay maintain.
    if (user) {
      await api.post("/carts", { itemId });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (user) {
      await api.patch(`/carts/${itemId}`);
    }
  };
  const loadCartData = async () => {
    const response = await api.get("/carts");
    setCartItems(response.data.data.cartData);
  };
  // To get the food_list data from backend server db
  const [food_list, setFoodList] = useState([]);

  // Create a func to fetch the food list data from backend server
  const fetchFoodList = async () => {
    // http://localhost:5100/api/v1
    try {
      const response = await api.get("/foods");
      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.log(`Store context :: fetchFoodList :: ${error}`);
    }
  };

  // Use This Func whenever we want to laod the data from backend i.e use get req load like foodList , cartData etc
  // Create a new loadData func which will load the foodList data when we mount the component
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      await loadCartData();
    };
    loadData();
  }, []);

  // This func we used in cart file to show the subtotal of amount of all food item with quantity selected
  // This also be used to show dot in cart item icon in nav bar as if its zero means no cartItem , else show dot
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // here item is id of cartItem that we have select in menu
    for (const item in cartItems) {
      // First check if curr item is selected in cart or not
      if (cartItems[item] > 0) {
        // find curr cart item object from foodlist and use to extract the price of that food item
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // We have stored our food list data which we have store in our assets , in our context store to use it in any component written in context provider
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    user,
    setUser,
    setFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
