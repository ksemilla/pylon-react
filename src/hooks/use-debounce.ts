import { useEffect, useState } from "react"

export const useDebounce = <T>(
  delayedItemInit: any = null,
  delay: number = 350
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [delayedItem, setDelayedItem] = useState<T>(delayedItemInit)
  const [item, setItem] = useState<T>(delayedItem)

  useEffect(() => {
    const delayFn = setTimeout(() => setDelayedItem(item), delay)
    return () => clearTimeout(delayFn)
  }, [item, delay])

  return [delayedItem, setItem]
}
