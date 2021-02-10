import { useLocalStorageState } from './useLocalStorage'

export default function useListing(id) {
  const [listings] = useLocalStorageState('listings')

  const listing = listings.find(listing => listing.id === id)

  return listing
}
