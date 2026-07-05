import Customer from "../models/customer.model.js";
import ApiError from "../utils/ApiError.js";

interface CustomerData {
  businessId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes?: string;
}

export const createCustomer = async (
  data: CustomerData
) => {
  const customer = await Customer.create(data);

  return customer;
};

export const getCustomers = async (
  businessId: string
) => {
  return Customer.find({ businessId });
};

export const getCustomerById = async (
  businessId: string,
  customerId: string
) => {
  const customer = await Customer.findOne({
    _id: customerId,
    businessId,
  });

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  return customer;
};

export const updateCustomer = async (
  businessId: string,
  customerId: string,
  data: Partial<CustomerData>
) => {
  const customer = await Customer.findOneAndUpdate(
    {
      _id: customerId,
      businessId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  return customer;
};

export const deleteCustomer = async (
  businessId: string,
  customerId: string
) => {
  const customer = await Customer.findOneAndDelete({
    _id: customerId,
    businessId,
  });

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  return customer;
};