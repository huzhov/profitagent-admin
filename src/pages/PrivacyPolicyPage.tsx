import { type ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
};

const PrivacyPolicyPage = () => {
  const lastUpdated = "18/09/2025";
  const effectiveDate = "18/09/2025";

  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-6">
      <div className="w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Privacy Policy for ProfitAgent AI
          </h1>
          <p className="text-xs text-muted-foreground">
            Effective Date: {effectiveDate}
          </p>
          <p className="text-xs text-muted-foreground">
            Last Updated: {lastUpdated}
          </p>
          <p className="text-sm text-muted-foreground">
            At ProfitAgent, we value your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, store, and share information when you interact
            with our AI-powered services via WhatsApp.
          </p>
        </header>

        <div className="space-y-8">
          <Section title="1. Information We Collect">
            <p>When you use our WhatsApp AI service, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Account Information: Your WhatsApp phone number, display name,
                and profile photo
              </li>
              <li>
                Message Content: Text, media, and documents you send to our AI
                service
              </li>
              <li>
                Usage Data: Interaction history, timestamps, and technical
                details (such as device type and connection metadata).
              </li>
              <li>
                Optional Information: If you provide feedback, support requests,
                or participate in surveys
              </li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide AI-powered responses and services</li>
              <li>
                Improve the accuracy, safety, and reliability of our AI system
              </li>
              <li>
                Personalize your experience (e.g., remembering preferences)
              </li>
              <li>
                Ensure compliance with WhatsApp's policies and applicable laws
              </li>
              <li>Communicate with you regarding service updates or support</li>
            </ul>
          </Section>

          <Section title="3. How We Share Your Information">
            <p>
              We do not sell or rent your personal information. We may share
              your information only in these cases:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                With Service Providers: To host, process, or analyze data on our
                behalf under strict confidentiality
              </li>
              <li>
                With WhatsApp and Meta: As required to operate through the
                WhatsApp Business platform
              </li>
              <li>
                For Legal Reasons: If required by law, regulation, or government
                request
              </li>
            </ul>
          </Section>

          <Section title="4. Data Retention">
            <p>
              We retain your personal data only as long as necessary to provide
              our services or as required by law. Message data may be stored
              temporarily for AI processing and deleted thereafter, unless
              explicitly needed for troubleshooting or improvement.
            </p>
          </Section>

          <Section title="5. Security Measures">
            <p>
              We apply appropriate organizational and technical measures to
              safeguard your information, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>End-to-end encrypted transport through WhatsApp</li>
              <li>Restricted access to stored data</li>
              <li>Regular security reviews</li>
            </ul>
          </Section>

          <Section title="6. Your Rights">
            <p>Depending on your jurisdiction, you may have rights to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access, correct, or delete your personal data</li>
              <li>Restrict or object to data processing</li>
              <li>Request data portability</li>
            </ul>
            <p>
              You may exercise these rights by contacting us at
              Leedaviesuk1@gmail.com
            </p>
          </Section>

          <Section title="7. Children's Privacy">
            <p>
              Our services are not directed to individuals under 16. If we learn
              that we have collected personal data from a child, we will delete
              it.
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The latest
              version will always be available at ProfitAgent.AI.
            </p>
          </Section>

          <Section title="9. Contact Us">
            <p>
              If you have questions about this Privacy Policy or our data
              practices, please contact us at: ProfitAgent AI Email:
              Leedaviesuk1@gmail.com
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
