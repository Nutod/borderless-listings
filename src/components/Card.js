import { Link } from 'react-router-dom'

export default function Card({ listing, to }) {
  //   const {} = props

  return (
    <div class="xl:w-1/4 md:w-1/2 p-4">
      <div class="p-6 rounded-lg">
        <img
          class="h-40 rounded w-full object-cover object-center mb-6"
          src="https://dummyimage.com/720x400"
          alt="content"
        />
        <h3 class="tracking-widest text-red-700 text-xs font-medium title-font">
          CATEGORY
        </h3>
        <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
          Chichen Itza
        </h2>
        <p class="leading-relaxed text-base mb-4">
          Fingerstache flexitarian street art 8-bit waistcoat. Distillery
          hexagon disrupt edison bulbche.
        </p>
        <Link to={to} className="text-red-700 inline-flex items-center">
          View Business
          <svg
            class="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}
