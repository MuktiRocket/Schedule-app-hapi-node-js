const { PrismaClient } = require("@prisma/client");

const { user: User } = new PrismaClient();

const createUser = async ({ data }) => {
  try {
    const user = await User.create({
      data,
    });
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};

const getUser = async ({ where }) => {
  try {
    const user = await User.findFirst({
      where,
    });
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.update({
      where: {
        id,
      },
      data,
    });
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};

module.exports = { createUser, getUser, updateUser };
