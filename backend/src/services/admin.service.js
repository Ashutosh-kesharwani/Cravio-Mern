import { AUTH_MESSAGES } from "../constants/messages.constants.js";
import { PAYMENT_STATUS } from "../constants/order.constants.js";

import Food from "../models/food.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";

const getExistingAdmin = async ({ email, username }) => {
  const admin = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!admin) {
    throw new ApiError(401, AUTH_MESSAGES.ADMIN_INVALID_CREDENTIALS);
  }

  if (admin.role !== "admin") {
    throw new ApiError(403, AUTH_MESSAGES.FORBIDDEN);
  }

  return admin;
};

const getSafeAdmin = async (adminId) => {
  return await User.findById(adminId).select("-password -refreshToken");
};

const getDashboardStats = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalFoods,
    totalOrders,
    totalCustomers,
    revenueResult,
    orderStatusResult,
    todayStatsResult,
  ] = await Promise.all([
    // Total Foods

    Food.countDocuments(),

    // Total Orders

    Order.countDocuments({
      paymentStatus: {
        $ne: PAYMENT_STATUS.FAILED,
      },
    }),

    // Total Customers

    User.countDocuments({
      role: "customer",
    }),

    //Total Revenue

    Order.aggregate([
      {
        $match: {
          paymentStatus: PAYMENT_STATUS.PAID,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]),

    //Order Status

    Order.aggregate([
      {
        $match: {
          paymentStatus: {
            $ne: PAYMENT_STATUS.FAILED,
          },
        },
      },
      {
        $group: {
          _id: "$orderStatus",
          count: {
            $sum: 1,
          },
        },
      },
    ]),

    // Today's Orders & Revenue

    Order.aggregate([
      {
        $match: {
          paymentStatus: PAYMENT_STATUS.PAID,
          createdAt: {
            $gte: today,
          },
        },
      },
      {
        $group: {
          _id: null,

          orders: {
            $sum: 1,
          },

          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]),
  ]);

  const orderStatus = {
    pending: 0,
    confirmed: 0,
    processing: 0,
    out_for_delivery: 0,
    delivered: 0,
    cancelled: 0,
  };

  orderStatusResult.forEach((status) => {
    orderStatus[status._id] = status.count;
  });

  const todayStats =
    todayStatsResult.length > 0
      ? todayStatsResult[0]
      : {
          orders: 0,
          revenue: 0,
        };

  return {
    stats: {
      totalFoods,
      totalOrders,
      totalCustomers,
      totalRevenue:
        revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0,
    },

    orderStatus,

    today: {
      orders: todayStats.orders,
      revenue: todayStats.revenue,
    },
  };
};

const getRecentOrders = async () => {
  return await Order.find({
    paymentStatus: {
      $ne: PAYMENT_STATUS.FAILED,
    },
  })
    .populate({
      path: "user",
      select: "firstName lastName email avatar",
    })
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .select(
      "_id totalAmount paymentStatus orderStatus createdAt deliveryAddress.firstName deliveryAddress.lastName"
    );
};

const getTopSellingFoods = async () => {
  return await Order.aggregate([
    {
      $match: {
        paymentStatus: PAYMENT_STATUS.PAID,
      },
    },

    {
      $unwind: "$items",
    },

    {
      $group: {
        _id: "$items.food",

        name: {
          $first: "$items.name",
        },

        image: {
          $first: "$items.image",
        },

        price: {
          $first: "$items.price",
        },

        totalSold: {
          $sum: "$items.quantity",
        },

        revenue: {
          $sum: {
            $multiply: ["$items.price", "$items.quantity"],
          },
        },
      },
    },

    {
      $sort: {
        totalSold: -1,
      },
    },

    {
      $limit: 5,
    },
  ]);
};

const getRevenueChart = async () => {
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  return await Order.aggregate([
    {
      $match: {
        paymentStatus: PAYMENT_STATUS.PAID,
        createdAt: {
          $gte: sevenDaysAgo,
        },
      },
    },

    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
          day: {
            $dayOfMonth: "$createdAt",
          },
        },

        revenue: {
          $sum: "$totalAmount",
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1,
      },
    },

    {
      $project: {
        _id: 0,

        day: "$_id.day",

        month: "$_id.month",

        revenue: 1,
      },
    },
  ]);
};

const getOrdersChart = async () => {
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  return await Order.aggregate([
    {
      $match: {
        paymentStatus: {
          $ne: PAYMENT_STATUS.FAILED,
        },

        createdAt: {
          $gte: sevenDaysAgo,
        },
      },
    },

    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
          day: {
            $dayOfMonth: "$createdAt",
          },
        },

        orders: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1,
      },
    },

    {
      $project: {
        _id: 0,

        day: "$_id.day",

        month: "$_id.month",

        orders: 1,
      },
    },
  ]);
};

const getDashboardData = async () => {
  const [
    dashboardStats,
    recentOrders,
    topSellingFoods,
    revenueChart,
    ordersChart,
  ] = await Promise.all([
    getDashboardStats(),

    getRecentOrders(),

    getTopSellingFoods(),

    getRevenueChart(),

    getOrdersChart(),
  ]);

  return {
    ...dashboardStats,

    recentOrders,

    topSellingFoods,

    revenueChart,

    ordersChart,
  };
};

export {
  getDashboardData,
  getDashboardStats,
  getExistingAdmin,
  getOrdersChart,
  getRecentOrders,
  getRevenueChart,
  getSafeAdmin,
  getTopSellingFoods,
};
