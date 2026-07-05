import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import Customer from "../models/customer.model.js";
import Expense from "../models/expense.model.js";

export const getDashboardData = async (businessId: string) => {
  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    totalExpenses,
    lowStockProducts,
  ] = await Promise.all([
    Product.countDocuments({ businessId }),

    Order.countDocuments({ businessId }),

    Customer.countDocuments({ businessId }),

    Expense.aggregate([
      {
        $match: {
          businessId: Product.db.base.Types.ObjectId.createFromHexString(
            businessId
          ),
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

    Product.countDocuments({
      businessId,
      $expr: {
        $lte: ["$stock", "$lowStockAlert"],
      },
    }),
  ]);

  return {
    kpis: {
        totalRevenue: 0,
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

    recentOrders: [],

    recentActivity: [],
    };
};