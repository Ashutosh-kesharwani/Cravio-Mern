import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthStore } from "../../context/authContext.js";

import {
  addAddress,
  deleteAddress,
  updateAddress,
} from "../../services/user.service.js";

import { validateAddress } from "../../validators/profile.validator.js";

const INITIAL_FORM_DATA = {
  label: "Home",
  receiverName: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "India",
  landmark: "",
  isDefault: false,
};

const useAddress = () => {
  const { user, updateUser } = useAuthStore();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [editingAddressId, setEditingAddressId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddForm = () => {
    setEditingAddressId(null);

    setFormData(INITIAL_FORM_DATA);

    setShowForm(true);
  };

  const openEditForm = (address) => {
    setEditingAddressId(address._id);

    setFormData(address);

    setShowForm(true);
  };

  const closeForm = () => {
    setEditingAddressId(null);

    setFormData(INITIAL_FORM_DATA);

    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateAddress(formData)) return;

    setIsSubmitting(true);

    try {
      let response;

      if (editingAddressId) {
        response = await updateAddress(editingAddressId, formData);
      } else {
        response = await addAddress(formData);
      }

      updateUser(response.data);

      toast.success(response.message);

      closeForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to save address."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      const response = await deleteAddress(addressId);

      updateUser(response.data);

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return {
    addresses: user?.addresses || [],

    formData,

    showForm,

    editingAddressId,

    isSubmitting,

    handleChange,

    openAddForm,

    openEditForm,

    closeForm,

    handleSubmit,

    handleDelete,
  };
};

export default useAddress;
