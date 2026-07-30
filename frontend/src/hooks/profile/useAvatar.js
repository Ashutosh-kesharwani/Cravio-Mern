import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { useAuthStore } from "../../context/authContext.js";

import {
  changeAvatar,
  deleteAvatar,
  uploadAvatar,
} from "../../services/user.service.js";

const useAvatar = () => {
  const { user, updateUser } = useAuthStore();

  const inputRef = useRef(null);

  const [isUploading, setIsUploading] = useState(false);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsUploading(true);

    try {
      let response;

      if (user?.avatar?.url) {
        response = await changeAvatar(file);
      } else {
        response = await uploadAvatar(file);
      }

      updateUser(response.data);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload avatar."
      );
    } finally {
      setIsUploading(false);

      event.target.value = "";
    }
  };

  const handleDeleteAvatar = async () => {
    if (!user?.avatar?.url) return;

    setIsUploading(true);

    try {
      const response = await deleteAvatar();

      updateUser(response.data);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete avatar."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return {
    user,

    inputRef,

    isUploading,

    openFilePicker,

    handleAvatarChange,

    handleDeleteAvatar,
  };
};

export default useAvatar;
