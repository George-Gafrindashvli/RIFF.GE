import { useEffect, useMemo, useState } from 'react'

const chordTokenPattern = /^[A-G](?:#|b)?(?:m|maj|min|dim|aug|sus[24]?|add\d*)?(?:\d+)?(?:\/[A-G](?:#|b)?)?$/

const chordDiagrams = {
  A: {
    markers: ['x', 'o', '', '', '', 'o'],
    dots: [
      { string: 2, fret: 2 },
      { string: 3, fret: 2 },
      { string: 4, fret: 2 },
    ],
  },
  Am: {
    markers: ['x', 'o', '', '', '', 'o'],
    dots: [
      { string: 2, fret: 2 },
      { string: 3, fret: 2 },
      { string: 4, fret: 1 },
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
  C: {
    markers: ['x', '', '', 'o', '', 'o'],
    dots: [
      { string: 1, fret: 3 },
      { string: 2, fret: 2 },
      { string: 4, fret: 1 },
    ],
  },
  D: {
    markers: ['x', 'x', 'o', '', '', ''],
    dots: [
      { string: 3, fret: 2 },
      { string: 4, fret: 3 },
      { string: 5, fret: 2 },
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
  E: {
    markers: ['o', '', '', '', 'o', 'o'],
    dots: [
      { string: 1, fret: 2 },
      { string: 2, fret: 2 },
      { string: 3, fret: 1 },
    ],
  },
  Em: {
    markers: ['o', '', '', 'o', 'o', 'o'],
    dots: [
      { string: 1, fret: 2 },
      { string: 2, fret: 2 },
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
  G: {
    markers: ['', '', 'o', 'o', 'o', ''],
    dots: [
      { string: 0, fret: 3 },
      { string: 1, fret: 2 },
      { string: 5, fret: 3 },
    ],
  },
  Gm: {
    fretLabel: '3',
    markers: ['', '', '', '', '', ''],
    barre: { fret: 1, from: 0, to: 5 },
    dots: [
      { string: 1, fret: 3 },
      { string: 2, fret: 3 },
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
        strokeLinecap="round"
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

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.2v13.6L18.6 12 8 5.2Z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5h3.8v14H7V5Zm6.2 0H17v14h-3.8V5Z" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 10 6-6 6 6M12 4v16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m18 14-6 6-6-6M12 20V4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
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

function getUniqueChords(chords) {
  return [...new Set(chords.filter(Boolean))]
}

function isChordToken(value) {
  return chordTokenPattern.test(value)
}

function getRhythmInfo(value) {
  const rhythm = typeof value === 'string' ? value.trim() : ''
  const arrows = [...rhythm].filter((character) => character === '↓' || character === '↑')
  const isMissing = !rhythm || rhythm.includes('არ მოიძებნა')

  return {
    arrows,
    hasArrows: arrows.length > 0,
    isMissing,
    label: isMissing ? 'რითმი არ მოიძებნა' : rhythm,
  }
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
  const diagram = chordDiagrams[chord]
  const displayDiagram = diagram ?? {
    markers: ['', '', '', '', '', ''],
    dots: [
      { string: 1, fret: 2 },
      { string: 2, fret: 2 },
      { string: 3, fret: 2 },
    ],
  }

  const stringX = (string) => 30 + string * 18
  const fretY = (fret) => 42 + fret * 21
  const dotY = (fret) => 42 + (fret - 0.5) * 21
  const dotX = (string) => stringX(string)

  return (
    <figure className={diagram ? 'chord-diagram' : 'chord-diagram chord-diagram--fallback'}>
      <figcaption>{chord}</figcaption>
      <svg className="chord-diagram__svg" viewBox="0 0 150 176" role="img" aria-label={`${chord} აკორდის დიაგრამა`}>
        <rect className="chord-diagram__plate" x="12" y="8" width="126" height="158" rx="18" />
        {displayDiagram.fretLabel && (
          <text className="chord-diagram__fret-label" x="16" y="65">
            {displayDiagram.fretLabel}
          </text>
        )}
        {displayDiagram.markers.map((marker, index) => (
          marker ? (
            <text key={`${marker}-${index}`} className="chord-diagram__marker" x={stringX(index)} y="29" textAnchor="middle">
              {marker}
            </text>
          ) : null
        ))}
        {[0, 1, 2, 3, 4, 5].map((string) => (
          <line
            key={`string-${string}`}
            className={`chord-diagram__string chord-diagram__string--${string}`}
            x1={stringX(string)}
            x2={stringX(string)}
            y1="42"
            y2="147"
          />
        ))}
        {[0, 1, 2, 3, 4, 5].map((fret) => (
          <line
            key={`fret-${fret}`}
            className={fret === 0 ? 'chord-diagram__fret chord-diagram__nut' : 'chord-diagram__fret'}
            x1="30"
            x2="120"
            y1={fretY(fret)}
            y2={fretY(fret)}
          />
        ))}
        {displayDiagram.barre && (
          <rect
            className="chord-diagram__barre"
            x={dotX(displayDiagram.barre.from) - 8}
            y={dotY(displayDiagram.barre.fret) - 7}
            width={dotX(displayDiagram.barre.to) - dotX(displayDiagram.barre.from) + 16}
            height="14"
            rx="7"
          />
        )}
        {displayDiagram.dots.map((dot) => (
          <circle className="chord-diagram__dot" key={`${dot.string}-${dot.fret}`} cx={dotX(dot.string)} cy={dotY(dot.fret)} r="7" />
        ))}
        {!diagram && (
          <text className="chord-diagram__fallback-label" x="75" y="158" textAnchor="middle">
            custom
          </text>
        )}
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
    return tokens.length > 0 && tokens.every(isChordToken)
  }

  const hasChordLines = stanzas.some((stanza) => stanza.some(isChordLine))
  const lyricsClassName = `lyrics-pre ${hasChordLines ? 'lyrics-pre--with-chords' : 'lyrics-pre--plain'}`

  return (
    <div className="lyrics-scroll-shell">
      <div className={lyricsClassName} aria-label="სიმღერის ტექსტი და აკორდები">
        {stanzas.map((stanza, stanzaIndex) => (
          <div className="lyrics-pre__stanza" key={`stanza-${stanzaIndex}`}>
            {stanza.map((line, lineIndex) => (
              <span
                className={isChordLine(line) ? 'lyrics-pre__chords' : 'lyrics-pre__words'}
                key={`${stanzaIndex}-${lineIndex}`}
              >
                {line}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function RhythmDisplay({ rhythmInfo }) {
  if (rhythmInfo.hasArrows) {
    return (
      <div className="rhythm-badges" aria-label={rhythmInfo.label}>
        {rhythmInfo.arrows.map((arrow, index) => (
          <span key={`${arrow}-${index}`}>{arrow}</span>
        ))}
      </div>
    )
  }

  return <p className="song-quick-info__empty">{rhythmInfo.label}</p>
}

function SongChordPage({ band, song, onBackToBand }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(false)

  const verseChords = useMemo(() => getChordList(song.verseChords ?? song.chords), [song])
  const chorusChords = useMemo(() => getChordList(song.chorusChords ?? song.chorus), [song])
  const allSongChords = useMemo(() => getUniqueChords([...verseChords, ...chorusChords]), [chorusChords, verseChords])
  const hasChorusChords = chorusChords.length > 0
  const rhythmInfo = useMemo(() => getRhythmInfo(song.strummingPattern), [song.strummingPattern])
  const lyrics = song.lyrics ?? ''

  useEffect(() => {
    const updatePosition = () => {
      const documentHeight = document.documentElement.scrollHeight
      const remainingScroll = documentHeight - window.innerHeight - window.scrollY
      setIsNearBottom(remainingScroll < 56)
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

    let frameId = 0

    const scrollFrame = () => {
      const remainingScroll = document.documentElement.scrollHeight - window.innerHeight - window.scrollY

      if (remainingScroll <= 2) {
        setIsAutoScrolling(false)
        return
      }

      window.scrollBy({ top: 1.5, left: 0, behavior: 'auto' })
      frameId = window.requestAnimationFrame(scrollFrame)
    }

    frameId = window.requestAnimationFrame(scrollFrame)

    return () => window.cancelAnimationFrame(frameId)
  }, [isAutoScrolling])

  const toggleFavorite = () => setIsFavorite((currentValue) => !currentValue)

  const handleAutoScroll = () => {
    setIsAutoScrolling((currentValue) => !currentValue)
  }

  const handleJumpScroll = () => {
    setIsAutoScrolling(false)
    window.scrollTo({
      top: isNearBottom ? 0 : document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  return (
    <main className="song-chord-page">
      <nav className="song-chord-breadcrumb page-shell" aria-label="Breadcrumb">
        <button type="button" onClick={() => onBackToBand(band.id)} aria-label={`${band.name} გვერდზე დაბრუნება`}>
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
            <p>{band.name}</p>
            <h1>{song.title}</h1>
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
            <RhythmDisplay rhythmInfo={rhythmInfo} />
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
              {allSongChords.map((chord) => (
                <ChordDiagram chord={chord} key={chord} />
              ))}
            </div>
          </section>

          <section className="song-sidebar-card song-sidebar-card--chorus">
            <h2>მისამღერი</h2>
            {hasChorusChords ? (
              <div className="chorus-badges">
                {chorusChords.map((chord) => (
                  <ChordBadge chord={chord} key={chord} />
                ))}
              </div>
            ) : (
              <p className="song-sidebar-card__empty">მისამღერი არ აქვს</p>
            )}
          </section>
        </aside>
      </section>

      <div className="song-scroll-controls" aria-label="Auto scroll controls">
        <button
          className={`song-scroll-fab song-scroll-fab--primary ${isAutoScrolling ? 'song-scroll-fab--active' : ''}`}
          type="button"
          aria-label={isAutoScrolling ? 'ავტოსქროლის შეჩერება' : 'ავტოსქროლის დაწყება'}
          aria-pressed={isAutoScrolling}
          onClick={handleAutoScroll}
        >
          {isAutoScrolling ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className="song-scroll-fab song-scroll-fab--secondary"
          type="button"
          aria-label={isNearBottom ? 'ზემოთ დაბრუნება' : 'ბოლოში გადასვლა'}
          onClick={handleJumpScroll}
        >
          {isNearBottom ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </button>
      </div>
    </main>
  )
}

export default SongChordPage
