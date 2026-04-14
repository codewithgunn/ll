# Digital Gifting Platform: Project Blueprint

## Overview
A cohesive "emotional tech" and "cozy web" platform that allows users to create, customize, and send highly interactive digital gifts. The platform bridges the thoughtfulness of physical gifting with the instant accessibility of the internet.

## Tech Stack
* **Frontend Framework:** Next.js (React) for easy routing, SEO, and fast rendering.
* **Styling:** Tailwind CSS for rapid, responsive UI development.
* **Animations:** Framer Motion for buttery-smooth interactions (unfolding letters, popping flowers).
* **Interactions:** `@dnd-kit/core` or `react-rnd` for drag-and-drop features.
* **Database & Storage:** Supabase or Firebase (for storing gift data and generating short URLs).
* **Hosting:** Vercel (perfect synergy with Next.js).

## The Digital Gift Catalog

### 1. Interactive Letters & Cards
* **Love Letters & Get Well Soon Notes:** Clicking an envelope triggers a smooth CSS/Framer Motion animation where the flap opens and a customized, handwritten-style letter slides out. 
* **Custom Fortune Cookies:** A click interaction that swaps the cookie image to a broken one, plays a tactile `crack.mp3` sound, and reveals a tiny slip of paper with a custom message.

### 2. Nostalgic Audio Experiences
* **The Virtual Mixtape:** A retro cassette tape or boombox UI. Senders can customize the handwritten tape label and embed a Spotify/YouTube playlist link. Includes tactile play/pause tape deck animations.
* **Vinyl Record Player:** Users drag a digital needle onto a spinning record to start an audio message or a cozy tune.

### 3. Cozy & Drag-and-Drop Builders
* **The DigiBouquet:** A canvas where users can pick and place different flowers (peonies, roses, sunflowers), wrappers, and ribbons. Requires coordinate tracking (x, y, rotation, z-index).
* **Digital Care Package:** Senders pack a virtual cardboard box with cozy digital items (a steaming cup of tea, a pixel-art blanket, book recommendations).

### 4. Gamified & Surprise Reveals
* **Interactive Scratch-Off Cards:** Built using the HTML5 `<canvas>` API. Senders hide a message or surprise (like a date idea), and the recipient uses their cursor or finger to "scratch" away a metallic foil layer.
* **Interactive Birthday Cake:** Users decorate a cake and write an icing message. The recipient uses their device's microphone (via the Web Audio API `AnalyserNode`) to physically blow out the digital candles.

## Sharing Mechanism (Data Architecture)
To send these gifts, the app will support short-link generation:
1.  **Creation:** User finishes building the gift.
2.  **Save:** Frontend sends the configuration JSON (item coordinates, text, colors, links) to the Supabase database.
3.  **Link Generation:** Database returns a unique ID, generating a link (e.g., `yoursite.com/gift/8x9A2`).
4.  **Viewing:** The recipient opens the link, the app fetches the JSON based on the ID, and re-renders the exact gift state.

## Phased Development Roadmap

**Phase 1: The Storefront & Architecture**
* Initialize Next.js project.
* Build the main landing page showcasing the gift catalog.
* Setup Supabase and the universal sharing logic.

**Phase 2: Quick Wins (MVP)**
* Develop the Love Letter envelope animation.
* Develop the clickable Fortune Cookie.

**Phase 3: Intermediate Interactive Toys**
* Build the DigiBouquet (drag-and-drop canvas).
* Integrate Spotify iframes for the Virtual Mixtape.

**Phase 4: The "Wow" Factor**
* Develop HTML5 Canvas logic for the Scratch-Off Cards.
* Implement microphone detection for the interactive Birthday Cake.
