import Employee from "../models/employee.model.js";
import ApiError from "../utils/ApiError.js";

interface EmployeeData {
  businessId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: number;
  joiningDate: Date;
  attendance?: string;
}

export const createEmployee = async (data: EmployeeData) => {
  return Employee.create(data);
};

export const getEmployees = async (businessId: string) => {
  return Employee.find({ businessId });
};

export const getEmployeeById = async (
  businessId: string,
  employeeId: string
) => {
  const employee = await Employee.findOne({
    _id: employeeId,
    businessId,
  });

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return employee;
};

export const updateEmployee = async (
  businessId: string,
  employeeId: string,
  data: Partial<EmployeeData>
) => {
  const employee = await Employee.findOneAndUpdate(
    {
      _id: employeeId,
      businessId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return employee;
};

export const deleteEmployee = async (
  businessId: string,
  employeeId: string
) => {
  const employee = await Employee.findOneAndDelete({
    _id: employeeId,
    businessId,
  });

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return employee;
};