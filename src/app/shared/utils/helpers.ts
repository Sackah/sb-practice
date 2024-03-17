export const getInitials = (username: string) => {
  const firstName = username.split(' ')[0];
  const lastName = username.split(' ')[1];

  return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase() || ''}`;
};
