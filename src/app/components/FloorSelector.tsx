import { motion, AnimatePresence } from 'motion/react';
import { useRealEstateStore } from '../store/useRealEstateStore';
import { Building2, Eye, MapPin, Layers } from 'lucide-react';

export default function FloorSelector() {
  const { currentFloor, setCurrentFloor, floors, setCurrentView } = useRealEstateStore();

  const handleFloorClick = (floorId: string) => {
    if (floorId === 'facade') {
      setCurrentView('facade');
      setCurrentFloor(null);
    } else {
      setCurrentFloor(floorId);
    }
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
      className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30"
    >
      <div className="relative">
        {/* Glow effect behind the panel */}
        <div className="absolute -inset-1 bg-gradient-to-b from-amber-400/20 to-transparent blur-2xl opacity-50" />
        
        <div className="relative bg-slate-950/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-4 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col gap-6">
          <div className="flex flex-col items-center gap-1 border-b border-white/5 pb-4">
            <Layers className="size-4 text-amber-400/60" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Niveaux</span>
          </div>

          <div className="flex flex-col gap-3">
            {floors.map((floor, index) => {
              const isActive = floor.id === 'facade' ? currentFloor === null : currentFloor === floor.id;
              const Icon = floor.id === 'facade' ? Eye : Building2;

              return (
                <motion.button
                  key={floor.id}
                  whileHover={{ scale: 1.05, x: 8 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFloorClick(floor.id)}
                  className={`
                    group relative flex items-center gap-4 w-full min-w-[140px] px-4 py-3.5 rounded-2xl transition-all duration-500
                    ${isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_10px_20px_-10px_rgba(251,191,36,0.5)]'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                    }
                  `}
                >
                  <div className={`
                    p-2 rounded-xl transition-colors duration-500
                    ${isActive ? 'bg-slate-950/10' : 'bg-white/5 group-hover:bg-white/10'}
                  `}>
                    <Icon className="size-4 shrink-0" />
                  </div>

                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      {floor.id === 'facade' ? 'Visualiser' : `Niveau ${floors.length - 1 - index}`}
                    </span>
                    <span className="text-sm font-bold whitespace-nowrap">
                      {floor.name}
                    </span>
                  </div>

                  {floor.apartments.length > 0 && (
                    <div className={`
                      ml-auto flex items-center justify-center size-6 rounded-lg text-[10px] font-black border transition-all duration-500
                      ${isActive 
                        ? 'bg-slate-950/20 border-slate-950/10 text-slate-900' 
                        : 'bg-amber-400/10 border-amber-400/20 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950'
                      }
                    `}>
                      {floor.apartments.length}
                    </div>
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute -left-1 top-1/4 bottom-1/4 w-1 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,1)]"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-2 pt-4 border-t border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFloor || 'facade'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-1 text-center"
              >
                <MapPin className="size-3 text-amber-400/40" />
                <p className="text-[10px] font-bold text-amber-400/80 uppercase tracking-tighter">
                  {currentFloor ? floors.find(f => f.id === currentFloor)?.displayName : 'Vue Globale'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
