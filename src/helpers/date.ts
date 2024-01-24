export const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);

  return new Date(date.setDate(diff));
};

export const getEndOfWeek = (date: Date): Date => {
  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() + (6 - date.getDay()));

  return endOfWeek;
};
