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
import detailsImg from '../../imports/details.jpeg';
import details75mImg from '../../imports/details 75 m.jpeg';

export interface ApartmentType {
  id: string;
  name: string;
  category: 'appartement' | 'studio' | 'magasin';
  images: string[];
  status: 'disponible' | 'vendu';
  floor?: number;
  surface?: number;
  surfaceLabel?: string;
}

interface RealEstateState {
  currentView: 'facade' | 'types' | 'virtual-visit';
  selectedApartment: ApartmentType | null;
  isLoading: boolean;
  showHero: boolean;
  apartmentTypes: ApartmentType[];
  facadeApartments: ApartmentType[];
  facadeMagasins: ApartmentType[];
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
    images: [appartement1A, appartement1B, details75mImg],
    status: 'disponible',
  },
  {
    id: 'appartement-2',
    name: 'Appartement 2',
    category: 'appartement',
    images: [appartement2A, appartement2B, detailsImg],
    status: 'disponible',
  },
  {
    id: 'studio-1',
    name: 'Studio 1',
    category: 'studio',
    images: [studio1A, studio1B],
    status: 'disponible',
    surfaceLabel: '57 m² + 20 m² terrasse',
  },
  {
    id: 'studio-2',
    name: 'Studio 3',
    category: 'studio',
    images: [studio2A, studio2B],
    status: 'disponible',
    surfaceLabel: '54 m² + 20 m² terrasse',
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
    images: [appartement1A, appartement1B, details75mImg],
    status: 'disponible',
    floor: 1,
    surface: 75,
  },
  {
    id: 'P102',
    name: 'P102',
    category: 'appartement',
    images: [appartement2A, appartement2B, detailsImg],
    status: 'disponible',
    floor: 1,
    surface: 83,
  },
  {
    id: 'P103',
    name: 'P103',
    category: 'appartement',
    images: [appartement1A, appartement1B, details75mImg],
    status: 'disponible',
    floor: 1,
    surface: 75,
  },
  {
    id: 'P104',
    name: 'P104',
    category: 'appartement',
    images: [appartement2A, appartement2B, detailsImg],
    status: 'disponible',
    floor: 1,
    surface: 83,
  },
  {
    id: 'P201',
    name: 'P201',
    category: 'appartement',
    images: [appartement1A, appartement1B, details75mImg],
    status: 'disponible',
    floor: 2,
    surface: 75,
  },
  {
    id: 'P202',
    name: 'P202',
    category: 'appartement',
    images: [appartement2A, appartement2B, detailsImg],
    status: 'disponible',
    floor: 2,
    surface: 83,
  },
  {
    id: 'P203',
    name: 'P203',
    category: 'appartement',
    images: [appartement1A, appartement1B, details75mImg],
    status: 'disponible',
    floor: 2,
    surface: 75,
  },
  {
    id: 'P204',
    name: 'P204',
    category: 'appartement',
    images: [appartement2A, appartement2B, detailsImg],
    status: 'disponible',
    floor: 2,
    surface: 83,
  },
  {
    id: 'P301',
    name: 'P301',
    category: 'appartement',
    images: [appartement1A, appartement1B, details75mImg],
    status: 'disponible',
    floor: 3,
    surface: 75,
  },
  {
    id: 'P302',
    name: 'P302',
    category: 'appartement',
    images: [appartement2A, appartement2B, detailsImg],
    status: 'disponible',
    floor: 3,
    surface: 83,
  },
  {
    id: 'P303',
    name: 'P303',
    category: 'appartement',
    images: [appartement1A, appartement1B, details75mImg],
    status: 'disponible',
    floor: 3,
    surface: 75,
  },
  {
    id: 'P304',
    name: 'P304',
    category: 'appartement',
    images: [appartement2A, appartement2B, detailsImg],
    status: 'disponible',
    floor: 3,
    surface: 83,
  },
];

// Magasins au rez-de-chaussee
const facadeMagasins: ApartmentType[] = [
  {
    id: 'magasin-1',
    name: 'Magasin 1',
    category: 'magasin',
    images: [],
    status: 'disponible',
    floor: 0,
    surfaceLabel: '21 m² mezz.\n+ 43 m² garage',
  },
  {
    id: 'magasin-2',
    name: 'Magasin 2',
    category: 'magasin',
    images: [],
    status: 'disponible',
    floor: 0,
    surfaceLabel: '21 m² mezz.\n+ 43 m² garage',
  },
  {
    id: 'magasin-3',
    name: 'Magasin 3',
    category: 'magasin',
    images: [],
    status: 'disponible',
    floor: 0,
    surfaceLabel: '21 m² mezz.\n+ 43 m² garage',
  },
];

export const useRealEstateStore = create<RealEstateState>((set) => ({
  currentView: 'facade',
  selectedApartment: null,
  isLoading: true,
  showHero: true,
  apartmentTypes,
  facadeApartments,
  facadeMagasins,
  facadeImages: [facadePrincipale, facadeArriere],
  setCurrentView: (view) => set({ currentView: view }),
  setSelectedApartment: (apartment) => set({ selectedApartment: apartment }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setShowHero: (show) => set({ showHero: show }),
}));
