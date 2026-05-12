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
          const isSold = !apartment.available;
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
                {/* Glow effect - only for available */}
                {!isSold && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                    className="absolute inset-0 rounded-xl blur-2xl bg-green-400 -z-10"
                    style={{ width: '80px', height: '80px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                  />
                )}

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`relative size-8 sm:size-12 rounded-full flex flex-col items-center justify-center border backdrop-blur-md shadow-2xl transition-all ${
                    isSold
                      ? 'bg-red-900/80 border-red-500/60 group-hover:border-red-400'
                      : 'bg-slate-950/80 border-green-400/60 group-hover:border-green-400'
                  }`}
                >
                  <span className={`text-[7px] sm:text-[9px] font-bold uppercase tracking-tighter ${
                    isSold ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {isSold ? 'VENDU' : 'DISPO'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {apartment.number}
                  </span>

                  {!isSold && (
                    <motion.div
                      className="absolute -inset-1 rounded-full border border-green-400/40"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>

                {/* Tooltip on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  whileHover={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap bg-slate-900/95 backdrop-blur-2xl px-4 py-2.5 rounded-2xl border border-white/10 pointer-events-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`size-2 rounded-full ${isSold ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`} />
                    <p className={`text-xs font-bold tracking-wider uppercase ${isSold ? 'text-red-400' : 'text-green-400'}`}>
                      {isSold ? 'Vendu' : 'Disponible'}
                    </p>
                  </div>
                  <p className="text-xs text-amber-400 font-bold tracking-wider uppercase mb-1">Appartement {apartment.number}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-white font-medium">{apartment.surface} m²</p>
                    <div className="w-px h-3 bg-white/20" />
                    <p className="text-sm text-white font-medium">{apartment.bedrooms} Ch</p>
                  </div>
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
        <p className="text-sm text-white font-light tracking-wider flex items-center gap-3">
          {floor.displayName}
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-green-500 inline-block" />
            <span className="text-green-400 font-medium">
              {floor.apartments.filter((a) => a.available).length} disponible{floor.apartments.filter((a) => a.available).length > 1 ? 's' : ''}
            </span>
          </span>
          {floor.apartments.filter((a) => !a.available).length > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-red-500 inline-block" />
              <span className="text-red-400 font-medium">
                {floor.apartments.filter((a) => !a.available).length} vendu{floor.apartments.filter((a) => !a.available).length > 1 ? 's' : ''}
              </span>
            </span>
          )}
        </p>
      </motion.div>
    </div>
  );
}
