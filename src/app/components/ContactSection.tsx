import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactSection() {
  return (
    <div className="fixed bottom-0 right-0 z-20 m-4 sm:m-8">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-950/90 backdrop-blur-xl rounded-2xl border border-amber-400/20 p-6 shadow-2xl max-w-sm"
      >
        <h3 className="text-lg font-medium text-white mb-4">Contact & Localisation</h3>
        <div className="space-y-3">
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
              <p className="text-xs text-slate-400">Cliquez pour ouvrir</p>
            </div>
          </motion.a>

          <div className="flex items-center gap-3">
            <Phone className="size-5 text-amber-400 shrink-0" />
            <p className="text-sm text-white">+212 636-232187</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="size-5 text-amber-400 shrink-0" />
            <p className="text-sm text-white">contact@hbarealties.com</p>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="size-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-white">Lun - Sam: 9h - 18h</p>
              <p className="text-xs text-slate-400">Dimanche: Sur rendez-vous</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
