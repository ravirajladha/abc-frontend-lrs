export const formatVideoTimestamp = (timestamp) => {
  const hours = Math.floor(timestamp / 3600);
  const minutes = Math.floor((timestamp % 3600) / 60);
  const seconds = Math.floor(timestamp % 60);

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours < 10 ? '0' : ''}${hours}:`;
  }

  formattedTime += `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;

  return formattedTime;
};
