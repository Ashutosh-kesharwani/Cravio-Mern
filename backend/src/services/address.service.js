import { ADDRESS_MESSAGES } from "../constants/messages.constants.js";
import ApiError from "../utils/ApiError.js";

/* 
> This address field params contains each address field
{
  label,
  receiverName,
  street,
  city,
  state,
  zipcode,
  country,
  landmark,
  isDefault,
}
*/
export const addAddress = async (user, address) => {
  if (address.isDefault) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
  }

  user.addresses.push(address);
  // save the doc
  await user.save();
};

/* 
Short Version of these lines
<user.addresses.id(addressId);

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  // Update address fields

  if (label?.trim()) address.label = label;

  if (receiverName?.trim()) address.receiverName = receiverName;

  if (street?.trim()) address.street = street;

  if (city?.trim()) address.city = city;

  if (state?.trim()) address.state = state;

  if (zipcode?.trim()) address.zipcode = zipcode;

  if (country?.trim()) address.country = country;

  if (landmark?.trim()) address.landmark = landmark;

  // Reset other field isDefault to false , if in curr req , isDef is true
  if (typeof isDefault === "boolean") {
    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }
  }

  address.isDefault = isDefault;
>
*/

export const updateAddress = async (user, addressId, data) => {
  const address = user.addresses.id(addressId);

  if (!address) {
    throw new ApiError(404, ADDRESS_MESSAGES.ADDRESS_NOT_FOUND);
  }

  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined && data[key]?.trim() !== "") {
      address[key] = data[key];
    }
  });

  if (data.isDefault) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });

    address.isDefault = true;
  }

  // save the doc
  await user.save();

  return address;
};

export const deleteAddress = async (user, addressId) => {
  const address = user.addresses.id(addressId);

  if (!address) {
    throw new ApiError(404, ADDRESS_MESSAGES.ADDRESS_NOT_FOUND);
  }
  address.deleteOne();
  // save the doc
  await user.save();
};
