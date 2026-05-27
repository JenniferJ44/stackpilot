import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diagnostic de stack no-code — StackPilot',
  description:
    'Répondez à quelques questions sur votre projet et obtenez en 2 minutes une architecture technologique no-code personnalisée, avec les outils les plus adaptés à votre budget et contexte.',
};

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
