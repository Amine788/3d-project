import { useEffect } from 'react';
import { useRealEstateStore } from './store/useRealEstateStore';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BuildingViewer from './components/BuildingViewer';
import FacadeViewer from './components/FacadeViewer';
import FloorSelector from './components/FloorSelector';
import ApartmentPhotoViewer from './components/ApartmentPhotoViewer';
import ContactSection from './components/ContactSection';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const { isLoading, showHero, currentView, setIsLoading } = useRealEstateStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <div className="size-full bg-slate-950 overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <div key="main" className="size-full">
            <Navbar />

            <AnimatePresence mode="wait">
              {showHero ? (
                <HeroSection key="hero" />
              ) : (
                <div key="viewer" className="h-full pt-20">
                  <FloorSelector />
                  {currentView === 'facade' ? (
                    <FacadeViewer key="facade" />
                  ) : (
                    <BuildingViewer key="floor" />
                  )}
                  <ContactSection />
                </div>
              )}
            </AnimatePresence>

            <ApartmentPhotoViewer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
