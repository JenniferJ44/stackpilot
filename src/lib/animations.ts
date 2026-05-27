import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0,
    },
  },
};

export const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const springPop: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 28 },
  },
};

// ── Directions d'assemblage — construction progressive ───────────
const ASSEMBLE_INITIALS = [
  { opacity: 0, x: -28, y: 8,   scale: 1    },  // 0 — depuis la gauche
  { opacity: 0, x:  28, y: 8,   scale: 1    },  // 1 — depuis la droite
  { opacity: 0, x:   0, y: 38,  scale: 1    },  // 2 — depuis le bas
  { opacity: 0, x:  12, y: -18, scale: 0.97 },  // 3 — depuis le haut-diagonal
] as const;

export function getAssembleInitial(index: number) {
  return ASSEMBLE_INITIALS[index % 4];
}

export const ASSEMBLE_TARGET = { opacity: 1, x: 0, y: 0, scale: 1 };

// Alternance stricte gauche/droite (pour listes verticales)
export function getAlternateInitial(index: number) {
  return index % 2 === 0
    ? { opacity: 0, x: -26, y: 4 }
    : { opacity: 0, x: 26, y: 4 };
}

// Hover shadows — glow indigo/violet premium
export const CARD_HOVER_SHADOW =
  '0 0 0 1.5px rgba(99,102,241,0.22), 0 16px 48px rgba(99,102,241,0.14), 0 4px 12px rgba(15,23,42,0.08)';
export const CARD_IDLE_SHADOW =
  '0 1px 4px rgba(15,23,42,0.05), 0 1px 2px rgba(15,23,42,0.03)';
