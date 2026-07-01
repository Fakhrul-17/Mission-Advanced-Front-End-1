import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'
import MovieSection from '../components/MovieSection'
import Footer from '../components/Footer'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import RatingModal from '../components/RatingModal'
import {
  topRating,
  filmTrending,
  rilisBaru,
  persembahanChill,
} from '../data/movies'

function Home({ wishlist, onAdd, onToggleWatched, onSetRating, onDelete, filterType = 'all' }) {

  const [hapusData, setHapusData] = useState(null)
  const [ratingFilm, setRatingFilm] = useState(null)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const section = document.getElementById(location.state.scrollTo)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [location])

  function handleHapus() {
    onDelete(hapusData.id)
    setHapusData(null)
  }

  // Filter movies berdasarkan tipe halaman
  function filterMovies(movies) {
    if (filterType === 'film') {
      return movies.filter((m) => !m.isSeries)
    }
    if (filterType === 'series') {
      return movies.filter((m) => m.isSeries)
    }
    return movies
  }

  // Apply filter ke semua section
  const filteredWishlist = filterMovies(wishlist)
  const filteredTopRating = filterMovies(topRating)
  const filteredPersembahan = filterMovies(persembahanChill)
  const filteredFilmTrending = filterMovies(filmTrending)
  const filteredRilisBaru = filterMovies(rilisBaru)

  // Title dinamis berdasarkan tipe
  const pageTitle = {
    film: 'Film',
    series: 'Series',
    all: null,
  }[filterType]

  return (
    <div className="min-h-screen bg-chill-bg">
      <Header />

      {/* Hero tampil di semua halaman, filter sesuai tipe */}
      <Hero filterType={filterType} />

      <main className="relative z-10 md:-mt-24">

        {/* Melanjutkan Tonton - tanpa badge karena ini section CRUD personal */}
        {filteredWishlist.length > 0 && (
          <MovieSection
            id="section-daftar"
            title="Melanjutkan Tonton Film"
            movies={filteredWishlist}
            enableCrud={true}
            onToggleWatched={onToggleWatched}
            onSetRating={(film) => setRatingFilm(film)}
            onDeleteFilm={setHapusData}
          />
        )}

        {/* Top Rating - badge TOP RATED biru */}
        <MovieSection
          id="section-series"
          title={`Top Rating ${pageTitle || 'Film dan Series'} Hari Ini`}
          movies={filteredTopRating}
          sectionBadge={{
            label: '🏆 TOP RATED',
            bgColor: 'bg-blue-600',
            textColor: 'text-white',
          }}
          onAddToWatchlist={onAdd}
        />

        {/* Persembahan Chill - badge PREMIUM gold gradient */}
        <MovieSection
          id="section-persembahan"
          title="Persembahan Chill"
          movies={filteredPersembahan}
          sectionBadge={{
            label: '👑 PREMIUM',
            bgColor: 'bg-gradient-to-r from-yellow-400 to-amber-500',
            textColor: 'text-black',
          }}
          onAddToWatchlist={onAdd}
        />

        {/* Film Trending - badge TRENDING merah */}
        <MovieSection
          id="section-film"
          title={`${pageTitle || 'Film'} Trending`}
          movies={filteredFilmTrending}
          sectionBadge={{
            label: '🔥 TRENDING',
            bgColor: 'bg-red-600',
            textColor: 'text-white',
          }}
          onAddToWatchlist={onAdd}
        />

        {/* Rilis Baru - badge BARU ungu */}
        <MovieSection
          title="Rilis Baru"
          movies={filteredRilisBaru}
          sectionBadge={{
            label: '✨ BARU',
            bgColor: 'bg-purple-600',
            textColor: 'text-white',
          }}
          onAddToWatchlist={onAdd}
        />
      </main>

      <Footer />

      {hapusData && (
        <ConfirmDeleteModal
          film={hapusData}
          onConfirm={handleHapus}
          onCancel={() => setHapusData(null)}
        />
      )}

      {ratingFilm && (
        <RatingModal
          film={ratingFilm}
          onRate={(rating) => onSetRating(ratingFilm.id, rating)}
          onClose={() => setRatingFilm(null)}
        />
      )}
    </div>
  )
}

export default Home