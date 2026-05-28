'use client';

import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GalleryItem } from '@/data/projects';

type Props = {
  items: GalleryItem[];
};

export default function GalleryGrid({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);
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

  const openAt = (i: number) => { setIndex(i); setOpen(true); };

  return (
    <>
      {/* Thumbnails grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <button
            key={item.url}
            onClick={() => openAt(i)}
            className="group text-left rounded-xl border border-slate-200/60 shadow-sm overflow-hidden bg-[#f7f9fd] flex flex-col cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200/60 transition-all duration-200"
            aria-label={`Agrandir : ${item.title}`}
          >
            <div className="aspect-video w-full overflow-hidden bg-slate-100">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-3 flex flex-col gap-1">
              <p className="text-xs font-bold text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
            </div>
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
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={close} aria-hidden />

            <motion.div
              key={index}
              className="relative z-10 flex flex-col items-center gap-4 max-w-[90vw]"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image + étincelles */}
              <div className="relative overflow-visible rounded-2xl shadow-2xl">
                <img
                  src={items[index].url}
                  alt={items[index].title}
                  className="rounded-2xl block"
                  style={{ maxWidth: '85vw', maxHeight: '70vh', objectFit: 'contain' }}
                />
                <span className="gallery-spark gallery-spark-1" />
                <span className="gallery-spark gallery-spark-2" />
                <span className="gallery-spark gallery-spark-3" />
                <span className="gallery-spark gallery-spark-4" />
              </div>

              {/* Caption */}
              <div className="text-center max-w-lg">
                <p className="text-white font-semibold text-sm">{items[index].title}</p>
                <p className="text-white/60 text-xs mt-1 leading-relaxed">{items[index].description}</p>
              </div>

              {/* Carousel nav */}
              {items.length > 1 && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={prev}
                    className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-white/70 text-sm font-medium tabular-nums">
                    {index + 1} / {items.length}
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
