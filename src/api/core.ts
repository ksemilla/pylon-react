export const apiCall = (data?: any, error?: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve({
          data,
        })
      } else {
        reject(error)
      }
    }, 1000)
  })
}
