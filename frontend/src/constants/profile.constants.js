export const PROFILE_SECTION = Object.freeze({
  PERSONAL: "personal",
  AVATAR: "avatar",
  CONTACT: "contact",
  ADDRESS: "address",
  PASSWORD: "password",
});

import { Image, Lock, MapPin, Phone, User } from "lucide-react";

export const PROFILE_SIDEBAR_ITEMS = [
  {
    id: PROFILE_SECTION.PERSONAL,
    label: "Personal Information",
    icon: User,
  },
  {
    id: PROFILE_SECTION.AVATAR,
    label: "Profile Photo",
    icon: Image,
  },
  {
    id: PROFILE_SECTION.CONTACT,
    label: "Contact Number",
    icon: Phone,
  },
  {
    id: PROFILE_SECTION.ADDRESS,
    label: "Addresses",
    icon: MapPin,
  },
  {
    id: PROFILE_SECTION.PASSWORD,
    label: "Change Password",
    icon: Lock,
  },
];
