// PLACEHOLDER: draft terms for the presentation. They must be reviewed by the University's legal office before launch.

import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Use",
  description: "The terms that apply when you use the King Ceasor University website.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" intro="The terms that apply when you use this website." updated="4 November 2026">
      <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Information on this site</h2>
      <p>
        We work to keep programme details, fees and dates accurate, but they can change. The Academic Registrar&apos;s published fees structure and your admission letter
        take precedence over anything shown here.
      </p>
      <h2>Use of content</h2>
      <p>
        Text, photographs, video and the KCU name and crest belong to King Ceasor University unless stated otherwise. You may share links and quote short extracts with
        credit. Any other use needs our written permission.
      </p>
      <h2>Links to other sites</h2>
      <p>We link to services such as the application portal, e-learning platform and partner websites. We are not responsible for the content of sites we do not run.</p>
      <h2>Acceptable use</h2>
      <p>Do not try to gain unauthorised access to this site or its systems, interfere with how it works, or use it to send unlawful or harmful material.</p>
      <h2>Privacy</h2>
      <p>
        How we handle personal data is explained in our <Link href="/privacy">Privacy Policy</Link>.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Republic of Uganda.</p>
    </LegalPage>
  );
}
