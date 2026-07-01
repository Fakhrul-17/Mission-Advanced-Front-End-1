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
      <div className="relative h-[45vh] md:h-[85vh] w-full">

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

            {/* Gradient overlays - dari kode lama */}
            <div className="absolute inset-0 bg-gradient-to-t from-chill-bg via-chill-bg/20 to-transparent md:via-chill-bg/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-chill-bg/60 via-chill-bg/10 to-transparent hidden md:block" />
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

        {/* KONTEN - Style dari kode lama */}
        <div className="relative h-full flex flex-col justify-end pb-5 md:pb-20 px-4 md:px-10 max-w-3xl animate-fade-up">

          {/* NOTIFICATION BADGE - dinamis per banner */}
          {notificationBadge && (
            <div
              key={`badge-${currentIndex}`}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded ${notificationBadge.bgColor} ${notificationBadge.textColor} text-[10px] md:text-xs font-bold mb-2 w-fit animate-fade-in shadow-lg`}
            >
              <span>{notificationBadge.label}</span>
            </div>
          )}

          {/* Genre Label */}
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-white/80 mb-1.5 md:mb-3">
            <span className="w-1 h-3 md:h-4 bg-white rounded-full" />
            {currentBanner.isSeries ? 'Series Original' : 'Film Original'}
          </span>

          {/* Title */}
          <h1
            key={`title-${currentIndex}`}
            className="text-xl md:text-6xl font-bold mb-2 md:mb-3 leading-tight text-white animate-fade-in drop-shadow-2xl"
          >
            {currentBanner.title}
          </h1>

          {/* Deskripsi - hanya tampil di desktop */}
          <p
            key={`desc-${currentIndex}`}
            className="hidden md:block max-w-xl text-base text-white/80 mb-6 line-clamp-3 animate-fade-in"
          >
            {currentBanner.description}
          </p>

          {/* MOBILE: 1 tombol Mulai + icon Selengkapnya + tag genre */}
          <div className="flex md:hidden items-center gap-2">
            {/* Tombol Mulai - utama */}
            <button className="px-5 py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-sm font-semibold flex items-center gap-1.5 border border-white/20 hover:bg-white/25 active:scale-95 transition-all">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Mulai
            </button>

            {/* Icon Selengkapnya (info) - circular */}
            <button className="w-9 h-9 shrink-0 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center hover:bg-black/60 active:scale-95 transition-all">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </button>

            {/* Age rating pill */}
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] border border-white/15">
              {currentBanner.ageRating}
            </span>
          </div>

          {/* DESKTOP: 2 tombol full + meta info */}
          <div className="hidden md:flex flex-col">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/70 mb-4">
              <span className="text-yellow-400">⭐ 4.7</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
                {currentBanner.isSeries ? 'Series' : 'Film'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
                Populer
              </span>
              <span className="px-1.5 py-0.5 text-[10px] border border-white/30 rounded">
                {currentBanner.ageRating}
              </span>
            </div>

            {/* Buttons desktop */}
            <div className="flex flex-row gap-3">
              <button className="px-7 py-3 rounded-full bg-white text-black font-semibold flex items-center gap-2 hover:bg-gray-200 active:scale-95 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Mulai
              </button>
              <button className="px-7 py-3 rounded-full bg-white/10 backdrop-blur text-white font-semibold flex items-center gap-2 border border-white/20 hover:bg-white/20 active:scale-95 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                Selengkapnya
              </button>
            </div>
          </div>
        </div>

        {/* Tombol mute/unmute */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-5 md:bottom-20 right-4 md:right-10 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center active:scale-95 transition-all ring-1 ring-white/30"
          aria-label={isMuted ? 'Aktifkan suara' : 'Matikan suara'}
        >
          {isMuted ? (
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l4 4m0-4l-4 4" />
            </svg>
          ) : (
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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