import { useMemo, useState } from 'react'
import { allBands } from './bandsData.js'

function BandsSearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
      <path d="M19 18c0-1.6-1.05-2.95-2.5-3.45M16.5 5.35a2.5 2.5 0 0 1 0 4.3M5 18c0-1.6 1.05-2.95 2.5-3.45M7.5 5.35a2.5 2.5 0 0 0 0 4.3" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
    </svg>
  )
}

function normalizeSearch(value) {
  return value.trim().toLocaleLowerCase('ka-GE')
}

function BandCard({ band, onSelectBand, isFeatured }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelectBand(band.id)
    }
  }

  return (
    <article
      className={isFeatured ? 'bands-page-card bands-page-card--featured' : 'bands-page-card'}
      role="button"
      tabIndex="0"
      style={{ '--band-image': `url(${band.banner})` }}
      onClick={() => onSelectBand(band.id)}
      onKeyDown={handleKeyDown}
    >
      <div className="bands-page-card__media">
        <img src={band.image} alt={band.name} />
      </div>
      <div className="bands-page-card__content">
        <p>{band.memberCount} წევრი</p>
        <h2>{band.name}</h2>
        <span>
          <UsersIcon />
          {band.cardSongs}
        </span>
      </div>
      <span className="bands-page-card__arrow" aria-hidden="true">
        <ArrowIcon />
      </span>
    </article>
  )
}

function Bands({ onSelectBand }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBands = useMemo(() => {
    const normalizedSearch = normalizeSearch(searchTerm)

    if (!normalizedSearch) {
      return allBands
    }

    return allBands.filter((band) =>
      normalizeSearch(band.name).includes(normalizedSearch),
    )
  }, [searchTerm])

  return (
    <main className="bands-page" id="bands">
      <section className="bands-page-hero">
        <div className="page-shell bands-page-hero__inner">
          <div>
            <p className="section-eyebrow">კატალოგი</p>
            <h1>
              ქართული როკ ბენდები<span>.</span>
            </h1>
            <p>
              აღმოაჩინე სცენის გამორჩეული ჯგუფები, სიმღერები და აკორდები ერთ მოქნილ სივრცეში.
            </p>
          </div>

          <form className="bands-page-search" role="search">
            <label className="sr-only" htmlFor="band-search">
              მოძებნე ბენდი
            </label>
            <input
              id="band-search"
              type="search"
              value={searchTerm}
              placeholder="მოძებნე ბენდი..."
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <BandsSearchIcon />
          </form>
        </div>
      </section>

      <section className="bands-page-list">
        <div className="page-shell">
          <div className="bands-page-grid">
            {filteredBands.map((band, index) => (
              <BandCard
                key={band.name}
                band={band}
                isFeatured={index === 0 && !searchTerm}
                onSelectBand={onSelectBand}
              />
            ))}
          </div>

          {filteredBands.length === 0 && (
            <p className="bands-page-empty">
              ამ სახელით ბენდი ვერ მოიძებნა.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Bands
