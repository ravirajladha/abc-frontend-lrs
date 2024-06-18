export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
  // const formattedDate = date.toLocaleDateString();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so we add 1
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return `${formattedDate} ${formattedTime}`;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};
