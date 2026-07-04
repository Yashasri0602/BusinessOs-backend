import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IBusiness extends Document {
  businessName: string;
  ownerName: string;
  email: string;
  password: string;
  phone: string;
  industry: string;
  address: string;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const businessSchema = new Schema<IBusiness>(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    phone: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
businessSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
businessSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Business = mongoose.model<IBusiness>("Business", businessSchema);

export default Business;