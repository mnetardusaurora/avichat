# AviTalk - Next Steps for App Store Submission

## Overview
This document tracks all manual steps needed to get AviTalk ready for iOS App Store submission.

---

## Phase 1: Local Testing
- [ ] Test app on iOS Simulator (iPad)
- [ ] Test app on physical iPad device
- [ ] Verify all categories load correctly
- [ ] Verify text-to-speech works
- [ ] Test PIN lock functionality
- [ ] Test adding custom words
- [ ] Test all settings screens
- [ ] Complete testing checklist in `docs/testing-checklist.md`

---

## Phase 2: App Assets

### App Icon (Required)
- [ ] Create app icon (1024x1024 PNG, no transparency)
- [ ] Save to `assets/icon.png`
- [ ] Create adaptive icon for Android at `assets/adaptive-icon.png`

**Design suggestions:**
- Simple speech bubble or communication symbol
- Child-friendly colors (blue, green, yellow)
- Clear and recognizable at small sizes
- Tools: Figma, Canva, or hire a designer

### Splash Screen
- [ ] Create splash screen image
- [ ] Save to `assets/splash-icon.png`
- [ ] Match app icon style for brand consistency

---

## Phase 3: Apple Developer Account Setup

### Prerequisites
- [ ] Enroll in Apple Developer Program ($99/year)
  - Go to: https://developer.apple.com/programs/enroll/
  - Sign in with your Apple ID
  - Complete enrollment (can take 24-48 hours)

### App Store Connect Setup
- [ ] Log in to App Store Connect: https://appstoreconnect.apple.com
- [ ] Click "My Apps" → "+" → "New App"
- [ ] Fill in app information:
  - **Platform:** iOS
  - **Name:** AviTalk
  - **Primary Language:** English (U.S.)
  - **Bundle ID:** com.avitalk.app
  - **SKU:** avitalk-aac-001 (or your choice)
  - **User Access:** Full Access

---

## Phase 4: App Store Listing Content

### App Description (up to 4000 characters)
- [ ] Write app description

**Suggested description:**
```
AviTalk is an Augmentative and Alternative Communication (AAC) app designed to help young children with speech delays communicate through symbols and speech.

FEATURES:
• Tap any symbol to hear it spoken aloud
• 76 professionally designed communication symbols
• 7 organized categories: Core Words, Food, Drinks, People, Actions, Feelings, Objects
• Adjustable speech speed for learning
• PIN-protected settings to prevent accidental changes
• Works completely offline - no internet required
• Add your own custom words and images

DESIGNED FOR MOTOR PLANNING:
Words always stay in the same position, helping children develop muscle memory for faster communication.

PRIVACY FOCUSED:
All data stays on your device. No accounts, no tracking, no cloud sync.

SYMBOL CREDITS:
Symbols by ARASAAC (arasaac.org), licensed under CC BY-NC-SA.

Perfect for:
• Children in speech therapy
• Kids with autism spectrum disorder
• Children with developmental delays
• Speech-language pathologists
• Parents and caregivers
```

### Keywords (up to 100 characters)
- [ ] Create keyword list

**Suggested keywords:**
```
AAC,speech,therapy,autism,communication,symbols,nonverbal,kids,toddler,special needs
```

### Screenshots (Required)
- [ ] Capture 6.7" iPhone screenshots (1290 x 2796 pixels)
- [ ] Capture 6.5" iPhone screenshots (1284 x 2778 pixels)
- [ ] Capture 12.9" iPad Pro screenshots (2048 x 2732 pixels)

**Screenshot suggestions:**
1. Main grid with categories
2. Inside a category (e.g., Food)
3. Settings screen
4. Grid layout options
5. Word being spoken (with visual feedback)

**How to capture:**
1. Run app in iOS Simulator
2. Press Cmd+S to save screenshot
3. Or use Cmd+Shift+4 on Mac for screen region

### Support URL (Required)
- [ ] Create support webpage or use GitHub issues
- [ ] Options:
  - GitHub: `https://github.com/mnetardusaurora/avichat/issues`
  - Simple webpage on your domain
  - Notion page (free)

### Privacy Policy URL (Required)
- [ ] Create privacy policy page
- [ ] Host it publicly

**Simple privacy policy template:**
```
Privacy Policy for AviTalk

Last updated: [DATE]

AviTalk does not collect, store, or transmit any personal data.

Data Storage:
- All app data is stored locally on your device
- No data is sent to external servers
- No accounts are required
- No analytics or tracking

Permissions:
- Camera: Used only if you choose to take photos for custom vocabulary
- Microphone: Used only if you choose to record custom audio
- Photo Library: Used only if you choose to select images for custom vocabulary

Contact:
[YOUR EMAIL]
```

**Hosting options:**
- GitHub Pages (free)
- Notion (free)
- Your own website

---

## Phase 5: EAS Build Configuration

### Update eas.json
- [ ] Edit `eas.json` with your Apple credentials:

```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "YOUR_APPLE_ID@email.com",
        "ascAppId": "YOUR_APP_STORE_CONNECT_APP_ID",
        "appleTeamId": "YOUR_APPLE_TEAM_ID"
      }
    }
  }
}
```

**How to find these values:**
- **appleId**: Your Apple ID email
- **ascAppId**: In App Store Connect → App Information → Apple ID (numeric)
- **appleTeamId**: In Apple Developer Portal → Membership → Team ID

### Install EAS CLI
- [ ] Run: `npm install -g eas-cli`
- [ ] Run: `eas login` (log in with Expo account)
- [ ] Run: `eas build:configure` (if not already done)

---

## Phase 6: Build and Submit

### Create Production Build
```bash
# Build for iOS App Store
eas build --platform ios --profile production

# This will:
# 1. Bundle your JavaScript
# 2. Create an iOS archive (.ipa)
# 3. Sign with your certificates
# Build takes ~15-30 minutes
```

### Submit to App Store
```bash
# Submit the build to App Store Connect
eas submit --platform ios --profile production

# Or submit manually:
# 1. Download .ipa from Expo dashboard
# 2. Use Transporter app on Mac to upload
```

### App Store Connect Review
- [ ] In App Store Connect, select your build
- [ ] Fill in App Review Information:
  - Contact info for reviewer
  - Demo account (if needed - not needed for AviTalk)
  - Notes for reviewer
- [ ] Complete Age Rating questionnaire
- [ ] Submit for Review

---

## Phase 7: Age Rating & Compliance

### Age Rating Questionnaire
- [ ] Complete in App Store Connect
- [ ] Suggested answers for AviTalk:
  - Made for Kids: Yes (select 5-8 age range)
  - Violence: None
  - Sexual Content: None
  - Profanity: None
  - Drugs/Alcohol: None
  - Gambling: None
  - Horror: None
  - Medical/Treatment Info: None

### COPPA Compliance (for Kids category)
- [ ] Ensure no data collection
- [ ] No third-party analytics
- [ ] No advertising
- [ ] No social features
- [ ] No in-app purchases (or get parental consent)

---

## Phase 8: Post-Submission

### While Waiting for Review
- [ ] Monitor App Store Connect for status updates
- [ ] Be ready to respond to reviewer questions
- [ ] Review typically takes 24-48 hours (can be longer)

### Common Rejection Reasons to Avoid
- [ ] App crashes during review
- [ ] Missing privacy policy
- [ ] Incomplete metadata
- [ ] Placeholder content
- [ ] Broken features

### After Approval
- [ ] App goes live on App Store
- [ ] Monitor for user reviews
- [ ] Plan for updates and improvements

---

## Quick Reference Commands

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run TypeScript check
npm run typecheck

# Build for testing (internal distribution)
eas build --platform ios --profile preview

# Build for App Store
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --profile production
```

---

## Resources

- [Expo EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
- [ARASAAC License Info](https://arasaac.org/terms-of-use)

---

## Notes

_Add your own notes here as you work through the steps:_

```
[DATE] -
```
