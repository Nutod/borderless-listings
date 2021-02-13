import { Helmet } from 'react-helmet'
import useListingsSearch from 'hooks/useListingsSearch'
import Card from 'components/Card'
import NotFound from './NotFound'

export default function ListingsSearch({ name }) {
  const listings = useListingsSearch(name)

  if (!listings.length) {
    return (
      <NotFound
        text={`There is no search result for the query you made for resource ${name}`}
      />
    )
  }

  return (
    <>
      <Helmet>
        <title>Business Directory &rarr; Search Results</title>
      </Helmet>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {listings.map(listing => (
              <Card
                key={listing.id}
                listing={listing}
                to={`/listings/${listing.id}`}
                bg
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
