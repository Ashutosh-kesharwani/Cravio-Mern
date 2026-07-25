import { useState } from "react";
import toast from "react-hot-toast";

import { AUTH_MODE } from "../../constants/auth.constants.js";

import { useAuthStore } from "../../context/authContext.js";

import { resetPassword } from "../../services/auth.service.js";

import { validateResetPassword } from "../../validators/auth.validator.js";

/* ---------------- Initial Form ---------------- */

const INITIAL_FORM_DATA = {
  password: "",
  confirmPassword: "",
};

const useResetPassword = () => {
  const { setAuthMode } = useAuthStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  /* ---------------- Form Change ---------------- */

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- Validation ---------------- */

  const isResetPasswordValid =
    formData.password.trim() && formData.confirmPassword.trim();

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!validateResetPassword(formData)) return;

    setIsSubmitting(true);

    try {
      const response = await resetPassword({
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      toast.success(response.message);

      setFormData(INITIAL_FORM_DATA);

      setAuthMode(AUTH_MODE.LOGIN);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,

    isSubmitting,

    isResetPasswordValid,

    handleChange,

    handleSubmit,
  };
};

export default useResetPassword;
