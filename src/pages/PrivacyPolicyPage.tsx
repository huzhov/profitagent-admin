import { type ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
};

const PrivacyPolicyPage = () => {
  const lastUpdated = "23/12/2025";

  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-6">
      <div className="w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-base font-medium">Profit Agent Limited</p>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="space-y-8">
          <Section title="1. Introduction">
            <p>
              Profit Agent Limited ("Profit Agent", "we", "us", or "our") is
              committed to protecting and respecting your privacy. This Privacy
              Policy explains how we collect, use, store, disclose, and protect
              personal data when you interact with our services, including our
              WhatsApp AI solutions, websites, applications, and integrated
              customer engagement tools.
            </p>
            <p>
              This Privacy Policy is intended to comply with applicable data
              protection and privacy laws, including the UK General Data
              Protection Regulation (UK GDPR), EU General Data Protection
              Regulation (EU GDPR), UK Data Protection Act 2018, UAE Federal
              Decree-Law No. 45 of 2021 on the Protection of Personal Data,
              Singapore Personal Data Protection Act 2012 (PDPA), Malaysia
              Personal Data Protection Act 2010, Hong Kong Personal Data
              (Privacy) Ordinance (Cap. 486), applicable United States state
              privacy laws including the California Consumer Privacy Act as
              amended by the CPRA, and Meta Platforms and WhatsApp Business
              Platform Policies.
            </p>
          </Section>

          <Section title="2. Who We Are (Data Controller)">
            <p>
              <strong>2.1</strong> Company name: Profit Agent Limited (Company
              No. 13356975)
            </p>
            <p>
              <strong>2.2</strong> Role: Data Controller, unless otherwise
              stated
            </p>
            <p>
              <strong>2.3</strong> Data Protection Contact: Lee Davies
            </p>
            <p>
              <strong>2.4</strong> Email:{" "}
              <a
                href="mailto:Lee@profitagent.ai"
                className="text-primary underline"
              >
                Lee@profitagent.ai
              </a>
            </p>
            <p>
              Where we process personal data on behalf of our customers via
              WhatsApp Business accounts, those customers are the data
              controllers and we act as a data processor on their documented
              instructions.
            </p>
          </Section>

          <Section title="3. Scope of This Policy">
            <p>
              <strong>3.1</strong> This Privacy Policy applies to personal data
              processed by Profit Agent in connection with WhatsApp AI messaging
              solutions, lead generation and qualification, dormant customer
              reactivation where lawful, integrated buying experiences and
              commerce activation, customer onboarding and support, marketing,
              analytics, product improvement, website usage, and communications.
            </p>
            <p>
              <strong>3.2</strong> This includes personal data relating to end
              users who interact with WhatsApp AI agents, customers and
              prospective customers, leads and contacts, website visitors, and
              business partners or suppliers.
            </p>
          </Section>

          <Section title="4. What Personal Data We Collect">
            <p>
              <strong>4.1</strong> Personal data you provide directly may
              include your name, phone number including WhatsApp number, email
              address, company name, job title or role, message content sent via
              WhatsApp or other messaging channels, and information provided
              during onboarding, purchasing, or support interactions.
            </p>
            <p>
              <strong>4.2</strong> Personal data collected automatically may
              include message metadata such as date, time, delivery status, and
              interaction history with AI agents, device and browser information
              where applicable, IP address where applicable, and usage,
              analytics, or performance data.
            </p>
            <p>
              <strong>4.3</strong> Where we act as a data processor, our
              customers may provide us with personal data relating to their end
              users, such as contact details uploaded for messaging campaigns.
              Customers are responsible for establishing a lawful basis for
              processing and for providing appropriate notices to their end
              users.
            </p>
          </Section>

          <Section title="5. How We Use Personal Data">
            <p>
              <strong>5.1</strong> We use personal data to operate and deliver
              WhatsApp AI conversations, generate and qualify leads, reactivate
              dormant or inactive customers where lawful, facilitate buying
              journeys and transactions, onboard customers and activate
              services, provide customer support, monitor and improve our AI
              models and services, comply with legal and regulatory obligations,
              and prevent fraud, misuse, and abuse of our services.
            </p>
            <p>
              <strong>5.2</strong> We do not sell personal data and do not use
              WhatsApp or messaging data for unrelated advertising purposes.
            </p>
          </Section>

          <Section title="6. Legal Bases for Processing">
            <p>
              <strong>6.1</strong> Depending on jurisdiction and context, we
              rely on one or more of the following legal bases: consent,
              contractual necessity, legitimate interests, and compliance with
              legal obligations.
            </p>
            <p>
              <strong>6.2</strong> Where we rely on legitimate interests, we
              balance our business interests against the rights, freedoms, and
              reasonable expectations of individuals. Individuals may withdraw
              consent at any time without affecting the lawfulness of processing
              carried out before withdrawal.
            </p>
          </Section>

          <Section title="7. WhatsApp, Meta, and Messaging Platforms">
            <p>
              <strong>7.1</strong> Our services integrate with the WhatsApp
              Business Platform and other Meta services. Messages are sent only
              where a valid legal basis exists, such as user opt-in, consent, or
              an existing customer relationship, and in accordance with
              applicable law and platform requirements.
            </p>
            <p>
              <strong>7.2</strong> Users may opt out of receiving messages at
              any time by replying with recognised opt-out keywords such as
              "STOP" or by following instructions provided in the message.
            </p>
            <p>
              <strong>7.3</strong> Meta Platforms and WhatsApp may process
              certain personal data independently as separate data controllers.
              Users should review Meta and WhatsApp privacy policies for
              information about their data processing activities.
            </p>
          </Section>

          <Section title="8. Automated Processing and Artificial Intelligence">
            <p>
              <strong>8.1</strong> Our services may involve automated
              processing, including AI-driven message responses, segmentation,
              routing, and lead qualification. Automation is used to improve
              efficiency, relevance, and response times.
            </p>
            <p>
              <strong>8.2</strong> Automated processing does not produce legal
              or similarly significant effects on individuals without
              appropriate safeguards or human involvement where required by law.
              Individuals may request additional information about automated
              processing or request human review where applicable.
            </p>
          </Section>

          <Section title="9. Data Sharing and Disclosure">
            <p>
              <strong>9.1</strong> We may disclose personal data to trusted
              service providers and sub-processors, including hosting providers,
              analytics providers, messaging and communications infrastructure
              providers, and payment or transaction partners where applicable.
            </p>
            <p>
              <strong>9.2</strong> We may also disclose personal data to Meta
              Platforms where required to deliver WhatsApp services, to
              professional advisers such as legal, compliance, or accounting
              advisers, and to regulators, courts, or authorities where required
              by law.
            </p>
            <p>
              <strong>9.3</strong> All third parties are subject to contractual
              confidentiality, security, and data protection obligations.
            </p>
          </Section>

          <Section title="10. International Data Transfers">
            <p>
              <strong>10.1</strong> Personal data may be transferred to and
              processed in countries outside the country in which it was
              collected.
            </p>
            <p>
              <strong>10.2</strong> Where required by law, we implement
              appropriate safeguards such as Standard Contractual Clauses, the
              UK International Data Transfer Agreement, adequacy decisions, or
              other lawful transfer mechanisms, together with appropriate
              technical and organisational security measures.
            </p>
          </Section>

          <Section title="11. Data Retention">
            <p>
              <strong>11.1</strong> We retain personal data only for as long as
              necessary to fulfil the purposes described in this Privacy Policy,
              to comply with contractual requirements, or to meet legal and
              regulatory obligations.
            </p>
            <p>
              <strong>11.2</strong> When personal data is no longer required, it
              is securely deleted, anonymised, or archived in accordance with
              applicable laws.
            </p>
          </Section>

          <Section title="12. Data Security">
            <p>
              <strong>12.1</strong> We implement appropriate technical and
              organisational measures to protect personal data against
              unauthorised access, loss, misuse, alteration, or disclosure.
            </p>
            <p>
              <strong>12.2</strong> These measures include access controls,
              encryption where appropriate, secure hosting environments,
              monitoring, and staff training subject to confidentiality
              obligations.
            </p>
          </Section>

          <Section title="13. Your Rights">
            <p>
              <strong>13.1</strong> Depending on your location, you may have the
              right to be informed about how your personal data is used, to
              access your personal data, to correct inaccurate or incomplete
              data, to request deletion or erasure, to restrict or object to
              processing, to request data portability where applicable, to
              withdraw consent at any time, to object to direct marketing, and
              to obtain information about automated decision-making.
            </p>
            <p>
              <strong>13.2</strong> Requests may be submitted by contacting{" "}
              <a
                href="mailto:Lee@profitagent.ai"
                className="text-primary underline"
              >
                Lee@profitagent.ai
              </a>
              . We respond within the timeframes required by applicable law.
            </p>
            <p>
              <strong>13.3</strong> UK and EU residents also have the right to
              lodge a complaint with their relevant supervisory authority. In
              the UK, this is the Information Commissioner's Office.
            </p>
          </Section>

          <Section title="14. US State Privacy Rights">
            <p>
              <strong>14.1</strong> Where applicable under US state privacy
              laws, including the California Consumer Privacy Act as amended by
              the CPRA, residents may have the right to request access to,
              correction of, or deletion of personal data, to opt out of the
              sale or sharing of personal data, and to receive equal service and
              pricing even if they exercise their privacy rights.
            </p>
            <p>
              <strong>14.2</strong> Profit Agent does not sell personal data and
              does not share personal data for cross-context behavioural
              advertising as defined under applicable US privacy laws.
            </p>
            <p>
              <strong>14.3</strong> Requests may be submitted by emailing{" "}
              <a
                href="mailto:Lee@profitagent.ai"
                className="text-primary underline"
              >
                Lee@profitagent.ai
              </a>
              .
            </p>
          </Section>

          <Section title="15. Data Breaches">
            <p>
              <strong>15.1</strong> In the event of a personal data breach that
              poses a risk to individuals' rights or freedoms, we will
              investigate promptly, notify relevant supervisory authorities
              where required, and inform affected individuals where legally
              necessary.
            </p>
          </Section>

          <Section title="16. Children's Data">
            <p>
              <strong>16.1</strong> Our services are not intended for children,
              and we do not knowingly collect personal data from individuals
              under the age of 16, or such higher age as required by applicable
              local law.
            </p>
          </Section>

          <Section title="17. Cookies and Similar Technologies">
            <p>
              <strong>17.1</strong> Our websites may use cookies and similar
              technologies for functionality, analytics, and performance.
              Further information about the use of cookies is available in our
              Cookie Policy where applicable.
            </p>
          </Section>

          <Section title="18. Changes to This Policy">
            <p>
              <strong>18.1</strong> We may update this Privacy Policy from time
              to time. The most current version will always be available on our
              website with the effective date clearly stated.
            </p>
          </Section>

          <Section title="19. Contact Us">
            <p>
              <strong>19.1</strong> For privacy-related questions, data subject
              requests, or concerns, please contact:
            </p>
            <div className="mt-2">
              <p>Lee Davies</p>
              <p>Profit Agent Limited</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:Lee@profitagent.ai"
                  className="text-primary underline"
                >
                  Lee@profitagent.ai
                </a>
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
