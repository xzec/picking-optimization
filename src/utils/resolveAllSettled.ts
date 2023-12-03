type SettledResult<Data> = [string[], Data[]]

export const resolveAllSettled = <T>(
  results: PromiseSettledResult<T>[],
): SettledResult<T> => {
  const errors = results
    .filter(
      (result): result is PromiseRejectedResult => result.status === 'rejected',
    )
    .map(({ reason }) => {
      if (reason instanceof Error) return reason.message
      if (typeof reason === 'string') return reason
      return 'undetected reason'
    })

  const data = results
    .filter(
      (result): result is PromiseFulfilledResult<T> =>
        result.status === 'fulfilled',
    )
    .map(({ value }) => value)

  return [errors, data]
}
