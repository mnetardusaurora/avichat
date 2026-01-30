# AviTalk

An AAC (Augmentative and Alternative Communication) speech therapy app for young children with speech delays.

## Features

- **Symbol-to-Speech**: Tap any symbol to hear it spoken aloud
- **Category Organization**: Vocabulary organized into intuitive categories
- **Motor Planning Support**: Words always stay in the same position
- **Offline-First**: Works without internet connection
- **PIN Lock**: Protect settings from accidental changes
- **Custom Vocabulary**: Add your own words and images

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator or physical iOS device (for iOS development)
- Android Emulator or physical Android device (for Android development)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### Download ARASAAC Symbols

The app uses ARASAAC symbols (CC BY-NC-SA 4.0). To download real symbols:

```bash
node scripts/download-symbols.js
```

## Project Structure

```
/avitalk
├── app/                 # Expo Router screens
│   ├── (main)/         # Main app screens
│   └── (settings)/     # Settings screens
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── stores/         # Zustand state stores
│   ├── db/             # SQLite database layer
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript types
│   └── data/           # Bundled symbol data
├── assets/
│   ├── symbols/        # ARASAAC symbol images
│   └── ui/             # App UI assets
└── scripts/            # Build and utility scripts
```

## Building for Production

### iOS

```bash
# Build for App Store
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --profile production
```

### Android

```bash
# Build for Play Store
eas build --platform android --profile production
```

## Symbol Attribution

The pictographic symbols used are the property of the Government of Aragon and have been created by Sergio Palao for ARASAAC (https://arasaac.org), that distributes them under Creative Commons License BY-NC-SA.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
