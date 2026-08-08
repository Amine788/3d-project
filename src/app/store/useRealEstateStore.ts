import { create } from 'zustand';
import facadePrincipale from '../../imports/facade-principale.jpg';
import facadeArriere from '../../imports/facade-arriere.jpg';
import appartement1A from '../../imports/types/appartement1-a.jpg';
import appartement1B from '../../imports/types/appartement1-b.jpg';
import appartement2A from '../../imports/types/appartement2-a.jpg';
import appartement2B from '../../imports/types/appartement2-b.jpg';
import studio1A from '../../imports/types/studio1-a.jpg';
import studio1B from '../../imports/types/studio1-b.jpg';
import studio2A from '../../imports/types/studio2-a.jpg';
import studio2B from '../../imports/types/studio2-b.jpg';
import studio3A from '../../imports/types/studio3-a.jpg';
import studio3B from '../../imports/types/studio3-b.jpg';
import studio4A from '../../imports/types/studio4-a.jpg';
import studio4B from '../../imports/types/studio4-b.jpg';

export interface ApartmentType {
  id: string;
  name: string;
  category: 'appartement' | 'studio';
  images: string[];
  status: 'disponible' | 'vendu';
  floor?: number;
  surface?: number;
}

interface RealEstateState {
  currentView: 'facade' | 'types' | 'virtual-visit';
  selectedApartment: ApartmentType | null;
  isLoading: boolean;
  showHero: boolean;
  apartmentTypes: ApartmentType[];
  facadeApartments: ApartmentType[];
  facadeImages: string[];
  setCurrentView: (view: 'facade' | 'types' | 'virtual-visit') => void;
  setSelectedApartment: (apartment: ApartmentType | null) => void;
  setIsLoading: (loading: boolean) => void;
  setShowHero: (show: boolean) => void;
}

// Types de logements du projet CASABLANCA
const apartmentTypes: ApartmentType[] = [
  {
    id: 'appartement-1',
    name: 'Appartement 1',
    category: 'appartement',
    images: [appartement1A, appartement1B],
    status: 'disponible',
  },
  {
    id: 'appartement-2',
    name: 'Appartement 2',
    category: 'appartement',
    images: [appartement2A, appartement2B],
    status: 'disponible',
  },
  {
    id: 'studio-1',
    name: 'Studio 1',
    category: 'studio',
    images: [studio1A, studio1B],
    status: 'disponible',
  },
  {
    id: 'studio-2',
    name: 'Studio 2',
    category: 'studio',
    images: [studio2A, studio2B],
    status: 'disponible',
  },
  {
    id: 'studio-3',
    name: 'Studio 3',
    category: 'studio',
    images: [studio3A, studio3B],
    status: 'disponible',
  },
  {
    id: 'studio-4',
    name: 'Studio 4',
    category: 'studio',
    images: [studio4A, studio4B],
    status: 'disponible',
  },
];

// Appartements numerotes positionnes sur les facades (PR et ARR)
const facadeApartments: ApartmentType[] = [
  {
    id: 'P101',
    name: 'P101',
    category: 'appartement',
    images: [appartement1A, appartement1B],
    status: 'disponible',
    floor: 1,
    surface: 73,
  },
  {
    id: 'P102',
    name: 'P102',
    category: 'appartement',
    images: [appartement2A, appartement2B],
    status: 'disponible',
    floor: 1,
    surface: 83,
  },
  {
    id: 'P201',
    name: 'P201',
    category: 'appartement',
    images: [appartement1A, appartement1B],
    status: 'disponible',
    floor: 2,
  },
  {
    id: 'P202',
    name: 'P202',
    category: 'appartement',
    images: [appartement2A, appartement2B],
    status: 'disponible',
    floor: 2,
  },
  {
    id: 'P301',
    name: 'P301',
    category: 'appartement',
    images: [appartement1A, appartement1B],
    status: 'disponible',
    floor: 3,
  },
  {
    id: 'P302',
    name: 'P302',
    category: 'appartement',
    images: [appartement2A, appartement2B],
    status: 'disponible',
    floor: 3,
  },
];

export const useRealEstateStore = create<RealEstateState>((set) => ({
  currentView: 'facade',
  selectedApartment: null,
  isLoading: true,
  showHero: true,
  apartmentTypes,
  facadeApartments,
  facadeImages: [facadePrincipale, facadeArriere],
  setCurrentView: (view) => set({ currentView: view }),
  setSelectedApartment: (apartment) => set({ selectedApartment: apartment }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setShowHero: (show) => set({ showHero: show }),
}));
