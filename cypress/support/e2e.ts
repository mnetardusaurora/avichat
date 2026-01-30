// ***********************************************************
// This support file is loaded before every e2e test file.
// Put global configuration and behavior that modifies Cypress.
// ***********************************************************

import '@testing-library/cypress/add-commands';

// Ignore NativeWind color scheme errors - they don't affect app functionality
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore NativeWind dark mode color scheme error
  if (err.message.includes('Cannot manually set color scheme')) {
    return false;
  }
  // Ignore other non-critical errors
  if (err.message.includes('ResizeObserver loop')) {
    return false;
  }
  // Return true to fail the test for other errors
  return true;
});

// Custom commands can be defined here
declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom command types here if needed
    }
  }
}

// Prevent TypeScript from reading file as legacy script
export {};
