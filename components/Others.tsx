import Image from "./PortfolioImage";
import { imageSizes } from "@/lib/images";
import { books } from "@/data/portfolio";

export default function Others() {
  return (
    <section className="grid-row" id="others" aria-labelledby="others-heading">
      <div className="section-inner rail">
        <div className="section-heading">
          <h2 id="others-heading">Others</h2>
        </div>
        <h3 className="books-heading">Currently Reading</h3>
        <div className="book-list">
          {books.map((book) => (
            <figure className="book-card" key={book.title}>
              <a
                className="book-cover-link"
                href={book.link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={book.ariaLabel}
              >
                <Image
                  sizes={imageSizes.book}
                  className="book-cover-image"
                  {...book.image}
                  alt={book.image.alt}
                />
              </a>
              <figcaption>
                <strong>
                  <a
                    href={book.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {book.title}
                  </a>
                </strong>
                <span>{book.author}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
