import { motion, AnimatePresence } from 'motion/react';
import { useRealEstateStore } from '../store/useRealEstateStore';
import { X, Bed, Maximize, DollarSign, Check, MessageCircle, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function ApartmentModal() {
  const { selectedApartment, setSelectedApartment } = useRealEstateStore();
  const [activeTab, setActiveTab] = useState<'details' | 'gallery' | 'contact'>('details');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!selectedApartment) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedApartment.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedApartment.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
        onClick={() => setSelectedApartment(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

          <div className="flex flex-col h-full max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-light text-white">
                  Appartement <span className="text-amber-400">{selectedApartment.number}</span>
                </h2>
                <p className={`text-sm font-bold mt-1 px-3 py-0.5 rounded-full inline-block ${
                  selectedApartment.available 
                    ? 'text-green-400 bg-green-400/10 border border-green-400/20' 
                    : 'text-red-400 bg-red-400/10 border border-red-400/20'
                }`}>
                  {selectedApartment.available ? '• Disponible' : '• Vendu'}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedApartment(null)}
                className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="size-5 text-white" />
              </motion.button>
            </div>

            <div className="flex border-b border-white/10">
              {(['details', 'gallery', 'contact'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative flex-1 px-6 py-4 text-sm font-medium transition-colors
                    ${activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-white'}
                  `}
                >
                  {tab === 'details' && 'Détails'}
                  {tab === 'gallery' && 'Galerie'}
                  {tab === 'contact' && 'Contact'}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <Maximize className="size-6 text-amber-400 mb-2" />
                        <p className="text-2xl font-light text-white">{selectedApartment.surface}m²</p>
                        <p className="text-sm text-slate-400">Surface</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <Bed className="size-6 text-amber-400 mb-2" />
                        <p className="text-2xl font-light text-white">{selectedApartment.bedrooms}</p>
                        <p className="text-sm text-slate-400">Chambres</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <DollarSign className="size-6 text-amber-400 mb-2" />
                        <p className="text-2xl font-light text-white">
                          {selectedApartment.price.toLocaleString()}€
                        </p>
                        <p className="text-sm text-slate-400">Prix</p>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-medium text-white mb-4">Caractéristiques</h3>
                      <ul className="space-y-3">
                        {[
                          'Cuisine équipée moderne',
                          'Salle de bain premium',
                          'Balcon avec vue panoramique',
                          'Climatisation réversible',
                          'Parquet haut de gamme',
                          'Double vitrage',
                          'Interphone vidéo',
                          'Parking inclus',
                        ].map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-3 text-slate-300"
                          >
                            <Check className="size-5 text-amber-400 shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="relative"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden relative bg-slate-950">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={selectedApartment.images[currentImageIndex]}
                          alt={`Vue ${currentImageIndex + 1}`}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>

                      {selectedApartment.images.length > 1 && (
                        <>
                          <button
                            onClick={previousImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-slate-950/80 backdrop-blur-md hover:bg-slate-950/90 flex items-center justify-center text-white transition-colors"
                          >
                            ←
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-slate-950/80 backdrop-blur-md hover:bg-slate-950/90 flex items-center justify-center text-white transition-colors"
                          >
                            →
                          </button>

                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {selectedApartment.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`size-2 rounded-full transition-all ${
                                  index === currentImageIndex
                                    ? 'bg-amber-400 w-8'
                                    : 'bg-white/50 hover:bg-white/80'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'contact' && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Contactez-nous pour cet appartement
                      </h3>
                      <div className="space-y-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl transition-colors"
                        >
                          <MessageCircle className="size-5" />
                          <span className="font-medium">WhatsApp</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-slate-950 px-6 py-4 rounded-xl transition-colors"
                        >
                          <Phone className="size-5" />
                          <span className="font-medium">Appeler</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl transition-colors"
                        >
                          <Mail className="size-5" />
                          <span className="font-medium">Email</span>
                        </motion.button>
                      </div>
                    </div>

                    <div className="bg-amber-400/10 rounded-xl p-6 border border-amber-400/20">
                      <h4 className="text-amber-400 font-medium mb-2">Réservez maintenant</h4>
                      <p className="text-sm text-slate-300">
                        Profitez de nos offres de lancement. Prix spécial garanti pour les premiers acquéreurs.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {selectedApartment.available ? (
              <div className="p-6 border-t border-white/10 bg-slate-950/50">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 px-8 py-4 rounded-xl font-medium transition-colors"
                >
                  Réserver cet appartement
                </motion.button>
              </div>
            ) : (
              <div className="p-6 border-t border-white/10 bg-red-950/20">
                <div className="w-full bg-red-900/40 text-red-400 px-8 py-4 rounded-xl font-bold text-center border border-red-500/30">
                  Cet appartement a déjà été vendu
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
