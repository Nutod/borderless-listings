import { Helmet } from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useListingsSearch from '../hooks/useListingsSearch'
import Card from '../components/Card'

export default function ListingsSearch({ name }) {
  const listings = useListingsSearch(name)

  console.log(listings)

  return (
    <>
      <Helmet>
        <title>Business Directory &rarr; Search Results</title>
      </Helmet>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
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
