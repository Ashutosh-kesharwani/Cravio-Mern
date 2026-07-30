import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

import { router } from "../../../routes/Router.jsx";

const Root = () => {
  return (
    <>
      <RouterProvider router={router} />

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3000,
          removeDelay: 500,

          style: {
            background: "var(--surface)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-md)",
          },

          success: {
            iconTheme: {
              primary: "var(--success-color)",
              secondary: "var(--text-on-primary)",
            },
          },

          error: {
            iconTheme: {
              primary: "var(--danger-color)",
              secondary: "var(--text-on-primary)",
            },
          },
        }}
      />
    </>
  );
};

export default Root;
