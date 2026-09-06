import Image from "./PortfolioImage";
import { imageSizes } from "@/lib/images";
import { certifications } from "@/data/portfolio";

export default function Certifications() {
  return (
    <section
      className="grid-row"
      id="certifications"
      aria-labelledby="certifications-heading"
    >
      <div className="section-inner rail">
        <div className="section-heading">
          <h2 id="certifications-heading">Certifications</h2>
        </div>
        {certifications.map((certification) => (
          <article className="certification-showcase" key={certification.title}>
            <div className="certification-visual">
              <Image
                sizes={imageSizes.certification}
                {...certification.image}
                alt={certification.image.alt}
              />
            </div>
            <div className="certification-details">
              <h3>{certification.title}</h3>
              <p className="certification-issuer">{certification.issuer}</p>
              <dl className="credential-dates">
                {certification.dates.map((date) => (
                  <div key={date.label}>
                    <dt>{date.label}</dt>
                    <dd>{date.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                className="credential-button"
                href={certification.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                View credential <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
