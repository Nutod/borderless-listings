import React from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import useQueryListing from 'hooks/useQueryListing'
import NotFound from './NotFound'
import { categoryStyles } from 'components/categoryStyles'
import { DeleteListing } from 'components/DeleteListing'
import { UpdateListing } from 'components/UpdateListing'


export default function Listing() {
  const { id } = useParams()
  const listing = useQueryListing(id)
  const [updateListingModalOpen, setUpdateListingModalOpen] = React.useState(
    false
  )
  const [deleteListingModalOpen, setDeleteListingModalOpen] = React.useState(
    false
  )

  const closeUpdateListingModal = () => {
    setUpdateListingModalOpen(false)
  }

  const closeDeleteListingModal = () => {
    setDeleteListingModalOpen(false)
  }

  if (!listing) {
    return <NotFound />
  }

  return (
    <>
      <Helmet>
        <title>Business Directory &rarr; Admin Listing {id}</title>
      </Helmet>

      <DeleteListing
        deleteListingModalOpen={deleteListingModalOpen}
        closeDeleteListingModal={closeDeleteListingModal}
      />

      <UpdateListing
        listing={listing}
        closeUpdateListingModal={closeUpdateListingModal}
        updateListingModalOpen={updateListingModalOpen}
      />

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={listing.largeImage}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {listing.name}
            </h1>
            <p className="mb-3 leading-relaxed">{listing.description}</p>
            <p className="mb-3 leading-relaxed">
              Phone: <span className="font-medium">{listing.phone}</span>
            </p>
            <p className="mb-3 leading-relaxed">
              Email: <span className="font-medium">{listing.email}</span>
            </p>
            <p className="mb-3 leading-relaxed">
              Website URL:{' '}
              <a
                href={listing.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="text-red-700 underline cursor-pointer"
              >
                {listing.websiteUrl}
              </a>
            </p>
            <p className="mb-3 leading-relaxed">
              Categories:{' '}
              {listing.categories.map((category, index) => (
                <span
                  key={category}
                  className={`${categoryStyles[index]} px-2 py-1 rounded-xl mx-1`}
                >
                  {category}
                </span>
              ))}
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setUpdateListingModalOpen(true)}
                className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                Update Listing
              </button>
              <button
                onClick={() => setDeleteListingModalOpen(true)}
                className="ml-4 inline-flex text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              >
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
