const { createHash, randomBytes, createHmac } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profileImageUrl: {
      type: String,
      default: "/images/avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHash("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not Found !!");
  const salt = user.salt;
  const hashedPassword = user.password;
  const userProvidedhash = createHash("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== userProvidedhash)
    throw new Error("Invalid Credentials !!");

  return { ...user._doc, password: undefined, salt: undefined };
});

const User = model("user", userSchema);

module.exports = User;
