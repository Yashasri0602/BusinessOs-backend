import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import Customer from "../models/customer.model.js";
import Expense from "../models/expense.model.js";

export const getDashboardData = async (businessId: string) => {
  const businessObjectId =
    Product.db.base.Types.ObjectId.createFromHexString(businessId);

  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    totalExpenses,
    totalRevenue,
    lowStockProducts,
    recentOrders,
  ] = await Promise.all([
    // Total Products
    Product.countDocuments({ businessId }),

    // Total Orders
    Order.countDocuments({ businessId }),

    // Total Customers
    Customer.countDocuments({ businessId }),

    // Total Expenses
    Expense.aggregate([
      {
        $match: {
          businessId: businessObjectId,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]),

    // Total Revenue
    Order.aggregate([
      {
        $match: {
          businessId: businessObjectId,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]),

    // Low Stock Products
    Product.countDocuments({
      businessId,
      $expr: {
        $lte: ["$stock", "$lowStockAlert"],
      },
    }),

    // Recent Orders
    Order.find({ businessId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("customerId", "name")
      .select(
        "customerId totalAmount status paymentMethod createdAt"
      ),
  ]);

  return {
    kpis: {
      totalRevenue:
        totalRevenue.length > 0
          ? totalRevenue[0].total
          : 0,

      totalProducts,

      totalOrders,

      totalCustomers,

      totalExpenses:
        totalExpenses.length > 0
          ? totalExpenses[0].total
          : 0,

      lowStockProducts,
    },

    monthlyRevenue: [],

    inventoryStatus: {
      inStock: totalProducts - lowStockProducts,
      lowStock: lowStockProducts,
      outOfStock: 0,
    },

    recentOrders,

    recentActivity: [],
  };
};