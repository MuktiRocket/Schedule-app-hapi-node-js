const {
  registerUser,
  login,
  profileUpdate,
  setUnavailability,
  resetPassword,
  updatePassword,
} = require("../controllers/auth");
const {
  AddRegisterValidation,
  AddLoginValidation,
  updateUserValidation,
  SetUnavailabilityValidation,
  AddResetPasswordValidation,
  AddUpdatePasswordValidation,
} = require("../validations/auth");

module.exports = [
  {
    path: "/register",
    method: "post",
    options: {
      auth: false,
      handler: registerUser,
      tags: ["api", "user"],
      description: "register user",
      notes: "Register New User",
      validate: AddRegisterValidation,
    },
  },
  {
    path: "/login",
    method: "post",
    options: {
      auth: false,
      handler: login,
      tags: ["api", "user"],
      description: "login user",
      notes: "Login User",
      validate: AddLoginValidation,
    },
  },
  {
    path: "/update-profile",
    method: "post",
    options: {
      handler: profileUpdate,
      tags: ["api", "user"],
      description: "Update user",
      notes: "Update User",
      validate: updateUserValidation,
    },
  },
  {
    path: "/set-unavailable",
    method: "post",
    options: {
      handler: setUnavailability,
      tags: ["api", "user"],
      description: "Update user",
      notes: "Update User",
      validate: SetUnavailabilityValidation,
    },
  },
  {
    path: "/reset-password",
    method: "post",
    options: {
      handler: resetPassword,
      tags: ["api", "user"],
      description: "reset user",
      notes: "reset User",
      validate: AddResetPasswordValidation,
    },
  },
  {
    path: "/update-password",
    method: "post",
    options: {
      handler: updatePassword,
      tags: ["api", "user"],
      description: "update user",
      notes: "update User",
      validate: AddUpdatePasswordValidation,
    },
  },
];
