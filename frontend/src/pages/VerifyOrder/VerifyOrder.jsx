import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios.js";
import "./VerifyOrder.css";

const VerifyOrder = () => {
  const navigate = useNavigate();

  // Read query params from URL
  // Example:
  // /orders/verify?success=true&orderId=abc123
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");

  // We only send orderId to backend.
  // Backend fetches the order and returns its latest payment status.
  const orderId = searchParams.get("orderId");

  // Maximum number of retries while waiting for Stripe webhook
  const MAX_RETRIES = 5;

  // Verify payment status from backend
  const verifyPayment = async () => {
    // Retry verification because Stripe webhook may take a few seconds
    for (let retry = 0; retry < MAX_RETRIES; retry++) {
      try {
        const response = await api.get("/orders/verify", {
          params: {
            orderId,
          },
        });

        // Retrieve latest order document
        const order = response.data.data.order;

        /*
          Scenario 1:
          Payment successful
        */
        if (order.paymentStatus === "paid") {
          toast.success("Payment Successful");
          navigate("/my-orders");
          return;
        }

        /*
          Scenario 2:
          Payment failed
        */
        if (order.paymentStatus === "failed") {
          toast.error("Payment Failed");
          navigate("/cart");
          return;
        }

        /*
          Scenario 3:
          User cancelled payment from Stripe Checkout
        */
        if (success === "false") {
          toast.error("Payment was cancelled.");
          navigate("/cart");
          return;
        }

        /*
          Scenario 4:
          Payment is still pending.
          Wait 2 seconds before trying again.
        */
        if (retry < MAX_RETRIES - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to verify payment."
        );

        navigate("/cart");
        return;
      }
    }

    /*
      If webhook still hasn't updated after all retries,
      user can check the final status later in My Orders.
    */
    toast.info("Payment is being verified. Please check My Orders shortly.");
    navigate("/my-orders");
  };

  // Execute once when component loads
  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default VerifyOrder;
