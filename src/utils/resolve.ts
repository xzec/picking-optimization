type Resolved<T> = [undefined, T] | [Error, undefined]

export const resolve = <T>(promise: Promise<T>): Promise<Resolved<T>> =>
  promise
    .then((data): [undefined, T] => [undefined, data])
    .catch((error): [Error, undefined] => [error, undefined])
