import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Loading from 'components/Loading'
import Card from 'components/Card'
import useListings from 'hooks/useListings'
import Header from 'components/Header'
import Footer from 'components/Footer'

export default function Home() {
  const [searchString, setSearchString] = React.useState('')
  const listings = useListings()

  return (
    <>
      <Helmet>
        <title>Business Directory &rarr; Home</title>
      </Helmet>

      <Header />

      <section className="text-gray-600 body-font bg-gray-100">
        <div className="container mx-auto flex flex-col px-5 py-24 pb-12 justify-center items-center">
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center sm:items-center md:items-start text-center sm:text-center md:text-left">
            <h1 className="title-font text-4xl sm:text-5xl md:text-6xl mb-4 text-gray-900">
              <span className="font-bold">
                Discover
                <br />
              </span>
              <span className="font-light">Incredible Businesses</span>
            </h1>
            <p className="mb-8 leading-relaxed">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
              harum sed, quasi illo suscipit facere quod debitis facilis
              voluptatum! Itaque.
            </p>
            <div className="flex w-full sm:justify-center md:justify-start items-end">
              <div className="relative mr-4 flex-grow lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                <input
                  type="text"
                  id="hero-field"
                  name="hero-field"
                  placeholder="Search listings"
                  onChange={({ target }) => setSearchString(target.value)}
                  className="w-full bg-white rounded focus:ring-2 focus:ring-red-200 focus:bg-transparent border border-gray-300 focus:border-red-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <Link
                className={`inline-flex text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 active:bg-red-800 rounded text-lg ${
                  searchString
                    ? `opacity-100`
                    : `opacity-50 pointer-events-none`
                }`}
                to={`/listings?name=${searchString}`}
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="title-font sm:text-4xl mb-8 text-center text-2xl mb-1 font-light text-gray-900">
            <span className="font-medium">Popular</span>
            {''} Businesses
          </h1>

          {!listings ? (
            <Loading />
          ) : (
            <div className="flex flex-wrap -m-4">
              {listings.slice(0, 4).map(listing => (
                <Card
                  key={listing.id}
                  listing={listing}
                  to={`/listings/${listing.id}`}
                />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Link
              to="/listings"
              className="inline-flex items-center bg-red-700 text-white border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-base mt-4 md:mt-0"
            >
              View More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
