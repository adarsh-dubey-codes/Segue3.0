# Technical Architecture — Sakhi Cycle

## 1. Tech Stack
- **Framework**: React 19 + Vite 8
- **Routing**: `react-router-dom` (v7)
- **Styling**: Vanilla CSS Modules & CSS Design Tokens (`src/index.css`)
- **Icons**: `lucide-react`
- **State Management**: React Context API (`CycleContext.jsx` & `AuthContext.jsx`)
- **Data Persistence**: Browser `localStorage` with export/import JSON capability

---

## 2. Component Architecture Overview

```text
src/
├── components/
│   ├── ai/
│   │   └── SakhiChat.jsx
│   ├── Brand/
│   │   └── SakhiLogo.jsx
│   ├── Button/
│   │   └── Button.jsx
│   ├── Calendar/
│   │   └── Calendar.jsx
│   ├── cycle/
│   │   ├── CycleAnalytics.jsx
│   │   ├── CycleGarden.jsx
│   │   ├── CycleSetupModal.jsx
│   │   └── DailyLogModal.jsx
│   ├── CycleRing/
│   │   └── CycleRing.jsx
│   ├── doctors/
│   │   └── AppointmentModal.jsx
│   ├── forum/
│   │   └── CreatePostModal.jsx
│   ├── home/
│   │   └── HeroArt3D.jsx
│   ├── Input/
│   │   └── Input.jsx
│   ├── layout/
│   │   ├── Footer.jsx
│   │   ├── MobileNav.jsx
│   │   └── Navbar.jsx
│   ├── lifestyle/
│   │   └── PhaseGuide.jsx
│   ├── products/
│   │   └── ProductModal.jsx
│   └── vibes/
│       └── BreathingWidget.jsx
├── context/
│   ├── AuthContext.jsx
│   └── CycleContext.jsx
├── data/
│   ├── affirmationsData.js
│   ├── doctorsData.js
│   ├── forumSeedData.js
│   ├── lifestyleData.js
│   └── productsData.js
├── pages/
│   ├── AI/AIPage.jsx
│   ├── Auth/
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── Buddy/BuddyPage.jsx
│   ├── Cycle/CyclePage.jsx
│   ├── Doctors/DoctorsPage.jsx
│   ├── Forum/ForumPage.jsx
│   ├── Home/HomePage.jsx
│   ├── Lifestyle/LifestylePage.jsx
│   ├── Products/ProductsPage.jsx
│   └── Vibes/VibesPage.jsx
├── utils/
│   └── aiClient.js
├── App.jsx
├── index.css
└── main.jsx
```

---

## 3. Data Flow
1. **CycleContext**: Acts as the single source of truth for cycle phase, cycle day, logs, setup, garden stage, and stats.
2. **AuthContext**: Manages pseudonymous user authentication session state.
3. **Local Storage Layer**: Automatically syncs setup and logs to `localStorage` (`sakhi_cycle_setup_v2`, `sakhi_cycle_logs_v2`, `sakhi_user_session_v2`).
