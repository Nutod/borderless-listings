import { useLocalStorageState } from './useLocalStorage'

export default function useQueryListing(id) {
  const [listings] = useLocalStorageState('listings')

  // using shallow comparison to force coercion
  // eslint-disable-next-line eqeqeq
  const listing = listings.find(listing => listing.id == id)

  return listing
}
