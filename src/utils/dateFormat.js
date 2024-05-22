export const toLocaleFormate = (date) => {
  const d = new Date(date);
  const formated = new Intl.DateTimeFormat("fa-IR", {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(d);
  return formated;
};
