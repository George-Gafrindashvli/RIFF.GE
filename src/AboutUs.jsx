const offers = [
  {
    icon: '🎸',
    title: 'ზუსტი აკორდები და რიფები',
    description: 'ქართული ბენდების სიმღერების აკორდების ბაზა.',
  },
  {
    icon: '🔍',
    title: 'მარტივი ძიება',
    description: 'იპოვე შენი საყვარელი ბენდი ან სიმღერა წამებში.',
  },
  {
    icon: '🤝',
    title: 'საზოგადოების ჩართულობა',
    description: 'ნებისმიერ მომხმარებელს შეუძლია დაამატოს ახალი სიმღერის აკორდები.',
  },
]

function AboutUs() {
  return (
    <main className="about-page" id="about">
      <section className="about-hero">
        <div className="page-shell">
          <p className="section-eyebrow">RIFF.GE</p>
          <h1>
            RIFF.GE - ქართული როკის <span>პლატფორმა</span>
          </h1>
          <p>
            ჩვენი მისიით ვაერთიანებთ ქართული როკ მუსიკის მოყვარულებს,
            მუსიკოსებსა და დამწყებ გიტარისტებს ერთ სივრცეში.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="page-shell about-grid">
          <article className="about-panel about-panel--mission">
            <p className="section-eyebrow">ჩვენი მისია</p>
            <h2>ქართული როკი უფრო ხელმისაწვდომად</h2>
            <p>
              RIFF.GE შექმნილია იმისათვის, რომ ქართული როკ ჯგუფების აკორდები,
              რიფები და ტექსტები იყოს მარტივად ხელმისაწვდომი ყველასთვის.
              ჩვენი მიზანია ხელი შევუწყოთ ქართული ალტერნატიული და როკ მუსიკის
              განვითარებასა და პოპულარიზაციას.
            </p>
          </article>

          <article className="about-panel">
            <p className="section-eyebrow">რას გთავაზობთ</p>
            <h2>ყველაფერი ერთ სივრცეში</h2>
            <ul className="offer-list">
              {offers.map((offer) => (
                <li key={offer.title}>
                  <span className="offer-icon" aria-hidden="true">
                    {offer.icon}
                  </span>
                  <div>
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="page-shell">
          <div className="about-cta">
            <div>
              <p className="section-eyebrow">ჩაერთე</p>
              <h2>გაქვს ახალი სიმღერის აკორდები?</h2>
              <p>
                დაგვეხმარე ბაზის გაფართოებაში და გაუზიარე აკორდები სხვებსაც.
              </p>
            </div>
            <a className="cta-button" href="#add-chords">
              აკორდების დამატება
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutUs
