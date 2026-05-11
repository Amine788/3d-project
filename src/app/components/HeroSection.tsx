import { motion, useMotionValue, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useRealEstateStore } from '../store/useRealEstateStore';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import logoHBA from '../../imports/image-removebg-preview.png';

export default function HeroSection() {
  const { setShowHero } = useRealEstateStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
      );
    }
  }, []);

  const handleExplore = () => {
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
        onComplete: () => setShowHero(false),
      });
    }
  };

  return (
    <div ref={heroRef} className="fixed inset-0 z-30 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop)',
            transform: 'translateZ(-50px) scale(1.05)',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-amber-50/80 to-slate-100/70 backdrop-blur-sm" />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(180, 149, 94, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(180, 149, 94, 0.25) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(180, 149, 94, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(180, 149, 94, 0.03) 80px, rgba(180, 149, 94, 0.03) 160px)',
          }}
        />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8"
          >
            <img
              src={logoHBA}
              alt="HBA REALTIES"
              className="h-28 sm:h-40 w-auto mx-auto drop-shadow-2xl"
            />
          </motion.div>

          <div className="inline-block px-6 py-2 bg-white/80 backdrop-blur-md rounded-full border-2 border-[#B4955E]/40 shadow-xl">
            <p className="text-sm tracking-widest font-semibold" style={{ color: '#B4955E' }}>
              NOUVELLE RÉSIDENCE PREMIUM
            </p>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-bold tracking-wider text-slate-900" style={{ color: '#B4955E' }}>
              HAY SALAM
            </h1>
            <p className="text-base sm:text-xl text-slate-800 max-w-2xl mx-auto font-light px-4">
              Découvrez une expérience de vie exceptionnelle dans un cadre moderne et élégant
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExplore}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #B4955E 0%, #8B7355 100%)',
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
              }}
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 text-lg font-semibold text-white">
              Explorer HAY SALAM
            </span>
            <ChevronDown className="relative z-10 size-5 group-hover:animate-bounce text-white" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-slate-700 text-xs tracking-widest flex flex-col items-center gap-2 font-semibold"
          >
            <span>SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b to-transparent" style={{ background: 'linear-gradient(to bottom, #B4955E, transparent)' }} />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="size-5 rounded-full border-2 shadow-lg" style={{ borderColor: '#B4955E', boxShadow: '0 0 20px rgba(180, 149, 94, 0.4)' }} />
      </motion.div>
    </div>
  );
}
