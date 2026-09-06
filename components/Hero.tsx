import Image from "./PortfolioImage";
import { imageSizes } from "@/lib/images";
import { portrait } from "@/data/portfolio";
import SocialLinks from "./SocialLinks";

export default function Hero() {
  return (
    <section className="grid-row hero" id="hero">
      <div className="section-inner rail">
        <div className="portrait-block">
          <Image
            sizes={imageSizes.portrait}
            {...portrait}
            alt={portrait.alt}
            priority
          />
          <SocialLinks />
        </div>
        <div>
          <h1>Rezab Ud Dawla</h1>
          <div className="hero-copy">
            <p>
              I am a software engineer and researcher interested in reliable and
              maintainable{" "}
              <a href="https://en.wikipedia.org/wiki/Large_language_model">
                LLM applications
              </a>
              , software engineering for AI-enabled systems, data management,
              data quality, privacy, and text mining. Currently, I work as a
              Software Engineer at Linno, developing secure full-stack features
              and REST APIs and building a self-hosted RAG support assistant
              with FastAPI, llama.cpp, and hybrid retrieval.
            </p>
            <p>
              My academic research spans attention-based{" "}
              <a href="https://en.wikipedia.org/wiki/Scene_graph">
                scene graph generation
              </a>{" "}
              and imbalanced-data classification. My undergraduate education at{" "}
              <a href="https://www.uiu.ac.bd/">
                United International University
              </a>{" "}
              focused on Computer Science and Engineering, with a Data Science
              major; I graduated with a CGPA of 3.72/4.00.{" "}
              <strong>
                I have co-authored three peer-reviewed conference publications
                at SKIMA, IEEE TENCON, and MIET.
              </strong>{" "}
              Previously, I worked at ShareTrip and RedDot Digital Limited and
              served as an Undergraduate Teaching Assistant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
