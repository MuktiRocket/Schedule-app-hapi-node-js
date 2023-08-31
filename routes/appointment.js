const {
  bookAppoinment,
  upcomingAppointments,
  availableUsers,
} = require("../controllers/appointment");
const {
  AddAppointmentValidation,
  ScheduleAppointmentVzalidation,
} = require("../validations/appointment");

module.exports = [
  {
    path: "/book-appointment",
    method: "post",
    options: {
      handler: bookAppoinment,
      tags: ["api", "appointment"],
      description: "add appointment",
      notes: "add appointment",
      validate: AddAppointmentValidation,
    },
  },
  {
    path: "/upcoming-appointment",
    method: "get",
    options: {
      handler: upcomingAppointments,
      tags: ["api", "appointment"],
      description: "get appointment",
      notes: "get appointment",
    },
  },
  {
    path: "/get-available-users",
    method: "post",
    options: {
      handler: availableUsers,
      tags: ["api", "user"],
      description: "get users",
      notes: "get users",
      validate: ScheduleAppointmentVzalidation,
    },
  },
];
