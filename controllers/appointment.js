const {
  createAppointment,
  getAppointments,
  getAvailableUsers,
} = require("../data-access/appointment");
const { success, error } = require("../response/macros");

const bookAppoinment = async (req, h) => {
  try {
    const { title, agenda, user_id, with_user_id } = req.payload;
    const data = {
      title,
      agenda,
      user_id,
      with_user_id,
    };

    const appointment = await createAppointment({
      data,
    });

    return success({ appointment }, "success")(h);
  } catch (error) {
    console.log(error);
    return error({}, error)(h);
  }
};

const upcomingAppointments = async (req, h) => {
  try {
    const { id } = req.user;
    const currentDate = new Date();

    const appointments = await getAppointments({ id, currentDate });

    return success({ appointments }, "success")(h);
  } catch (error) {
    console.log(error);
    return error({}, error)(h);
  }
};

const availableUsers = async (req, h) => {
  try {
    const { datetime } = req.payload;
    const users = await getAvailableUsers(new Date(datetime));

    return success({ users }, "success")(h);
  } catch (error) {
    console.log(error);
    return error({}, error)(h);
  }
};
module.exports = {
  bookAppoinment,
  upcomingAppointments,
  availableUsers,
};
