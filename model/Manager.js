import mongoose from "mongoose";

const managerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    salary: String,
    designation: String,
    phone: String,
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Manager", managerSchema);
