import { Link } from 'react-router-dom'
import { FaHouse } from 'react-icons/fa6'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-beige px-5">
      <div className="text-center max-w-md">
        <span className="font-display text-7xl font-semibold text-purple-200">404</span>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-purple-900 mt-4">
          Page not found
        </h1>
        <p className="text-ink/70 mt-3 leading-relaxed">
          The page you're looking for may have been moved or no longer exists.
        </p>
        <Link to="/" className="btn-primary mt-8 inline-flex">
          <FaHouse /> Back to Home
        </Link>
      </div>
    </section>
  )
}
