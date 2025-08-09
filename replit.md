# CeciFlags - Kids-friendly World Flags Quiz

## Overview

CeciFlags is a mobile-friendly educational web application designed as a world flags quiz specifically for children, with special consideration for autism-aware design. The application features a colorful, high-contrast interface with gentle micro-animations and comprehensive accessibility options. Built as a Progressive Web App (PWA), it provides offline functionality and supports both quiz and practice modes across different continents.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system variables for consistent theming
- **UI Components**: Radix UI primitives with shadcn/ui components for accessible, customizable interface elements
- **State Management**: Zustand with persistence middleware for global state management
- **Data Fetching**: TanStack Query for server state management and caching

### Backend Architecture
- **Server**: Express.js with TypeScript in ESM format
- **Development**: Custom Vite integration for seamless full-stack development
- **Storage Interface**: Abstract storage layer with in-memory implementation (designed to be extensible to database solutions)
- **API Structure**: RESTful endpoints under `/api` prefix with comprehensive error handling

### Data Storage Solutions
- **Local Storage**: Primary persistence layer for user settings, progress, and game state
- **In-Memory Storage**: Server-side storage abstraction for user data (easily replaceable with database)
- **Offline Support**: Service Worker with cache-first strategy for offline functionality
- **Data Schemas**: Zod-based validation for type-safe data structures across client and server

### Authentication and Authorization
- Currently implemented with basic session-based approach
- User management through abstract storage interface
- Designed for future extension with more robust authentication systems

### Accessibility and Autism-Aware Design
- **Calm Mode**: Global setting to reduce motion and visual stimulation
- **High Contrast**: Enhanced color contrast options for better visibility
- **Reduced Motion**: Respects user preferences for motion reduction
- **Touch Targets**: Large, accessible touch areas for mobile interaction
- **Audio Controls**: Comprehensive sound management with volume controls and mute options
- **Visual Feedback**: Clear, immediate feedback for all interactions

### Game Architecture
- **Quiz Mode**: Timed or untimed multiple-choice questions with scoring system
- **Practice Mode**: Free exploration mode with immediate feedback
- **Continent Filtering**: Geographic categorization of countries for focused learning
- **Progress Tracking**: Comprehensive statistics including streaks, accuracy, and unlockable rewards
- **Gamification**: Star-based progression system with unlockable stickers

### Internationalization
- Portuguese (pt-BR) as primary language with extensible i18n structure
- Prepared for multi-language support with centralized translation management

### Progressive Web App Features
- **Offline Support**: Full functionality without internet connection
- **Installable**: Native app-like experience on mobile devices
- **Service Worker**: Automatic caching of assets and data
- **Responsive Design**: Optimized for mobile-first experience

### Performance Optimizations
- **Code Splitting**: Automatic route-based code splitting with Vite
- **Image Optimization**: SVG flags for scalable, lightweight graphics
- **Caching Strategy**: Multi-layer caching including service worker and query cache
- **Bundle Optimization**: Tree-shaking and modern JavaScript output

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **Build Tools**: Vite with TypeScript support and development plugins
- **State Management**: Zustand with persistence middleware

### UI and Styling
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Animations**: Framer Motion for smooth, respectful animations
- **Icons**: Lucide React for consistent iconography

### Audio and Interaction
- **Audio Management**: Howler.js for cross-browser audio playback
- **Haptic Feedback**: Native browser vibration API
- **Confetti Effects**: canvas-confetti for celebration animations (with calm mode toggle)

### Development and Quality
- **Type Safety**: TypeScript with strict configuration
- **Schema Validation**: Zod for runtime type checking and validation
- **Development Experience**: Replit-specific plugins for seamless development
- **Font Loading**: Google Fonts (Inter) for consistent typography

### Database and Persistence
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Driver**: Neon Database serverless driver for cloud PostgreSQL
- **Local Storage**: Browser localStorage API for client-side persistence
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Utility Libraries
- **Date Handling**: date-fns for date manipulation and formatting
- **Class Management**: clsx and tailwind-merge for conditional styling
- **Form Handling**: React Hook Form with Zod resolvers for type-safe forms
- **Unique IDs**: nanoid for generating unique identifiers

### PWA and Offline Support
- **Service Worker**: Custom implementation with Workbox patterns
- **Manifest**: Web App Manifest for PWA installation
- **Caching**: Multi-layer caching strategy for offline functionality