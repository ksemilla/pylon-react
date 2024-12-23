import { useLocation, useSearch } from "wouter"

export const useQueryParams = () => {
  const [location, setLocation] = useLocation()
  const searchString = useSearch()

  const getQueryParam = (key: string): string | null => {
    const searchParams = new URLSearchParams(searchString)
    return searchParams.get(key)
  }

  const setQueryParam = (key: string, value: string): void => {
    const searchParams = new URLSearchParams(searchString)
    searchParams.set(key, value)
    setLocation(`?${searchParams.toString()}`)
  }

  const removeQueryParam = (key: string): void => {
    const searchParams = new URLSearchParams(searchString)
    searchParams.delete(key)
    if (searchParams.size === 0) {
      setLocation("")
    } else {
      setLocation(`${location.split("?")[0]}?${searchParams.toString()}`)
    }
  }

  const setBaseQuery = ({
    set,
    remove,
  }: {
    set?: { key: string; value: string }[]
    remove?: string[]
  }): void => {
    const searchParams = new URLSearchParams(searchString)
    set?.forEach(({ key, value }) => {
      if (value) {
        searchParams.set(key, value)
      } else {
        searchParams.delete(key)
      }
    })
    remove?.forEach((key) => {
      searchParams.delete(key)
    })
    if (searchParams.size === 0) {
      setLocation("")
    } else {
      setLocation(`${location.split("?")[0]}?${searchParams.toString()}`)
    }
  }

  return { getQueryParam, setQueryParam, removeQueryParam, setBaseQuery }
}
