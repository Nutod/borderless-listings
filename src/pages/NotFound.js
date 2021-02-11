import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto my-36">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Four Oh Four!
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              The page you are trying to access does not exist. Let's help you
              navigate - click{' '}
              <Link to="/">
                <span className="underline text-red-700">here</span>
              </Link>{' '}
              to go home
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
