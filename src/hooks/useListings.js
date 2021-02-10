import { useLocalStorageState } from './useLocalStorage'

export default function useListings(category = 'all') {
  const [listings] = useLocalStorageState('listings')

  if (category === 'all') {
    return listings
  }
}
