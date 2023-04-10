export function pick<T, K extends keyof T>(object: T, keys: K[]) {
  return keys.reduce((result, key) => {
    result[key] = object[key];
    return result;
  }, {} as Pick<T, K>);
}

export function pickTruthy<T, K extends keyof T>(object: T, keys: K[]) {
  return keys.reduce((result, key) => {
    if (object[key]) {
      result[key] = object[key];
    }

    return result;
  }, {} as Pick<T, K>);
}

export function getIdenticalKeys(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
) {
  return Object.keys(obj1).reduce((acc, key) => {
    if (obj2[key]) {
      acc.push(key);
    }

    return acc;
  }, [] as string[]);
}
