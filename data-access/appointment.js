const { PrismaClient } = require("@prisma/client");

const { appointment: Appointment, user: User } = new PrismaClient();

const createAppointment = async ({ data }) => {
  try {
    const appointment = await Appointment.create({
      data,
    });
    return Promise.resolve(appointment);
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};

const getAppointments = async ({ id, currentDate }) => {
  try {
    const appointments = await Appointment.findMany({
      where: {
        user_id: id,
        created_at: {
          gt: currentDate,
        },
      },
      select: {
        title: true,
        agenda: true,
        user: {
          select: {
            first_name: true,
            last_name: true,
            email: true,
            mobile: true,
          },
        },
        with_user: {
          select: {
            first_name: true,
            last_name: true,
            email: true,
            mobile: true,
          },
        },
      },
    });
    return Promise.resolve(appointments);
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};

async function getAvailableUsers(datetime) {
  try {
    const users = await User.findMany({
      where: {
        NOT: {
          off_start_date: { lte: datetime },
          off_end_date: { gte: datetime },
        },
      },
      select: {
        email: true,
        first_name: true,
        last_name: true,
        mobile: true,
      },
    });
    return Promise.resolve(users);
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
}

module.exports = {
  createAppointment,
  getAppointments,
  getAvailableUsers,
};
