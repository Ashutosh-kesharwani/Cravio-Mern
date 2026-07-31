import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuthStore } from "../../context/authContext.js";

import {
  changeEmail,
  changeUsername,
  updateProfile,
} from "../../services/user.service.js";

import {
  validateEmail,
  validateProfile,
  validateUsername,
} from "../../validators/profile.validator.js";

const INITIAL_PROFILE = {
  firstName: "",
  lastName: "",
  dob: "",
};

const useProfile = () => {
  const { user, updateUser } = useAuthStore();

  const [formData, setFormData] = useState(INITIAL_PROFILE);

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isUsernameSubmitting, setIsUsernameSubmitting] = useState(false);

  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      dob: user.dob ? user.dob.slice(0, 10) : "",
    });

    setUsername(user.username || "");

    setEmail(user.email || "");
  }, [user]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const isProfileValid = formData.firstName.trim();

  const isUsernameValid = username.trim();

  const isEmailValid = email.trim();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!validateProfile(formData)) return;

    setIsSubmitting(true);

    try {
      const response = await updateProfile(formData);

      updateUser(response.data);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();

    if (isUsernameSubmitting) return;

    if (!validateUsername(username)) return;

    setIsUsernameSubmitting(true);

    try {
      const response = await changeUsername({ username });

      updateUser(response.data);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update username."
      );
    } finally {
      setIsUsernameSubmitting(false);
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    if (isEmailSubmitting) return;

    if (!validateEmail(email)) return;

    setIsEmailSubmitting(true);

    try {
      const response = await changeEmail({ email });

      updateUser(response.data);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update email."
      );
    } finally {
      setIsEmailSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    isProfileValid,
    handleChange,
    handleSubmit,

    username,
    isUsernameSubmitting,
    isUsernameValid,
    handleUsernameChange,
    handleUsernameSubmit,

    email,
    isEmailSubmitting,
    isEmailValid,
    handleEmailChange,
    handleEmailSubmit,
  };
};

export default useProfile;
