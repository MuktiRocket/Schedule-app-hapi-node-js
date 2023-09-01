const { getUser } = require("../data-access/auth");
const { verifyToken } = require("./auth-helper");
const { success, error } = require("../response/macros");

module.exports = () => ({
  authenticate: async (req, res) => {
    try {
      let { authorization } = req.headers;

      if (!authorization) {
        return error({}, "User is not authorized.")(res);
      }
      authorization =
        authorization.split(" ")[0] === "Basic"
          ? ""
          : authorization.split(" ")[1];

      const { data } = verifyToken(authorization);

      if (!data) {
        return error({}, "Invalid token. Please login!")(res);
      }
      const where = {
        id: data?.id,
      };
      const userDetails = await getUser({ where, select: { id: true } });

      if (!userDetails) {
        return error({}, "User is not authorized.")(res);
      }
      req.user = userDetails;
      return res.continue;
    } catch (err) {
      return new Error(err.message);
    }
  },
});
