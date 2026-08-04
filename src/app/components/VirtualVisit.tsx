import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Camera, 
  Move,
  ArrowUp,
  MousePointer2
} from 'lucide-react';
import { useRealEstateStore } from '../store/useRealEstateStore';

// Imports des images
import facadeImg from '../../imports/facade-principale.jpg';
import salon1 from '../../imports/virtual_visit/entree-salon/page-0009.jpg';
import salon4 from '../../imports/virtual_visit/entree-salon/page-0012.jpg';
import cuisine1 from '../../imports/virtual_visit/cuisine/page-0016.jpg';
import enfant1 from '../../imports/virtual_visit/chambre-enfant/page-0025.jpg';
import suite1 from '../../imports/virtual_visit/suite/page-0020.jpg';
import sdb1 from '../../imports/virtual_visit/sdb/page-0029.jpg';

interface Hotspot {
  x: number;
  y: number;
  targetId: string;
  label: string;
}

interface Scene {
  id: string;
  title: string;
  description: string;
  image: string;
  hotspots: Hotspot[];
}

const TOUR_SCENES: Scene[] = [
  {
    id: 'facade',
    title: 'Extérieur Résidence',
    description: 'Cliquez sur l\'entrée pour pénétrer dans le bâtiment.',
    image: facadeImg,
    hotspots: [{ x: 50, y: 65, targetId: 'entree', label: 'Entrer' }]
  },
  {
    id: 'entree',
    title: 'Hall d\'entrée',
    description: 'Regardez autour de vous pour découvrir l\'espace d\'accueil.',
    image: salon1,
    hotspots: [{ x: 60, y: 50, targetId: 'salon', label: 'Salon' }]
  },
  {
    id: 'salon',
    title: 'Le Grand Salon',
    description: 'Espace de vie principal. Utilisez votre souris pour explorer.',
    image: salon4,
    hotspots: [
      { x: 80, y: 55, targetId: 'cuisine', label: 'Cuisine' },
      { x: 20, y: 55, targetId: 'couloir', label: 'Chambres' }
    ]
  },
  {
    id: 'cuisine',
    title: 'Cuisine',
    description: 'Cuisine moderne équipée.',
    image: cuisine1,
    hotspots: [{ x: 10, y: 60, targetId: 'salon', label: 'Retour' }]
  },
  {
    id: 'couloir',
    title: 'Dégagement',
    description: 'Accès aux pièces d\'eau et chambres.',
    image: enfant1,
    hotspots: [
      { x: 50, y: 50, targetId: 'suite', label: 'Suite' },
      { x: 50, y: 90, targetId: 'salon', label: 'Salon' }
    ]
  },
  {
    id: 'suite',
    title: 'Suite Parentale',
    description: 'Chambre de maître avec vue.',
    image: suite1,
    hotspots: [{ x: 50, y: 90, targetId: 'couloir', label: 'Sortir' }]
  }
];

export default function VirtualVisit() {
  const { setCurrentView } = useRealEstateStore();
  const [currentId, setCurrentId] = useState('facade');
  const [isMoving, setIsMoving] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentScene = TOUR_SCENES.find(s => s.id === currentId) || TOUR_SCENES[0];

  // Effet de caméra 360° simulé par le mouvement de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX / width - 0.5) * 40; // Amplitude de rotation X
      const y = (e.clientY / height - 0.5) * 20; // Amplitude de rotation Y
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navigateTo = (targetId: string) => {
    setIsMoving(true);
    setTimeout(() => {
      setCurrentId(targetId);
      setIsMoving(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black overflow-hidden flex flex-col"
      ref={containerRef}
    >
      {/* VR HUD */}
      <div className="absolute top-8 left-8 z-40 flex items-center gap-4 bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <Camera className="text-white size-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-white font-bold text-xs tracking-widest uppercase">Mode Exploration 360°</h2>
          <p className="text-white/40 text-[10px] tracking-tight">{currentScene.title}</p>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-40 flex gap-2">
        <button 
          onClick={() => setCurrentView('facade')}
          className="p-3 bg-red-500/20 backdrop-blur-xl border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/40 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* VR Engine Canvas */}
      <div className="flex-1 relative perspective-1000 overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            className="absolute inset-[-10%] w-[120%] h-[120%]"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ 
              opacity: 1, 
              scale: isMoving ? 2 : 1,
              x: -mousePos.x * 2, // Effet de parallaxe horizontal
              y: -mousePos.y * 2, // Effet de parallaxe vertical
              rotateY: mousePos.x * 0.1, // Légère inclinaison 3D
              rotateX: -mousePos.y * 0.1,
            }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ 
              x: { type: 'spring', stiffness: 50, damping: 20 },
              y: { type: 'spring', stiffness: 50, damping: 20 },
              opacity: { duration: 0.8 },
              scale: { duration: 1 }
            }}
          >
            <img
              src={currentScene.image}
              className="w-full h-full object-cover select-none pointer-events-none"
              alt=""
            />
            {/* Ambient Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
          </motion.div>
        </AnimatePresence>

        {/* VR Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-40">
          <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]" />
          </div>
        </div>

        {/* Interactive Hotspots */}
        {!isMoving && (
          <div 
            className="absolute inset-0 z-30"
            style={{ 
              transform: `translateX(${-mousePos.x * 2.5}px) translateY(${-mousePos.y * 2.5}px)` 
            }}
          >
            {currentScene.hotspots.map((spot, idx) => (
              <motion.div
                key={`${currentId}-spot-${idx}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
              >
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping scale-150" />
                <button
                  onClick={() => navigateTo(spot.targetId)}
                  className="relative w-14 h-14 rounded-full border-2 border-white bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group-hover:scale-125"
                >
                  <ArrowUp size={24} className="group-hover:translate-y-[-4px] transition-transform" />
                  
                  {/* Floating VR Label */}
                  <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-2xl border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 whitespace-nowrap">
                    <p className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">{spot.label}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Guidance Overlay */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-2xl px-10 py-6 rounded-[2rem] border border-white/10 text-center"
          >
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">{currentScene.title}</h1>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Mouvements capturés</p>
            
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-white/60">
                <MousePointer2 size={14} className="animate-bounce" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Glisser pour regarder</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2 text-white/60">
                <Move size={14} className="animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Cliquez pour avancer</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  );
}
