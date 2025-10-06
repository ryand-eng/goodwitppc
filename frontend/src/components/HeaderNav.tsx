import { Link } from "@tanstack/react-router";
import { landingContent } from "../content/landingContent";
import "./HeaderNav.css";

export const HeaderNav = () => {
  const { header } = landingContent;
  return (
    <header className="header">
      <div className="header__logo">{header.logoText}</div>
      <nav className="header__nav">
        {header.links.map((link) => (
          <Link key={link.href} to={link.href} className="header__link">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};
