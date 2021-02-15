import { useLocalStorageState } from './useLocalStorage'

export default function useMutateListings() {
  const [, setListings] = useLocalStorageState('listings')

  return setListings
}
