export const generateNewTagFromOld = ({
  oldYear,
  oldMonth,
  oldDay,
  oldItr,
  tagPrefix,
}: {
  oldYear: number;
  oldMonth: number;
  oldDay: number;
  oldItr: number;
  tagPrefix: string;
}) => {
  const curDate = new Date();
  const curDay = curDate.getDate();
  const curMonth = curDate.getMonth() + 1;
  const curYear = curDate.getFullYear();
  const newItr =
    curDay !== oldDay || oldMonth !== curMonth || oldYear !== curYear
      ? 1
      : oldItr + 1;
  return `${tagPrefix}${curYear}.${curMonth}.${curDay}.${newItr}`;
};
