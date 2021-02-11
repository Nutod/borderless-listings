import React from 'react'
import { useLocalStorageState } from './useLocalStorage'

export default function useCategories() {
  const [listings] = useLocalStorageState('listings')
  const [categories, setCategories] = React.useState([])

  React.useEffect(() => {
    const categoryList = []

    listings.forEach(listing => {
      categoryList.push(...listing.categories)
    })

    setCategories(Array.from(new Set(categoryList)))
  }, [listings])

  return categories
}
