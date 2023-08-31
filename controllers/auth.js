const { createUser, getUser, updateUser } = require("../data-access/auth");
const jwt = require("jsonwebtoken");
const { success, error } = require("../response/macros");
const {
  getHashedPassword,
  verifyHashedPassword,
} = require("../services/password");

const registerUser = async (req, h) => {
  try {
    const { first_name, last_name, email, password, mobile } = req.payload;
    const where = {
      email,
    };
    const userDetails = await getUser({
      where,
    });

    if (userDetails.email === email) {
      return error({}, "User with same email exists!")(h);
    }

    const hashedPass = await getHashedPassword(password);
    const data = {
      first_name,
      last_name,
      email,
      mobile,
      password: hashedPass,
    };

    user = await createUser({
      data,
    });

    return success({ user }, "success")(h);
  } catch (err) {
    console.log(err);
    return error({}, err)(h);
  }
};

const login = async (req, h) => {
  try {
    const { email, password } = req.payload;
    const where = {
      email,
    };
    const userDetails = await getUser({
      where,
    });

    if (!userDetails) {
      return error({}, "User not found")(h);
    }

    const getPassword = userDetails.password;
    const checkPassword = await verifyHashedPassword(password, getPassword);

    if (checkPassword) {
      delete userDetails.password;

      const token = jwt.sign(
        {
          data: { id: userDetails.id },
        },
        process.env.SECRET_KEY,
        { expiresIn: "365d" }
      );

      return success({ token, user: userDetails })(h);
    }

    return error({}, "User not found")(h);
  } catch (err) {
    return error({ err })(h);
  }
};

const profileUpdate = async (req, h) => {
  try {
    const { id } = req.payload;

    delete req.payload.id;
    const data = req.payload;

    const user = await updateUser(id, data);
    return success({ user }, "success")(h);
  } catch (err) {
    console.log(err);
    return error({}, err)(h);
  }
};

const setUnavailability = async (req, h) => {
  try {
    const { id } = req.user;
    const { off_start_date, off_end_date } = req.payload;
    const data = {
      off_start_date: new Date(off_start_date),
      off_end_date: new Date(off_end_date),
    };
    const user = await updateUser(id, data);

    return success({ user }, "success")(h);
  } catch (error) {
    console.log(error);
    return error({}, error)(h);
  }
};

const resetPassword = async (req, h) => {
  try {
    const { password } = req.payload;
    const { id } = req.user;
    const where = {
      id,
    };
    const userDetails = await getUser({
      where,
    });

    const checkPassword = await verifyHashedPassword(
      password,
      userDetails.password
    );

    return success({}, "success")(h);
  } catch (error) {
    console.log(error);
    return error({}, error)(h);
  }
};

const updatePassword = async (req, h) => {
  try {
    const { id } = req.user;
    const { password } = req.payload;
    const hashedPass = await getHashedPassword(password);
    const data = {
      password: hashedPass,
    };
    const user = await updateUser(id, data);

    return success({ user }, "success")(h);
  } catch (error) {
    console.log(error);
    return error({}, error)(h);
  }
};
module.exports = {
  registerUser,
  login,
  profileUpdate,
  setUnavailability,
  resetPassword,
  updatePassword,
};
