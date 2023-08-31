function success(data, message = "Success", statusCode = 200) {
  return (res) =>
    res
      .response({
        statusCode,
        message,
        data,
      })
      .code(statusCode);
}

function error(data, message = "Error", statusCode = 500) {
  return (res) =>
    res
      .response({
        statusCode,
        message,
        data,
      })
      .code(statusCode)
      .takeover();
}

function warning(data, message = "Warning", statusCode = 203) {
  return (res) =>
    res
      .response({
        statusCode,
        message,
        data,
      })
      .code(statusCode)
      .takeover();
}

module.exports = {
  success,
  error,
  warning,
};
