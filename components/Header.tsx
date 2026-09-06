import { navigationItems } from "@/data/portfolio";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner rail">
        <a
          className="brand"
          href="#hero"
          aria-label="Rezab Ud Dawla — back to biography"
        >
          R
        </a>
        <MobileNavigation>
          <ul>
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </MobileNavigation>
      </div>
    </header>
  );
}
