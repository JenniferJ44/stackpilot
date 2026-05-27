'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

type From = 'bottom' | 'left' | 'right' | 'top';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: From;
};

const FROM_INITIAL: Record<From, { opacity: number; x?: number; y?: number }> = {
  bottom: { opacity: 0, y: 40, x: 0 },
  left:   { opacity: 0, x: -32, y: 6 },
  right:  { opacity: 0, x:  32, y: 6 },
  top:    { opacity: 0, y: -24, x: 0 },
};

export default function MotionSection({ children, className, delay = 0, from = 'bottom' }: Props) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={FROM_INITIAL[from]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
