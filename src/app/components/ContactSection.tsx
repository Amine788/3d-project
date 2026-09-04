import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ContactSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showContent = !isMobile || isExpanded;

  return (
    <div className="fixed bottom-0 right-0 z-20 m-3 sm:m-8">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-950/95 backdrop-blur-xl rounded-2xl border border-amber-400/20 shadow-2xl overflow-hidden w-[calc(100vw-1.5rem)] max-w-[320px] sm:w-auto sm:max-w-sm"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 sm:p-6 text-left"
        >
          <h3 className="text-sm sm:text-lg font-medium text-white">Contact &amp; Localisation</h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="sm:hidden text-amber-400"
          >
            <ChevronDown className="size-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-3 pb-4 sm:px-6 sm:pb-6 space-y-2 sm:space-y-3 overflow-hidden"
            >
              <motion.a
                href="https://www.google.com/maps/search/?api=1&query=Casablanca,Maroc"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-start gap-2 p-2 sm:p-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 transition-all border border-amber-400/20 hover:border-amber-400/40 cursor-pointer group"
              >
                <MapPin className="size-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm text-white font-medium">📍 Voir sur Google Maps</p>
                  <p className="text-[10px] sm:text-xs text-amber-400/80 mt-0.5">Cliquez pour voir l'adresse</p>
                </div>
              </motion.a>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 sm:size-4 text-amber-400 shrink-0" />
                  <a href="tel:+212661733979" className="text-xs sm:text-sm text-white hover:text-amber-400 transition-colors">+212 661-733979</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 sm:size-4 text-amber-400 shrink-0" />
                  <p className="text-[11px] sm:text-sm text-white break-all">contact@hbarealties.com</p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-white/10">
                <Clock className="size-3.5 sm:size-4 text-amber-400 shrink-0 mt-0.5" />
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
