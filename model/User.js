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
      enum: ["admin", "manager", "customer"],
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
  this.updated_date = new Date().toISOString();
  if (!this.isNew && !this.created_date) {
    this.created_date = new Date().toISOString();
  }

  if (
    this.isModified("password") ||
    this.isModified("confirm_password") ||
    this.isNew
  ) {
    if (this.password !== this.confirm_password) {
      const err = new Error("password and confirm_password must be same");
      if (typeof next === "function") return next(err);
      throw err;
    }
  }

  if (!this.isModified("password")) {
    if (typeof next === "function") return next();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirm_password = this.password;
  if (typeof next === "function") next();
});

export default mongoose.model("User", userSchema);
