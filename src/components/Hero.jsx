import { useState, useEffect } from 'react'

const banners = [
  {
    id: 1,
    title: 'Stranger Things',
    description: 'Di kota kecil Hawkins tahun 1980-an, sekelompok anak menghadapi kekuatan supernatural dan eksperimen pemerintah rahasia saat mencari teman mereka yang hilang di dunia paralel.',
    bgImage: 'https://image.tmdb.org/t/p/w1280/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    ageRating: '13+',
    isSeries: true,
    notification: 'TOP_10',
  },
  {
    id: 2,
    title: 'The Batman',
    description: 'Di tahun kedua memerangi kejahatan, Batman mengungkap korupsi di Gotham City yang terkait dengan keluarganya sendiri saat berhadapan dengan pembunuh berantai Riddler.',
    bgImage: 'https://image.tmdb.org/t/p/w1280/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    ageRating: '17+',
    isSeries: false,
    notification: 'FILM_BARU',
  },
  {
    id: 3,
    title: 'All of Us Are Dead',
    description: 'Para siswa terjebak di SMA yang dilanda wabah virus zombie. Mereka harus berjuang untuk bertahan hidup di dalam sekolah, atau menjadi salah satu makhluk ganas tersebut.',
    bgImage: 'https://image.tmdb.org/t/p/w1280/pTEFqAjLd5YTsMD6NSUxV6Dq7A6.jpg',
    ageRating: '17+',
    isSeries: true,
    notification: 'EPISODE_BARU',
  },
  {
    id: 4,
    title: 'Avengers: Endgame',
    description: 'Setelah peristiwa dahsyat Infinity War, Avengers yang tersisa berkumpul untuk membalikkan tindakan Thanos dan memulihkan keseimbangan di alam semesta.',
    bgImage: 'https://image.tmdb.org/t/p/w1280/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    ageRating: '13+',
    isSeries: false,
    notification: 'TRENDING',
  },
  {
    id: 5,
    title: 'Squid Game',
    description: 'Ratusan pemain yang terlilit hutang menerima undangan misterius untuk bermain game anak-anak. Hadiahnya menggiurkan, tapi taruhannya adalah nyawa mereka sendiri.',
    bgImage: 'https://image.tmdb.org/t/p/w1280/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    ageRating: '17+',
    isSeries: true,
    notification: 'TOP_10',
  },
  {
    id: 6,
    title: 'John Wick: Chapter 4',
    description: 'John Wick mencari cara untuk mengalahkan High Table. Sebelum bisa mendapatkan kebebasan, ia harus menghadapi musuh baru dengan aliansi kuat di seluruh dunia.',
    bgImage: 'https://image.tmdb.org/t/p/w1280/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    ageRating: '17+',
    isSeries: false,
    notification: 'FILM_BARU',
  },
]

function getNotificationBadge(type) {
  const badges = {
    TOP_10: {
      label: '🔥 TOP 10 HARI INI',
      bgColor: 'bg-red-600',
      textColor: 'text-white',
    },
    EPISODE_BARU: {
      label: '✨ EPISODE BARU',
      bgColor: 'bg-purple-600',
      textColor: 'text-white',
    },
    FILM_BARU: {
      label: '🎬 FILM BARU',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
    },
    TRENDING: {
      label: '📈 TRENDING',
      bgColor: 'bg-orange-500',
      textColor: 'text-white',
    },
    EKSKLUSIF: {
      label: '👑 EKSKLUSIF',
      bgColor: 'bg-yellow-500',
      textColor: 'text-black',
    },
  }
  return badges[type] || null
}

function Hero({ filterType = 'all' }) {
  const filteredBanners = banners.filter((banner) => {
    if (filterType === 'film') return !banner.isSeries
    if (filterType === 'series') return banner.isSeries
    return true
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    setCurrentIndex(0)
  }, [filterType])

  useEffect(() => {
    if (isPaused) return
    if (filteredBanners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredBanners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, filteredBanners.length])

  function nextBanner() {
    setCurrentIndex((prev) => (prev + 1) % filteredBanners.length)
  }

  function prevBanner() {
    setCurrentIndex((prev) => (prev - 1 + filteredBanners.length) % filteredBanners.length)
  }

  if (filteredBanners.length === 0) return null

  const currentBanner = filteredBanners[currentIndex]
  const notificationBadge = getNotificationBadge(currentBanner.notification)

  return (
    <section
      className="relative w-full overflow-hidden group mb-6 md:mb-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[85vh] w-full">

        {/* Background slides */}
        {filteredBanners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{
                backgroundImage: `url('${banner.bgImage}')`,
                filter: 'blur(30px) brightness(0.5)',
              }}
            />

            <div
              className="absolute inset-0 bg-no-repeat"
              style={{
                backgroundImage: `url('${banner.bgImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%',
              }}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-chill-bg via-chill-bg/40 to-chill-bg/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-chill-bg/80 via-chill-bg/30 to-transparent" />
          </div>
        ))}

        {/* Tombol navigasi */}
        {filteredBanners.length > 1 && (
          <>
            <button
              onClick={prevBanner}
              className="absolute left-2 sm:left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-95 shadow-lg ring-1 ring-white/10"
              aria-label="Banner sebelumnya"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextBanner}
              className="absolute right-2 sm:right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-95 shadow-lg ring-1 ring-white/10"
              aria-label="Banner berikutnya"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* KONTEN - UNIFIED RESPONSIVE (tampil di semua device) */}
        <div className="relative h-full flex flex-col justify-end pb-6 sm:pb-8 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-10 max-w-3xl animate-fade-up">

          {/* NOTIFICATION BADGE */}
          {notificationBadge && (
            <div
              key={`badge-${currentIndex}`}
              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded ${notificationBadge.bgColor} ${notificationBadge.textColor} text-[9px] sm:text-[10px] md:text-xs font-bold mb-1.5 sm:mb-2 md:mb-3 w-fit animate-fade-in shadow-lg`}
            >
              <span>{notificationBadge.label}</span>
            </div>
          )}

          {/* Genre Label */}
          <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-widest text-white/80 mb-1 sm:mb-1.5 md:mb-3">
            <span className="w-0.5 sm:w-1 h-2.5 sm:h-3 md:h-4 bg-white rounded-full" />
            {currentBanner.isSeries ? 'Series Original' : 'Film Original'}
          </span>

          {/* Title - RESPONSIVE SIZING */}
          <h1
            key={`title-${currentIndex}`}
            className="text-lg sm:text-2xl md:text-4xl lg:text-6xl font-bold mb-1.5 sm:mb-2 md:mb-3 leading-tight text-white animate-fade-in drop-shadow-2xl"
          >
            {currentBanner.title}
          </h1>

          {/* Deskripsi - TAMPIL DI SEMUA DEVICE */}
          <p
            key={`desc-${currentIndex}`}
            className="text-[11px] sm:text-xs md:text-sm lg:text-base text-white/80 mb-2 sm:mb-3 md:mb-4 lg:mb-6 line-clamp-2 sm:line-clamp-3 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl animate-fade-in leading-snug sm:leading-normal"
          >
            {currentBanner.description}
          </p>

          {/* Meta Info - hanya tampil di tablet ke atas */}
          <div className="hidden sm:flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-white/70 mb-3 md:mb-4">
            <span className="text-yellow-400">⭐ 4.7</span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
              {currentBanner.isSeries ? 'Series' : 'Film'}
            </span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
              Populer
            </span>
          </div>

          {/* Tombol Aksi - RESPONSIVE, SEMUA TETAP TAMPIL */}
          <div
            key={`btns-${currentIndex}`}
            className="flex flex-row items-center gap-1.5 sm:gap-2 md:gap-3 animate-fade-in flex-wrap"
          >
            {/* Tombol Mulai */}
            <button className="px-3 sm:px-5 md:px-6 lg:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-full bg-white text-black font-semibold text-[11px] sm:text-xs md:text-sm lg:text-base flex items-center gap-1 sm:gap-1.5 md:gap-2 hover:bg-gray-200 active:scale-95 transition-all shadow-lg">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Mulai
            </button>

            {/* Tombol Selengkapnya */}
            <button className="px-3 sm:px-5 md:px-6 lg:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-full bg-white/10 backdrop-blur text-white font-semibold text-[11px] sm:text-xs md:text-sm lg:text-base flex items-center gap-1 sm:gap-1.5 md:gap-2 border border-white/20 hover:bg-white/20 active:scale-95 transition-all">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Selengkapnya
            </button>

            {/* Age Rating Badge */}
            <span className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-[9px] sm:text-[10px] md:text-xs font-semibold border border-white/20">
              {currentBanner.ageRating}
            </span>
          </div>
        </div>

        {/* Tombol mute/unmute */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-6 sm:bottom-8 md:bottom-16 lg:bottom-20 right-4 sm:right-6 md:right-10 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center active:scale-95 transition-all ring-1 ring-white/30"
          aria-label={isMuted ? 'Aktifkan suara' : 'Matikan suara'}
        >
          {isMuted ? (
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l4 4m0-4l-4 4" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9" />
            </svg>
          )}
        </button>

      </div>
    </section>
  )
}

export default Hero