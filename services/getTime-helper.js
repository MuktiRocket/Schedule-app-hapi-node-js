const parseTimeStringToTimeObject = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const timeObject = new Date();

  timeObject.setHours(hours);
  timeObject.setMinutes(minutes);
  timeObject.setSeconds(seconds);

  return timeObject;
};

const formatCurrentDateTime = (format = "NONE") => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  if (format === "TIME") {
    return `${hours}:${minutes}:${seconds}`;
  } else if (format === "DATE") {
    return `${year}-${month}-${day}`;
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
};

module.exports = {
  parseTimeStringToTimeObject,
  formatCurrentDateTime,
};
