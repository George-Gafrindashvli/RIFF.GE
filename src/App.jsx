import { useEffect, useMemo, useState } from 'react'
import AboutUs from './AboutUs.jsx'
import BandDetails from './BandDetails.jsx'
import Bands from './Bands.jsx'
import SongChordPage from './SongChordPage.jsx'
import { allBands, startingBands } from './bandsData.js'
import './App.css'

import logo from './assets/logo.png'
import banner1 from './assets/ditails/banner1.jpg'
import banner2 from './assets/ditails/banner2.jpg'
import banner3 from './assets/ditails/banner3.jpg'

const banners = [banner1, banner2, banner3]

const navigationLinks = [
  { id: 'home', label: 'მთავარი', href: '#home' },
  { id: 'bands', label: 'ბენდები', href: '#bands' },
  { id: 'about', label: 'ჩვენ შესახებ', href: '#about' },
]

function SearchIcon({ className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function InstagramIcon({ className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="16" height="16" x="4" y="4" rx="4.5" stroke="currentColor" strokeWidth="2" />
      <path d="M15.5 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" stroke="currentColor" strokeWidth="2" />
      <path d="M17.4 7.1h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  )
}

function FacebookIcon({ className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.15 8.85V7.28c0-.68.45-.84.77-.84h1.96V3.08L14.18 3C11.2 3 10.52 5.22 10.52 6.64v2.21H8.12v3.52h2.4V21h3.63v-8.63h2.45l.32-3.52h-2.77Z" />
    </svg>
  )
}

function MoonIcon({ className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.57 14.24A7.42 7.42 0 0 1 9.76 3.43 8.93 8.93 0 1 0 20.57 14.24Z" />
    </svg>
  )
}

function SunIcon({ className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0-5v2m0 14v2m9-9h-2M5 12H3m15.36-6.36-1.42 1.42M7.06 16.94l-1.42 1.42m0-12.72 1.42 1.42m9.88 9.88 1.42 1.42"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function MenuIcon({ className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function CloseIcon({ className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function PickIcon({ className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.2c4.35 0 7.6 2.43 7.6 6.85 0 4.18-3.23 8.56-7.6 11.05-4.37-2.49-7.6-6.87-7.6-11.05 0-4.42 3.25-6.85 7.6-6.85Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="m8.4 10.2 3.05 3.05 4.45-5.15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

function normalizeSearch(value) {
  return value.trim().toLocaleLowerCase('ka-GE')
}

function findBestSearchRoute(searchTerm) {
  const normalizedSearch = normalizeSearch(searchTerm)

  if (!normalizedSearch) {
    return null
  }

  const matchingBand = allBands.find((band) =>
    normalizeSearch(band.name).includes(normalizedSearch),
  )

  if (matchingBand) {
    return `band/${matchingBand.id}`
  }

  for (const band of allBands) {
    const matchingSong = band.songs.find((song) =>
      normalizeSearch(song.title).includes(normalizedSearch),
    )

    if (matchingSong) {
      return `band/${band.id}/song/${encodeURIComponent(getSongRouteId(matchingSong))}`
    }
  }

  return 'bands'
}

function Header({ activePage, onNavigate }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const activeNavId = activePage === 'bandDetails' || activePage === 'songChord' ? 'bands' : activePage

  useEffect(() => {
    document.body.classList.toggle('drawer-open', isDrawerOpen)

    return () => document.body.classList.remove('drawer-open')
  }, [isDrawerOpen])

  useEffect(() => {
    setIsDrawerOpen(false)
  }, [activePage])

  const handleNavigate = (event, linkId) => {
    event.preventDefault()
    setIsDrawerOpen(false)
    onNavigate(linkId)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    const route = findBestSearchRoute(searchTerm)

    if (!route) {
      return
    }

    setIsDrawerOpen(false)
    window.location.hash = route
  }

  const navItems = navigationLinks.map((link) => (
    <a
      key={link.id}
      className={activeNavId === link.id ? 'nav-link nav-link--active' : 'nav-link'}
      href={link.href}
      onClick={(event) => handleNavigate(event, link.id)}
    >
      {link.label}
    </a>
  ))

  return (
    <header className="site-header" id="home">
      <div className="header-shell">
        <nav className="navbar" aria-label="Primary navigation">
          <a className="brand" href="#home" aria-label="RIFF.GE მთავარი" onClick={(event) => handleNavigate(event, 'home')}>
            <img src={logo} alt="RIFF.GE" />
          </a>

          <div className="nav-links nav-links--desktop">{navItems}</div>

          <div className="header-actions header-actions--desktop">
            <a className="add-chords" href="#add-chords">
              <PickIcon />
              <span>აკორდების დამატება</span>
            </a>
            <a
              className="instagram-follow"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon className="instagram-follow__icon" />
              <span>Instagram-ზე</span>
            </a>
          </div>

          <button
            className="mobile-menu-button"
            type="button"
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-navigation"
            aria-label={isDrawerOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
            onClick={() => setIsDrawerOpen((currentValue) => !currentValue)}
          >
            {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>

        <form className="search-bar" role="search" onSubmit={handleSearch}>
          <label className="sr-only" htmlFor="song-search">
            მოძებნე სიმღერა ან ბენდი
          </label>
          <input
            id="song-search"
            type="search"
            value={searchTerm}
            placeholder="მოძებნე სიმღერა ან ბენდი..."
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit" aria-label="ძიება">
            <SearchIcon className="search-icon" />
          </button>
        </form>
      </div>

      <div
        className={isDrawerOpen ? 'drawer-backdrop drawer-backdrop--open' : 'drawer-backdrop'}
        aria-hidden="true"
        onClick={() => setIsDrawerOpen(false)}
      />

      <aside
        className={isDrawerOpen ? 'mobile-drawer mobile-drawer--open' : 'mobile-drawer'}
        id="mobile-navigation"
        aria-hidden={!isDrawerOpen}
      >
        <div className="mobile-drawer__top">
          <img src={logo} alt="RIFF.GE" />
          <button type="button" aria-label="მენიუს დახურვა" onClick={() => setIsDrawerOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        <nav className="mobile-drawer__nav" aria-label="Mobile navigation">
          {navItems}
        </nav>

        <a className="add-chords add-chords--drawer" href="#add-chords" onClick={() => setIsDrawerOpen(false)}>
          <PickIcon />
          <span>აკორდების დამატება</span>
        </a>

        <a
          className="instagram-follow instagram-follow--drawer"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon className="instagram-follow__icon" />
          <span>გამოგვყევი Instagram-ზე</span>
        </a>
      </aside>
    </header>
  )
}

function HeroCarousel() {
  const [activeBanner, setActiveBanner] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveBanner((currentBanner) => (currentBanner + 1) % banners.length)
    }, 4500)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="hero-carousel" aria-label="Featured Georgian rock bands">
      {banners.map((banner, index) => (
        <img
          key={banner}
          className={index === activeBanner ? 'hero-carousel__image hero-carousel__image--active' : 'hero-carousel__image'}
          src={banner}
          alt=""
          aria-hidden={index !== activeBanner}
        />
      ))}

      <div className="hero-carousel__shade" />
      <div className="hero-carousel__content">
        <p>RIFF.GE</p>
        <h1>
          ქართული როკის აკორდები და რიფები ერთ ადგილას<span>.</span>
        </h1>
      </div>
      <div className="hero-carousel__dots" aria-hidden="true">
        {banners.map((banner, index) => (
          <span key={`${banner}-dot`} className={index === activeBanner ? 'is-active' : ''} />
        ))}
      </div>
    </section>
  )
}

function BandCard({ band, onSelectBand }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelectBand(band.id)
    }
  }

  return (
    <article
      className="band-card"
      role="button"
      tabIndex="0"
      onClick={() => onSelectBand(band.id)}
      onKeyDown={handleKeyDown}
    >
      <div className="band-card__image-wrap">
        <img src={band.image} alt={band.name} />
      </div>
      <div className={`band-card__footer ${band.homeFooterClass}`}>
        <h3>{band.name}</h3>
        <p>{band.cardSongs}</p>
      </div>
    </article>
  )
}

function StartingBands({ onSelectBand }) {
  return (
    <section className="bands-section" id="starting-bands">
      <div className="page-shell">
        <div className="section-heading">
          <p className="section-eyebrow">რჩეული</p>
          <h2>Starting bands</h2>
        </div>
        <div className="bands-grid">
          {startingBands.map((band) => (
            <BandCard key={band.name} band={band} onSelectBand={onSelectBand} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HomePage({ onSelectBand }) {
  return (
    <main>
      <HeroCarousel />
      <StartingBands onSelectBand={onSelectBand} />
    </main>
  )
}

function Footer({ isDarkMode, onToggleMode }) {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="social-links" aria-label="Social links">
          <a href="https://www.instagram.com/" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="https://www.facebook.com/" aria-label="Facebook">
            <FacebookIcon />
          </a>
        </div>

        <p className="copyright">© 2026 RIFF.GE</p>

        <button className="mode-toggle" type="button" aria-pressed={!isDarkMode} onClick={onToggleMode}>
          <span className="mode-switch" aria-hidden="true">
            <span className="mode-switch__knob">
              {isDarkMode ? <MoonIcon /> : <SunIcon />}
            </span>
          </span>
          <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>
    </footer>
  )
}

function getRouteFromHash() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#\/?/, ''))

  if (hash === 'about') {
    return { page: 'about' }
  }

  if (hash === 'bands') {
    return { page: 'bands' }
  }

  const songRouteMatch = hash.match(/^band\/([^/]+)\/song\/(.+)$/)

  if (songRouteMatch) {
    return { page: 'songChord', bandId: songRouteMatch[1], songId: songRouteMatch[2] }
  }

  if (hash.startsWith('band/')) {
    return { page: 'bandDetails', bandId: hash.replace('band/', '') }
  }

  return { page: 'home' }
}

function getSongRouteId(song) {
  return song.id ?? song.title.trim().toLowerCase().replace(/\s+/g, '-')
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleNavigate = (pageId) => {
    window.location.hash = pageId
  }

  const handleSelectBand = (bandId) => {
    window.location.hash = `band/${bandId}`
  }

  const handleBackToBand = (bandId) => {
    window.location.hash = `band/${bandId}`
  }

  const handleChooseBands = () => {
    window.location.hash = 'bands'
  }

  const selectedBand = useMemo(
    () => allBands.find((band) => band.id === route.bandId) ?? allBands[0],
    [route.bandId],
  )
  const fallbackSong = allBands[0].songs[0]
  const selectedSong = useMemo(
    () =>
      selectedBand.songs.find((song) => getSongRouteId(song) === route.songId) ??
      selectedBand.songs[0] ??
      fallbackSong,
    [fallbackSong, route.songId, selectedBand],
  )

  return (
    <div className={isDarkMode ? 'app app--dark' : 'app app--light'}>
      <Header activePage={route.page} onNavigate={handleNavigate} />
      {route.page === 'about' && <AboutUs />}
      {route.page === 'bands' && <Bands onSelectBand={handleSelectBand} />}
      {route.page === 'bandDetails' && (
        <BandDetails
          band={selectedBand}
          onChooseBands={handleChooseBands}
        />
      )}
      {route.page === 'songChord' && (
        <SongChordPage band={selectedBand} song={selectedSong} onBackToBand={handleBackToBand} />
      )}
      {route.page === 'home' && <HomePage onSelectBand={handleSelectBand} />}
      <Footer
        isDarkMode={isDarkMode}
        onToggleMode={() => setIsDarkMode((currentMode) => !currentMode)}
      />
    </div>
  )
}

export default App
