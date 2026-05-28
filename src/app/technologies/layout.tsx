import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stackpilot.fr';

export const metadata: Metadata = {
  title: 'Technologies no-code maîtrisées — Jennifer Jaulin',
  description:
    'Découvrez les 12 technologies no-code, low-code et IA que je maîtrise : Bubble, Make, Airtable, Salesforce, SharePoint, DocuSign et plus. Je vous aide à choisir les outils les plus adaptés à votre projet.',
  alternates: { canonical: `${BASE_URL}/technologies` },
  openGraph: {
    title: 'Technologies no-code maîtrisées — Jennifer Jaulin',
    description:
      'Découvrez les 12 technologies no-code, low-code et IA que je maîtrise : Bubble, Make, Airtable, Salesforce, SharePoint, DocuSign et plus.',
    url: `${BASE_URL}/technologies`,
  },
};

export default function TechnologiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
