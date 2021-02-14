import React from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { Redirect, useHistory } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import Loading from 'components/Loading'
import { delay } from 'utils/delay'

export default function Login() {
  const { register, errors, handleSubmit } = useForm()
  const { login, user } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = React.useState(false)

  const onSubmit = async ({ username, password }) => {
    setLoading(true)
    login({ username, password })
    await delay()
    setLoading(false)
    setTimeout(() => history.push('/admin/listings'), 2000)
    // if (
    //   username === process.env.REACT_APP_USERNAME &&
    //   password === process.env.REACT_APP_PASSWORD
    // ) {
    // } else {
    //   alert('Admin details not correct')
    //   setLoading(false)
    // }
  }

  // console.log(user)
  // console.log(authObject)

  if (user) {
    return <Redirect to="/admin/listings" />
  }

  return (
    <>
      <Helmet>
        <title>Business Directory &rarr; Login</title>
      </Helmet>

      <section className="text-gray-600 body-font relative bg-gray-100 min-h-screen flex items-center">
        <div className="container px-5 py-24 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-1/3 md:w-1/2 bg-white flex flex-col mx-auto p-6 rounded w-full md:py-8 mt-8 md:mt-0"
          >
            <h2 className="text-gray-900 text-2xl text-center mb-1 font-medium title-font">
              Admin Login
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="username"
                className="leading-7 text-sm text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                ref={register({ required: true })}
                className="w-full bg-white rounded border border-gray-300 focus:border-red-700 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">
                  Username is required
                </p>
              )}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                ref={register({ required: true })}
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg ${
                loading && 'opacity-50 pointer-events-none'
              }`}
            >
              {loading ? <Loading /> : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
