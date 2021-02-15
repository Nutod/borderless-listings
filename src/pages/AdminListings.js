import React from 'react'
import { Helmet } from 'react-helmet'
import useListings from 'hooks/useQueryListings'
import Card from 'components/Card'
import useCategories from 'hooks/useCategories'

export default function AdminListings() {
  const [category, setCategory] = React.useState('all')
  const [categoryListings, setCategoryListings] = React.useState([])
  const [searchString, setSearchString] = React.useState('')

  const listings = useListings()
  const categories = useCategories()

  React.useEffect(() => {
    if (category === 'all') {
      setCategoryListings(listings)
    } else {
      setCategoryListings(
        listings.filter(listing => listing.categories.includes(category))
      )
    }
  }, [category, listings])

  React.useEffect(() => {
    setCategoryListings(
      listings.filter(
        listing =>
          listing.name.toLowerCase().includes(searchString.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchString.toLowerCase())
      )
    )
  }, [listings, searchString])

  return (
    <>
      <Helmet>
        <title>Business Directory &rarr; Admin Listings</title>
      </Helmet>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full items-center justify-between mb-10">
            <div className="lg:w-1/2 w-full flex mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Category
              </h1>
              <div className="w-40 rounded ml-6 mt-1">
                <select
                  name="category"
                  value={category}
                  onChange={({ target }) => setCategory(target.value)}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  {['all', ...categories].map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <input
                type="text"
                id="search-field"
                name="search-field"
                placeholder="Enter a search"
                value={searchString}
                onChange={e => setSearchString(e.target.value)}
                className="w-48 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-red-200 focus:bg-transparent focus:border-red-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            {categoryListings.length ? (
              categoryListings.map(listing => (
                <Card
                  key={listing.id}
                  listing={listing}
                  to={`/admin/listings/${listing.id}`}
                  bg
                />
              ))
            ) : (
              <>No results found</>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
