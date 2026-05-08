import { motion } from 'motion/react';
import { useRealEstateStore } from '../store/useRealEstateStore';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BuildingViewer() {
  const { currentFloor, floors, setSelectedApartment } = useRealEstateStore();
  const floor = floors.find(f => f.id === currentFloor);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [currentFloor]);

  if (!floor || !floor.image) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-white text-lg">Plan non disponible</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-full">
        <div className="relative w-full h-full">
          <motion.img
            ref={imageRef}
            key={currentFloor}
            src={floor.image}
            alt={floor.displayName}
            className="w-full h-full object-contain"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-slate-950/20 pointer-events-none" />

          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 70%, rgba(251, 191, 36, 0.12) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        {floor.apartments.map((apartment, index) => {
          return (
            <motion.button
              key={apartment.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + (index * 0.15), type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedApartment(apartment)}
              className="absolute group cursor-pointer z-10"
              style={{
                left: `${apartment.position.x}%`,
                top: `${apartment.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.3,
                  }}
                  className="absolute inset-0 rounded-xl blur-2xl bg-amber-400 -z-10"
                  style={{
                    width: '80px',
                    height: '80px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />

                <motion.div
                  whileHover={{
                    boxShadow: '0 0 30px rgba(251, 191, 36, 0.6)',
                  }}
                  className="relative size-14 sm:size-16 rounded-xl flex flex-col items-center justify-center border-2 border-white/80 bg-gradient-to-br from-amber-400 to-amber-500 shadow-xl group-hover:from-amber-500 group-hover:to-amber-600 transition-all"
                >
                  <span className="text-xs font-light text-slate-800 uppercase">
                    APP
                  </span>
                  <span className="text-lg sm:text-xl font-black text-slate-950">
                    {apartment.number}
                  </span>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 size-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center shadow-lg"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className="size-2 rounded-full bg-white"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-slate-950/95 backdrop-blur-xl px-3 py-2 rounded-xl border border-amber-400/40 pointer-events-none shadow-xl"
                >
                  <p className="text-sm text-amber-400 font-bold">App {apartment.number}</p>
                  <p className="text-xs text-white">{apartment.surface}m² • {apartment.bedrooms}ch</p>
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-xl px-6 py-3 rounded-full border border-amber-400/30 shadow-xl"
      >
        <p className="text-sm text-white font-light tracking-wider">
          {floor.displayName} • <span className="text-amber-400 font-medium">
            {floor.apartments.filter((a) => a.available).length}
          </span> disponible{floor.apartments.filter((a) => a.available).length > 1 ? 's' : ''}
        </p>
      </motion.div>
    </div>
  );
}
