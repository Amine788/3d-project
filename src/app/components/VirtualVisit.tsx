import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, RotateCcw, Home, Utensils, Bed, Bath, Layout, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRealEstateStore } from '../store/useRealEstateStore';
import { useState, useEffect } from 'react';

// Import des images réelles
import salon1 from '../../imports/virtual_visit/ENTREE ET SALON/page-0009.jpg';
import salon2 from '../../imports/virtual_visit/ENTREE ET SALON/page-0010.jpg';
import salon3 from '../../imports/virtual_visit/ENTREE ET SALON/page-0011.jpg';
import salon4 from '../../imports/virtual_visit/ENTREE ET SALON/page-0012.jpg';
import salon5 from '../../imports/virtual_visit/ENTREE ET SALON/page-0013.jpg';
import salon6 from '../../imports/virtual_visit/ENTREE ET SALON/page-0014.jpg';

import cuisine1 from '../../imports/virtual_visit/CUISINE/page-0016.jpg';
import cuisine2 from '../../imports/virtual_visit/CUISINE/page-0017.jpg';
import cuisine3 from '../../imports/virtual_visit/CUISINE/page-0018.jpg';

import suite1 from '../../imports/virtual_visit/SUITE/page-0020.jpg';
import suite2 from '../../imports/virtual_visit/SUITE/page-0021.jpg';
import suite3 from '../../imports/virtual_visit/SUITE/page-0022.jpg';
import suite4 from '../../imports/virtual_visit/SUITE/page-0023.jpg';

import enfant1 from '../../imports/virtual_visit/CHAMBRE ENFANT/page-0025.jpg';
import enfant2 from '../../imports/virtual_visit/CHAMBRE ENFANT/page-0026.jpg';
import enfant3 from '../../imports/virtual_visit/CHAMBRE ENFANT/page-0027.jpg';

import sdb1 from '../../imports/virtual_visit/SALLE DE BAIN 1 -2/page-0029.jpg';
import sdb2 from '../../imports/virtual_visit/SALLE DE BAIN 1 -2/page-0030.jpg';
import sdb3 from '../../imports/virtual_visit/SALLE DE BAIN 1 -2/page-0032.jpg';
import sdb4 from '../../imports/virtual_visit/SALLE DE BAIN 1 -2/page-0033.jpg';

const ROOMS = [
  {
    id: 'salon',
    name: 'Entrée - Salon',
    icon: Home,
    images: [salon1, salon2, salon3, salon4, salon5, salon6],
    description: 'Un espace de vie spacieux et lumineux pour accueillir vos convives.'
  },
  {
    id: 'cuisine',
    name: 'Cuisine',
    icon: Utensils,
    images: [cuisine1, cuisine2, cuisine3],
    description: 'Cuisine moderne équipée avec des matériaux de haute qualité.'
  },
  {
    id: 'suite',
    name: 'Suite Parentale',
    icon: Layout,
    images: [suite1, suite2, suite3, suite4],
    description: 'Une suite élégante offrant calme et confort absolu.'
  },
  {
    id: 'enfant',
    name: 'Chambre Enfant',
    icon: Bed,
    images: [enfant1, enfant2, enfant3],
    description: 'Un espace ludique et chaleureux pour l\'épanouissement de vos enfants.'
  },
  {
    id: 'sdb',
    name: 'Salles de Bain',
    icon: Bath,
    images: [sdb1, sdb2, sdb3, sdb4],
    description: 'Finitions raffinées et équipements haut de gamme pour votre bien-être.'
  }
];

export default function VirtualVisit() {
  const { setCurrentView } = useRealEstateStore();
  const [currentRoomIdx, setCurrentRoomIdx] = useState(0);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [isImmersive, setIsImmersive] = useState(false);

  const currentRoom = ROOMS[currentRoomIdx];

  const nextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % currentRoom.images.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev - 1 + currentRoom.images.length) % currentRoom.images.length);
  };

  useEffect(() => {
    setCurrentPhotoIdx(0);
  }, [currentRoomIdx]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden"
    >
      {/* Header - More compact and cleaner */}
      <div className={`absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 transition-all duration-500 ${isImmersive ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
        <div className="flex items-center gap-3 sm:gap-4 bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/10">
          <button
            onClick={() => setCurrentView('facade')}
            className="p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <X className="size-5 sm:size-6" />
          </button>
          <div className="pr-4">
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight leading-none mb-1">Visite Virtuelle</h2>
            <p className="text-[10px] sm:text-xs text-amber-400 font-medium uppercase tracking-wider">{currentRoom.name}</p>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/10">
          <p className="px-4 text-[10px] sm:text-xs font-bold text-white tracking-widest">PHOTO {currentPhotoIdx + 1} / {currentRoom.images.length}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative bg-slate-900 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentRoom.id}-${currentPhotoIdx}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-contain bg-center bg-no-repeat sm:bg-cover"
              style={{ 
                backgroundImage: `url(${currentRoom.images[currentPhotoIdx]})`,
              }}
            >
              <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${isImmersive ? 'opacity-0' : 'opacity-100'}`} />
            </div>

            {!isImmersive && (
              <div className="absolute inset-0 flex items-center justify-center p-6 pb-32 sm:pb-0">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10 text-center space-y-4 sm:space-y-6 max-w-lg w-full bg-slate-950/40 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl pointer-events-auto"
                >
                  <div className="w-16 h-16 bg-amber-400/20 border border-amber-400/30 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <currentRoom.icon className="size-8 text-amber-400" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{currentRoom.name}</h1>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed px-4">
                      {currentRoom.description}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsImmersive(true)}
                    className="mt-4 w-full sm:w-auto px-10 py-4 bg-amber-400 text-slate-950 rounded-2xl font-bold text-sm sm:text-base shadow-xl hover:bg-amber-500 transition-all group flex items-center justify-center gap-3 mx-auto"
                  >
                    Explorer en Plein Écran
                    <Layout className="size-4 sm:size-5" />
                  </motion.button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Better visibility and positioning */}
        {currentRoom.images.length > 1 && (
          <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-10 z-40 pointer-events-none transition-opacity duration-500 ${isImmersive ? 'opacity-100' : 'opacity-50 sm:opacity-100'}`}>
            <button
              onClick={prevPhoto}
              className="p-3 sm:p-4 bg-black/40 hover:bg-amber-400 hover:text-slate-950 text-white rounded-2xl backdrop-blur-xl border border-white/10 transition-all pointer-events-auto shadow-2xl"
            >
              <ChevronLeft className="size-6 sm:size-8" />
            </button>
            <button
              onClick={nextPhoto}
              className="p-3 sm:p-4 bg-black/40 hover:bg-amber-400 hover:text-slate-950 text-white rounded-2xl backdrop-blur-xl border border-white/10 transition-all pointer-events-auto shadow-2xl"
            >
              <ChevronRight className="size-6 sm:size-8" />
            </button>
          </div>
        )}

        {/* Room Navigation - Bottom Horizontal Bar for all devices (more organized) */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-3 p-2 bg-slate-950/60 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl max-w-[95vw] overflow-x-auto no-scrollbar transition-all duration-500 ${isImmersive ? 'opacity-0 translate-y-20 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}`}>
          {ROOMS.map((room, idx) => (
            <motion.button
              key={room.id}
              whileHover={{ y: -4 }}
              onClick={() => {
                setCurrentRoomIdx(idx);
                setIsImmersive(false);
              }}
              className={`flex-shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-full transition-all ${
                currentRoomIdx === idx 
                  ? 'bg-amber-400 text-slate-950 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <room.icon className={`size-4 sm:size-5 ${currentRoomIdx === idx ? 'text-slate-950' : 'text-amber-400'}`} />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                {room.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Immersive Controls - Cleaner and more helpful */}
        <AnimatePresence>
          {isImmersive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-slate-950/80 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest">Exploration Immersive</p>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <button 
                onClick={() => setIsImmersive(false)}
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <X className="size-4" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Quitter</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
