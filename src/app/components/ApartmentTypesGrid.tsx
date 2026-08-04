import { motion } from 'motion/react';
import { useState } from 'react';
import { useRealEstateStore } from '../store/useRealEstateStore';
import { Building2, Home } from 'lucide-react';

type Filter = 'tous' | 'appartement' | 'studio';

export default function ApartmentTypesGrid() {
  const { apartmentTypes, setSelectedApartment } = useRealEstateStore();
  const [filter, setFilter] = useState<Filter>('tous');

  const filteredTypes = apartmentTypes.filter(
    (type) => filter === 'tous' || type.category === filter
  );

  return (
    <div className="h-full w-full overflow-y-auto px-4 sm:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-10">
          <p className="text-sm text-amber-400 tracking-widest uppercase mb-2">CASABLANCA</p>
          <h2 className="text-3xl sm:text-4xl font-light text-white">Nos types de logements</h2>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
          {([
            { id: 'tous', label: 'Tous' },
            { id: 'appartement', label: 'Appartements' },
            { id: 'studio', label: 'Studios' },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                filter === tab.id
                  ? 'bg-amber-400 text-slate-950 border-amber-400'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTypes.map((type, index) => {
            const Icon = type.category === 'studio' ? Home : Building2;
            return (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedApartment(type)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 shadow-xl text-left"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={type.images[0]}
                    alt={type.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                  <div>
                    <p className="text-white text-lg font-medium">{type.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Icon className="size-3.5 text-amber-400" />
                      <span className="text-xs text-amber-400 uppercase tracking-wider">
                        {type.category === 'studio' ? 'Studio' : 'Appartement'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
