const { Schema,  model } = require("mongoose");
const { createHmac, randomBytes} = require("crypto");
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
        type: String,
        default: "/images/default.png",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
  },
  { timestamps: true },
);

userSchema.pre("save", async function(){
  const user = this;

  if(!user.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
});

userSchema.statics.matchPassword = async function(email, password) {

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User not found!");
  }

  const userProvidedHash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");


  if (user.password !== userProvidedHash) {
    throw new Error("Incorrect password!");
  }

  user.password = undefined;
  user.salt = undefined;

  return user;
};
const User = model('user', userSchema);

module.exports = User;