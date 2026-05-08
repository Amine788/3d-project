import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-amber-50 to-slate-100"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-8 inline-block"
          style={{ color: '#B4955E' }}
        >
          <Building2 className="size-16" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold tracking-wider text-slate-900" style={{ color: '#B4955E' }}>
            HAY SALAM
          </h2>
          <div className="flex gap-1.5 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="size-2 rounded-full"
                style={{
                  background: i === 1 ? '#B4955E' : '#1a1a1a'
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
