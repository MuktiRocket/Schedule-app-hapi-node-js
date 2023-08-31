const Joi = require("joi");
const { formatCurrentDateTime } = require("../services/getTime-helper");

const AddRegisterValidation = {
  payload: Joi.object({
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    mobile: Joi.string()
      .required()
      .pattern(/^[0-9]{10}$/),
    password: Joi.string()
      .required()
      .min(8)
      .max(30)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      ),
  }),
};

const AddLoginValidation = {
  payload: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const updateUserValidation = {
  payload: Joi.object({
    id: Joi.number().required().min(1),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    email: Joi.string().optional(),
    mobile: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional(),
  }),
};

const SetUnavailabilityValidation = {
  payload: Joi.object({
    off_start_date: Joi.string()
      .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
      .required()
      .example(formatCurrentDateTime()),
    off_end_date: Joi.string()
      .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
      .required()
      .example(formatCurrentDateTime()),
    // off_start_time: Joi.string()
    //   .regex(/^\d{2}:\d{2}:\d{2}$/)
    //   .required()
    //   .example(formatCurrentDateTime("TIME")),
    // off_end_time: Joi.string()
    //   .regex(/^\d{2}:\d{2}:\d{2}$/)
    //   .required()
    //   .example(formatCurrentDateTime("TIME")),
  }),
};

const AddResetPasswordValidation = {
  payload: Joi.object({
    password: Joi.string().required(),
  }),
};

const AddUpdatePasswordValidation = {
  payload: Joi.object({
    password: Joi.string()
      .required()
      .min(8)
      .max(30)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      ),
  }),
};

module.exports = {
  AddRegisterValidation,
  AddLoginValidation,
  updateUserValidation,
  SetUnavailabilityValidation,
  AddResetPasswordValidation,
  AddUpdatePasswordValidation,
};
