import { Order } from './Table.types';

export function descendingComparator(a: any, b: any, orderBy: keyof any) {
  const sortByA = orderBy === 'flag' ? a[orderBy].value : a[orderBy];
  const sortByB = orderBy === 'flag' ? b[orderBy].value : b[orderBy];
  if (sortByB < sortByA) {
    return -1;
  }
  if (sortByB > sortByA) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}
