import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  ORDER_STATUS_OPTIONS,
  getOrderStatus,
} from "../../../constants/order.constants";

const OrderStatus = ({ order, loading, updateOrderStatus }) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const currentStatus = getOrderStatus(order.orderStatus);
  const CurrentIcon = currentStatus.icon;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = (status) => {
    if (status === order.orderStatus) {
      setOpen(false);
      return;
    }

    updateOrderStatus(order._id, status);

    setOpen(false);
  };

  return (
    <footer className="admin-order-footer">
      <div className="current-status">
        <span className="footer-label">Current Status</span>

        <div className="status-pill" style={{ color: currentStatus.color }}>
          <CurrentIcon size={18} />
          <span>{currentStatus.label}</span>
        </div>
      </div>

      <div className="status-dropdown" ref={dropdownRef}>
        <span className="footer-label">Change Status</span>

        <button
          className="status-dropdown-btn"
          disabled={loading.updateOrderStatus}
          onClick={() => setOpen(!open)}
        >
          {loading.updateOrderStatus ? (
            <>
              <Loader2 size={18} className="spin" />
              Updating...
            </>
          ) : (
            <>
              <span>{currentStatus.label}</span>

              <ChevronDown size={18} className={open ? "rotate" : ""} />
            </>
          )}
        </button>

        {open && (
          <div className="status-dropdown-menu">
            {ORDER_STATUS_OPTIONS.map((status) => {
              const Icon = status.icon;

              return (
                <button
                  key={status.value}
                  className="status-option"
                  onClick={() => handleStatusChange(status.value)}
                >
                  <div
                    className="status-option-left"
                    style={{ color: status.color }}
                  >
                    <Icon size={18} />
                    <span>{status.label}</span>
                  </div>

                  {status.value === order.orderStatus && (
                    <Check size={18} className="status-check" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </footer>
  );
};

export default OrderStatus;
