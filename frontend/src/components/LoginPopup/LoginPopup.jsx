import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios.js";
import { assets } from "../../assets/frontend_assets/assets";
import { useStore } from "../../context/storeContext.js";
import "./LoginPopup.css";
const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");

  const { setUser } = useStore();

  // Loading State
  // Create a state variable to get the form data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Create a generic On change handler
  // while handle all types input , textarea , select , checkbox , except file for file we create separate
  const handleChange = (event) => {
    // get value from onChange event
    const { name, value } = event.target;

    // set data state of form
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // This must be outside try catch block
    try {
      // Login Vs SignUp Render
      // We use same component for login and signup
      // To check whether is in loggin form or signup
      // on basis of that we render the component
      // So we use currState var to tell us

      // 1. create a new instance of our constant variable
      const endpoint =
        currState === "Login" ? "/users/login" : "/users/register";
      // Send response
      // Send request
      const response = await api.post(endpoint, data);
      if (response.data.success) {
        toast.success(response.data.message);
        // if user is loggedIn then only show not on registering
        // If user register -> uske baad show login form
        // if login hi kiya then immediately loggein kara do and show user profile
        if (currState === "Login") {
          // After login set curr user , as in login response we also send user data
          setUser(response.data.data.user);
          setShowLogin(false);
        } else {
          // Registration successful → switch to Login
          setCurrState("Login");
          setData((prev) => ({
            ...prev,
            password: "",
          }));
        }
      }
    } catch (error) {
      // Always clear the password if error happens
      setData((prev) => ({
        ...prev,
        password: "",
      }));
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";
      toast.error(message);
    }
  };

  return (
    <div className="login-popup">
      <form
        encType="multipart/form-data"
        className="login-popup-container"
        onSubmit={handleSubmit}
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="cross-icon"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your name"
              required
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            required
            name="email"
            autoComplete="username"
            value={data.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            /* For login show curr , else for register show new */
            autoComplete={
              currState === "Login" ? "current-password" : "new-password"
            }
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="terms" required />
          <p>By continuing , I agree to the terms of use & privacy policy.</p>
        </div>
        {/* Show login option in signup and vice-versa */}
        {currState === "Login" ? (
          <p>
            Create a new account ?{" "}
            <span
              onClick={() => {
                setCurrState("Sign Up");
                setData((prev) => ({ ...prev, password: "" }));
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <span
              onClick={() => {
                setCurrState("Login");
                setData((prev) => ({ ...prev, password: "" }));
              }}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
