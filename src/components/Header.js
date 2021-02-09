import { Link } from 'react-router-dom'

// TODO: Add React Helmet

export default function Header() {
  return (
    <header className="text-gray-600 body-font border-b">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-blue-700 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Business Lister</span>
        </Link>

        <Link
          to="/login"
          className="inline-flex items-center bg-blue-700 text-white border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-base mt-4 md:mt-0"
        >
          Login
        </Link>
      </div>
    </header>
  )
}
