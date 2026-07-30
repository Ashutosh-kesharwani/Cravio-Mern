import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { getDashboard } from "../../services/admin.service.js";

const useDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getDashboard();

      setDashboard(response.data);

      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch dashboard."
      );

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    refreshDashboard: fetchDashboard,
  };
};

export default useDashboard;
