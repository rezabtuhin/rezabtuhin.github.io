import { honors, socialLinks } from "@/data/portfolio";

export default function Honors() {
  const githubIcon = socialLinks.find((link) => link.title === "GitHub")!;
  return (
    <section className="grid-row" id="honors" aria-labelledby="honors-heading">
      <div className="section-inner rail">
        <div className="section-heading">
          <h2 id="honors-heading">Honors &amp; Rewards</h2>
        </div>
        <div className="honors-list">
          {honors.map((honor) => (
            <article className="award" key={honor.title}>
              <h3>{honor.title}</h3>
              {honor.date && <p className="award-meta">{honor.date}</p>}
              <p>
                {honor.description.before}
                {honor.description.emphasis && (
                  <strong>{honor.description.emphasis}</strong>
                )}
                {honor.description.after}
              </p>
              {honor.link && (
                <p className="award-link">
                  <a
                    href={honor.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={honor.link.ariaLabel}
                    title={honor.link.title}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={githubIcon.path} />
                    </svg>
                  </a>
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
