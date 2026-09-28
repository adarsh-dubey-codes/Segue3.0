# Sakhi Cycle

**Sakhi Cycle** is a privacy-first menstrual-health companion designed to help users understand their cycle, track daily care, access trustworthy guidance, and feel supported in every phase.

---

## 🌟 Overview
Sakhi Cycle combines cycle tracking, daily symptom logging, AI companion guidance, phase-aware lifestyle nutrition, menstrual product education, gynaecologist discovery, anonymous community forums, cycle buddy pen-pals, and mindful vibes into one warm, coherent consumer product.

---

## ✨ Current Features
- **Home Landing (`/`)**: Hero banner (*"Bloom in every phase of you."*), Today's Affirmation card, active cycle status indicator, 3D floating artwork, and 8 feature discovery cards.
- **Cycle Tracker (`/cycle`)**: Custom SVG cycle ring, cycle setup configuration, daily symptom/mood/flow/energy logging, month calendar view, 90-day overview grid, 30-day energy trend chart, symptom frequency patterns, and Cycle Garden gamification.
- **Sakhi AI (`/chat`)**: Empathetic conversational AI guide with prompt chips, health disclaimers, message quota manager, and conversation history.
- **Phase-Aware Lifestyle (`/lifestyle`)**: Nutrition, movement, avoid, and rest recommendations for *Menstrual, Follicular, Ovulation, and Luteal* phases.
- **Period Products & Tutorials (`/products`)**: Comprehensive directory (*Pads, Tampons, Menstrual Cup, Disc, Period Undies*) with search, filters, cost info, eco rating, beginner guide, and video tutorial links.
- **24/7 Gynaecologist Directory (`/doctors`)**: Directory with search, city & online consult filters, doctor bio, WhatsApp inquiry links, and interactive appointment booking workflow.
- **Anonymous Forum (`/forum`)**: Safe-room community feed with pseudonymous posting, category filtering, support reaction count, comment replies, and content safety controls.
- **Cycle Buddy System (`/buddy`)**: Pseudonymous pen-pal matching, active cycle status, quick check-in chips, messaging, and optional WhatsApp link.
- **Good Vibes (`/vibes`)**: Phase-oriented music playlists, guided 4-4-4 breathwork widget, daily affirmation generator, and mood matcher.
- **Authentication (`/login`, `/signup`)**: Pseudonymous profile setup, login, password validation, and localStorage session management.

---

## 🚀 Planned Features
- Backend authentication integration (Supabase / Firebase).
- Push notifications & cycle reminder alerts.
- Live API integration for Sakhi AI backend model.
- Verified Doctor scheduling API integration.

---

## 🛠 Tech Stack
- **Framework**: React 19 + Vite 8
- **Routing**: `react-router-dom` (v7)
- **Styling**: Vanilla CSS Modules & CSS Design Tokens (`src/index.css`)
- **Icons**: `lucide-react`
- **State Management**: React Context API (`CycleContext.jsx` & `AuthContext.jsx`)
- **Data Persistence**: Browser `localStorage` with export/import JSON capability

---

## 📁 Project Structure
```text
sakhiCycle/
├── docs/                      # Comprehensive Product & Architecture Documentation
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── UX_AND_USER_FLOWS.md
│   ├── DATA_PRIVACY_SAFETY.md
│   └── MVP_EXECUTION_PLAN.md
├── src/
│   ├── components/            # Reusable UI & Module Components
│   ├── context/               # React Context Providers (CycleContext & AuthContext)
│   ├── data/                  # Content Data (Lifestyle, Products, Doctors, Forum, Vibes)
│   ├── pages/                 # Page Components (Home, Cycle, AI, Lifestyle, Products, etc.)
│   ├── utils/                 # Utility Services & AI Client
│   ├── App.jsx                # Application Router & Layout Shell
│   ├── index.css              # Design Tokens & Palette System
│   └── main.jsx               # React Mounting Point
├── .env.example               # Environment Variables Template
├── .gitignore                 # Secret & Build Protection Rules
├── package.json               # Dependencies & NPM Scripts
└── README.md                  # Project Documentation
```

---

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd sakhiCycle
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start local development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

## 🔐 Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Never commit `.env.local` or real API secret keys to GitHub.

---

## 🌿 Git Workflow
- `main`: Production-ready code.
- `develop`: Ongoing integration branch.

---

## 🛡 Privacy & Safety
Sakhi Cycle stores health data locally on your device by default. Sakhi AI is an educational wellness companion and does not replace professional medical diagnosis.
