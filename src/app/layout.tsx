import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stackpilot.fr';

export const metadata: Metadata = {
  title: {
    default: "StackPilot — Product Builder No-Code freelance",
    template: "%s",
  },
  description:
    "Jennifer Jaulin, Product Builder No-Code freelance. Je conçois des MVP, automatisations et outils métiers no-code. Diagnostic de stack gratuit inclus.",
  openGraph: {
    siteName: "StackPilot",
    type: "website",
    locale: "fr_FR",
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#jennifer`,
      name: 'Jennifer Jaulin',
      jobTitle: 'Product Builder No-Code freelance',
      url: BASE_URL,
      sameAs: [
        'https://www.linkedin.com/in/jennifer-jaulin-64b872116/',
        'https://www.malt.fr/profile/jenniferjaulin',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'StackPilot',
      description: 'Diagnostic de stack no-code et accompagnement Product Builder par Jennifer Jaulin',
      publisher: { '@id': `${BASE_URL}/#jennifer` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${BASE_URL}/#service`,
      name: 'StackPilot — Product Builder No-Code',
      description:
        'Jennifer Jaulin, Product Builder No-Code freelance. Conception de MVP, automatisations et outils métiers no-code.',
      url: BASE_URL,
      founder: { '@id': `${BASE_URL}/#jennifer` },
      sameAs: [
        'https://www.linkedin.com/in/jennifer-jaulin-64b872116/',
        'https://www.malt.fr/profile/jenniferjaulin',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased font-[family-name:var(--font-inter)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
