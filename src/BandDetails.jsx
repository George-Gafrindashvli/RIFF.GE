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

function getSongRouteId(song) {
  return song.id ?? song.title.trim().toLowerCase().replace(/\s+/g, '-')
}

function SongRow({ song, band, index }) {
  const chords = song.chords.trim().split(/\s+/)
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
      <h2>ამ ბენდის მუსიკების აკორდები ჯერ არ არის დამატებული</h2>
      <p>აკორდები მალე დაემატება.</p>
      <button type="button" onClick={onChooseBands}>
        სხვა ბენდის არჩევა
      </button>
    </div>
  )
}

function BandDetails({ band, onChooseBands }) {
  const songCountLabel = `${band.songs.length} სიმღერა`

  return (
    <main className="band-details-page">
      <nav className="band-breadcrumb page-shell" aria-label="Breadcrumb">
        <button type="button" onClick={onChooseBands}>
          <span aria-hidden="true">⌂</span>
          ბენდები
        </button>
        <span aria-hidden="true">›</span>
        <span>{band.name}</span>
      </nav>

      <section className="band-details-hero">
        <div className="band-details-hero__copy">
          <h1>{band.name}</h1>
          <p>{band.bio}</p>
          <div className="band-details-stats" aria-label="Band statistics">
            <span>👥 {band.memberCount} წევრი</span>
            <span>🎵 {songCountLabel}</span>
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
              <h2>სიმღერები</h2>
              <span aria-hidden="true" />
            </div>
            <button type="button">დალაგება: ალფაბეტურად</button>
          </div>

          {band.songs.length > 0 ? (
            <div className="song-list">
              {band.songs.map((song, index) => (
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
