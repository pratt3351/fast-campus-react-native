export const convertToDateString = (time: number) => {
  const date = new Date(time);

  const addZeroIfOneCharacter = (number: number): string => {
    if (number < 10) {
      return `0${number}`;
    }
    return number.toString();
  };

  return `${date.getFullYear()} ${addZeroIfOneCharacter(
    date.getMonth() + 1,
  )} ${addZeroIfOneCharacter(date.getDate() + 1)} ${addZeroIfOneCharacter(
    date.getHours(),
  )}:${addZeroIfOneCharacter(date.getMinutes())}`;
};
