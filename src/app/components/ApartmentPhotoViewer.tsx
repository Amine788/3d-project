import { motion, AnimatePresence } from 'motion/react';
import { useRealEstateStore } from '../store/useRealEstateStore';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ApartmentPhotoViewer() {
  const { selectedApartment, setSelectedApartment } = useRealEstateStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (!selectedApartment) return;
    setCurrentImageIndex((prev) =>
      prev === selectedApartment.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    if (!selectedApartment) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedApartment.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (selectedApartment) {
      setCurrentImageIndex(0);
    }
  }, [selectedApartment]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') previousImage();
      if (e.key === 'Escape') setSelectedApartment(null);
    };

    if (selectedApartment) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedApartment, currentImageIndex]);

  if (!selectedApartment) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl"
        onClick={() => setSelectedApartment(null)}
      >
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedApartment(null);
          }}
          className="fixed top-8 right-8 z-50 size-14 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center transition-all shadow-2xl shadow-amber-400/50"
        >
          <X className="size-6 text-slate-950" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-8 left-8 z-50 bg-slate-900/90 backdrop-blur-xl px-6 py-4 rounded-2xl border border-amber-400/30 shadow-2xl"
        >
          <h2 className="text-2xl font-light text-white">
            Appartement <span className="text-amber-400 font-bold">{selectedApartment.number}</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {selectedApartment.surface}m² • {selectedApartment.bedrooms} chambres
          </p>
        </motion.div>

        <div
          className="relative h-full w-full flex items-center justify-center p-20"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateY: 20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative w-full h-full flex items-center justify-center"
              style={{
                perspective: '2000px',
              }}
            >
              <img
                src={selectedApartment.images[currentImageIndex]}
                alt={`Appartement ${selectedApartment.number} - Vue ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              />

              <motion.div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(251, 191, 36, 0.3)',
                    '0 0 100px rgba(251, 191, 36, 0.5)',
                    '0 0 60px rgba(251, 191, 36, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </AnimatePresence>

          {selectedApartment.images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={previousImage}
                className="absolute left-8 top-1/2 -translate-y-1/2 size-16 rounded-full bg-slate-900/90 backdrop-blur-xl border-2 border-amber-400/50 hover:border-amber-400 flex items-center justify-center text-white transition-all shadow-2xl hover:shadow-amber-400/50"
              >
                <ChevronLeft className="size-8" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextImage}
                className="absolute right-8 top-1/2 -translate-y-1/2 size-16 rounded-full bg-slate-900/90 backdrop-blur-xl border-2 border-amber-400/50 hover:border-amber-400 flex items-center justify-center text-white transition-all shadow-2xl hover:shadow-amber-400/50"
              >
                <ChevronRight className="size-8" />
              </motion.button>
            </>
          )}
        </div>

        {selectedApartment.images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-slate-900/90 backdrop-blur-xl px-6 py-3 rounded-full border border-amber-400/30 shadow-2xl"
          >
            {selectedApartment.images.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentImageIndex(index)}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: index === currentImageIndex ? [1, 1.3, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: index === currentImageIndex ? Infinity : 0,
                  }}
                  className={`
                    size-3 rounded-full transition-all
                    ${index === currentImageIndex
                      ? 'bg-amber-400 w-10 shadow-lg shadow-amber-400/50'
                      : 'bg-white/50 hover:bg-white/80'
                    }
                  `}
                />
              </motion.button>
            ))}
            <div className="ml-4 pl-4 border-l border-white/20 flex items-center">
              <span className="text-sm text-white font-light">
                {currentImageIndex + 1} / {selectedApartment.images.length}
              </span>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="fixed bottom-8 right-8 text-slate-500 text-sm"
        >
          <p>← → Navigation • ESC Fermer</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
