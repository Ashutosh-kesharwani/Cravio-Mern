import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useOrder from "../../hooks/order/useOrder.js";

import "./VerifyOrder.css";

const VerifyOrder = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { verifyOrder } = useOrder();

  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      navigate("/", { replace: true });
      return;
    }

    let retryCount = 0;
    const MAX_RETRIES = 5;

    const verifyPayment = async () => {
      const response = await verifyOrder(orderId);

      if (!response) {
        navigate("/", { replace: true });
        return;
      }

      if (response.paymentStatus === "paid") {
        setMessage("Payment Verified. Redirecting...");

        setTimeout(() => {
          navigate("/my-orders", {
            replace: true,
          });
        }, 1000);

        return;
      }

      if (response.paymentStatus === "failed") {
        setMessage("Payment Failed.");

        setTimeout(() => {
          navigate("/", {
            replace: true,
          });
        }, 2000);

        return;
      }

      if (response.paymentStatus === "pending" && retryCount < MAX_RETRIES) {
        retryCount++;

        setMessage(`Verifying payment... (${retryCount}/${MAX_RETRIES})`);

        setTimeout(verifyPayment, 2000);

        return;
      }

      setMessage("Payment verification timed out.");

      setTimeout(() => {
        navigate("/my-orders", {
          replace: true,
        });
      }, 2000);
    };

    verifyPayment();
  }, [navigate, searchParams, verifyOrder]);

  return (
    <section className="verify-order">
      <div className="verify-order-card">
        <div className="loader"></div>

        <h2>{message}</h2>

        <p>Please wait while we confirm your payment.</p>
      </div>
    </section>
  );
};

export default VerifyOrder;
