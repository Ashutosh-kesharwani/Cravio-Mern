import { useCallback } from "react";
import { toast } from "react-hot-toast";

import { loginAdmin, logoutAdmin } from "../../services/admin.service.js";

import { useAuthStore } from "../../context/authContext.js";

const useAdmin = () => {
  const {
    user,
    setUser,

    isAuthenticated,

    adminLoading,
    setAdminLoading,
  } = useAuthStore();

  const handleAdminLogin = useCallback(
    async (credentials) => {
      try {
        setAdminLoading((prev) => ({
          ...prev,
          login: true,
        }));

        const response = await loginAdmin(credentials);

        setUser(response.data.user);

        toast.success(response.message);

        return response;
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to login as admin."
        );

        throw error;
      } finally {
        setAdminLoading((prev) => ({
          ...prev,
          login: false,
        }));
      }
    },
    [setUser, setAdminLoading]
  );

  const handleAdminLogout = useCallback(async () => {
    try {
      setAdminLoading((prev) => ({
        ...prev,
        logout: true,
      }));

      const response = await logoutAdmin();

      setUser(null);

      toast.success(response.message);

      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout.");

      throw error;
    } finally {
      setAdminLoading((prev) => ({
        ...prev,
        logout: false,
      }));
    }
  }, [setUser, setAdminLoading]);

  return {
    admin: user,

    isAuthenticated,

    adminLoading,

    handleAdminLogin,
    handleAdminLogout,
  };
};

export default useAdmin;
