export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
};
