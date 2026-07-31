import { useState } from "react";
import toast from "react-hot-toast";

import { changePassword } from "../../services/user.service.js";

import { validateChangePassword } from "../../validators/profile.validator.js";

const INITIAL_FORM_DATA = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const usePassword = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isPasswordValid =
    formData.currentPassword.trim() &&
    formData.newPassword.trim() &&
    formData.confirmPassword.trim();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!validateChangePassword(formData)) return;

    setIsSubmitting(true);

    try {
      const response = await changePassword(formData);

      toast.success(response.message);

      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to change password."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,

    isSubmitting,

    isPasswordValid,

    handleChange,

    handleSubmit,
  };
};

export default usePassword;
