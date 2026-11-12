import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/content/site";
import { SimpleForm } from "@/components/simple-form";

export const metadata: Metadata = {
  alternates: { canonical: "/accessibility" },
  title: "Accessibility",
  description: "King Ceasor University's commitment to making its website usable by everyone, and how to report a problem.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility" intro="We want everyone to be able to use this website, whatever their device or ability." updated="4 November 2026">
      <p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. This website is designed so that you can:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>navigate every menu, form, gallery and search with a keyboard, using visible focus outlines and a &quot;Skip to content&quot; link;</li>
        <li>use a screen reader, with descriptive headings, labelled form fields and text alternatives for images;</li>
        <li>pause the homepage background video with its pause button, and switch off animation by turning on &quot;reduce motion&quot; in your device settings;</li>
        <li>zoom text up to 200% without losing content;</li>
        <li>use the site on a phone with a slow connection, as images are resized and compressed automatically.</li>
      </ul>
      <h2>Known limitations</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Some older PDF documents, such as past newsletters and job adverts, may not be fully accessible.</li>
        <li>The campus film does not yet have captions or an audio description.</li>
      </ul>
      <h2 id="report">Report an accessibility problem</h2>
      <p>
        If you find something on this site hard to use, email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or call {site.contact.phone}. Tell us the
        page and the problem, and we will reply within five working days and provide the information in another format if you need it.
      </p>
      <div className="not-prose mt-6">
        <SimpleForm
          submitLabel="Report the problem"
          successTitle="Thank you for telling us"
          successText="We will look into it and reply within five working days."
          fields={[
            { name: "name", label: "Your name", autoComplete: "name" },
            { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
            { name: "page", label: "Page address or name", required: true, full: true },
            { name: "problem", label: "What was hard to use?", type: "textarea", required: true },
          ]}
        />
      </div>
    </LegalPage>
  );
}
