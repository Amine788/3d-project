import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-20 sm:bottom-0 right-0 z-20 m-4 sm:m-8">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-950/90 backdrop-blur-xl rounded-2xl border border-amber-400/20 shadow-2xl max-w-sm overflow-hidden"
      >
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
        >
          <h3 className="text-base sm:text-lg font-medium text-white">Contact & Localisation</h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="sm:hidden text-amber-400"
          >
            <ChevronDown className="size-5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {(isExpanded || window.innerWidth >= 640) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-6 sm:px-6 sm:pb-6 space-y-3 overflow-hidden"
            >
              <motion.a
                href="https://maps.app.goo.gl/HnAcHVz3pdQyHg2j9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 transition-all border border-amber-400/20 hover:border-amber-400/40 cursor-pointer group"
              >
                <MapPin className="size-5 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-white font-medium">📍 Voir sur Google Maps</p>
                  <p className="text-xs text-amber-400/80 mt-1">Cliquez pour voir l'adresse</p>
                </div>
              </motion.a>

              <div className="grid grid-cols-1 gap-3 sm:block sm:space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="size-4 sm:size-5 text-amber-400 shrink-0" />
                  <p className="text-xs sm:text-sm text-white">+212 636-232187</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-4 sm:size-5 text-amber-400 shrink-0" />
                  <p className="text-xs sm:text-sm text-white">contact@hbarealties.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2 border-t border-white/5 sm:border-0 sm:pt-0">
                <Clock className="size-4 sm:size-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm text-white">Lun - Sam: 9h - 18h</p>
                  <p className="text-[10px] sm:text-xs text-slate-400">Dimanche: Sur rendez-vous</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
