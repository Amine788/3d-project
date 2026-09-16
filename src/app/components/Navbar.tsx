import { motion } from 'motion/react';
import { Phone, Menu, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useRealEstateStore } from '../store/useRealEstateStore';
import logoHBA from '../../imports/image-removebg-preview.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <img
              src={logoHBA}
              alt="HBA REALTIES"
              className="h-14 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold tracking-wider text-white">
                CASABLANCA
              </h1>
              <p className="text-xs text-slate-400">promotion immobilière</p>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="https://www.google.com/maps/place/33%C2%B032'37.7%22N+7%C2%B040'21.1%22W/@33.543808,-7.6750889,17z/data=!3m1!4b1!4m4!3m3!8m2!3d33.543808!4d-7.672514?hl=en&entry=ttu&g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full transition-colors border border-white/20"
              title="33°32'37.7&quot;N 7°40'21.1&quot;W - Ouvrir dans Google Maps"
            >
              <MapPin className="size-4 text-amber-400" />
              <span className="text-sm font-medium">Localisation</span>
              <span className="hidden xl:inline text-xs text-slate-300 font-mono">33°32'37.7"N 7°40'21.1"W</span>
            </motion.a>
            <motion.a
              href="tel:+212661733979"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-amber-400 text-slate-950 px-6 py-2.5 rounded-full hover:bg-amber-500 transition-colors"
            >
              <Phone className="size-4" />
              <span className="text-sm font-medium">Contact</span>
            </motion.a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
        >
          <div className="px-4 py-6 space-y-3">
            <a
              href="https://www.google.com/maps/place/33%C2%B032'37.7%22N+7%C2%B040'21.1%22W/@33.543808,-7.6750889,17z/data=!3m1!4b1!4m4!3m3!8m2!3d33.543808!4d-7.672514?hl=en&entry=ttu&g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-colors border border-white/20"
            >
              <MapPin className="size-4 text-amber-400" />
              <span className="text-sm font-medium">Localisation (33°32'37.7"N 7°40'21.1"W)</span>
            </a>
            <a
              href="tel:+212661733979"
              className="w-full flex items-center justify-center gap-2 bg-amber-400 text-slate-950 px-6 py-3 rounded-full hover:bg-amber-500 transition-colors"
            >
              <Phone className="size-4" />
              <span className="text-sm font-medium">Contact</span>
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
