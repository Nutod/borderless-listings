import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import { parse } from 'query-string'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useListings from '../hooks/useListings'
import ListingsSearch from './ListingsSearch'
import Card from '../components/Card'

export default function Listings() {
  const listings = useListings()
  const location = useLocation()

  const locationObject = parse(location.search)

  if (locationObject.name) {
    return <ListingsSearch name={locationObject.name} />
  }

  return (
    <>
      <Helmet>
        <title>Business Directory &rarr; Listings</title>
      </Helmet>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {/* <div class="flex flex-wrap w-full mb-20">
            <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Category
              </h1>
              <div class="w-20 rounded">
                <select
                  name=""
                  id=""
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option value="">1</option>
                  <option value="">2</option>
                </select>
                <input type="email" id="email" name="email" />
              </div>
            </div>
            <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">
              <div class="flex lg:w-2/3 w-full sm:flex-row flex-col ml-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                <div class="relative flex-grow w-full">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button class="text-white bg-red-700 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                  Search
                </button>
              </div>
            </p>
          </div> */}
          <div className="flex flex-wrap -m-4">
            {listings.map(listing => (
              <Card listing={listing} to={`/listings/${listing.id}`} bg />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
