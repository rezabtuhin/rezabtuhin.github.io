import Image from "./PortfolioImage";
import { imageSizes } from "@/lib/images";
import { Fragment } from "react";
import { publications } from "@/data/portfolio";

export default function Publications() {
  return (
    <section
      className="grid-row"
      id="publications"
      aria-labelledby="publications-heading"
    >
      <div className="section-inner rail">
        <div className="section-heading">
          <h2 id="publications-heading">Publications</h2>
        </div>
        <ol className="publication-list">
          {publications.map((publication) => (
            <li className="publication" key={publication.title}>
              <Image
                sizes={imageSizes.publication}
                className="publication-image"
                {...publication.image}
                alt={publication.image.alt}
              />
              <div>
                <p>
                  {publication.authors.map((author, index) => (
                    <Fragment key={author}>
                      {index > 0 &&
                        (index === publication.authors.length - 1
                          ? ", and "
                          : ", ")}
                      {author === "Rezab Ud Dawla" ? (
                        <strong>
                          <em>{author}</em>
                        </strong>
                      ) : (
                        author
                      )}
                    </Fragment>
                  ))}
                  .
                </p>
                <h3 className="publication-title">{publication.title}</h3>
                <p>
                  {publication.venue.href ? (
                    <a
                      href={publication.venue.href}
                      target={publication.venue.newTab ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {publication.venue.label}
                    </a>
                  ) : (
                    publication.venue.label
                  )}
                </p>
                <div className="publication-links">
                  {publication.links.map((link, index) => (
                    <Fragment key={link.href}>
                      {index > 0 && " · "}
                      <a href={link.href}>{link.label}</a>
                    </Fragment>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
