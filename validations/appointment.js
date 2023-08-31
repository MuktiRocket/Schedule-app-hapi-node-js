const Joi = require("joi");
const { formatCurrentDateTime } = require("../services/getTime-helper");

const AddAppointmentValidation = {
  payload: Joi.object({
    title: Joi.string().required().label("Title"),
    agenda: Joi.string().required().label("Agenda"),
    user_id: Joi.number().required(),
    with_user_id: Joi.number(),
  }),
};

const ScheduleAppointmentVzalidation = {
  payload: Joi.object({
    datetime: Joi.string()
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

module.exports = {
  AddAppointmentValidation,
  ScheduleAppointmentVzalidation,
};
