#!/usr/bin/env node

/**
 * ARASAAC Symbol Downloader for AviTalk
 *
 * This script downloads symbols from the ARASAAC API and saves them
 * to the assets/symbols directory for bundling with the app.
 *
 * ARASAAC License: CC BY-NC-SA 4.0
 * https://arasaac.org/terms-of-use
 *
 * Usage: node scripts/download-symbols.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ARASAAC_API = 'https://api.arasaac.org/v1';
const SYMBOL_SIZE = 500; // pixels
const ASSETS_DIR = path.join(__dirname, '..', 'assets', 'symbols');

// Core vocabulary to download
const VOCABULARY = {
  core: [
    { word: 'more', keywords: ['more'] },
    { word: 'help', keywords: ['help'] },
    { word: 'stop', keywords: ['stop'] },
    { word: 'go', keywords: ['go'] },
    { word: 'want', keywords: ['want', 'desire'] },
    { word: 'yes', keywords: ['yes'] },
    { word: 'no', keywords: ['no'] },
    { word: 'please', keywords: ['please'] },
    { word: 'thank-you', keywords: ['thank you', 'thanks'] },
    { word: 'sorry', keywords: ['sorry', 'apologize'] },
    { word: 'mine', keywords: ['mine', 'my'] },
    { word: 'you', keywords: ['you'] },
    { word: 'i', keywords: ['I', 'me'] },
    { word: 'it', keywords: ['it'] },
    { word: 'that', keywords: ['that'] },
  ],
  food: [
    { word: 'apple', keywords: ['apple'] },
    { word: 'banana', keywords: ['banana'] },
    { word: 'cookie', keywords: ['cookie', 'biscuit'] },
    { word: 'cracker', keywords: ['cracker'] },
    { word: 'cheese', keywords: ['cheese'] },
    { word: 'bread', keywords: ['bread'] },
    { word: 'chicken', keywords: ['chicken'] },
    { word: 'rice', keywords: ['rice'] },
    { word: 'pasta', keywords: ['pasta', 'spaghetti'] },
    { word: 'snack', keywords: ['snack'] },
  ],
  drinks: [
    { word: 'water', keywords: ['water'] },
    { word: 'milk', keywords: ['milk'] },
    { word: 'juice', keywords: ['juice', 'orange juice'] },
    { word: 'cup', keywords: ['cup', 'glass'] },
  ],
  people: [
    { word: 'mom', keywords: ['mom', 'mother', 'mummy'] },
    { word: 'dad', keywords: ['dad', 'father', 'daddy'] },
    { word: 'grandma', keywords: ['grandma', 'grandmother'] },
    { word: 'grandpa', keywords: ['grandpa', 'grandfather'] },
    { word: 'baby', keywords: ['baby'] },
    { word: 'teacher', keywords: ['teacher'] },
    { word: 'friend', keywords: ['friend'] },
    { word: 'me', keywords: ['me', 'myself'] },
  ],
  actions: [
    { word: 'eat', keywords: ['eat', 'eating'] },
    { word: 'drink', keywords: ['drink', 'drinking'] },
    { word: 'play', keywords: ['play', 'playing'] },
    { word: 'read', keywords: ['read', 'reading'] },
    { word: 'sleep', keywords: ['sleep', 'sleeping'] },
    { word: 'walk', keywords: ['walk', 'walking'] },
    { word: 'run', keywords: ['run', 'running'] },
    { word: 'sit', keywords: ['sit', 'sitting'] },
    { word: 'stand', keywords: ['stand', 'standing'] },
    { word: 'open', keywords: ['open'] },
    { word: 'close', keywords: ['close', 'shut'] },
    { word: 'push', keywords: ['push'] },
    { word: 'pull', keywords: ['pull'] },
    { word: 'hug', keywords: ['hug', 'embrace'] },
    { word: 'kiss', keywords: ['kiss'] },
  ],
  feelings: [
    { word: 'happy', keywords: ['happy', 'glad'] },
    { word: 'sad', keywords: ['sad', 'unhappy'] },
    { word: 'angry', keywords: ['angry', 'mad'] },
    { word: 'scared', keywords: ['scared', 'afraid'] },
    { word: 'tired', keywords: ['tired', 'sleepy'] },
    { word: 'sick', keywords: ['sick', 'ill'] },
    { word: 'hungry', keywords: ['hungry'] },
    { word: 'thirsty', keywords: ['thirsty'] },
    { word: 'hurt', keywords: ['hurt', 'pain'] },
    { word: 'love', keywords: ['love'] },
    { word: 'like', keywords: ['like'] },
  ],
  objects: [
    { word: 'ball', keywords: ['ball'] },
    { word: 'book', keywords: ['book'] },
    { word: 'toy', keywords: ['toy'] },
    { word: 'blanket', keywords: ['blanket'] },
    { word: 'phone', keywords: ['phone', 'telephone'] },
    { word: 'tv', keywords: ['television', 'tv'] },
    { word: 'car', keywords: ['car', 'automobile'] },
    { word: 'bed', keywords: ['bed'] },
    { word: 'diaper', keywords: ['diaper', 'nappy'] },
    { word: 'potty', keywords: ['potty', 'toilet'] },
    { word: 'bath', keywords: ['bath', 'bathtub'] },
    { word: 'shoes', keywords: ['shoes'] },
    { word: 'clothes', keywords: ['clothes', 'clothing'] },
  ],
};

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Search for a symbol by keyword
async function searchSymbol(keyword) {
  return new Promise((resolve, reject) => {
    const url = `${ARASAAC_API}/pictograms/en/search/${encodeURIComponent(keyword)}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const results = JSON.parse(data);
          resolve(results);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Download a symbol image
async function downloadSymbol(id, outputPath) {
  return new Promise((resolve, reject) => {
    const url = `${ARASAAC_API}/pictograms/${id}?download=true&resolution=${SYMBOL_SIZE}`;

    const file = fs.createWriteStream(outputPath);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

// Main download function
async function downloadAllSymbols() {
  console.log('Starting ARASAAC symbol download...\n');

  const manifest = {};
  let totalDownloaded = 0;
  let totalFailed = 0;

  for (const [category, words] of Object.entries(VOCABULARY)) {
    const categoryDir = path.join(ASSETS_DIR, category);
    ensureDir(categoryDir);

    console.log(`\nCategory: ${category.toUpperCase()}`);
    console.log('-'.repeat(40));

    for (const { word, keywords } of words) {
      let found = false;

      for (const keyword of keywords) {
        if (found) break;

        try {
          const results = await searchSymbol(keyword);

          if (results && results.length > 0) {
            // Use the first result
            const symbol = results[0];
            const outputPath = path.join(categoryDir, `${word}.png`);

            await downloadSymbol(symbol._id, outputPath);

            manifest[`${category}/${word}`] = {
              arasaacId: symbol._id,
              keywords: symbol.keywords,
            };

            console.log(`  ✓ ${word} (ID: ${symbol._id})`);
            totalDownloaded++;
            found = true;
          }
        } catch (error) {
          // Continue to next keyword
        }

        // Rate limiting - wait 100ms between requests
        await new Promise(r => setTimeout(r, 100));
      }

      if (!found) {
        console.log(`  ✗ ${word} (not found)`);
        totalFailed++;
      }
    }
  }

  // Save manifest
  const manifestPath = path.join(ASSETS_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log('\n' + '='.repeat(40));
  console.log(`Download complete!`);
  console.log(`  Downloaded: ${totalDownloaded}`);
  console.log(`  Failed: ${totalFailed}`);
  console.log(`  Manifest saved to: ${manifestPath}`);
  console.log('\nRemember: ARASAAC symbols are licensed CC BY-NC-SA 4.0');
  console.log('Attribution is required in the app.');
}

// Run
downloadAllSymbols().catch(console.error);
