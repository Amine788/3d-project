import { motion } from 'motion/react';
import { useRealEstateStore } from '../store/useRealEstateStore';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FacadeViewer() {
  const { facadeImages, setCurrentFloor } = useRealEstateStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  useEffect(() => {
    if (facadeImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % facadeImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [facadeImages.length]);

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
        <div className="relative w-full h-full">
          <motion.img
            ref={imageRef}
            key={currentImageIndex}
            src={facadeImages[currentImageIndex]}
            alt="Façade du bâtiment"
            className="w-full h-full object-contain"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none" />

          {/* Boutons d'étages sur la façade */}
          <div className="absolute inset-0">
            {[
              { id: 'r+3', label: 'R+3', top: '28%', mobileTop: '41%', delay: 0.5 },
              { id: 'r+2', label: 'R+2', top: '44%', mobileTop: '47%', delay: 0.6 },
              { id: 'r+1', label: 'R+1', top: '60%', mobileTop: '53%', delay: 0.7 },
              { id: 'rdc', label: 'RDC', top: '76%', mobileTop: '59%', delay: 0.8 },
              { id: 'sous-sol', label: 'S-SOL', top: '88%', mobileTop: '65%', delay: 0.9 },
            ].map((btn) => (
              <motion.button
                key={btn.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: btn.delay }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentFloor(btn.id)}
                className="absolute group left-1/2 -translate-x-1/2"
                style={{
                  top: window.innerWidth < 640 ? btn.mobileTop : btn.top,
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: btn.delay,
                  }}
                  className="absolute inset-0 rounded-lg blur-xl bg-slate-950 -z-10"
                />
                <div className="px-3 py-1 rounded-lg bg-slate-950 border border-white/40 flex items-center justify-center shadow-xl backdrop-blur-sm">
                  <span className="text-white font-bold text-[10px] sm:text-xs">{btn.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

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
          VUE <span className="text-amber-400 font-medium">FAÇADE</span>
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute top-20 right-8 bg-slate-950/90 backdrop-blur-xl px-4 py-3 rounded-xl border border-white/10 shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-xs text-slate-400 mb-1">Projet</p>
        <p className="text-sm text-amber-400 font-medium">HAY SALAM</p>
      </motion.div>
    </div>
  );
}
