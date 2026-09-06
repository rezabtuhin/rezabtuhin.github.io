import { socialLinks } from "@/data/portfolio";

export default function SocialLinks() {
  return (
    <div
      className="portrait-socials"
      role="group"
      aria-label="Social and contact links"
    >
      {socialLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          aria-label={link.ariaLabel}
          title={link.title}
          target={link.newTab ? "_blank" : undefined}
          rel={link.newTab ? "noopener noreferrer" : undefined}
          download={link.download}
        >
          <svg
            className={link.download ? "download-icon" : undefined}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d={link.path}
              strokeLinecap={link.download ? "round" : undefined}
              strokeLinejoin={link.download ? "round" : undefined}
            />
          </svg>
        </a>
      ))}
    </div>
  );
}
