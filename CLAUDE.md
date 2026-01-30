# AviTalk: AAC Speech Therapy App

## Project Overview

**Purpose**: A React Native AAC (Augmentative and Alternative Communication) app that provides symbol-to-speech functionality for young children with speech delays.

**Target User**: 2-year-old child in speech therapy who can currently say 2-3 words.

**Primary Platform**: iPad & iOS (App Store submission required)
**Secondary Platform**: Android tablet

**Key Differentiator**: Cross-platform alternative to TD Snap (iPad-only) with full offline capability.

---

## Core Requirements

### Must Have (MVP)

1. **Symbol-to-Speech Grid**: Tap a symbol, hear the word spoken aloud
2. **Grid Position Locking**: Words always stay in the same position (critical for motor planning)
3. **Custom Vocabulary**: Upload custom images and record custom audio
4. **Open Source Symbols**: ARASAAC symbol library bundled in-app
5. **Offline-First**: No internet required for core functionality
6. **Kiosk Mode / App Lock**: PIN-protected settings, Guided Access integration
7. **Local Storage Only**: No cloud sync, no tracking, no accounts

### Technical Constraints

- React Native with Expo (managed workflow preferred)
- SQLite for structured data
- File system for images/audio
- Native TTS (expo-speech) for offline voice
- Bundle ARASAAC core symbols (larger app size acceptable)

---

## Technical Architecture

### Tech Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Framework | React Native + Expo SDK 52+ | Cross-platform, fast iteration |
| Language | TypeScript | Type safety, better tooling |
| Navigation | Expo Router | File-based routing, modal support |
| Database | expo-sqlite | Offline-first, structured queries |
| File Storage | expo-file-system | Binary assets (images, audio) |
| TTS | expo-speech | Native voices, offline capable |
| Audio Recording | expo-av | Custom word recordings |
| State | Zustand | Lightweight, persistent state |
| UI Components | React Native core + custom | Accessibility-first design |

### Data Model

```sql
-- Vocabulary items (symbols/words)
CREATE TABLE vocabulary (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  image_type TEXT NOT NULL,        -- 'bundled' | 'custom'
  image_path TEXT NOT NULL,        -- Relative path to image
  audio_type TEXT NOT NULL,        -- 'tts' | 'custom'
  audio_path TEXT,                 -- Path to custom recording (null if TTS)
  category_id TEXT,                -- Foreign key to categories
  grid_position INTEGER NOT NULL,  -- Fixed position for motor planning
  is_visible INTEGER DEFAULT 1,    -- Show/hide without deleting
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Categories (folders/groups)
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  image_path TEXT NOT NULL,
  parent_id TEXT,                  -- For nested categories (null = root)
  grid_position INTEGER NOT NULL,
  is_visible INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);

-- User settings
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Grid configurations
CREATE TABLE grids (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  rows INTEGER NOT NULL DEFAULT 3,
  columns INTEGER NOT NULL DEFAULT 3,
  is_active INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL
);
```

### Directory Structure

```
/avitalk
├── app/                          # Expo Router screens
│   ├── (main)/
│   │   ├── _layout.tsx          # Main tab/stack layout
│   │   ├── index.tsx            # Home grid screen
│   │   └── category/[id].tsx    # Category sub-grid
│   ├── (settings)/
│   │   ├── _layout.tsx          # Settings stack (PIN protected)
│   │   ├── index.tsx            # Settings home
│   │   ├── vocabulary.tsx       # Manage vocabulary
│   │   ├── add-word.tsx         # Add custom word
│   │   ├── edit-word/[id].tsx   # Edit existing word
│   │   ├── categories.tsx       # Manage categories
│   │   ├── grid-layout.tsx      # Configure grid size
│   │   ├── appearance.tsx       # Colors, text size
│   │   └── about.tsx            # App info, Guided Access help
│   ├── lock.tsx                 # PIN entry screen
│   └── _layout.tsx              # Root layout with lock logic
├── src/
│   ├── components/
│   │   ├── SymbolButton.tsx     # Individual grid button
│   │   ├── SymbolGrid.tsx       # Grid container
│   │   ├── CategoryButton.tsx   # Folder-style button
│   │   ├── BackButton.tsx       # Return to parent grid
│   │   ├── PinPad.tsx           # PIN entry component
│   │   ├── AudioRecorder.tsx    # Record custom audio
│   │   └── ImagePicker.tsx      # Select/capture image
│   ├── hooks/
│   │   ├── useSpeech.ts         # TTS functionality
│   │   ├── useAudioPlayer.ts    # Play custom recordings
│   │   ├── useAudioRecorder.ts  # Record audio
│   │   ├── useDatabase.ts       # SQLite operations
│   │   ├── useVocabulary.ts     # CRUD for vocabulary
│   │   ├── useCategories.ts     # CRUD for categories
│   │   ├── useSettings.ts       # App settings
│   │   └── useAppLock.ts        # Lock state management
│   ├── stores/
│   │   ├── appStore.ts          # Zustand store
│   │   └── lockStore.ts         # Lock state
│   ├── db/
│   │   ├── database.ts          # SQLite initialization
│   │   ├── migrations.ts        # Schema migrations
│   │   └── seed.ts              # Initial vocabulary data
│   ├── utils/
│   │   ├── constants.ts         # App constants
│   │   ├── fileSystem.ts        # File operations
│   │   └── uuid.ts              # ID generation
│   └── types/
│       └── index.ts             # TypeScript types
├── assets/
│   ├── symbols/                 # Bundled ARASAAC symbols
│   │   ├── core/               # Core vocabulary (~100 symbols)
│   │   ├── food/               # Food category
│   │   ├── drinks/             # Drinks category
│   │   ├── people/             # People category
│   │   ├── actions/            # Verbs/actions
│   │   ├── feelings/           # Emotions
│   │   └── objects/            # Common objects
│   └── ui/                      # App UI assets
│       ├── folder-icon.png
│       ├── back-arrow.png
│       └── settings-icon.png
├── scripts/
│   └── download-symbols.js     # Script to download ARASAAC symbols
├── docs/
│   └── testing-checklist.md    # QA testing checklist
├── app.json                     # Expo config
├── eas.json                     # EAS Build config
├── package.json
├── tsconfig.json
└── README.md
```

---

## Implementation Phases

### Phase 1: Project Foundation (Prompts 1-3)

Set up the Expo project, configure TypeScript, initialize the database schema, and create the basic app structure with navigation.

### Phase 2: Core Grid Functionality (Prompts 4-7)

Build the symbol grid display, implement text-to-speech, create the button components with proper touch handling and visual feedback.

### Phase 3: Symbol Library Integration (Prompts 8-10)

Download and bundle ARASAAC symbols, create the initial vocabulary seed data, implement category navigation.

### Phase 4: Custom Vocabulary (Prompts 11-14)

Add image picker, audio recorder, create/edit vocabulary screens, implement grid position management.

### Phase 5: App Lock & Settings (Prompts 15-17)

Build PIN lock system, settings screens, Guided Access integration guidance.

### Phase 6: Polish & Testing (Prompts 18-20)

Accessibility improvements, performance optimization, build configuration for iPad/Android.

---

## Claude Code Implementation Prompts

### Prompt 1: Project Initialization

Create a new Expo React Native project for an AAC (Augmentative and Alternative Communication) speech therapy app called "AviTalk".

Requirements:
1. Use Expo SDK 52 or latest stable
2. TypeScript configuration
3. Expo Router for navigation
4. Install these dependencies:
   - expo-sqlite (database)
   - expo-file-system (file storage)
   - expo-speech (text-to-speech)
   - expo-av (audio recording/playback)
   - expo-image-picker (custom images)
   - expo-secure-store (PIN storage)
   - zustand (state management)
   - uuid (ID generation)

5. Configure app.json for:
   - App name: "AviTalk"
   - Bundle ID: com.avitalk.app
   - iPad and iOS support (App Store ready)
   - Android tablet support
   - Portrait orientation locked
   - Require full screen (no split view)
   - Privacy usage descriptions for camera, microphone, photo library

6. Set up the basic directory structure as defined above

7. Create a basic _layout.tsx that will eventually handle the app lock logic

Do not create placeholder screens yet - just the project structure and configuration.

### Prompt 2: TypeScript Types and Constants

Create the TypeScript type definitions and constants for AviTalk.

Create /src/types/index.ts with:

1. VocabularyItem type:
   - id: string
   - label: string
   - imageType: 'bundled' | 'custom'
   - imagePath: string
   - audioType: 'tts' | 'custom'
   - audioPath: string | null
   - categoryId: string | null
   - gridPosition: number
   - isVisible: boolean
   - createdAt: number
   - updatedAt: number

2. Category type:
   - id: string
   - label: string
   - imagePath: string
   - parentId: string | null
   - gridPosition: number
   - isVisible: boolean
   - createdAt: number
   - updatedAt: number

3. GridConfig type:
   - id: string
   - name: string
   - rows: number
   - columns: number
   - isActive: boolean
   - createdAt: number

4. AppSettings type:
   - gridRows: number
   - gridColumns: number
   - speakOnPress: boolean (vs speak on release)
   - speechRate: number (0.5 to 1.5)
   - showLabels: boolean
   - labelSize: 'small' | 'medium' | 'large'
   - buttonPadding: 'compact' | 'normal' | 'spacious'
   - pinCode: string
   - isPinEnabled: boolean

Create /src/utils/constants.ts with:

1. DEFAULT_SETTINGS matching AppSettings with sensible defaults:
   - 3x3 grid
   - speak on press
   - speech rate 0.8 (slightly slower for learning)
   - show labels true
   - medium label size
   - normal padding
   - PIN disabled by default

2. GRID_SIZE_OPTIONS: array of {rows, columns, label} from 2x2 to 6x6

3. SPEECH_RATE_OPTIONS: array from 0.5 to 1.5 in 0.1 increments

4. CATEGORY_IDS: object with predefined category IDs:
   - ROOT: 'root'
   - CORE: 'core-words'
   - FOOD: 'food'
   - DRINKS: 'drinks'
   - PEOPLE: 'people'
   - ACTIONS: 'actions'
   - FEELINGS: 'feelings'
   - OBJECTS: 'objects'

5. File path constants:
   - CUSTOM_IMAGES_DIR: 'custom-images'
   - CUSTOM_AUDIO_DIR: 'custom-audio'
   - BUNDLED_SYMBOLS_DIR: path to bundled assets

### Prompt 3: Database Setup

Create the SQLite database layer for AviTalk.

Create /src/db/database.ts:

1. Initialize expo-sqlite with database name 'avitalk.db'

2. Create initDatabase() function that:
   - Creates the vocabulary table with all columns from the schema
   - Creates the categories table
   - Creates the settings table
   - Creates the grids table
   - Creates indexes on:
     - vocabulary.category_id
     - vocabulary.grid_position
     - categories.parent_id
   - Uses IF NOT EXISTS for all creates

3. Export typed query helpers:
   - runQuery(sql, params) - for INSERT/UPDATE/DELETE
   - getOne<T>(sql, params) - SELECT single row
   - getAll<T>(sql, params) - SELECT multiple rows

Create /src/db/migrations.ts:

1. SCHEMA_VERSION constant (start at 1)

2. migrations array with version-keyed SQL statements

3. runMigrations() function that:
   - Checks current schema version in settings
   - Runs any newer migrations in order
   - Updates schema version

Create /src/db/seed.ts:

1. seedInitialData() function that:
   - Checks if data already exists (don't re-seed)
   - Creates default categories (Core Words, Food, Drinks, People, Actions, Feelings, Objects)
   - Creates default grid config (3x3)
   - Inserts default settings
   - Does NOT insert vocabulary items yet (that comes with symbol integration)

2. Each category should have:
   - Unique ID from CATEGORY_IDS constant
   - Appropriate label
   - Placeholder image path (we'll add real images later)
   - Sequential grid positions

Create /src/hooks/useDatabase.ts:

1. Custom hook that:
   - Calls initDatabase on mount
   - Runs migrations
   - Calls seedInitialData
   - Returns { isReady, error } state
   - Handles initialization errors gracefully

The database should be fully initialized before the app renders main content.

### Prompt 4: Zustand State Management

Create the Zustand stores for AviTalk state management.

Create /src/stores/appStore.ts:

1. AppState interface with:
   - settings: AppSettings
   - currentCategoryId: string | null (null = root/home)
   - navigationStack: string[] (for back navigation through categories)
   - isLoading: boolean

2. AppActions interface with:
   - setSettings(settings: Partial<AppSettings>): void
   - navigateToCategory(categoryId: string): void
   - navigateBack(): void
   - navigateHome(): void
   - setLoading(loading: boolean): void

3. Create the store with:
   - Initial state from DEFAULT_SETTINGS
   - Persist middleware using AsyncStorage for settings only
   - Actions that update state immutably

4. navigateToCategory should:
   - Push current category to navigation stack
   - Set new current category

5. navigateBack should:
   - Pop from navigation stack
   - Set current to popped value (or null if empty)

Create /src/stores/lockStore.ts:

1. LockState interface with:
   - isLocked: boolean
   - isSettingsLocked: boolean
   - lastActivityTime: number

2. LockActions interface with:
   - unlock(): void
   - lockSettings(): void
   - unlockSettings(): void
   - updateActivity(): void

3. Create store with:
   - App starts unlocked (main grid accessible)
   - Settings always start locked
   - Activity tracking for potential auto-lock feature

Both stores should:
- Use TypeScript for full type safety
- Export typed useAppStore and useLockStore hooks
- Export selector hooks for common selections (useCurrentCategory, useSettings, etc.)

### Prompt 5: Text-to-Speech Hook

Create the text-to-speech functionality for AviTalk.

Create /src/hooks/useSpeech.ts:

1. Import expo-speech

2. Create useSpeech hook that returns:
   - speak(text: string, options?: SpeechOptions): Promise<void>
   - stop(): void
   - isSpeaking: boolean

3. SpeechOptions should include:
   - rate?: number (from settings by default)
   - pitch?: number (default 1.0)
   - language?: string (default 'en-US')

4. The speak function should:
   - Stop any current speech first
   - Use the speech rate from app settings as default
   - Set isSpeaking to true when starting
   - Set isSpeaking to false when complete or stopped
   - Handle errors gracefully (log but don't crash)

5. Add useEffect cleanup to stop speech when component unmounts

6. Consider adding:
   - getAvailableVoices(): get list of installed voices
   - setVoice(voiceId): allow voice selection in settings

Create /src/hooks/useAudioPlayer.ts:

1. Import expo-av

2. Create useAudioPlayer hook for playing custom recordings:
   - playAudio(filePath: string): Promise<void>
   - stopAudio(): void
   - isPlaying: boolean

3. The playAudio function should:
   - Load the audio file from the given path
   - Play it
   - Unload when complete
   - Handle missing files gracefully

4. Add cleanup on unmount

Create /src/hooks/useSpeakWord.ts:

1. Combine speech and audio playback:
   - Takes a VocabularyItem
   - If audioType is 'tts', use speak() with the label
   - If audioType is 'custom', use playAudio() with audioPath
   - Returns { speakWord, isSpeaking }

This abstraction lets SymbolButton not care about the audio source.

### Prompt 6: Symbol Button Component

Create the SymbolButton component - the core interactive element of AviTalk.

Create /src/components/SymbolButton.tsx:

Props interface:
- item: VocabularyItem
- size: number (button dimensions)
- onPress: () => void
- showLabel: boolean
- labelSize: 'small' | 'medium' | 'large'
- disabled?: boolean

Component requirements:

1. Layout:
   - Square button with rounded corners (borderRadius: 12)
   - Image fills most of the button (85% height if label shown, 95% if not)
   - Label at bottom, centered, with slight padding
   - Consistent padding around image

2. Image handling:
   - If imageType is 'bundled', use require() with asset path
   - If imageType is 'custom', use { uri: imagePath }
   - Use resizeMode 'contain' to preserve aspect ratio
   - Show placeholder if image fails to load

3. Touch feedback:
   - Use Pressable (not TouchableOpacity)
   - On press: scale to 0.95, add highlight overlay
   - Visual feedback must be immediate and obvious
   - Support both "speak on press" and "speak on release" modes
   - The current mode comes from settings

4. Label styling:
   - Font sizes: small=12, medium=16, large=20
   - Bold weight for readability
   - Dark text on light background
   - Truncate with ellipsis if too long (2 lines max)

5. Accessibility:
   - accessibilityLabel = item.label
   - accessibilityRole = "button"
   - accessibilityHint = "Double tap to hear this word"

6. Visual design:
   - Light background (white or very light gray)
   - Subtle border (1px, light gray)
   - Subtle shadow for depth
   - High contrast between image and background

Create /src/components/CategoryButton.tsx:

Similar to SymbolButton but:
- Has a folder icon overlay or distinct visual treatment
- Different accessibility hint: "Double tap to open this category"
- Slightly different styling to indicate it's a folder

Both components should be memoized (React.memo) for performance since grids may have many buttons.

### Prompt 7: Symbol Grid Component

Create the SymbolGrid component that displays the vocabulary grid.

Create /src/components/SymbolGrid.tsx:

Props interface:
- items: (VocabularyItem | Category)[]
- gridRows: number
- gridColumns: number
- onItemPress: (item: VocabularyItem) => void
- onCategoryPress: (category: Category) => void
- showLabels: boolean
- labelSize: 'small' | 'medium' | 'large'
- padding: 'compact' | 'normal' | 'spacious'

Component requirements:

1. Grid layout:
   - Use FlatList with numColumns for performance
   - Calculate button size based on screen dimensions and grid config
   - Account for padding between buttons
   - Buttons should be square

2. Size calculation:
   - Get screen width using useWindowDimensions
   - Subtract container padding (based on padding prop)
   - Subtract gap between columns (gap * (columns - 1))
   - Divide by columns for button width
   - Same calculation for height based on rows

3. Padding values:
   - compact: 8px container, 4px gap
   - normal: 16px container, 8px gap
   - spacious: 24px container, 12px gap

4. Item ordering:
   - Items sorted by gridPosition
   - Empty positions should show empty/placeholder cells
   - Grid position locking means items ALWAYS appear in their designated spot

5. Empty cell handling:
   - If an item's gridPosition doesn't exist, show empty cell
   - Empty cells are not interactive
   - Empty cells have subtle dashed border or very light background

6. Rendering:
   - Determine if each item is VocabularyItem or Category (type guard)
   - Render SymbolButton for vocabulary
   - Render CategoryButton for categories
   - Pass appropriate onPress handler

7. Performance:
   - Use keyExtractor with item.id
   - Memoize renderItem function
   - Consider getItemLayout for fixed-size items

8. Scroll behavior:
   - For grids that fit on screen, disable scrolling
   - For larger vocabularies within a category, allow vertical scroll
   - scrollEnabled based on total items vs visible cells

Create /src/components/BackButton.tsx:

- Appears when inside a category (not at root)
- Positioned in top-left or as first grid item
- Shows back arrow icon and "Back" label
- Calls navigateBack from appStore
- Same visual style as other grid buttons for consistency

### Prompt 8: ARASAAC Symbol Integration

Set up ARASAAC symbol integration for AviTalk.

Note: ARASAAC symbols are licensed CC BY-NC-SA. They're free for personal and therapeutic use.

Create /scripts/download-symbols.js (Node.js script, not part of the app):

1. This script downloads ARASAAC symbols for bundling:
   - Uses ARASAAC API: https://api.arasaac.org
   - Downloads PNG symbols at 500px size (good for tablets)
   - Saves to /assets/symbols/{category}/

2. Define a CORE_VOCABULARY list of ~100 essential words:

   Core words (highest frequency):
   - want, more, stop, go, help, that, mine, you, I, it
   - yes, no, please, thank you, sorry
   - eat, drink, play, read, sleep, go, come, look, give, take

   People:
   - mom, dad, grandma, grandpa, baby, teacher, friend, me

   Food:
   - apple, banana, cookie, cracker, cheese, bread, chicken, rice, pasta
   - breakfast, lunch, dinner, snack

   Drinks:
   - water, milk, juice, cup

   Actions:
   - eat, drink, play, read, sleep, walk, run, sit, stand
   - open, close, push, pull, help, hug, kiss

   Feelings:
   - happy, sad, angry, scared, tired, sick, hungry, thirsty
   - hurt, love, like, want

   Objects:
   - ball, book, toy, blanket, phone, tv, car, bed
   - diaper, potty, bath, shoes, clothes

3. For each word:
   - Search ARASAAC API for the term
   - Download the first/best result
   - Save with filename: {word}.png
   - Log progress and any failures

4. Create a manifest.json that maps:
   - word -> filename
   - word -> ARASAAC ID (for attribution)
   - category assignments

Create /src/data/bundledSymbols.ts:

1. Import the manifest
2. Export BUNDLED_SYMBOLS constant with:
   - All symbol metadata
   - Require statements for each image (for bundling)
   - Category assignments

3. Helper function: getBundledSymbol(word: string) -> asset reference

Note: After running the download script, the symbols become part of the app bundle.
The script only needs to run once during development, not at runtime.

Create /assets/symbols/.gitkeep to ensure the directory exists.

Document in README.md:
- How to run the download script
- ARASAAC license attribution requirements
- How to add more symbols later

### Prompt 9: Vocabulary Data Hooks

Create the data access hooks for vocabulary and categories.

Create /src/hooks/useVocabulary.ts:

1. Hook that provides:
   - vocabulary: VocabularyItem[] (all items)
   - getByCategory(categoryId: string | null): VocabularyItem[]
   - getById(id: string): VocabularyItem | null
   - addItem(item: Omit<VocabularyItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>
   - updateItem(id: string, updates: Partial<VocabularyItem>): Promise<void>
   - deleteItem(id: string): Promise<void>
   - moveItem(id: string, newPosition: number): Promise<void>
   - reorderItems(categoryId: string, itemIds: string[]): Promise<void>

2. Grid position management:
   - When adding item, find next available position in category
   - When moving item, handle position swapping
   - Positions are 0-indexed, left-to-right, top-to-bottom
   - Position locking: once set, position doesn't change unless explicitly moved

3. Data loading:
   - Load all vocabulary on mount
   - Provide loading and error states
   - Refresh function to reload data

Create /src/hooks/useCategories.ts:

1. Hook that provides:
   - categories: Category[]
   - getRootCategories(): Category[] (parentId is null)
   - getSubcategories(parentId: string): Category[]
   - getById(id: string): Category | null
   - addCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>
   - updateCategory(id: string, updates: Partial<Category>): Promise<void>
   - deleteCategory(id: string): Promise<void>

2. Category deletion should:
   - Optionally move contained items to root or another category
   - Or delete contained items (with confirmation)
   - Never orphan vocabulary items

Create /src/hooks/useCurrentGrid.ts:

1. Combines vocabulary and categories for current view:
   - Uses currentCategoryId from appStore
   - Returns items for that category (or root if null)
   - Merges categories that should appear at current level
   - Sorts by gridPosition
   - Returns { items, categories, isLoading }

2. Items array should be:
   - Union type of (VocabularyItem | Category)
   - Type guard functions: isVocabularyItem(), isCategory()
   - Properly sorted by grid position
   - Ready to render in SymbolGrid

### Prompt 10: Seed Initial Vocabulary

Update the database seed to include the bundled ARASAAC vocabulary.

Update /src/db/seed.ts:

1. Import BUNDLED_SYMBOLS from the bundled symbols data

2. Update seedInitialData() to:
   - Create all default categories first (with proper images now)
   - Then create vocabulary items for each bundled symbol

3. For each bundled symbol, create a VocabularyItem:
   - id: generate UUID
   - label: the word
   - imageType: 'bundled'
   - imagePath: path to the bundled asset
   - audioType: 'tts'
   - audioPath: null
   - categoryId: from the symbol manifest
   - gridPosition: sequential within category
   - isVisible: true
   - timestamps: Date.now()

4. Category grid positions:
   - Core Words: position 0 (always first, most important)
   - Food: position 1
   - Drinks: position 2
   - People: position 3
   - Actions: position 4
   - Feelings: position 5
   - Objects: position 6

5. Within each category, vocabulary items get sequential positions:
   - Most common/important words get lower positions (appear first)
   - Order based on AAC best practices (core vocabulary research)

6. Create CORE_WORD_ORDER constant that defines the optimal order:
   - Based on Banajee, Dicarlo, & Stricklin (2003) core vocabulary research
   - Most frequently used words first
   - Example for Core Words category:
     1. more
     2. help
     3. stop
     4. go
     5. want
     6. that
     ... etc

7. Add a flag/setting to track if seeding is complete
   - Check this flag before seeding
   - Only seed once on fresh install
   - Provide a "reset to defaults" function for settings (separate from data)

8. Handle errors gracefully:
   - If a symbol file is missing, log warning but continue
   - Wrap in transaction for atomicity

### Prompt 11: Main Grid Screen

Create the main home screen that displays the symbol grid.

Create /app/(main)/index.tsx:

1. This is the home/root screen showing the main vocabulary grid

2. Use these hooks:
   - useCurrentGrid() for items to display
   - useSpeakWord() for audio playback
   - useAppStore() for settings and navigation
   - useDatabase() to ensure DB is ready

3. Screen layout:
   - Full screen grid, edge to edge
   - No header (maximize grid space for a 2-year-old)
   - Small settings gear icon in corner (leads to PIN entry)

4. Implement handlers:
   - onItemPress: call speakWord(item)
   - onCategoryPress: call navigateToCategory(category.id)

5. Show loading state while database initializes

6. The grid should display:
   - Root categories when currentCategoryId is null
   - Category contents when inside a category
   - Back button when inside a category

Create /app/(main)/category/[id].tsx:

1. Dynamic route for category views
2. Get category ID from route params
3. Set currentCategoryId in store on mount
4. Same grid display as home, but filtered to category
5. Include BackButton component

Create /app/(main)/_layout.tsx:

1. Stack navigator for main screens
2. No headers (headerShown: false)
3. Custom transitions if desired (or none for simplicity)
4. Gesture handling considerations:
   - Disable swipe-back gesture (confusing for child)
   - All navigation through explicit buttons

5. Settings button overlay:
   - Absolute positioned in top-right corner
   - Small, subtle (parent can find it, child ignores it)
   - Tapping it goes to lock screen / PIN entry

### Prompt 12: App Lock System

Create the PIN lock system for protecting settings.

Create /src/components/PinPad.tsx:

1. A numeric keypad for PIN entry:
   - Numbers 0-9 in standard phone layout
   - Large touch targets (remember, designed for adults, but easy to use)
   - Backspace button
   - Clear button

2. Props:
   - onComplete: (pin: string) => void
   - pinLength: number (default 4)
   - title: string
   - error?: string (to show "incorrect PIN")

3. Visual feedback:
   - Dots showing entered digits (filled/empty)
   - Button press feedback
   - Error shake animation on wrong PIN

Create /app/lock.tsx:

1. PIN entry screen that appears before settings

2. Two modes:
   - VERIFY: Check PIN against stored PIN
   - SET: Set a new PIN (with confirmation)

3. VERIFY mode:
   - Show PinPad
   - On complete, check against stored PIN
   - If correct, navigate to settings and unlock
   - If incorrect, show error, clear input

4. SET mode:
   - First entry: "Enter new PIN"
   - Second entry: "Confirm PIN"
   - If match, save and navigate to settings
   - If no match, show error, restart

Create /src/hooks/useAppLock.ts:

1. Manages lock state:
   - isSettingsLocked: boolean
   - storedPin: string | null
   - isPinSet: boolean

2. Functions:
   - verifyPin(pin: string): boolean
   - setPin(pin: string): Promise<void>
   - removePin(): Promise<void>
   - lockSettings(): void
   - unlockSettings(): void

3. PIN stored in secure storage (expo-secure-store)

Update /app/_layout.tsx:

1. Root layout that wraps everything
2. Check if trying to access settings routes
3. If settings route and locked, redirect to lock screen
4. After successful unlock, allow settings access
5. Re-lock settings when leaving settings area

Create Guided Access instructions component:

1. A help screen/modal explaining:
   - What Guided Access is
   - How to enable it (Settings > Accessibility > Guided Access)
   - How to start a Guided Access session (triple-click home/side button)
   - How to end a session (triple-click + enter passcode)

2. Include screenshots or illustrations if possible
3. Show this on first launch and make it accessible from settings

### Prompt 13: Custom Image Picker

Create the image picker component for custom vocabulary.

Create /src/components/ImagePicker.tsx:

1. Props:
   - onImageSelected: (uri: string) => void
   - currentImage?: string
   - size?: number (preview size)

2. Features:
   - Button to choose from photo library
   - Button to take new photo with camera
   - Preview of selected/current image
   - Remove/clear button

3. Implementation:
   - Use expo-image-picker
   - Request permissions appropriately
   - Handle permission denial gracefully

4. Image processing:
   - Resize to reasonable dimensions (500x500 max)
   - Compress to reduce storage
   - Save to app's document directory
   - Return the local file URI

Create /src/utils/imageUtils.ts:

1. saveImageToStorage(sourceUri: string): Promise<string>
   - Copy image to CUSTOM_IMAGES_DIR
   - Generate unique filename
   - Return the new path

2. deleteImage(path: string): Promise<void>
   - Remove image file
   - Handle missing file gracefully

3. getImageSource(item: VocabularyItem): ImageSource
   - Return require() for bundled
   - Return { uri } for custom

Create /src/hooks/useImagePicker.ts:

1. Wraps expo-image-picker with permissions handling:
   - pickFromLibrary(): Promise<string | null>
   - takePhoto(): Promise<string | null>
   - checkPermissions(): Promise<boolean>
   - requestPermissions(): Promise<boolean>

2. Returns:
   - pickFromLibrary function
   - takePhoto function
   - hasPermission state
   - isLoading state

Handle edge cases:
- User cancels selection
- Permission denied
- Camera not available (simulator)
- Storage full

### Prompt 14: Audio Recorder Component

Create the audio recorder for custom word recordings.

Create /src/components/AudioRecorder.tsx:

1. Props:
   - onRecordingComplete: (uri: string) => void
   - currentRecording?: string
   - maxDuration?: number (default 5 seconds)

2. UI states:
   - Idle: Show record button
   - Recording: Show stop button, recording indicator, timer
   - Recorded: Show play button, re-record button, save button
   - Playing: Show stop button

3. Visual design:
   - Large, clear record button (red circle)
   - Obvious recording indicator (pulsing, red border)
   - Duration display during recording
   - Waveform visualization if feasible (nice to have)

Create /src/hooks/useAudioRecorder.ts:

1. Uses expo-av for recording:
   - startRecording(): Promise<void>
   - stopRecording(): Promise<string> (returns URI)
   - cancelRecording(): void

2. Configuration:
   - Audio quality suitable for speech
   - Mono channel (smaller files)
   - M4A format (good compatibility)
   - Sample rate: 44100

3. Permission handling:
   - Check microphone permission
   - Request if needed
   - Handle denial gracefully

4. Returns:
   - startRecording
   - stopRecording
   - cancelRecording
   - isRecording
   - recordingDuration
   - hasPermission

Create /src/utils/audioUtils.ts:

1. saveRecordingToStorage(sourceUri: string): Promise<string>
   - Move recording to CUSTOM_AUDIO_DIR
   - Generate unique filename
   - Return the new path

2. deleteRecording(path: string): Promise<void>

3. getRecordingDuration(path: string): Promise<number>

Create test component for recording flow:
1. Press and hold to record (alternative UX)
2. Release to stop
3. Play back immediately
4. Confirm or re-record

### Prompt 15: Add/Edit Vocabulary Screens

Create the screens for adding and editing custom vocabulary.

Create /app/(settings)/add-word.tsx:

1. Form for creating new vocabulary item:
   - Label input (text field)
   - Image picker component
   - Audio section:
     - Toggle: Use TTS or Custom Recording
     - If custom: AudioRecorder component
     - If TTS: Preview button to hear it
   - Category selector (dropdown/picker)
   - Save button

2. Validation:
   - Label required
   - Image required
   - If custom audio selected, recording required

3. On save:
   - Save custom image if selected
   - Save custom audio if recorded
   - Create vocabulary item via useVocabulary hook
   - Navigate back to vocabulary list

4. Grid position:
   - Automatically assign next available position in selected category
   - Show message: "This word will appear in position X"

Create /app/(settings)/edit-word/[id].tsx:

1. Load existing vocabulary item by ID
2. Pre-populate all form fields
3. Same form as add-word but with:
   - Delete button (with confirmation)
   - Different save logic (update vs create)

4. Handle image/audio changes:
   - If changing image, delete old custom image (if was custom)
   - If changing audio, delete old custom recording (if was custom)
   - Don't delete bundled assets

5. Position editing:
   - Show current position
   - Allow changing position (swap with item in target position)
   - Visual grid preview showing current position

Create /app/(settings)/vocabulary.tsx:

1. List of all vocabulary items:
   - Grouped by category
   - Expandable/collapsible categories
   - Each item shows: thumbnail, label, audio type indicator

2. Actions:
   - Tap item to edit
   - Add button to create new
   - Search/filter functionality

3. Bulk actions (nice to have):
   - Select multiple
   - Move to category
   - Delete selected

Create shared components:

/src/components/CategoryPicker.tsx:
- Dropdown to select a category
- Shows all categories
- Option for "No category" (root level)

/src/components/AudioTypeToggle.tsx:
- Switch between TTS and Custom Recording
- Clear visual indication of current selection

### Prompt 16: Settings Screens

Create the settings screens for app configuration.

Create /app/(settings)/_layout.tsx:

1. Stack navigator for settings screens
2. Header with back button and title
3. Consistent styling across all settings screens

Create /app/(settings)/index.tsx (Settings Home):

1. List of settings sections:
   - Grid Layout (rows, columns)
   - Appearance (labels, sizes, colors)
   - Speech (rate, voice)
   - Security (PIN settings)
   - Vocabulary (manage words)
   - Categories (manage categories)
   - Help (Guided Access instructions)
   - About

2. Each item navigates to its detail screen
3. Show current value preview where applicable

Create /app/(settings)/grid-layout.tsx:

1. Grid size selector:
   - Visual preview of grid sizes (2x2 through 6x6)
   - Tap to select
   - Show how many items fit

2. Preview:
   - Mock grid showing the layout
   - Updates live as selection changes

Create /app/(settings)/appearance.tsx:

1. Show labels toggle
2. Label size selector (small/medium/large)
3. Button padding selector (compact/normal/spacious)
4. Live preview of button appearance

Create /app/(settings)/speech.tsx:

1. Speech rate slider (0.5 to 1.5)
2. Test button to hear sample at current rate
3. Speak on press vs release toggle
4. Voice selector (if multiple voices available)

Create /app/(settings)/security.tsx:

1. PIN enabled toggle
2. Change PIN button (if PIN is set)
3. Remove PIN button (with confirmation)
4. Guided Access section:
   - Explanation text
   - Link to full instructions
   - "Check Guided Access Status" if possible

Create /app/(settings)/categories.tsx:

1. List of all categories
2. Reorder categories (drag and drop or move up/down)
3. Edit category (name, image)
4. Add new category
5. Delete category (with item handling options)

Create /app/(settings)/about.tsx:

1. App version
2. ARASAAC attribution and license info
3. Link to ARASAAC website
4. Credits
5. Reset to defaults button (with confirmation)

### Prompt 17: Navigation and Layout Polish

Finalize the navigation structure and app layout.

Update /app/_layout.tsx (Root Layout):

1. Initialize database on app start
2. Show splash/loading screen while initializing
3. Set up navigation container
4. Handle deep linking if needed
5. Global error boundary

2. Lock logic:
   - Track if user is in settings area
   - Redirect to lock screen if accessing settings while locked
   - Re-lock when leaving settings

Create /app/(main)/_layout.tsx:

1. Main app area layout
2. No headers for maximum grid space
3. Settings button overlay in corner
4. Handle safe areas properly (notch, home indicator)

Implement navigation flow:

1. App opens → Main grid (home)
2. Tap category → Navigate to category grid
3. Tap Back → Return to parent (or home)
4. Tap Settings icon → Go to lock screen
5. Enter correct PIN → Go to settings
6. Leave settings → Re-lock, return to main grid

Add visual polish:

1. Smooth transitions between screens
2. Loading states for async operations
3. Error states with retry options
4. Empty states (no items in category)

Gesture handling:

1. Disable swipe-to-go-back (confusing for child)
2. Ensure taps are the only interaction method in main grid
3. Settings screens can use standard navigation gestures

Safe area handling:

1. Main grid: content goes edge-to-edge, but buttons don't overlap notch/home indicator
2. Settings: standard safe area insets
3. Test on devices with notch and home indicator

### Prompt 18: Accessibility and Motor Planning

Implement accessibility features and motor planning support.

Update all interactive components for accessibility:

1. SymbolButton accessibility:
   - accessibilityLabel: item label
   - accessibilityRole: "button"
   - accessibilityHint: "Tap to hear [label]"
   - accessibilityState: { disabled: isDisabled }

2. CategoryButton accessibility:
   - accessibilityLabel: "Open [category name]"
   - accessibilityRole: "button"
   - accessibilityHint: "Tap to see words in this category"

3. Screen reader announcements:
   - Announce when word is spoken
   - Announce when entering/leaving categories
   - Announce grid position changes

Motor planning features:

1. Grid position consistency:
   - Words NEVER move from their assigned position
   - Even if items are hidden, their position is preserved
   - New items get next available position, never fill gaps

2. Consistent layout across categories:
   - Same grid size in all categories
   - Same visual style
   - Back button always in same position (top-left or position 0)

3. Add motor planning mode setting:
   - When enabled, enforce stricter position rules
   - Show position numbers on edit screen
   - Warn if trying to move items

Touch optimization:

1. Minimum touch target: 44x44 points (Apple HIG)
2. For 2-year-old, aim for larger: 60x60 minimum
3. Add touch feedback delay option (for children who need more time)
4. Support for both tap and press-and-hold patterns

Create /src/components/AccessibilityAnnouncer.tsx:

1. Utility component for screen reader announcements
2. Uses AccessibilityInfo.announceForAccessibility
3. Queue announcements to avoid overlap

Test with VoiceOver (iOS) and TalkBack (Android):
- Full navigation should work
- All buttons should be labeled
- Focus order should be logical (left-to-right, top-to-bottom)

### Prompt 19: Performance Optimization

Optimize app performance for smooth operation on tablets.

Grid rendering optimization:

1. Use React.memo for SymbolButton and CategoryButton
   - Only re-render when item data changes
   - Memoize onPress handlers

2. FlatList optimization:
   - Set getItemLayout for fixed-size items
   - Use keyExtractor with item ID
   - Set initialNumToRender appropriately
   - Use windowSize to limit rendered items

3. Image optimization:
   - Use Image component with proper resizeMode
   - Consider FastImage library for better caching
   - Preload visible images
   - Use appropriate image sizes (not oversized)

Database optimization:

1. Index frequently queried columns
2. Use prepared statements
3. Batch operations in transactions
4. Lazy load vocabulary by category (not all at once)

Audio optimization:

1. Preload TTS engine on app start
2. Keep Audio.Sound instance ready for custom recordings
3. Avoid creating new instances for each playback

Memory management:

1. Clean up audio resources on unmount
2. Release images when not visible
3. Monitor memory usage in development

Create performance test:

1. Test with 500+ vocabulary items
2. Test rapid button presses
3. Test category navigation speed
4. Test on older iPad models if available

Bundle size optimization:

1. Review bundled symbol sizes
   - Compress PNGs
   - Consider WebP format
   - Remove unnecessary metadata

2. Code splitting if needed (Expo Router handles this)

3. Review dependencies for bloat

### Prompt 20: Build Configuration and Testing

Configure build settings and prepare for deployment.

Update app.json / app.config.js:

1. iOS configuration:
   - bundleIdentifier: com.avitalk.app
   - iPad support (isTabletOnly: false, supportsTablet: true)
   - Require full screen (UIRequiresFullScreen: true)
   - Orientation locked to portrait
   - Privacy descriptions for camera, microphone, photos
   - Minimum iOS version: 15.0
   - App Store Connect configuration

2. Android configuration:
   - package name: com.avitalk.app
   - Tablet support
   - Minimum SDK: 24 (Android 7.0)
   - Target SDK: latest
   - Permissions: camera, microphone, storage

3. Splash screen:
   - Simple, clean design
   - App name or icon
   - Background color matching app theme

4. App icon:
   - 1024x1024 master icon
   - Simple, recognizable design
   - Consider child-friendly imagery

Create /scripts/build.sh:

1. Build commands for:
   - Development build (expo run:ios, expo run:android)
   - Preview build (EAS Build preview profile)
   - Production build (EAS Build production profile)

2. Include pre-build checks:
   - TypeScript compilation
   - Lint check
   - Test run

Create eas.json for EAS Build:

1. Development profile
2. Preview profile (internal testing)
3. Production profile

Testing checklist document:

Create /docs/testing-checklist.md:

1. Core functionality:
   - [ ] Grid displays correctly
   - [ ] Tap plays word
   - [ ] Categories navigate correctly
   - [ ] Back button works
   - [ ] Custom vocabulary works
   - [ ] Custom recordings work

2. Settings:
   - [ ] PIN lock works
   - [ ] Grid size changes apply
   - [ ] Speech rate changes apply
   - [ ] All settings persist

3. Edge cases:
   - [ ] Empty category
   - [ ] Missing image
   - [ ] Missing audio file
   - [ ] Very long labels
   - [ ] Many vocabulary items

4. Device testing:
   - [ ] iPad (primary target)
   - [ ] iPhone
   - [ ] Android tablet
   - [ ] Different screen sizes

5. Accessibility:
   - [ ] VoiceOver navigation
   - [ ] TalkBack navigation

6. App Store requirements:
   - [ ] Privacy policy
   - [ ] App Store screenshots
   - [ ] App description
   - [ ] Age rating configuration

Document known limitations:
- True kiosk mode requires Guided Access (iOS) or MDM
- Custom TTS voices depend on device
- Offline only (no sync)

---

## iOS App Store Submission Requirements

### Required for Submission

1. **App Store Connect Account**: Apple Developer Program membership ($99/year)

2. **Privacy Policy**: Required URL for apps that collect any data
   - Even if no data is collected, a privacy policy stating this is needed
   - Host on a simple webpage

3. **App Screenshots**:
   - 6.7" iPhone (1290 x 2796 pixels)
   - 6.5" iPhone (1284 x 2778 pixels)
   - 12.9" iPad Pro (2048 x 2732 pixels)
   - Up to 10 screenshots per device size

4. **App Icon**: 1024x1024 PNG, no alpha channel

5. **App Description**: Up to 4000 characters

6. **Keywords**: Up to 100 characters

7. **Support URL**: Required contact/support page

8. **Age Rating**: Complete the questionnaire (this app should be 4+)

9. **Privacy Nutrition Labels**:
   - Data not collected (if true)
   - Or specify what data is collected

### App Review Guidelines Considerations

1. **Accessibility**: Ensure VoiceOver support
2. **Crashes**: App must not crash during review
3. **Placeholder content**: All features must work
4. **In-app purchases**: None for this app
5. **Children's category**: Consider COPPA compliance

---

## Post-MVP Enhancements (Future Phases)

These features are out of scope for MVP but documented for future consideration:

1. **Word combinations**: Tap multiple symbols to build phrases
2. **Usage analytics**: Track which words are used most (local only)
3. **Multiple boards**: Different vocabulary sets for different contexts
4. **Backup/restore**: Export and import vocabulary data
5. **Keyboard/typing**: For children who progress to spelling
6. **Partner window**: Second view for communication partner
7. **Scanning access**: For users who can't directly touch
8. **Symbol search**: Find symbols by typing
9. **Cloud sync**: Optional sync across devices
10. **Therapist mode**: Progress tracking for SLPs

---

## Resources and References

### ARASAAC

- Website: https://arasaac.org
- API Documentation: https://arasaac.org/developers/api
- License: CC BY-NC-SA 4.0
- Attribution requirement: Must credit ARASAAC in app

### Core Vocabulary Research

- Banajee, M., Dicarlo, C., & Stricklin, S. (2003). Core vocabulary determination for toddlers
- Project Core: https://www.project-core.com/
- PrAACtical AAC: https://praacticalaac.org/

### React Native / Expo

- Expo Documentation: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/
- Expo SQLite: https://docs.expo.dev/versions/latest/sdk/sqlite/
- Expo Speech: https://docs.expo.dev/versions/latest/sdk/speech/

### iOS Kiosk Mode

- Guided Access: https://support.apple.com/en-us/HT202612
- Single App Mode (MDM): Requires enterprise management

---

## Getting Started

To build AviTalk, follow the prompts in sequence:

1. Use Prompt 1 to initialize the project
2. Follow prompts 2-20 in order
3. Test on device frequently (not just simulator)
4. Adjust symbol selection based on user needs
5. Consult with speech therapists for vocabulary prioritization

This is meaningful work that can genuinely help children communicate.
