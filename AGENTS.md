# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

DevEvent is a Next.js 16.1 application for managing and displaying developer events (hackathons, meetups, conferences). Built with React 19, TypeScript, and MongoDB, featuring Cloudinary image hosting and PostHog analytics.

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Starts the Next.js development server on http://localhost:3000 with Turbopack caching enabled.

### Building for Production
```bash
npm run build
```
Creates an optimized production build.

### Running Production Build
```bash
npm run start
```
Starts the production server (requires `npm run build` first).

### Linting
```bash
npm run lint
```
Runs ESLint with Next.js configurations (core-web-vitals and TypeScript rules).

## Architecture

### Directory Structure
- `app/` - Next.js 14+ App Router pages and API routes
  - `api/events/` - REST API endpoints for events (GET all, POST create)
  - `api/events/[slug]/` - Dynamic API route for individual events (GET by slug)
  - `events/[slug]/` - Dynamic page for event details
  - `layout.tsx` - Root layout with Google Fonts (Schibsted Grotesk, Martian Mono), Navbar, and LightRays background
  - `page.tsx` - Homepage displaying featured events
  - `instrumentation-client.ts` - PostHog analytics initialization
- `components/` - React components (EventCards, BookingEvent, Navbar, ExploreButton, LightRays)
- `database/` - Mongoose models and TypeScript interfaces
  - `event.model.ts` - Event schema with auto-generated slugs, date/time normalization
  - `booking.model.ts` - Booking schema with event reference and email validation
  - `index.ts` - Centralized exports
- `lib/` - Utility functions and shared logic
  - `actions/mongodb.ts` - Database connection utility with global caching for hot reloads
  - `actions/constants.ts` - Static event data (temporary/seed data)
  - `utils.ts` - Tailwind utility merger (`cn` function)

### Database Architecture
**MongoDB with Mongoose ORM:**
- **Event Model**: Stores event details with auto-generated URL slugs, date/time normalization in pre-save hooks, compound indexes on `(date, mode)` and unique index on `slug`
- **Booking Model**: Links users (by email) to events with unique constraint per `(eventId, email)` pair, validates event existence in pre-save hook
- **Connection Strategy**: Global connection caching in `lib/actions/mongodb.ts` prevents duplicate connections during Next.js development hot reloads

### Key Technical Details
- **React Compiler**: Enabled via `babel-plugin-react-compiler` in next.config.ts
- **Image Handling**: Cloudinary for uploads (in POST /api/events), Next.js Image component with remote patterns configured for `res.cloudinary.com`
- **Styling**: Tailwind CSS v4 with custom utilities (`flex-center`, `text-gradient`, `glass` effect) and shadcn/ui component structure (New York style)
- **Path Aliases**: `@/*` maps to root directory (tsconfig.json)
- **Font Loading**: Google Fonts via next/font with CSS variables

### API Routes
- **GET /api/events** - Fetch all events (sorted by createdAt descending)
- **POST /api/events** - Create event with FormData (includes Cloudinary image upload)
- **GET /api/events/[slug]** - Fetch single event by slug using Mongoose `.lean()`

### Environment Variables Required
- `MONGODB_URI` - MongoDB connection string
- `NEXT_PUBLIC_BASE_URL` - Base URL for API calls (used in client-side fetch)
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog analytics key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL
- Cloudinary credentials (implicitly required by cloudinary package, typically `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)

### Important Patterns
- **Data Normalization**: Event model pre-save hooks auto-generate slugs from titles and normalize date/time formats
- **Error Handling**: API routes return structured JSON responses with `message` and `error` fields
- **Type Safety**: TypeScript interfaces (`IEvent`, `IBooking`) exported from database models
- **Static Imports**: Some components still reference `lib/actions/constants.ts` for seed data (not actively used in production)
