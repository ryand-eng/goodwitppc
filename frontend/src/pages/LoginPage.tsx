import { HeaderNav } from "../components/HeaderNav";
import "../components/HeaderNav.css";
import "./PolicyPages.css";

export const LoginPage = () => (
  <div className="policy">
    <HeaderNav />
    <main className="policy__main">
      <h1>Portal login</h1>
      <p>Single sign-on is restricted to approved client teams. Check your welcome email for login instructions.</p>
    </main>
  </div>
);
