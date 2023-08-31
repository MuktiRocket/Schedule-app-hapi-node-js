const auth = require("./auth");
const appointment = require("./appointment");
module.exports = {
  name: "Meetings",
  version: "1.0.0",
  register: (server) => {
    server.route(auth);
    server.route(appointment);
  },
};
