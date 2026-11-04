// PLACEHOLDER: draft policy for the presentation. It must be reviewed by the University's legal office before launch.

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description: "How King Ceasor University collects, uses and protects personal data under Uganda's Data Protection and Privacy Act, 2019.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" intro="How we collect, use and protect your personal data." updated="4 November 2026">
      <p>
        King Ceasor University (&quot;KCU&quot;, &quot;we&quot;) respects your privacy. This policy explains what personal data we collect through this website and how we
        handle it in line with Uganda&apos;s Data Protection and Privacy Act, 2019 and its Regulations.
      </p>
      <h2>What we collect</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Details you give us in enquiry, visit and newsletter forms, such as your name, email address, phone number and the programmes you are interested in.</li>
        <li>Information you submit when you apply through our online application portal, which is covered by the portal&apos;s own notice.</li>
        <li>Basic technical data, such as your browser type and the pages you visit, used to keep the website secure and working well.</li>
      </ul>
      <h2>How we use it</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>To answer your enquiries and arrange campus visits.</li>
        <li>To process applications and admissions.</li>
        <li>To send you news and event updates, only if you have asked us to.</li>
        <li>To improve and secure this website.</li>
      </ul>
      <h2>Sharing your data</h2>
      <p>
        We do not sell your personal data. We share it only with staff who need it, with service providers who help us run our systems under written agreements, and
        where the law requires us to.
      </p>
      <h2>How long we keep it</h2>
      <p>We keep enquiry data for up to two years and newsletter data until you unsubscribe. Student records are kept as required by law and University policy.</p>
      <h2>Your rights</h2>
      <p>
        You may ask to see the personal data we hold about you, ask us to correct or delete it, object to its use, or withdraw consent for marketing at any time. You
        may also complain to the Personal Data Protection Office.
      </p>
      <h2>Contact us</h2>
      <p>
        For any privacy question or request, email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or write to us at {site.contact.address}.
      </p>
    </LegalPage>
  );
}
