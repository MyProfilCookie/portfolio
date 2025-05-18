# Portfolio MyProfilCookie - Développeur Fullstack

Bienvenue sur le dépôt GitHub de mon portfolio personnel ! Ce projet a été développé avec Next.js et présente mes compétences, mes projets, ainsi qu'un espace d'administration pour gérer le contenu. Il intègre également un système de tarification et de paiement pour mes services de freelance.

## ✨ Aperçu

Ce site sert de vitrine pour mon travail en tant que développeur fullstack freelance. Il permet aux visiteurs de :
* Découvrir mon profil et mes compétences.
* Explorer mes réalisations et projets passés.
* Consulter mes offres de services et tarifs.
* Me contacter via un formulaire dédié.
* Lire et soumettre des témoignages.
* Effectuer des paiements pour les services proposés.

Le projet inclut également une interface d'administration complète pour gérer :
* Les projets (ajout, modification, suppression).
* Les technologies utilisées.
* Les témoignages (approbation, mise en avant).
* Les messages de contact.
* Les statistiques du site.

## 🚀 Technologies utilisées

Ce projet est construit avec une stack moderne et performante :

* **Frontend :**
    * [Next.js](https://nextjs.org/) (React Framework)
    * [React](https://reactjs.org/)
    * [TypeScript](https://www.typescriptlang.org/)
    * [Tailwind CSS](https://tailwindcss.com/) pour le styling
    * [Framer Motion](https://www.framer.com/motion/) pour les animations
    * [shadcn/ui](https://ui.shadcn.com/) ( composants UI réutilisables : Button, Card, Input, etc.)
    * `lucide-react` pour les icônes
* **Backend :**
    * [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
    * [Prisma](https://www.prisma.io/) comme ORM pour l'interaction avec la base de données
* **Base de données :**
    * (Probablement PostgreSQL, à confirmer selon votre configuration - voir `DATABASE_URL`)
* **Authentification :**
    * Système de connexion personnalisé pour l'admin (Email/Pseudo + Mot de passe)
    * (Potentiellement NextAuth si la configuration évolue)
* **Paiements :**
    * [Stripe](https://stripe.com/) pour la gestion des paiements en ligne
* **Emails :**
    * [Resend](https://resend.com/) pour l'envoi d'emails transactionnels (confirmation de paiement, notifications)
* **Tests :**
    * [Vitest](https://vitest.dev/) pour les tests unitaires et d'intégration
* **Linting/Formatting :**
    * ESLint
    * Prettier (implicite avec Next.js)
* **Déploiement (suggéré) :**
    * [Vercel](https://vercel.com/) ou une plateforme similaire supportant Next.js

## 🌟 Fonctionnalités principales

### Partie publique :
* Page d'accueil dynamique présentant le profil et les services.
* Galerie de projets avec détails (description, technologies, liens GitHub/Live).
* Page de tarifs pour les différentes offres de services.
* Système de paiement intégré avec Stripe pour la souscription aux offres.
* Formulaire de contact pour les demandes d'informations.
* Section témoignages pour afficher les retours clients et soumettre de nouveaux avis.
* Design responsive et animations fluides.

### Partie Administration (`/admin`) :
* Tableau de bord avec statistiques (nombre de projets, messages non lus, témoignages en attente).
* Gestion CRUD (Create, Read, Update, Delete) des projets.
* Gestion CRUD des technologies (utilisées pour lier aux projets).
* Modération et gestion des témoignages (approbation, mise en avant, suppression).
* Consultation et gestion des messages reçus via le formulaire de contact (marquer comme lu/non lu, supprimer).
* Interface sécurisée par authentification.

## 🛠️ Démarrage rapide

Pour lancer ce projet en local, suivez ces étapes :

### Prérequis
* Node.js (version recommandée par Next.js 13.5.1, ex: Node 16.14+)
* npm, yarn ou pnpm
* Une instance de base de données (ex: PostgreSQL)
* Un compte Stripe pour les tests de paiement
* Un compte Resend pour les tests d'envoi d'email

### Installation
1.  **Clonez le dépôt :**
    ```bash
    git clone [https://github.com/MyProfilCookie/portfolio.git](https://github.com/MyProfilCookie/portfolio.git)
    cd portfolio
    ```
2.  **Installez les dépendances :**
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```
3.  **Configuration de l'environnement :**
    Créez un fichier `.env.local` à la racine du projet en vous basant sur `.env.example` (s'il existe) ou en ajoutant les variables suivantes :

    ```env
    # Base de données (Prisma)
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

    # Authentification Admin (pour /api/auth/login)
    ADMIN_EMAIL="votre_email_admin@example.com"
    ADMIN_PASSWORD="votre_mot_de_passe_admin_solide"

    # Stripe
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_VOTRE_CLE_PUBLIQUE_STRIPE"
    STRIPE_SECRET_KEY="sk_test_VOTRE_CLE_SECRETE_STRIPE"
    STRIPE_WEBHOOK_SECRET="whsec_VOTRE_SECRET_WEBHOOK_STRIPE" # Pour tester les webhooks en local

    # Resend (pour les emails)
    RESEND_API_KEY="re_VOTRE_CLE_API_RESEND"
    # EMAIL_FROM="contact@votredomaine.com" # Si utilisé par Resend ou NextAuth

    # NextAuth (si vous l'activez/utilisez plus tard)
    # NEXTAUTH_URL="http://localhost:3000"
    # NEXTAUTH_SECRET="GENEREZ_UN_SECRET_SOLIDE_POUR_NEXTAUTH"
    # Si vous utilisez le provider Email de NextAuth :
    # EMAIL_SERVER_HOST=""
    # EMAIL_SERVER_PORT=""
    # EMAIL_SERVER_USER=""
    # EMAIL_SERVER_PASSWORD=""

    # URL de base pour les redirections (ex: Stripe)
    NEXT_PUBLIC_BASE_URL="http://localhost:3000"
    ```
    *Remplacez les valeurs par vos propres clés et configurations.*

4.  **Appliquez les migrations de la base de données :**
    ```bash
    npx prisma migrate dev
    ```
5.  **(Optionnel) Remplissez la base de données avec des données initiales (seed) :**
    Assurez-vous que votre fichier `prisma/seed.ts` est configuré.
    ```bash
    npx prisma db seed
    ```
    *(Note : Le script de seed est configuré dans `package.json` : `"prisma": { "seed": "ts-node prisma/seed.ts" }`)*

6.  **Lancez le serveur de développement :**
    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    ```
    Le site devrait être accessible sur `http://localhost:3000`.
    L'interface d'administration est sur `http://localhost:3000/admin` (accès via `http://localhost:3000/auth/signin`).

## 📜 Scripts disponibles

Dans le `package.json`, vous trouverez les scripts suivants :

* `dev`: Lance le serveur de développement Next.js.
* `build`: Construit l'application pour la production.
* `start`: Démarre un serveur de production Next.js.
* `lint`: Lance ESLint pour analyser le code.
* `test`: Lance les tests avec Vitest.
* `test:coverage`: Lance les tests avec Vitest et génère un rapport de couverture.
* `test:ui`: Lance Vitest avec son interface utilisateur.
* `prisma: { "seed": "ts-node prisma/seed.ts" }`: Script pour initialiser la base de données (à lancer avec `npx prisma db seed`).

## 📂 Structure du projet (aperçu)
