import { motion } from 'motion/react';
import { useRealEstateStore } from '../store/useRealEstateStore';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

// Position (en % de l'image carree) des boutons d'appartement par facade.
// index 0 = facade principale, index 1 = facade arriere.
const FACADE_MARKER_POSITIONS: Record<number, Record<string, { top: string; left: string }>> = {
  0: {
    P101: { top: '53%', left: '77%' },
    P102: { top: '53%', left: '23%' },
    P201: { top: '40%', left: '77%' },
    P202: { top: '40%', left: '23%' },
    P301: { top: '28%', left: '77%' },
    P302: { top: '28%', left: '23%' },
  },
  1: {
    P104: { top: '57%', left: '23%' },
    P103: { top: '57%', left: '77%' },
    P204: { top: '45%', left: '23%' },
    P203: { top: '45%', left: '77%' },
    P304: { top: '33%', left: '23%' },
    P303: { top: '33%', left: '77%' },
  },
};

// Etage 4 (studios) : studio-1/2 uniquement sur la facade principale (index 0),
// studio-3/4 uniquement sur la facade arriere (index 1).
const FACADE_STUDIO_POSITIONS: Record<number, Record<string, { top: string; left: string }>> = {
  0: {
    'studio-1': { top: '16%', left: '77%' },
    'studio-2': { top: '16%', left: '23%' },
  },
  1: {
    'studio-3': { top: '20%', left: '77%' },
    'studio-1': { top: '20%', left: '23%' },
  },
};

// Magasins RDC : 3 magasins bien positionnes sur les vitrines RDC de chaque facade
const FACADE_MAGASIN_POSITIONS: Record<number, Record<string, { top: string; left: string }>> = {
  0: {
    'magasin-1': { top: '68%', left: '28%' },
    'magasin-2': { top: '68%', left: '43%' },
    'magasin-3': { top: '68%', left: '58%' },
  },
  1: {
    'magasin-1': { top: '72%', left: '24%' },
    'magasin-2': { top: '72%', left: '41%' },
    'magasin-3': { top: '72%', left: '58%' },
  },
};

export default function FacadeViewer() {
  const { facadeImages, facadeApartments, facadeMagasins, apartmentTypes, setSelectedApartment, setCurrentView } =
    useRealEstateStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const markerPositions = {
    ...(FACADE_MARKER_POSITIONS[currentImageIndex] ?? {}),
    ...(FACADE_STUDIO_POSITIONS[currentImageIndex] ?? {}),
  };
  const magasinPositions = FACADE_MAGASIN_POSITIONS[currentImageIndex] ?? {};
  const studios = apartmentTypes.filter((a) => a.category === 'studio');
  const facadeMarkerItems = [...facadeApartments, ...studios];
  const facadeMagasinItems = facadeMagasins.filter((m) => magasinPositions[m.id]);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, rotateY: -20 },
        { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % facadeImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + facadeImages.length) % facadeImages.length);
  };



  return (
    <div
      ref={containerRef}
      className="relative h-full w-full flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.05) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative aspect-square max-w-full max-h-full">
          <motion.img
            ref={imageRef}
            key={currentImageIndex}
            src={facadeImages[currentImageIndex]}
            alt="Façade du bâtiment"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none" />

          {facadeMarkerItems.map((apt) => {
            const pos = markerPositions[apt.id];
            if (!pos) return null;
            return (
              <motion.button
                key={apt.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 250 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedApartment(apt);
                }}
                style={{ top: pos.top, left: pos.left }}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-slate-950/90 backdrop-blur-md border border-amber-400/60 hover:border-amber-400 hover:bg-slate-900 rounded-md px-1.5 py-0.5 shadow-md transition-colors"
              >
                <span className="text-[9px] font-bold text-amber-400 leading-tight whitespace-nowrap">
                  {apt.name}
                </span>
                {(apt.surfaceLabel || apt.surface !== undefined) && (
                  <span className="text-[8px] text-white/80 leading-none whitespace-nowrap">
                    {apt.surfaceLabel ?? `${apt.surface} m²`}
                  </span>
                )}
              </motion.button>
            );
          })}

          {facadeMagasinItems.map((mag) => {
            const pos = magasinPositions[mag.id];
            if (!pos) return null;
            return (
              <motion.button
                key={mag.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 250 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedApartment(mag);
                }}
                style={{ top: pos.top, left: pos.left }}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-slate-950/90 backdrop-blur-md border border-emerald-400/60 hover:border-emerald-400 hover:bg-slate-900 rounded-md px-1.5 py-0.5 shadow-md transition-colors"
              >
                <span className="text-[9px] font-bold text-emerald-400 leading-tight whitespace-nowrap">
                  {mag.name}
                </span>
                {(mag.surfaceLabel || mag.surface !== undefined) && (
                  <span className="text-[8px] text-white/80 leading-tight whitespace-pre-line text-center">
                    {mag.surfaceLabel ?? `${mag.surface} m²`}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentView('types')}
        className="absolute bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-slate-950 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-2xl shadow-amber-400/40 transition-colors"
      >
        <Home className="size-5" />
        <span>Découvrir nos logements</span>
      </motion.button>

      {facadeImages.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevImage}
            className="absolute left-8 top-1/2 -translate-y-1/2 size-12 rounded-full bg-slate-950/80 backdrop-blur-xl border border-amber-400/30 hover:border-amber-400 flex items-center justify-center text-white transition-all shadow-xl hover:shadow-amber-400/50"
          >
            <ChevronLeft className="size-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextImage}
            className="absolute right-8 top-1/2 -translate-y-1/2 size-12 rounded-full bg-slate-950/80 backdrop-blur-xl border border-amber-400/30 hover:border-amber-400 flex items-center justify-center text-white transition-all shadow-xl hover:shadow-amber-400/50"
          >
            <ChevronRight className="size-6" />
          </motion.button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-slate-950/80 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
            {facadeImages.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentImageIndex(index)}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: index === currentImageIndex ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: index === currentImageIndex ? Infinity : 0,
                  }}
                  className={`
                    size-3 rounded-full transition-all
                    ${index === currentImageIndex
                      ? 'bg-amber-400 w-8 shadow-lg shadow-amber-400/50'
                      : 'bg-white/50 hover:bg-white/80'
                    }
                  `}
                />
              </motion.button>
            ))}
          </div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-xl px-8 py-3 rounded-full border border-amber-400/30 shadow-xl"
      >
        <motion.p
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-sm text-white font-light tracking-wider"
        >
          {currentImageIndex === 0 ? (
            <>FAÇADE <span className="text-amber-400 font-semibold">PRINCIPALE</span></>
          ) : (
            <>FAÇADE <span className="text-amber-400 font-semibold">2</span></>
          )}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute top-20 right-8 bg-slate-950/90 backdrop-blur-xl px-4 py-3 rounded-xl border border-white/10 shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-xs text-slate-400 mb-1">Projet</p>
        <p className="text-sm text-amber-400 font-medium">CASABLANCA</p>
      </motion.div>
    </div>
  );
}
