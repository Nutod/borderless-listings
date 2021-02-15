import React from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { categoryStyles } from 'components/categoryStyles'
import useMutateListings from 'hooks/useMutateListings'
import useQueryListings from 'hooks/useQueryListings'
import { delay } from 'utils/delay'
import { Redirect } from 'react-router-dom'
import Loading from 'components/Loading'

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().required(),
  websiteUrl: yup.string().url().required(),
  image: yup.string().url().required(),
  largeImage: yup.string().url().required(),
  description: yup.string().required(),
})

export default function AdminListingsAdd() {
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })
  const [categories, setCategories] = React.useState([])
  const [categoriesInput, setCategoriesInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false)
  const listings = useQueryListings()
  const setListings = useMutateListings()

  let disabledCategoriesInput = !categoriesInput.trim().length

  const onSubmit = async data => {
    if (!categories.length) {
      toast.error('Categories need to be filled')
      return
    }

    setLoading(true)
    await delay()
    setListings([{ ...data, categories, id: Date.now() }, ...listings])

    setLoading(false)
    toast.success('New listing was successfully added')
    await delay()
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to="/admin/listings" />
  }

  return (
    <>
      <Helmet>
        <title>Business Directory &rarr; Admin Add Listings</title>
      </Helmet>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="w-full mb-6">
            <h1 className="lg:w-2/3 mx-auto leading-relaxed text-base title-font font-medium sm:text-3xl text-2xl text-gray-900">
              Add New Listing
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-y-4 space-y-4 sm:px-0 items-end">
              <div className="relative w-full">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  ref={register({ required: true })}
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
                  ref={register({ required: true })}
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
                  ref={register({ required: true })}
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
                  ref={register({ required: true })}
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
                  ref={register({ required: true })}
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
                <div className="">
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
                  ref={register({ required: true })}
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
                {loading ? <Loading /> : 'Add Listing'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
