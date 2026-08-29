import { useMemo, useState } from 'react'
import { allBands } from './bandsData.js'

function BandsSearchIcon({ className = 'icon icon--sm' }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function UsersIcon({ className = 'icon icon--sm' }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
      <path d="M19 18c0-1.6-1.05-2.95-2.5-3.45M16.5 5.35a2.5 2.5 0 0 1 0 4.3M5 18c0-1.6 1.05-2.95 2.5-3.45M7.5 5.35a2.5 2.5 0 0 0 0 4.3" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function ArrowIcon({ className = 'icon icon--sm' }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
    </svg>
  )
}

function normalizeSearch(value) {
  return value.trim().toLocaleLowerCase('ka-GE')
}

function BandCard({ band, onSelectBand }) {
  return (
    <a
      className="bands-page-card"
      href={`#band/${band.id}`}
      aria-label={`${band.name} ბენდის გახსნა`}
      onClick={(event) => {
        event.preventDefault()
        onSelectBand(band.id)
      }}
    >
      <div className="bands-page-card__media">
        <img src={band.image} alt={band.name} />
      </div>
      <div className="bands-page-card__content">
        <h2>{band.name}</h2>
        <p className="bands-page-card__description">{band.bio}</p>
        <span>
          <UsersIcon className="bands-page-card__meta-icon" />
          {band.cardSongs}
        </span>
      </div>
      <span className="bands-page-card__arrow" aria-hidden="true">
        <ArrowIcon className="bands-page-card__arrow-icon" />
      </span>
    </a>
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
            <h1>ბენდები</h1>
            <p>
              აირჩიე ბენდი და გახსენი ქართული როკის აკორდები ერთ სივრცეში.
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
            <BandsSearchIcon className="bands-page-search__icon" />
          </form>
        </div>
      </section>

      <section className="bands-page-list">
        <div className="page-shell">
          <div className="bands-page-grid">
            {filteredBands.map((band) => (
              <BandCard
                key={band.id}
                band={band}
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
