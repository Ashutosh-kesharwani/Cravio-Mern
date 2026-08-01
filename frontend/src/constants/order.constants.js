import {
  BadgeCheck,
  Bike,
  ChefHat,
  CircleX,
  Clock3,
  PackageCheck,
} from "lucide-react";

export const ORDER_STATUS_OPTIONS = [
  {
    label: "Pending",
    value: "pending",
    icon: Clock3,
    color: "var(--status-pending)",
  },
  {
    label: "Confirmed",
    value: "confirmed",
    icon: BadgeCheck,
    color: "var(--status-confirmed)",
  },
  {
    label: "Processing",
    value: "processing",
    icon: ChefHat,
    color: "var(--status-processing)",
  },
  {
    label: "Out for Delivery",
    value: "out_for_delivery",
    icon: Bike,
    color: "var(--status-delivery)",
  },
  {
    label: "Delivered",
    value: "delivered",
    icon: PackageCheck,
    color: "var(--status-delivered)",
  },
  {
    label: "Cancelled",
    value: "cancelled",
    icon: CircleX,
    color: "var(--status-cancelled)",
  },
];

export const getOrderStatus = (status) =>
  ORDER_STATUS_OPTIONS.find((item) => item.value === status);

export const DELIVERY_FEE = 40;
