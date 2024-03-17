export const getInitials = (username: string) => {
  const firstName = username.split(' ')[0];
  const lastName = username.split(' ')[1];

  return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase() || ''}`;
};

export const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }).map((_, i) => i + start);

export const getPaginationRange = (
  totalPages: number,
  page: number,
  siblings: number
) => {
  const arrTotal = 7 + siblings;

  if (arrTotal >= totalPages) {
    //return a range with no dots
    return range(1, totalPages + 1);
  }

  const leftSibblingIndex = Math.max(page - siblings, 1);
  const showLeftDots = leftSibblingIndex > 2;

  const rightSibblingIndex = Math.min(page + siblings, totalPages);
  const showRightDots = rightSibblingIndex < totalPages - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemsCount = 3 + 2 * siblings;
    const leftRange = range(1, leftItemsCount);

    return [...leftRange, ' ...', totalPages];
  } else if (showLeftDots && !showRightDots) {
    const rightItemsCount = 3 + 2 * siblings;
    const rightRange = range(totalPages - rightItemsCount + 1, totalPages);

    return [1, '... ', ...rightRange];
  } else {
    const middleRange = range(leftSibblingIndex, rightSibblingIndex);
    return [1, '... ', ...middleRange, ' ...', totalPages];
  }
};
