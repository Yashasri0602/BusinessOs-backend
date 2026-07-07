import Business from "../models/business.model.js";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/ApiError.js";

interface RegisterBusinessData {
  businessName: string;
  ownerName: string;
  email: string;
  password: string;
  phone: string;
  industry: string;
  address: string;
}

export const registerBusiness = async (
  data: RegisterBusinessData
) => {

  const existingBusiness = await Business.findOne({
    email: data.email,
  });

  if (existingBusiness) {
    throw new ApiError(409, "Business already exists");
  }

  const business = await Business.create(data);

  const token = generateToken(
    business._id.toString()
  );

  const { password, ...businessResponse } =
    business.toObject();

  return {
    business: businessResponse,
    token,
  };
};

export const loginBusiness = async (
  email: string,
  password: string
) => {

  const business = await Business.findOne({
    email,
  }).select("+password");

  if (!business) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }

  const isPasswordValid =
    await business.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }

  const { password: _password, ...businessResponse } =
    business.toObject();

  const token = generateToken(
    business._id.toString()
  );

  return {
    business: businessResponse,
    token,
  };
};

export const getBusinessProfile = async (
  businessId: string
) => {

  const business = await Business.findById(
    businessId
  );

  if (!business) {
    throw new ApiError(
      404,
      "Business not found"
    );
  }

  return business;
};