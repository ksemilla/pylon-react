function getRandomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined // Return undefined for an empty array
  }

  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export const apiCall = (
  executor: (
    resolve: (value: unknown) => void,
    reject: (reason: any) => void
  ) => void
): any => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      executor(res, rej)
    }, getRandomElement([0, 100, 100, 200, 200, 200, 500, 700]))
  })
}
