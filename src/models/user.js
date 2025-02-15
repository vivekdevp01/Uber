const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name cannot be empty"],
    minlength: [3, "Name must be at least 3 characters long"], // Minimum length of 3 characters
    maxlength: [50, "Name cannot exceed 50 characters"], // Maximum length of 50 characters
    trim: true, // Remove extra spaces
    validate: {
      validator: function (value) {
        return /^[a-zA-Z ]+$/.test(value); // Only allows letters and spaces
      },
      message: "Name can only contain alphabets and spaces",
    },
  },
  email: {
    type: String,
    required: [true, "email cannot be empty"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v) {
        // Password must contain at least one uppercase, one lowercase, one digit, and one special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v);
      },
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    },
  },
  role: {
    type: String,
    enum: ["driver", "passenger"],
    default: "passenger",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      // required: true,
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
      // required: true,
    },
  },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
