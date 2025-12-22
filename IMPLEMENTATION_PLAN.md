# Implementation Plan for Typing Speed Test App

## Overview
This plan outlines the steps to complete the Frontend Mentor Typing Speed Test challenge. The app is a React/TypeScript project using Vite, TailwindCSS, React Router, Zustand for state management, and Sonner for notifications. We'll implement features like test modes, real-time typing feedback, results tracking, and localStorage persistence.

## Prerequisites
- Node.js and pnpm installed
- Basic knowledge of React, TypeScript, and TailwindCSS
- Familiarity with the challenge requirements in CHALLENGE_README.md

## Step-by-Step Implementation

### 1. Set Up State Management
- Use Zustand to create a store for:
  - Current test state (text, user input, timer, stats)
  - Settings (difficulty, mode: timed vs passage)
  - Personal bests (localStorage)
  - Test results

### 2. Implement Core Components

#### Difficulty Dropdown (`src/components/difficulty-dropdown.tsx`)
- Dropdown with Easy, Medium, Hard options
- Updates store on selection
- Styled with Tailwind, responsive design

#### Mode Dropdown (`src/components/mode-dropdown.tsx`)
- Dropdown with "Timed (60s)" and "Passage" options
- Updates store on selection

#### Typing Test Page (`src/pages/typing-test.tsx`)
- Display selected passage text
- Handle keyboard input
- Show cursor position, correct/incorrect highlighting
- Real-time WPM, accuracy, time display
- Start/restart functionality
- Timer logic (60s countdown or passage completion)

#### Results Page (`src/pages/result.tsx`)
- Show final WPM, accuracy, correct/incorrect chars
- Display "Baseline Established!" on first test
- Show "High Score Smashed!" with confetti on new PB
- Restart button

#### Home Page (`src/pages/home.tsx`)
- App title/logo
- Difficulty and mode selection
- Start test button
- Link to results if available

### 3. Implement Typing Logic
- Track user input character by character
- Calculate WPM (words per minute)
- Calculate accuracy (correct chars / total chars)
- Handle backspace (count errors but allow corrections)
- Visual feedback: green for correct, red underline for errors
- Cursor animation

### 4. Add Persistence
- Use localStorage for personal best WPM
- Load PB on app start
- Update PB on test completion if beaten

### 5. Polish and Responsiveness
- Ensure mobile/desktop layouts match designs
- Add hover/focus states
- Implement confetti animation for new PB
- Add loading states and error handling

### 6. Testing and Validation
- Test all difficulty levels and modes
- Verify WPM/accuracy calculations
- Check localStorage persistence across sessions
- Ensure responsive design on various screen sizes

### 7. Final Touches
- Add favicon and meta tags
- Optimize bundle size
- Run linting and type checking
- Add any missing assets or icons

## Estimated Timeline
- State setup: 1-2 hours
- Components: 4-6 hours
- Typing logic: 3-5 hours
- Persistence: 1 hour
- Polish/responsiveness: 2-3 hours
- Testing: 1-2 hours

## Dependencies to Add (if needed)
- None additional - all required deps are in package.json

## Notes
- Follow existing code style and conventions
- Use the design files in `/design` as reference
- Test on both mobile and desktop viewports
- Ensure accessibility (WCAG compliance mentioned in style-guide.md)

This plan provides a structured approach to building the complete app. Start with state management and work through each component systematically. If you encounter issues or need clarification on any step, let me know!
