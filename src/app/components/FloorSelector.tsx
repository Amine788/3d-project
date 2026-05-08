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
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30"
    >
      <div className="bg-slate-950/90 backdrop-blur-xl rounded-2xl border border-amber-400/20 p-3 shadow-2xl">
        <div className="space-y-2">
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
                  group relative flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all
                  ${isActive
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/50'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }
                `}
              >
                <Icon className="size-5 shrink-0" />

                <motion.span
                  className="text-sm font-medium whitespace-nowrap"
                  initial={{ opacity: 1, width: 'auto' }}
                >
                  {floor.name}
                </motion.span>

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
                      ml-auto flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold
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

        <div className="mt-4 pt-4 border-t border-white/20">
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
