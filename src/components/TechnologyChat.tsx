'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, User, MessageCircle } from 'lucide-react';
import { Technology } from '@/data/technologies';

type Message = {
  id: string;
  role: 'bot' | 'user';
  content: string;
};

// ─── Predefined questions with dynamic answer builders ────────────────────────

const QUESTIONS: { label: string; build: (tech: Technology) => string }[] = [
  {
    label: 'Est-ce adapté à mon projet ?',
    build: (tech) => {
      const ideal = tech.idealFor.join(', ');
      const avoid = tech.avoidIf?.slice(0, 2).map((a) => `• ${a}`).join('\n') ?? '';
      return (
        `${tech.name} est particulièrement adapté pour : ${ideal}.\n\n` +
        (avoid
          ? `En revanche, il est moins adapté si :\n${avoid}\n\nLancez le diagnostic StackPilot pour une recommandation personnalisée selon votre contexte précis.`
          : `Lancez le diagnostic StackPilot pour une recommandation personnalisée selon votre contexte précis.`)
      );
    },
  },
  {
    label: 'Quels sont les avantages ?',
    build: (tech) => {
      const list = tech.pros.map((p) => `• ${p}`).join('\n');
      return `Les points forts de ${tech.name} :\n${list}`;
    },
  },
  {
    label: 'Quelles sont les limites ou risques ?',
    build: (tech) => {
      const cons = tech.cons.map((c) => `• ${c}`).join('\n');
      const watchouts = tech.watchouts?.slice(0, 3).map((w) => `• ${w}`).join('\n') ?? '';
      return (
        `Les limites de ${tech.name} :\n${cons}` +
        (watchouts ? `\n\nPoints de vigilance :\n${watchouts}` : '')
      );
    },
  },
  {
    label: 'Avec quels outils le combiner ?',
    build: (tech) => {
      const stack = tech.stackWith?.join(', ');
      if (!stack) {
        return `${tech.name} peut s'intégrer à de nombreux outils via connecteurs ou API. Précisez votre contexte dans le diagnostic pour une combinaison recommandée.`;
      }
      return (
        `${tech.name} se combine bien avec : ${stack}.\n\n` +
        `Ces associations permettent d'étendre ses capacités selon votre besoin (automatisation, données, signature, paiement, etc.).`
      );
    },
  },
  {
    label: 'Par où commencer ?',
    build: (tech) => {
      if (tech.firstStep) {
        return `Pour démarrer avec ${tech.name} :\n\n${tech.firstStep}`;
      }
      return `Commencez par un cas d'usage simple, testez avec de vraies données, puis itérez progressivement. Consultez la documentation officielle de ${tech.name} pour un guide pas-à-pas.`;
    },
  },
  {
    label: 'Combien de temps prévoir ?',
    build: (tech) => {
      const durations: Record<string, string> = {
        bubble: 'Comptez 4 à 8 semaines pour un MVP simple, 2 à 4 mois pour un projet complet avec intégrations.',
        airtable: 'Comptez 2 à 5 jours pour une base simple, 2 à 3 semaines pour un CRM ou outil interne complet.',
        make: 'Comptez 1 à 3 jours pour les automatisations simples, 1 à 3 semaines pour des workflows complexes.',
        notion: 'Comptez 1 à 3 jours pour une structure de base, 2 à 4 semaines pour déployer un wiki complet avec toute l\'équipe.',
        salesforce: 'Comptez 2 à 4 mois pour un déploiement complet, 6 à 12 semaines pour une configuration de base avec formation.',
        sharepoint: 'Comptez 2 à 5 semaines pour une configuration de base, 2 à 4 mois pour une GED complète avec migration.',
        'power-automate': 'Comptez 1 à 3 jours pour les automatisations simples, 2 à 4 semaines pour des circuits d\'approbation complexes.',
        docusign: 'Comptez 1 à 3 jours pour la configuration de base, 1 à 2 semaines pour un parcours complet avec automatisation.',
        'claude-code': 'Comptez 1 à 2 semaines pour un MVP simple, 1 à 3 mois pour une application complète selon la complexité.',
        hubspot: 'Comptez 2 à 5 jours pour une configuration de base, 2 à 4 semaines pour un déploiement complet avec formation équipe.',
        zapier: 'Comptez moins d\'1 heure pour les automatisations simples, 1 à 3 jours pour un ensemble de Zaps interconnectés.',
        glide: 'Comptez 1 à 3 jours pour une app simple, 1 à 2 semaines pour une application complète avec droits et vues personnalisées.',
        softr: 'Comptez 1 à 3 jours pour un portail basique, 1 à 2 semaines pour un portail complet avec droits et personnalisation.',
        webflow: 'Comptez 1 à 2 semaines pour un site simple, 3 à 6 semaines pour un site complet avec CMS et intégrations.',
        framer: 'Comptez quelques heures à 2 jours pour une landing page soignée, 1 semaine pour un site avec plusieurs sections.',
        wordpress: 'Comptez 1 à 2 semaines pour un site de base, 1 à 2 mois pour un site complet avec plugins et contenu.',
      };
      const duration = durations[tech.id] ?? `Le délai dépend du projet. Comptez en général quelques jours pour une configuration simple à plusieurs semaines pour un déploiement complet.`;
      return `${duration}\n\nCes estimations sont indicatives — la complexité de votre besoin et le niveau d'accompagnement influencent la durée réelle.`;
    },
  },
  {
    label: 'Quel niveau technique faut-il ?',
    build: (tech) => {
      if (tech.id === 'claude-code') {
        return `${tech.name} nécessite des compétences en développement (JavaScript/TypeScript, React, Next.js). C'est fait pour des Product Builders ou développeurs qui veulent construire des solutions sur-mesure très rapidement grâce à l'IA.`;
      }
      if (tech.id === 'salesforce') {
        return `La configuration de Salesforce nécessite un profil Salesforce Admin ou un partenaire certifié. Les utilisateurs finaux n'ont pas besoin de compétences techniques — mais le paramétrage initial est complexe et nécessite un accompagnement.`;
      }
      if (tech.id === 'sharepoint') {
        return `SharePoint nécessite un administrateur Microsoft 365 pour la configuration initiale des sites et des droits. Les utilisateurs finaux accèdent aux documents sans compétence technique particulière.`;
      }
      if (tech.category === 'no-code') {
        const firstStepNote = tech.firstStep ? `\n\nPremier pas conseillé : ${tech.firstStep}` : '';
        return `${tech.name} est une solution no-code — aucun code requis. Une prise en main de quelques heures à quelques jours suffit pour les cas d'usage courants.${firstStepNote}`;
      }
      if (tech.category === 'automation') {
        return `${tech.name} ne nécessite aucune compétence en code. Une bonne logique de process et de la méthode suffisent pour les automatisations courantes. Les scénarios complexes demandent une montée en compétences progressive.`;
      }
      return `${tech.name} est accessible sans compétences techniques pour la plupart des cas d'usage. La courbe d'apprentissage est modérée selon la complexité de votre projet.`;
    },
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
  tech: Technology;
};

export default function TechnologyChat({ tech }: Props) {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [askedLabels, setAskedLabels] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  function start() {
    setStarted(true);
    setMessages([
      {
        id: '0',
        role: 'bot',
        content: `Bonjour ! 👋 Je peux répondre à vos questions sur **${tech.name}**.\n\nCliquez sur une question ci-dessous pour commencer.`,
      },
    ]);
  }

  function handleQuestion(q: { label: string; build: (tech: Technology) => string }) {
    if (loading) return;

    setAskedLabels((prev) => new Set(prev).add(q.label));

    const userMsg: Message = { id: `${Date.now()}-u`, role: 'user', content: q.label };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);
    setTimeout(() => {
      const answer = q.build(tech);
      setMessages((prev) => [...prev, { id: `${Date.now()}-b`, role: 'bot', content: answer }]);
      setLoading(false);
    }, 700);
  }

  if (!started) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-bold text-slate-900 mb-1">Des questions sur {tech.name} ?</p>
          <p className="text-sm text-slate-500">
            Cliquez sur une question et obtenez une réponse adaptée à cet outil.
          </p>
        </div>
        <button
          onClick={start}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm shrink-0"
        >
          Poser une question
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Conseiller {tech.name}</p>
          <p className="text-blue-100 text-xs">Cliquez sur une question pour obtenir une réponse</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-white/80 text-xs">En ligne</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="h-72 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'bot'
                  ? 'bg-gradient-to-br from-blue-500 to-violet-600'
                  : 'bg-slate-200'
              }`}
            >
              {msg.role === 'bot' ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-slate-600" />
              )}
            </div>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'bot'
                  ? 'bg-white border border-slate-100 text-slate-700 shadow-sm'
                  : 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Question pills */}
      <div className="border-t border-slate-100 p-4 bg-white">
        <p className="text-xs text-slate-400 mb-3">Sélectionnez une question :</p>
        <div className="flex flex-wrap gap-2">
          {QUESTIONS.map((q) => {
            const asked = askedLabels.has(q.label);
            return (
              <button
                key={q.label}
                onClick={() => handleQuestion(q)}
                disabled={loading}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  asked
                    ? 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-500'
                    : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                {asked ? '✓ ' : ''}{q.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
