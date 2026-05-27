'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  images: string[];
  title: string;
};

export default function GalleryLightbox({ images, title }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, prev, next, close]);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      {/* Grid thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openAt(i)}
            className="group rounded-xl overflow-hidden border border-slate-200/60 aspect-video bg-slate-50 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label={`Agrandir capture ${i + 1}`}
          >
            <img
              src={img}
              alt={`${title} — capture ${i + 1}`}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={close}
              aria-hidden
            />

            {/* Modal */}
            <motion.div
              key={index}
              className="relative z-10 flex flex-col items-center gap-3 max-w-[90vw]"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image */}
              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={images[index]}
                  alt={`${title} — capture ${index + 1}`}
                  style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain' }}
                />
              </div>

              {/* Counter + nav */}
              {images.length > 1 && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={prev}
                    className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-white/70 text-sm font-medium tabular-nums">
                    {index + 1} / {images.length}
                  </span>
                  <button
                    onClick={next}
                    className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
