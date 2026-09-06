import Image from "./PortfolioImage";
import { imageSizes } from "@/lib/images";
import { Fragment } from "react";
import { industryExperience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section className="grid-row" id="experience" aria-label="Experience">
      <div className="section-inner rail">
        <section
          aria-labelledby="undergraduate-research-heading"
          className="experience-subsection"
        >
          <h2 id="undergraduate-research-heading">
            Undergraduate Research Experience
          </h2>
          <article className="research-experience-entry">
            <h3>
              Final Year Design Project —{" "}
              <a href="https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/pdfs/Improvement%20of%20Scene%20Understanding%20Using%20Scene%20Graphs.pdf?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvcGRmcy9JbXByb3ZlbWVudCBvZiBTY2VuZSBVbmRlcnN0YW5kaW5nIFVzaW5nIFNjZW5lIEdyYXBocy5wZGYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4Njg5OTIyLCJleHAiOjE5NDYzNjk5MjJ9.DTCOKRubjWU6TVebaNVOjI_GhP3KZZm7bRnvQkwD2WuTN4-WkAv2tyT90dHjg5tOk-vaDFch3H2PMcM5Uv44kw">
                Improvement of Scene Understanding Using Scene Graphs
              </a>
            </h3>
            <div className="entry-meta">
              February 2022 – October 2022 · United International University
            </div>
            <p>
              Advised by{" "}
              <a href="https://cse.uiu.ac.bd/faculty/dewanfarid/">
                Professor Dr. Dewan Md. Farid
              </a>
              , with <a href="https://akibzaman.github.io/">Akib Zaman</a> as
              co-advisor.
            </p>
            <ul>
              <li>
                Conducted the gap analysis and contributed to the literature
                review of attention-based scene graph generation methods.
              </li>
              <li>
                Contributed to the project design and implementation of an
                attention-based scene graph generation system for
                object-relationship prediction.
              </li>
              <li>
                The project used Python, PyTorch, NumPy, and OpenCV. In a
                preliminary test, the model correctly classified predicates in
                13 of 15 images (86.67%). Recall@K was specified for future
                evaluation.
              </li>
            </ul>
          </article>
        </section>
        <section
          className="industry-subsection"
          aria-labelledby="industry-experience-heading"
        >
          <div className="section-heading">
            <h2 id="industry-experience-heading">Experience</h2>
          </div>
          <ol className="entry-list">
            {industryExperience.map((entry) => (
              <li className="entry" key={entry.title}>
                <Image
                  sizes={imageSizes.company}
                  className="experience-logo"
                  {...entry.image}
                  alt={entry.image.alt}
                />
                <div className="entry-body">
                  <h3>{entry.title}</h3>
                  <div className="entry-meta">{entry.date}</div>
                  <p>{entry.description}</p>
                  {entry.projects.length > 0 && (
                    <div className="notable-project">
                      <span>{entry.notableLabel}</span>
                      {entry.projects.map((project, index) => (
                        <Fragment key={project.href}>
                          {index > 0 && <span aria-hidden="true">·</span>}
                          <a className="project-jump" href={project.href}>
                            {project.label}
                          </a>
                        </Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}
