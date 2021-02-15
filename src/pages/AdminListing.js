import React from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import useQueryListing from 'hooks/useQueryListing'
import NotFound from './NotFound'
import { categoryStyles } from 'components/categoryStyles'
import { DeleteListing } from '../components/DeleteListing'
import Loading from 'components/Loading'
import { delay } from 'utils/delay'
import useQueryListings from 'hooks/useQueryListings'
import useMutateListings from 'hooks/useMutateListings'

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().required(),
  websiteUrl: yup.string().url().required(),
  image: yup.string().url().required(),
  largeImage: yup.string().url().required(),
  description: yup.string().required(),
})

export const customStyles = {
  overlay: {
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    position: 'absolute',
    margin: '0 auto',
    width: '70vw',
    height: '90vh',
    overflow: 'scroll',
    top: '50%',
    transform: 'translateY(-50%)',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '10px',
  },
}

function UpdateListing({
  listing,
  closeUpdateListingModal,
  updateListingModalOpen,
}) {
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [categoriesInput, setCategoriesInput] = React.useState('')
  const listings = useQueryListings()
  const setListings = useMutateListings()
  const [categories, setCategories] = React.useState(listing.categories)
  let disabledCategoriesInput = !categoriesInput.trim().length

  const onSubmit = async data => {
    setLoading(true)

    if (!categories.length) {
      await delay()
      setLoading(false)
      closeUpdateListingModal()
      toast.error('Operation failed. Categories have to be set')
      return
    }

    setListings(
      listings.map(listing =>
        listing.id !== id
          ? listing
          : {
              ...listing,
              ...data,
              description: data.description.trim(),
              categories,
            }
      )
    )

    await delay()
    setLoading(false)
    closeUpdateListingModal()
    toast.success(`Listing ${id} was updated`)
    await delay()
    window.location.reload()
  }

  return (
    <Modal
      isOpen={updateListingModalOpen}
      style={customStyles}
      onRequestClose={closeUpdateListingModal}
    >
      <div className="rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-y-4 space-y-4 sm:px-0 items-end">
            <div className="relative w-full">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={listing.name}
                ref={register}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">Name is required</p>
              )}
            </div>
            <div className="relative w-full">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={listing.email}
                ref={register}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">Email is required</p>
              )}
            </div>
            <div className="relative w-full">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={listing.phone}
                ref={register({ required: true, minLength: 7 })}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">
                  Phone Number is required
                </p>
              )}
            </div>
            <div className="relative w-full">
              <label
                htmlFor="websiteUrl"
                className="leading-7 text-sm text-gray-600"
              >
                Website URL
              </label>
              <input
                type="text"
                id="websiteUrl"
                name="websiteUrl"
                placeholder="e.g https://google.com"
                defaultValue={listing.websiteUrl}
                ref={register}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.websiteUrl && (
                <p className="text-red-400 text-sm mt-1">
                  Website URL is required
                </p>
              )}
            </div>
            <div className="relative w-full">
              <label
                htmlFor="image"
                className="leading-7 text-sm text-gray-600"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                placeholder="e.g https://placeimg.com/160/160/any"
                defaultValue={listing.image}
                ref={register}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.image && (
                <p className="text-red-400 text-sm mt-1">
                  Image URL is required
                </p>
              )}
            </div>
            <div className="relative w-full">
              <label
                htmlFor="largeImage"
                className="leading-7 text-sm text-gray-600"
              >
                Large Image URL
              </label>
              <input
                type="text"
                id="largeImage"
                name="largeImage"
                placeholder="e.g https://placeimg.com/720/600/any"
                defaultValue={listing.largeImage}
                ref={register}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.largeImage && (
                <p className="text-red-400 text-sm mt-1">
                  Large Image URL is required
                </p>
              )}
            </div>
            <div className="relative w-full">
              <label
                htmlFor="categories"
                className="leading-7 text-sm text-gray-600"
              >
                Categories
              </label>
              <div>
                <input
                  type="text"
                  id="categories"
                  name="categories"
                  value={categoriesInput}
                  onChange={({ target }) => setCategoriesInput(target.value)}
                  className="w-full mb-2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {categories.map((category, index) => (
                  <span
                    key={category}
                    className={`${categoryStyles[index]} px-2 py-1 rounded-full mr-2 inline-flex items-center`}
                  >
                    {category}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 pl-1 cursor-pointer"
                      onClick={() =>
                        setCategories(categories =>
                          categories.filter(
                            categoryItem => categoryItem !== category
                          )
                        )
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                ))}
                <br />
                <button
                  disabled={disabledCategoriesInput}
                  className={`text-white text-sm mt-2 bg-red-700 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded ${
                    disabledCategoriesInput
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }`}
                  onClick={() => {
                    setCategories(categories =>
                      categories.concat(categoriesInput)
                    )
                    setCategoriesInput('')
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="relative w-full">
              <label
                htmlFor="description"
                className="leading-7 text-sm text-gray-600"
              >
                Description
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                defaultValue={listing.description}
                ref={register}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">
                  Description is required
                </p>
              )}
            </div>
            <button
              className={`w-full text-white bg-red-700 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg
                ${loading ? 'pointer-events-none opacity-50' : ''}`}
            >
              {loading ? <Loading /> : 'Update Listing'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

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
