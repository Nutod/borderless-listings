import { useLocalStorageState } from './useLocalStorage'

export default function useListings() {
  const [listings] = useLocalStorageState('listings')

  return listings
}
