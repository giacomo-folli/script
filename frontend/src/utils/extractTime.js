export const extractTime = (dateString) => {
  const date = new Date(dateString);
  const hour = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hour}:${minutes}`;
};

function padZero(number) {
  return number.toString().padStart(2, "0");
}
