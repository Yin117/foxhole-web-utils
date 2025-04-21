// typescriptHelper

export function getObjectKeys<TKey extends string>(object: Record<TKey, unknown>) {
  return Object.keys(object) as Array<TKey>;
}

export function getObjectValues<T extends ArrayLike<T[keyof T]> | Record<keyof T, T[keyof T]>>(
  object: T,
) {
  return Object.values<T[keyof T]>(object);
}

export function getObjectEntries<
  T extends ArrayLike<T[keyof T]> |
  Record<keyof T, T[keyof T]>
>(
  object: T,
) {
  return Object.entries<T[keyof T]>(object);
}
