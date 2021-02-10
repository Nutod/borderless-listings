import { Helmet } from 'react-helmet'

// SUCCESSFUL Login will redirect to the admin page
// Otherwise, display the toast component

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Business Directory &rarr; Login</title>
      </Helmet>
      <section class="text-gray-600 body-font relative bg-gray-100 min-h-screen flex items-center">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col mx-auto p-6 rounded w-full md:py-8 mt-8 md:mt-0">
            <h2 class="text-gray-900 text-2xl text-center mb-1 font-medium title-font">
              Admin Login
            </h2>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="w-full bg-white rounded border border-gray-300 focus:border-red-700 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button class="text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
              Login
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
