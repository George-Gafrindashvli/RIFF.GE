import { useMemo, useState } from 'react'

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18V5l11-2v13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 10.8 12 3.5l8.5 7.3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M5.5 10.8V20h5v-5.3h3V20h5v-9.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
      <path d="M20 18c0-1.7-1.08-3.13-2.58-3.65M16.7 5.4a2.65 2.65 0 0 1 0 4.48M4 18c0-1.7 1.08-3.13 2.58-3.65M7.3 5.4a2.65 2.65 0 0 0 0 4.48" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function SortIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 5h10M7 12h7M7 19h4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function getSongRouteId(song) {
  return song.id ?? song.title.trim().toLowerCase().replace(/\s+/g, '-')
}

function getChordList(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean)
  }

  if (typeof value === 'string') {
    return value.trim().split(/\s+/).filter(Boolean)
  }

  return []
}

function SongRow({ song, band, index }) {
  const chords = getChordList(song.verseChords ?? song.chords)
  const songHref = `#band/${band.id}/song/${encodeURIComponent(getSongRouteId(song))}`

  return (
    <a
      className="song-row"
      href={songHref}
      aria-label={`${song.title} აკორდების ნახვა`}
    >
      <span className="song-row__index">{index + 1}</span>
      <span className="song-row__play" aria-hidden="true">
        <PlayIcon />
      </span>
      <img className="song-row__thumbnail" src={band.thumbnail} alt="" />
      <div className="song-row__meta">
        <h3>{song.title}</h3>
        <p>{chords.length} აკორდი</p>
      </div>
      <div className="song-row__chords" aria-label={`აკორდები: ${chords.join(' ')}`}>
        {chords.map((chord) => (
          <span key={chord}>{chord}</span>
        ))}
      </div>
      <ChevronIcon />
    </a>
  )
}

function EmptySongs({ onChooseBands }) {
  return (
    <div className="empty-songs">
      <div className="empty-songs__icon">
        <MusicIcon />
      </div>
      <h2>ამ ბენდის სიმღერების აკორდები ჯერ არ არის დამატებული</h2>
      <p>აკორდები მალე დაემატება.</p>
      <button type="button" onClick={onChooseBands}>
        სხვა ბენდის არჩევა
      </button>
    </div>
  )
}

function BandDetails({ band, onChooseBands }) {
  const [isAlphabetical, setIsAlphabetical] = useState(false)
  const songCountLabel = `${band.songs.length} სიმღერა`
  const visibleSongs = useMemo(() => {
    if (!isAlphabetical) {
      return band.songs
    }

    return [...band.songs].sort((firstSong, secondSong) =>
      firstSong.title.localeCompare(secondSong.title, 'ka-GE'),
    )
  }, [band.songs, isAlphabetical])

  return (
    <main className="band-details-page">
      <nav className="band-breadcrumb page-shell" aria-label="Breadcrumb">
        <button type="button" onClick={onChooseBands}>
          <HomeIcon />
          <span>ბენდები</span>
        </button>
        <ChevronIcon />
        <span>{band.name}</span>
      </nav>

      <section className="band-details-hero">
        <div className="band-details-hero__copy">
          <p className="section-eyebrow">არჩეული ბენდი</p>
          <h1>{band.name}</h1>
          <p>{band.bio}</p>
          <div className="band-details-stats" aria-label="Band statistics">
            <span>
              <UsersIcon />
              {band.memberCount} წევრი
            </span>
            <span>
              <MusicIcon />
              {songCountLabel}
            </span>
          </div>
        </div>
        <div className="band-details-hero__image">
          <img src={band.banner} alt={band.name} />
        </div>
      </section>

      <section className="song-list-section">
        <div className="page-shell">
          <div className="song-list-header">
            <div>
              <p className="section-eyebrow">აკორდები</p>
              <h2>სიმღერები</h2>
            </div>
            <button type="button" onClick={() => setIsAlphabetical((currentValue) => !currentValue)}>
              <SortIcon />
              <span>{isAlphabetical ? 'საწყისი რიგი' : 'ანბანით'}</span>
            </button>
          </div>

          {visibleSongs.length > 0 ? (
            <div className="song-list">
              {visibleSongs.map((song, index) => (
                <SongRow
                  key={song.title}
                  song={song}
                  band={band}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptySongs onChooseBands={onChooseBands} />
          )}
        </div>
      </section>
    </main>
  )
}

export default BandDetails
