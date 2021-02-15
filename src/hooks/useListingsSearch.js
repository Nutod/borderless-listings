import { useLocalStorageState } from './useLocalStorage'

export default function useListingsSearch(search = '') {
  const [listings] = useLocalStorageState('listings')

  return listings.filter(listing =>
    listing.name.toLowerCase().includes(search.toLowerCase())
  )
}
