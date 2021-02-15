import { useLocalStorageState } from './useLocalStorage'

export default function useQueryListings() {
  const [listings] = useLocalStorageState('listings')

  return listings
}
