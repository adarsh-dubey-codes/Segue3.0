# Product Requirement Document (PRD) — Sakhi Cycle

## 1. Product Summary
**Sakhi Cycle** is a privacy-first, gentle menstrual-health companion built to help users understand their cycle, track daily care, access trustworthy AI and lifestyle guidance, and feel supported in every phase.

---

## 2. Product Objectives
- **Privacy-First**: Keep sensitive health data stored locally on the user's device by default.
- **Calm, Human-Centric UI**: Avoid clinical, generic SaaS, or overly dark cyberpunk aesthetics in favor of warm pastels, serif display typography, and gentle micro-animations.
- **Holistic Care**: Combine cycle tracking, daily logging, AI guidance, phase-aware lifestyle nutrition, menstrual product education, gynaecologist discovery, anonymous community, cycle buddy matching, and mindful vibes into one coherent experience.

---

## 3. Implemented vs. Planned Features

### Currently Implemented (V1 & V2 Foundation)
- **Home Landing (`/`)**: Hero banner (*"Bloom in every phase of you."*), Today's Affirmation card, active cycle phase indicator, and 8 feature discovery cards.
- **Cycle Tracker (`/cycle`)**: Cycle setup configuration, daily symptom/mood/flow logging, custom SVG cycle ring, month calendar view, 90-day overview grid, 30-day energy trend chart, symptom frequency patterns, and Cycle Garden gamification.
- **Sakhi AI Companion (`/chat`)**: Empathetic conversational AI with non-diagnostic health disclaimers, prompt chips, message history, and daily quota manager.
- **Phase-Aware Lifestyle (`/lifestyle`)**: Phase tabs (*Menstrual, Follicular, Ovulation, Luteal*) organized by *Nourish*, *Avoid*, *Move*, and *Rest*.
- **Period Products (`/products`)**: Educational product directory (*Pads, Tampons, Menstrual Cup, Disc, Period Undies*) with search, filters, cost info, eco rating, beginner guide, and video tutorial links.
- **24/7 Gynaecologist Directory (`/doctors`)**: Directory with search, city & online consult filters, doctor bio, WhatsApp inquiry links, and interactive appointment booking workflow.
- **Anonymous Community Forum (`/forum`)**: Pseudonymous posting, category filtering, support reaction count, comment replies, and content safety controls.
- **Cycle Buddy System (`/buddy`)**: Pseudonymous pen-pal matching, active cycle status, quick check-in chips, messaging, and optional WhatsApp link.
- **Good Vibes (`/vibes`)**: Phase-oriented music playlists, guided 4-4-4 breathwork widget, daily affirmation generator, and mood matcher.
- **Authentication (`/login`, `/signup`)**: Pseudonymous profile setup, login, password validation, and localStorage session management.

### Planned Future Enhancements
- Real Supabase / Firebase authentication backend integration.
- Direct LLM API integration for live Sakhi AI backend.
- Push notifications & cycle reminder alerts.
- Verified Doctor API integration for real-time calendar synchronization.
