import { create } from 'zustand';
import facadeImage from '../../imports/facade_vue_de_face_.png';
import facadeImage2 from '../../imports/facade_.png';
import plan1erEtage from '../../imports/1er_etage_avec_3_appartement_.png';
import plan2emeEtage from '../../imports/2_eme_etage.png';
import app103Image from '../../imports/appartement_n_103.png';
import app101Image from '../../imports/appartement_n_101.png';
import app102Image from '../../imports/appartement_n_102.png';
import plan2emeEtage from '../../imports/2_eme_etage.png';
import app201Image from '../../imports/n_201.png';
import app202Image from '../../imports/n_202.png';
import app203Image from '../../imports/n_203.png';
import plan3emeEtage from '../../imports/3_eme_etage_.png';
import app301Image from '../../imports/n_301.png';
import app302Image from '../../imports/n302.png';
import planRDC from '../../imports/rez_de_chaussez.png';
import planSousSol from '../../imports/sous_sol_.png';
import app201Image from '../../imports/n_201.png';
import app202Image from '../../imports/n_202.png';
import app203Image from '../../imports/n_203.png';

export interface Apartment {
  id: string;
  number: string;
  floor: number;
  surface: number;
  bedrooms: number;
  price: number;
  available: boolean;
  images: string[];
  position: { x: number; y: number };
  color?: string;
}

export interface Floor {
  id: string;
  name: string;
  displayName: string;
  image: string | null;
  apartments: Apartment[];
}

interface RealEstateState {
  currentView: 'facade' | 'floor' | 'virtual-visit';
  currentFloor: string | null;
  selectedApartment: Apartment | null;
  isLoading: boolean;
  showHero: boolean;
  floors: Floor[];
  facadeImages: string[];
  setCurrentView: (view: 'facade' | 'floor') => void;
  setCurrentFloor: (floor: string | null) => void;
  setSelectedApartment: (apartment: Apartment | null) => void;
  setIsLoading: (loading: boolean) => void;
  setShowHero: (show: boolean) => void;
}

// Données réelles du projet HAY SALAM
const realFloors: Floor[] = [
  {
    id: 'facade',
    name: 'Façade',
    displayName: 'Vue Façade',
    image: facadeImage,
    apartments: []
  },
  {
    id: 'sous-sol',
    name: 'Sous-sol',
    displayName: 'Sous-sol',
    image: planSousSol,
    apartments: [
      {
        id: 'commerce-ss1',
        number: 'C-1',
        floor: -1,
        surface: 44,
        bedrooms: 0,
        price: 0,
        available: true,
        images: [planSousSol],
        position: { x: 50, y: 40 },
        color: 'blue'
      },
      {
        id: 'commerce-ss2',
        number: 'C-2',
        floor: -1,
        surface: 73,
        bedrooms: 0,
        price: 0,
        available: true,
        images: [planSousSol],
        position: { x: 50, y: 48 },
        color: 'blue'
      },
      {
        id: 'commerce-ss3',
        number: 'C-3',
        floor: -1,
        surface: 83,
        bedrooms: 0,
        price: 0,
        available: true,
        images: [planSousSol],
        position: { x: 50, y: 56 },
        color: 'blue'
      }
    ]
  },
  {
    id: 'rdc',
    name: 'RDC',
    displayName: 'Rez-de-chaussée',
    image: planRDC,
    apartments: [
      {
        id: 'commerce-rdc1',
        number: 'C-1',
        floor: 0,
        surface: 0,
        bedrooms: 0,
        price: 0,
        available: true,
        images: [planRDC],
        position: { x: 50, y: 40 },
        color: 'cyan'
      },
      {
        id: 'commerce-rdc2',
        number: 'C-2',
        floor: 0,
        surface: 0,
        bedrooms: 0,
        price: 0,
        available: true,
        images: [planRDC],
        position: { x: 50, y: 48 },
        color: 'cyan'
      },
      {
        id: 'commerce-rdc3',
        number: 'C-3',
        floor: 0,
        surface: 0,
        bedrooms: 0,
        price: 0,
        available: true,
        images: [planRDC],
        position: { x: 50, y: 56 },
        color: 'cyan'
      }
    ]
  },
  {
    id: 'r+1',
    name: 'R+1',
    displayName: '1er Étage',
    image: plan1erEtage,
    apartments: [
      {
        id: 'app-103',
        number: '103',
        floor: 1,
        surface: 75,
        bedrooms: 2,
        price: 0,
        available: true,
        images: [app103Image, plan1erEtage],
        position: { x: 50, y: 38 },
        color: 'beige'
      },
      {
        id: 'app-101',
        number: '101',
        floor: 1,
        surface: 90,
        bedrooms: 2,
        price: 0,
        available: true,
        images: [app101Image, plan1erEtage],
        position: { x: 24, y: 58 },
        color: 'pink'
      },
      {
        id: 'app-102',
        number: '102',
        floor: 1,
        surface: 85,
        bedrooms: 2,
        price: 0,
        available: true,
        images: [app102Image, plan1erEtage],
        position: { x: 50, y: 58 },
        color: 'yellow'
      }
    ]
  },
  {
    id: 'r+2',
    name: 'R+2',
    displayName: '2ème Étage',
    image: plan2emeEtage,
    apartments: [
      {
        id: 'app-201',
        number: '201',
        floor: 2,
        surface: 88,
        bedrooms: 2,
        price: 0,
        available: true,
        images: [app201Image, plan2emeEtage],
        position: { x: 24, y: 58 },
        color: 'beige'
      },
      {
        id: 'app-202',
        number: '202',
        floor: 2,
        surface: 92,
        bedrooms: 3,
        price: 0,
        available: true,
        images: [app202Image, plan2emeEtage],
        position: { x: 50, y: 58 },
        color: 'yellow'
      },
      {
        id: 'app-203',
        number: '203',
        floor: 2,
        surface: 95,
        bedrooms: 3,
        price: 0,
        available: true,
        images: [app203Image, plan2emeEtage],
        position: { x: 50, y: 38 },
        color: 'pink'
      }
    ]
  },
  {
    id: 'r+3',
    name: 'R+3',
    displayName: '3ème Étage',
    image: plan3emeEtage,
    apartments: [
      {
        id: 'app-301',
        number: '301',
        floor: 3,
        surface: 95,
        bedrooms: 3,
        price: 0,
        available: true,
        images: [app301Image, plan3emeEtage],
        position: { x: 35, y: 50 },
        color: 'beige'
      },
      {
        id: 'app-302',
        number: '302',
        floor: 3,
        surface: 88,
        bedrooms: 2,
        price: 0,
        available: true,
        images: [app302Image, plan3emeEtage],
        position: { x: 65, y: 40 },
        color: 'pink'
      }
    ]
  }
];

export const useRealEstateStore = create<RealEstateState>((set) => ({
  currentView: 'facade',
  currentFloor: null,
  selectedApartment: null,
  isLoading: true,
  showHero: true,
  floors: realFloors,
  facadeImages: [facadeImage, facadeImage2],
  setCurrentView: (view) => set({ currentView: view }),
  setCurrentFloor: (floor) => set({ currentFloor: floor, currentView: floor ? 'floor' : 'facade' }),
  setSelectedApartment: (apartment) => set({ selectedApartment: apartment }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setShowHero: (show) => set({ showHero: show }),
}));
