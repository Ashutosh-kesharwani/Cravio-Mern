import { ADDRESS_MESSAGES } from "../constants/messages.constants.js";
import ApiError from "../utils/ApiError.js";

const addAddress = async (user, address) => {
  if (address.isDefault) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
  }

  user.addresses.push(address);

  await user.save();
};

const updateAddress = async (user, addressId, data) => {
  const address = user.addresses.id(addressId);

  if (!address) {
    throw new ApiError(404, ADDRESS_MESSAGES.ADDRESS_NOT_FOUND);
  }

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value === undefined || value === null) return;

    if (typeof value === "string") {
      if (value.trim() === "") return;

      address[key] = value.trim();
    } else {
      address[key] = value;
    }
  });

  if (data.isDefault) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });

    address.isDefault = true;
  }

  await user.save();

  return address;
};

const deleteAddress = async (user, addressId) => {
  const address = user.addresses.id(addressId);

  if (!address) {
    throw new ApiError(404, ADDRESS_MESSAGES.ADDRESS_NOT_FOUND);
  }

  await user.save();
};

export { addAddress, deleteAddress, updateAddress };
