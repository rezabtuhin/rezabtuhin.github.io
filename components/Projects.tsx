import Image from "./PortfolioImage";
import { imageSizes } from "@/lib/images";
import { projects } from "@/data/portfolio";

export default function Projects() {
  return (
    <section
      className="grid-row"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className="section-inner rail">
        <div className="section-heading">
          <h2 id="projects-heading">Selected Projects</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" id={project.id} key={project.title}>
              <Image
                sizes={imageSizes.project}
                className="project-image"
                {...project.image}
                alt={project.image.alt}
              />
              <div>
                <h3>{project.title}</h3>
                <p className="entry-meta">{project.date}</p>
                <p>{project.description}</p>
                <p className="entry-tools">{project.technologies}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
