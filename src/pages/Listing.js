import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useListing from '../hooks/useListing'
import NotFound from './NotFound'

export default function Listing() {
  const { id } = useParams()
  const listing = useListing(id)

  console.log(listing)

  if (!listing) {
    return <NotFound />
  }

  return (
    <>
      <Helmet>
        <title>Business Directory &rarr; Listing {id}</title>
      </Helmet>

      <Header />

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={'https://dummyimage.com/720x600'}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {listing.name}
            </h1>
            <p className="mb-3 leading-relaxed">{listing.description}</p>
            <p className="mb-3 leading-relaxed">Phone: {listing.phone}</p>
            <p className="mb-3 leading-relaxed">Email: {listing.email}</p>
            <p className="mb-3 leading-relaxed">
              Website URL:{' '}
              <span className="text-red-700 underline cursor-pointer">
                {listing.email}
              </span>
            </p>
            <p className="mb-3 leading-relaxed">Categories: {listing.email}</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
