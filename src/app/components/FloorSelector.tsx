import { motion } from 'motion/react';
import { useRealEstateStore } from '../store/useRealEstateStore';
import { Building, Building2, Eye } from 'lucide-react';

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
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="fixed bottom-4 left-4 right-4 sm:left-8 sm:right-auto sm:top-1/2 sm:-translate-y-1/2 z-30"
    >
      <div className="bg-slate-950/90 backdrop-blur-xl rounded-2xl border border-amber-400/20 p-2 sm:p-3 shadow-2xl overflow-hidden">
        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-x-visible pb-1 sm:pb-0 scrollbar-hide">
          {floors.map((floor) => {
            const isActive = floor.id === 'facade' ? currentFloor === null : currentFloor === floor.id;
            const Icon = floor.id === 'facade' ? Eye : Building2;

            return (
              <motion.button
                key={floor.id}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFloorClick(floor.id)}
                className={`
                  group relative flex items-center gap-2 sm:gap-3 px-4 py-2 sm:py-3 rounded-xl transition-all flex-shrink-0
                  ${isActive
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/50'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }
                `}
              >
                <Icon className="size-4 sm:size-5 shrink-0" />

                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  {floor.name}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeFloor"
                    className="absolute inset-0 bg-amber-400 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {floor.apartments.length > 0 && (
                  <span
                    className={`
                      ml-auto flex items-center justify-center min-w-[18px] h-4.5 px-1 rounded-full text-[10px] sm:text-xs font-bold
                      ${isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-400 text-slate-950'}
                    `}
                  >
                    {floor.apartments.length}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="hidden sm:block mt-4 pt-4 border-t border-white/20">
          <div className="text-center space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Vue actuelle</p>
            <p className="text-sm font-medium text-amber-400">
              {currentFloor ? floors.find(f => f.id === currentFloor)?.displayName : 'Façade'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
