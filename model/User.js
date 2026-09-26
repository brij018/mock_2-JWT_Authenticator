import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    confirm_password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "customer", "manager"],
      default: "customer",
    },
    status: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
      default: "",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);
