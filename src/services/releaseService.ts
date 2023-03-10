import { generateNewTagFromOld } from '../utils/release';

const getNewReleaseTag = (
  tagPrefix: string,
  oldReleaseTag: string | null | undefined
) => {
  if (oldReleaseTag && oldReleaseTag.startsWith(tagPrefix)) {
    const [oldYear, oldMonth, oldDay, oldItr] = oldReleaseTag
      .substring(tagPrefix.length)
      .split('.')
      .map((x) => Number(x));
    return generateNewTagFromOld({
      oldYear,
      oldMonth,
      oldDay,
      oldItr,
      tagPrefix,
    });
  }
  // Handle no releases yet or prefix not matching last release
  return generateNewTagFromOld({
    oldYear: -1,
    oldMonth: -1,
    oldDay: -1,
    oldItr: -1,
    tagPrefix,
  });
};

export default getNewReleaseTag;
