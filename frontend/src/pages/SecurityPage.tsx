import { HeaderNav } from "../components/HeaderNav";
import "../components/HeaderNav.css";
import "./PolicyPages.css";

export const SecurityPage = () => (
  <div className="policy">
    <HeaderNav />
    <main className="policy__main">
      <h1>Security controls</h1>
      <p>
        Our intake platform is deployed in a hardened AWS account with infrastructure managed by Terraform. All secrets are stored in
        AWS Secrets Manager and rotated automatically. IAM roles are scoped to least privilege and require hardware security keys for
        console access.
      </p>
      <section id="subprocessors">
        <h2>Subprocessors</h2>
        <ul>
          <li>AWS (infrastructure hosting)</li>
          <li>Cloudflare (edge TLS termination)</li>
          <li>OpenAI (AI-assisted audit summarization)</li>
        </ul>
      </section>
    </main>
  </div>
);
