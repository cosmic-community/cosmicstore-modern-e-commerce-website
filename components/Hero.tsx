import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to CosmicStore
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            Discover premium products curated for modern living. From tech accessories 
            to summer essentials, find everything you need in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="inline-block bg-white text-primary-600 hover:bg-gray-100 transition-colors duration-200 px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg"
            >
              Shop Now
            </Link>
            <Link 
              href="/collections" 
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-colors duration-200 px-8 py-3 text-lg font-semibold rounded-lg"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}