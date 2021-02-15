import { useLocalStorageState } from './useLocalStorage'

export default function useQueryListing(id) {
  const [listings] = useLocalStorageState('listings')

  const listing = listings.find(listing => listing.id === id)

  return listing
}
