export const getTimeThroughHours = (currentTime: string, hours: number) => {
  const defaultDate = new Date('01/01/1970 ' + currentTime);
  const date = new Date(defaultDate.setTime(defaultDate.getTime() + hours * 60 * 60 * 1000));

  return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
};
