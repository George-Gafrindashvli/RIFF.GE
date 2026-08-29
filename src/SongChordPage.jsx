import { useEffect, useMemo, useState } from 'react'

const accentChords = ['Gm', 'Dm', 'A', 'Bb', 'B', 'F', 'Am', 'Em', 'C', 'G', 'E']

const chordDiagrams = {
  Gm: {
    fretLabel: '3',
    markers: ['', '', '', '', '', ''],
    barre: { fret: 1, from: 0, to: 5 },
    dots: [
      { string: 1, fret: 3 },
      { string: 2, fret: 3 },
    ],
  },
  Bb: {
    fretLabel: '1',
    markers: ['x', '', '', '', '', ''],
    barre: { fret: 1, from: 1, to: 5 },
    dots: [
      { string: 2, fret: 3 },
      { string: 3, fret: 3 },
      { string: 4, fret: 3 },
    ],
  },
  B: {
    fretLabel: '2',
    markers: ['x', '', '', '', '', ''],
    barre: { fret: 1, from: 1, to: 5 },
    dots: [
      { string: 2, fret: 3 },
      { string: 3, fret: 3 },
      { string: 4, fret: 3 },
    ],
  },
  F: {
    fretLabel: '1',
    markers: ['', '', '', '', '', ''],
    barre: { fret: 1, from: 0, to: 5 },
    dots: [
      { string: 1, fret: 3 },
      { string: 2, fret: 3 },
      { string: 3, fret: 2 },
    ],
  },
  Dm: {
    markers: ['x', 'x', 'o', '', '', ''],
    dots: [
      { string: 3, fret: 2 },
      { string: 4, fret: 3 },
      { string: 5, fret: 1 },
    ],
  },
  Am: {
    markers: ['x', 'o', '', '', '', ''],
    dots: [
      { string: 2, fret: 2 },
      { string: 3, fret: 2 },
      { string: 4, fret: 1 },
    ],
  },
  Em: {
    markers: ['o', '', '', 'o', 'o', 'o'],
    dots: [
      { string: 1, fret: 2 },
      { string: 2, fret: 2 },
    ],
  },
  C: {
    markers: ['x', '', '', 'o', '', 'o'],
    dots: [
      { string: 1, fret: 3 },
      { string: 2, fret: 2 },
      { string: 4, fret: 1 },
    ],
  },
  G: {
    markers: ['', '', 'o', 'o', 'o', ''],
    dots: [
      { string: 0, fret: 3 },
      { string: 1, fret: 2 },
      { string: 5, fret: 3 },
    ],
  },
  E: {
    markers: ['o', '', '', '', '', 'o'],
    dots: [
      { string: 1, fret: 2 },
      { string: 2, fret: 2 },
      { string: 3, fret: 1 },
    ],
  },
  A: {
    markers: ['x', 'o', '', '', '', 'o'],
    dots: [
      { string: 2, fret: 2 },
      { string: 3, fret: 2 },
      { string: 4, fret: 2 },
    ],
  },
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 10.8 12 3l9 7.8-1.3 1.5-1.2-1V20h-5.2v-5.2h-2.6V20H5.5v-8.7l-1.2 1L3 10.8Z" />
    </svg>
  )
}

function MusicNoteIcon() {
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
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function DrumIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m4 7 15-4m-3 3 3-3 1 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M5 11c0-1.4 3.1-2.5 7-2.5s7 1.1 7 2.5-3.1 2.5-7 2.5-7-1.1-7-2.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 11v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m6 4 12 15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

function HeartIcon({ filled = false }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
      <path
        d="M20.4 5.9a5.2 5.2 0 0 0-7.4 0l-1 1-1-1a5.2 5.2 0 0 0-7.4 7.4l1 1L12 21l7.4-6.7 1-1a5.2 5.2 0 0 0 0-7.4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  )
}

function ChordBadge({ chord }) {
  return <span className="chord-badge">{chord}</span>
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

function FavoriteButton({ isFavorite, onToggle, variant = 'primary' }) {
  return (
    <button
      className={`song-favorite song-favorite--${variant} ${isFavorite ? 'song-favorite--active' : ''}`}
      type="button"
      aria-pressed={isFavorite}
      onClick={onToggle}
    >
      <HeartIcon filled={isFavorite} />
      <span>საყვარელი</span>
    </button>
  )
}

function ChordDiagram({ chord }) {
  const diagram = chordDiagrams[chord] ?? {
    markers: ['', '', '', '', '', ''],
    dots: [],
  }

  const stringX = (string) => 18 + string * 14
  const fretY = (fret) => 28 + fret * 15
  const dotY = (fret) => 28 + (fret - 0.5) * 15
  const dotX = (string) => stringX(string)

  return (
    <figure className="chord-diagram">
      <figcaption>{chord}</figcaption>
      <svg viewBox="0 0 104 122" role="img" aria-label={`${chord} აკორდის დიაგრამა`}>
        {diagram.fretLabel && (
          <text className="chord-diagram__fret-label" x="7" y="51">
            {diagram.fretLabel}
          </text>
        )}
        {diagram.markers.map((marker, index) => (
          marker ? (
            <text key={`${marker}-${index}`} className="chord-diagram__marker" x={stringX(index)} y="15" textAnchor="middle">
              {marker}
            </text>
          ) : null
        ))}
        {[0, 1, 2, 3, 4, 5].map((string) => (
          <line key={`string-${string}`} x1={stringX(string)} x2={stringX(string)} y1="24" y2="99" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((fret) => (
          <line key={`fret-${fret}`} className={fret === 0 ? 'chord-diagram__nut' : ''} x1="18" x2="88" y1={fretY(fret)} y2={fretY(fret)} />
        ))}
        {diagram.barre && (
          <rect
            x={dotX(diagram.barre.from) - 6}
            y={dotY(diagram.barre.fret) - 5}
            width={dotX(diagram.barre.to) - dotX(diagram.barre.from) + 12}
            height="10"
            rx="5"
          />
        )}
        {diagram.dots.map((dot) => (
          <circle key={`${dot.string}-${dot.fret}`} cx={dotX(dot.string)} cy={dotY(dot.fret)} r="6" />
        ))}
      </svg>
    </figure>
  )
}

function LyricsBlock({ lyrics }) {
  const stanzas = useMemo(
    () => lyrics.trim().split(/\n\s*\n/).map((stanza) => stanza.split('\n')),
    [lyrics],
  )

  const isChordLine = (line) => {
    const tokens = line.trim().split(/\s+/).filter(Boolean)
    return tokens.length > 0 && tokens.every((token) => accentChords.includes(token))
  }

  const hasChordLines = stanzas.some((stanza) => stanza.some(isChordLine))
  const lyricsClassName = `lyrics-pre ${hasChordLines ? 'lyrics-pre--with-chords' : 'lyrics-pre--plain'} space-y-4`

  return (
    <div className={lyricsClassName} aria-label="სიმღერის ტექსტი და აკორდები">
      {stanzas.map((stanza, stanzaIndex) => (
        <div className="lyrics-pre__stanza" key={`stanza-${stanzaIndex}`}>
          {stanza.map((line, lineIndex) => (
            <span
              className={isChordLine(line) ? 'lyrics-pre__chords' : 'lyrics-pre__words'}
              key={`${line}-${lineIndex}`}
            >
              {line}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

function SongChordPage({ band, song, onBackToBand }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(false)

  const verseChords = getChordList(song.verseChords ?? song.chords)
  const chorusChords = getChordList(song.chorusChords ?? song.chorus)
  const hasChorusChords = chorusChords.length > 0
  const strummingPattern = song.strummingPattern ?? 'რითმი არ მოიძებნა'
  const lyrics = song.lyrics ?? ''

  useEffect(() => {
    const updatePosition = () => {
      const documentHeight = document.documentElement.scrollHeight
      const remainingScroll = documentHeight - window.innerHeight - window.scrollY
      setIsNearBottom(remainingScroll < 48)
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [])

  useEffect(() => {
    if (!isAutoScrolling) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      const remainingScroll = document.documentElement.scrollHeight - window.innerHeight - window.scrollY

      if (remainingScroll <= 2) {
        setIsAutoScrolling(false)
        return
      }

      window.scrollBy({ top: 1.25, left: 0, behavior: 'auto' })
    }, 42)

    return () => window.clearInterval(intervalId)
  }, [isAutoScrolling])

  const toggleFavorite = () => setIsFavorite((currentValue) => !currentValue)

  const handleScrollButton = () => {
    if (isAutoScrolling) {
      setIsAutoScrolling(false)
      return
    }

    if (isNearBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setIsAutoScrolling(true)
  }

  return (
    <main className="song-chord-page">
      <nav className="song-chord-breadcrumb page-shell" aria-label="Breadcrumb">
        <button type="button" onClick={() => onBackToBand(band.id)} aria-label="დაგდაგანის გვერდზე დაბრუნება">
          <span aria-hidden="true">←</span>
          <HomeIcon />
          <span>ბენდები</span>
        </button>
        <span aria-hidden="true">›</span>
        <span>{song.title}</span>
      </nav>

      <section className="song-hero-card page-shell">
        <img className="song-hero-card__bg" src={band.banner} alt="" aria-hidden="true" />
        <div className="song-hero-card__shade" />
        <div className="song-hero-card__content">
          <div className="song-hero-card__avatar">
            <img src={band.thumbnail} alt="" />
            <span>{band.name}</span>
          </div>
          <div className="song-hero-card__copy">
            <h1>{song.title}</h1>
            <p>{band.name}</p>
            <FavoriteButton isFavorite={isFavorite} onToggle={toggleFavorite} />
          </div>
        </div>
      </section>

      <section className="song-quick-info page-shell" aria-label="სიმღერის მოკლე ინფორმაცია">
        <article className="song-quick-info__item">
          <MusicNoteIcon />
          <div>
            <span>აკორდები:</span>
            <div className="song-quick-info__chords">
              {verseChords.map((chord) => (
                <ChordBadge chord={chord} key={chord} />
              ))}
            </div>
          </div>
        </article>
        <article className="song-quick-info__item">
          <MusicNoteIcon />
          <div>
            <span>მისამღერი:</span>
            {hasChorusChords ? (
              <div className="song-quick-info__chords">
                {chorusChords.map((chord) => (
                  <ChordBadge chord={chord} key={chord} />
                ))}
              </div>
            ) : (
              <p className="song-quick-info__empty">მისამღერი არ აქვს</p>
            )}
          </div>
        </article>
        <article className="song-quick-info__item song-quick-info__item--rhythm">
          <DrumIcon />
          <div>
            <span>მარჯვენა ხელის რითმი:</span>
            <strong>{strummingPattern}</strong>
          </div>
        </article>
      </section>

      <section className="song-chord-layout page-shell">
        <article className="song-lyrics-card">
          <header className="song-lyrics-card__header">
            <div>
              <MusicNoteIcon />
              <h2>{song.title}</h2>
            </div>
            <FavoriteButton isFavorite={isFavorite} onToggle={toggleFavorite} variant="compact" />
          </header>
          {lyrics ? (
            <LyricsBlock lyrics={lyrics} />
          ) : (
            <p className="song-lyrics-card__empty">ამ სიმღერის სრული ტექსტი და აკორდები მალე დაემატება.</p>
          )}
        </article>

        <aside className="song-sidebar" aria-label="აკორდების გვერდითი პანელი">
          <section className="song-sidebar-card">
            <h2>აკორდები</h2>
            <div className="chord-diagram-grid">
              {verseChords.map((chord) => (
                <ChordDiagram chord={chord} key={chord} />
              ))}
            </div>
          </section>

          {hasChorusChords && (
            <section className="song-sidebar-card song-sidebar-card--chorus">
              <h2>მისამღერი</h2>
              <div className="chorus-badges">
                {chorusChords.map((chord) => (
                  <ChordBadge chord={chord} key={chord} />
                ))}
              </div>
            </section>
          )}
        </aside>
      </section>

      <button
        className={`song-scroll-fab ${isAutoScrolling ? 'song-scroll-fab--active' : ''}`}
        type="button"
        aria-label={isAutoScrolling ? 'ავტოსქროლის შეჩერება' : isNearBottom ? 'ზემოთ დაბრუნება' : 'ავტოსქროლის დაწყება'}
        aria-pressed={isAutoScrolling}
        onClick={handleScrollButton}
      >
        {isAutoScrolling || isNearBottom ? '↑' : '↓'}
      </button>
    </main>
  )
}

export default SongChordPage
