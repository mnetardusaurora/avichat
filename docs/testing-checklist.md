# AviTalk Testing Checklist

## Pre-Testing Setup
- [ ] Install app on test device (iPad preferred)
- [ ] Ensure device has audio enabled
- [ ] Test with both WiFi and Airplane mode

---

## Core Functionality

### Main Grid
- [ ] Grid displays correctly on launch
- [ ] Categories appear at root level
- [ ] Category icons are visible
- [ ] Grid sizing matches settings (default 3x3)

### Speech Output
- [ ] Tap symbol plays TTS audio
- [ ] Speech rate matches settings
- [ ] Speech continues even with app in background briefly
- [ ] Audio works in silent mode (check iOS settings)

### Category Navigation
- [ ] Tap category opens subcategory view
- [ ] Back button appears when in category
- [ ] Back button returns to previous level
- [ ] Category header shows correct name
- [ ] Deep navigation works (if nested categories exist)

### Vocabulary Display
- [ ] Symbols display correctly
- [ ] Labels show when enabled
- [ ] Labels hide when disabled
- [ ] Label sizes change correctly (S/M/L)
- [ ] Grid positions are consistent

---

## Settings

### Grid Layout
- [ ] All grid size options display
- [ ] Changing grid size updates main view
- [ ] Settings persist after app restart

### Appearance
- [ ] Show labels toggle works
- [ ] Label size options work
- [ ] Button padding options work
- [ ] Live preview updates

### Speech Settings
- [ ] Speech rate slider works
- [ ] Test speech button plays sample
- [ ] Speak on press/release toggle works
- [ ] Settings persist after restart

### Security
- [ ] PIN enable/disable works
- [ ] PIN verification works correctly
- [ ] Wrong PIN shows error
- [ ] PIN lock protects settings

### Vocabulary Management
- [ ] Vocabulary list loads
- [ ] Search filters correctly
- [ ] Category filter works
- [ ] Add word screen opens
- [ ] Edit word screen opens with data

### Category Management
- [ ] Category list loads
- [ ] Add category works
- [ ] Edit category works
- [ ] Delete category works
- [ ] Item count shows correctly

---

## Custom Vocabulary (Phase 4)

### Add Word
- [ ] Label input works
- [ ] Category selector works
- [ ] TTS preview works
- [ ] Save creates new word
- [ ] Word appears in correct category

### Edit Word
- [ ] Existing data loads
- [ ] Changes save correctly
- [ ] Delete removes word
- [ ] Position info displays

---

## Edge Cases

### Empty States
- [ ] Empty category shows appropriate message
- [ ] No search results shows message
- [ ] App handles missing images gracefully

### Performance
- [ ] App launches quickly
- [ ] Grid scrolling is smooth (if enabled)
- [ ] Rapid taps don't cause issues
- [ ] Memory usage is reasonable

### Error Handling
- [ ] Missing audio doesn't crash app
- [ ] Missing image shows placeholder
- [ ] Database errors show user-friendly message

---

## Device Testing

### iPad
- [ ] Portrait orientation works
- [ ] Full screen mode works
- [ ] Touch targets are large enough
- [ ] Safe areas handled correctly

### iPhone (if supporting)
- [ ] Portrait orientation works
- [ ] Smaller screen accommodated
- [ ] Touch targets still usable

### Different Screen Sizes
- [ ] iPad Mini
- [ ] iPad Pro 11"
- [ ] iPad Pro 12.9"

---

## Accessibility

### VoiceOver (iOS)
- [ ] All buttons have labels
- [ ] Navigation order is logical
- [ ] Focus moves correctly
- [ ] Announcements are clear

### General
- [ ] Text is readable
- [ ] Contrast is sufficient
- [ ] Touch targets meet minimum size (44pt)

---

## App Store Requirements

### Screenshots Needed
- [ ] 6.7" iPhone (1290 x 2796)
- [ ] 6.5" iPhone (1284 x 2778)
- [ ] 12.9" iPad Pro (2048 x 2732)

### Required Information
- [ ] App description (up to 4000 chars)
- [ ] Keywords (up to 100 chars)
- [ ] Support URL
- [ ] Privacy Policy URL
- [ ] Age Rating questionnaire completed

### Build Verification
- [ ] TypeScript compiles without errors
- [ ] No console errors in production
- [ ] App icon displays correctly
- [ ] Splash screen displays correctly

---

## Known Limitations

Document any known issues that don't block release:

1. _________________________
2. _________________________
3. _________________________

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Tester | | | |
| Reviewer | | | |
