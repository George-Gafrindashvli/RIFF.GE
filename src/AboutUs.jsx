const panels = [
  {
    icon: 'music',
    title: 'ვინ ვართ ჩვენ?',
    description:
      'RIFF.GE არის ქართული როკისა და ალტერნატიული მუსიკის აკორდების პლატფორმა, რომელიც მუსიკოსებსა და მსმენელებს ერთ სივრცეში აერთიანებს.',
  },
  {
    icon: 'shield',
    title: 'ჩვენი იდეა',
    description:
      'პროექტი დაიბადა მარტივი სურვილით: ქართული სიმღერების ტექსტები, აკორდები და რიფები სწრაფად, ლამაზად და მობილურზე კომფორტულად იკითხებოდეს.',
  },
  {
    icon: 'star',
    title: 'რას გთავაზობთ?',
    description:
      'ზუსტ აკორდებს, გამართული ტექსტის წყობას, ბენდების კატალოგს და ვიზუალურ დიაგრამებს, რომლებიც დაკვრას უფრო მარტივს ხდის.',
  },
]

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18V5l11-2v13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 19 6v5.4c0 4.05-2.8 7.85-7 9.6-4.2-1.75-7-5.55-7-9.6V6l7-3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path d="m8.8 12 2.15 2.15L15.6 9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 3 2.65 5.62 5.9.9-4.28 4.36 1.02 6.12L12 17.1 6.71 20l1.02-6.12-4.28-4.36 5.9-.9L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="16" height="16" x="4" y="4" rx="4.5" stroke="currentColor" strokeWidth="2" />
      <path d="M15.5 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" stroke="currentColor" strokeWidth="2" />
      <path d="M17.4 7.1h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  )
}

function Icon({ name }) {
  if (name === 'shield') {
    return <ShieldIcon />
  }

  if (name === 'star') {
    return <StarIcon />
  }

  return <MusicIcon />
}

function AboutUs() {
  return (
    <main className="about-page" id="about">
      <section className="about-hero">
        <div className="page-shell">
          <p className="section-eyebrow">RIFF.GE</p>
          <h1>
            RIFF.GE - ჩვენ შესახებ<span>.</span>
          </h1>
          <p>
            ქართული როკის აკორდები, ბენდები და სიმღერები ერთ თანამედროვე, სწრაფ და მობილურზე მორგებულ პლატფორმაზე.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="page-shell about-grid">
          {panels.map((panel) => (
            <article className="about-panel" key={panel.title}>
              <span className="about-panel__icon" aria-hidden="true">
                <Icon name={panel.icon} />
              </span>
              <div>
                <h2>{panel.title}</h2>
                <p>{panel.description}</p>
              </div>
            </article>
          ))}

          <article className="about-panel about-panel--cta">
            <span className="about-panel__icon" aria-hidden="true">
              <InstagramIcon />
            </span>
            <div>
              <h2>დაგვიკავშირდით</h2>
              <p>შემოგვიერთდი, მოგვწერე იდეები და გააზიარე შენი საყვარელი ქართული როკ აკორდები.</p>
              <a className="instagram-cta" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                <InstagramIcon />
                <span>Instagram-ზე (@riff.ge)</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default AboutUs
