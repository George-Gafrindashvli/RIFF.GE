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

function BandCard({ band, onSelectBand }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelectBand(band.id)
    }
  }

  return (
    <article
      className="bands-page-card rounded-2xl overflow-hidden cursor-pointer"
      role="button"
      tabIndex="0"
      onClick={() => onSelectBand(band.id)}
      onKeyDown={handleKeyDown}
    >
      <div className="bands-page-card__image-wrap">
        <img
          className="object-cover h-48 w-full transition-transform duration-300 hover:scale-105"
          src={band.image}
          alt={band.name}
        />
      </div>
      <div className={`bands-page-card__footer ${band.footerClass}`}>
        <h2>{band.name}</h2>
        <p>{band.cardSongs}</p>
      </div>
    </article>
  )
}

function Bands({ onSelectBand }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBands = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('ka-GE')

    if (!normalizedSearch) {
      return allBands
    }

    return allBands.filter((band) =>
      band.name.toLocaleLowerCase('ka-GE').includes(normalizedSearch),
    )
  }, [searchTerm])

  return (
    <main className="bands-page" id="bands">
      <section className="bands-page-hero">
        <div className="page-shell">
          <p className="section-eyebrow">RIFF.GE</p>
          <div className="bands-page-hero__content">
            <div>
              <h1>
                ბენდები<span>.</span>
              </h1>
              <p>
                აღმოაჩინე ქართული როკისა და ალტერნატიული სცენის ბენდები,
                აკორდები და სიმღერები ერთ სივრცეში.
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
        </div>
      </section>

      <section className="bands-page-list">
        <div className="page-shell">
          <div className="bands-page-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBands.map((band) => (
              <BandCard key={band.name} band={band} onSelectBand={onSelectBand} />
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
