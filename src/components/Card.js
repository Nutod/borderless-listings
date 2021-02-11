import { Link } from 'react-router-dom'
import { categoryStyles } from './categoryStyles'

export default function Card({ listing, to, bg }) {
  const { name, description, image, categories } = listing

  return (
    <div class="xl:w-1/4 md:w-1/2 p-4">
      <div class={`p-6 rounded-lg ${bg ? `bg-gray-100` : ''}`}>
        <img
          class="h-40 rounded w-full object-cover object-center mb-4"
          src={image}
          alt="content"
        />
        <h3 class="tracking-widest text-xs font-medium title-font flex mb-2">
          {categories.slice(0, 2).map((category, index) => (
            <span
              className={`${categoryStyles[index]} px-2 py-1 rounded-xl mr-2`}
            >
              {category}
            </span>
          ))}
        </h3>
        <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
          {name}
        </h2>
        <p class="leading-relaxed text-base mb-4">
          {`${description.substring(0, 100)}...`}
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
