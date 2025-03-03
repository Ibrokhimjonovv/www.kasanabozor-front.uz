const formatPhone = (phone: string | number): string => {
  const phoneStr = phone.toString().padStart(9, "0");

  return `+998 (${phoneStr.slice(0, 2)}) ${phoneStr.slice(
    2,
    5
  )}-${phoneStr.slice(5, 7)}-${phoneStr.slice(7, 9)}`;
};

const normalizeDateTime = (dateInput: Date | string): string => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const pad = (num: number) => num.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export { formatPhone, normalizeDateTime };
