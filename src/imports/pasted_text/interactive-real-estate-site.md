# Prompt — Création d’un site immobilier 3D interactif en React

## Objectif du projet

Créer un site web immobilier moderne et immersif en React avec une expérience pseudo-3D basée sur des images réelles du projet immobilier.

Le site doit permettre aux visiteurs :
- de voir la façade principale du projet,
- de naviguer étage par étage,
- de cliquer sur des boutons interactifs,
- de visualiser les appartements disponibles,
- d’avoir une sensation de visite immersive sans utiliser un vrai moteur 3D lourd.

Le design doit être ultra moderne, premium, fluide et inspiré des sites immobiliers haut de gamme de Dubaï, Chine et États-Unis.

---

# Technologies souhaitées

- React + TypeScript
- Vite
- TailwindCSS
- Framer Motion (animations)
- React Three Fiber (optionnel pour effets 3D légers)
- GSAP pour transitions premium
- Swiper.js pour sliders
- Zustand ou Context API pour gestion d’état
- Responsive mobile + desktop

---

# Concept principal

Le site utilise des photos réelles fournies par le client.

Ces photos seront utilisées pour créer :
- une façade interactive,
- une navigation visuelle par étage,
- une illusion 3D immersive,
- un système de sélection d’appartements.

Le projet doit fonctionner comme une maquette interactive immobilière moderne.

---

# Structure du site

# 1. Page d’accueil — Vue façade principale

## Contenu

Afficher :
- une image HD de la façade du projet immobilier,
- un effet de zoom lent cinématique,
- des animations élégantes,
- le logo du projet,
- le nom de la résidence,
- un bouton “Explorer le projet”.

## Effets visuels

- Parallax léger sur souris
- Lumière dynamique
- Effet glassmorphism
- Ombres modernes
- Transitions fluides

## Interaction

Quand l’utilisateur clique sur :
“Explorer le projet”

→ transition immersive vers la vue interactive des étages.

---

# 2. Vue interactive des étages

## Objectif

Afficher les différents étages du bâtiment sous forme interactive.

L’utilisateur peut :
- cliquer sur le 1er étage,
- cliquer sur le 2ème étage,
- cliquer sur le 3ème étage,
- etc.

Chaque étage doit être représenté par :
- une zone cliquable,
- un bouton flottant,
- ou une superposition transparente sur l’image.

---

# 3. Navigation par étages

## Boutons interactifs

Créer une sidebar moderne contenant :

- RDC
- 1er étage
- 2ème étage
- 3ème étage
- Terrasse
- Parking

Chaque bouton :
- déclenche une animation,
- change l’image principale,
- affiche les appartements de l’étage sélectionné.

---

# 4. Vue détaillée d’un étage

Quand l’utilisateur sélectionne un étage :

Afficher :
- l’image du plan de l’étage,
- les appartements disponibles,
- les zones cliquables.

Chaque appartement doit être interactif.

---

# 5. Interaction appartement

Quand l’utilisateur clique sur un appartement :

Afficher :
- numéro de l’appartement,
- superficie,
- nombre de chambres,
- prix,
- disponibilité,
- galerie photos,
- bouton “Réserver”
- bouton WhatsApp

---

# 6. Effet pseudo-3D

Utiliser les photos pour créer une sensation 3D :

## Effets possibles

- perspective au mouvement souris,
- zoom cinématique,
- couches d’images,
- profondeur,
- animation des éléments,
- transitions caméra.

Le but est de donner l’impression que le bâtiment est vivant.

---

# 7. Galerie immersive

Ajouter :
- slider fullscreen,
- transitions douces,
- mode nuit/jour,
- vue intérieure/extérieure,
- animations modernes.

---

# 8. Expérience utilisateur premium

Le site doit ressembler à :
- une expérience Apple,
- un configurateur immobilier de luxe,
- une présentation d’architecte haut de gamme.

---

# Style visuel souhaité

## Inspirations

- immobilier Dubaï
- Tesla
- Apple
- architectes modernes
- UI futuriste
- dark mode premium

## Couleurs

- noir
- blanc
- gris anthracite
- doré léger
- bleu nuit

---

# Fonctionnalités avancées

## Ajouter :

- préchargement intelligent des images,
- transitions fluides entre étages,
- animations au scroll,
- mini carte du bâtiment,
- disponibilité en temps réel,
- filtre appartements,
- mode mobile optimisé.

---

# Structure React souhaitée

## Components

- HeroSection
- BuildingViewer
- FloorSelector
- ApartmentCard
- ApartmentModal
- GallerySection
- ContactSection
- Navbar
- LoadingScreen

---

# Résultat attendu

Créer un site immobilier ultra moderne et immersif utilisant uniquement :
- des photos réelles,
- des animations React,
- des effets visuels premium,
- une navigation interactive par étage.

Le site doit donner une sensation de luxe, modernité et technologie avancée sans utiliser un vrai moteur 3D complexe.

---

# Important

Le système doit permettre d’ajouter facilement :
- de nouvelles images,
- de nouveaux étages,
- de nouveaux appartements,
- sans modifier toute l’application.

Le code doit être propre, scalable et professionnel.