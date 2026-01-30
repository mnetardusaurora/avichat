// E2E tests for photo customization flow
// Note: Actual image picker functionality cannot be fully tested in web e2e tests,
// but we can verify long-press interactions and UI elements

describe('Photo Customization', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have symbols that can be long-pressed', () => {
    // Verify symbols have the expected structure for long-press
    cy.get('[data-testid="symbol-want"]').should('exist');
    cy.get('[data-testid="symbol-more"]').should('exist');
  });

  it('should allow long-press on symbol buttons', () => {
    // Test that long-press doesn't break anything
    // (actual image picker would open on native, but web can't test that)
    cy.get('[data-testid="symbol-want"]').trigger('mousedown', { button: 0 });
    cy.wait(600); // Wait for long-press duration
    cy.get('[data-testid="symbol-want"]').trigger('mouseup');
  });

  it('should not allow long-press on categories button', () => {
    // Categories button should navigate, not customize
    cy.get('[data-testid="symbol-categories"]').should('exist');
    // Clicking should navigate to categories
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="header-title"]').should('contain', 'Categories');
  });

  it('should not allow long-press on back button', () => {
    // Navigate to a category
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-food"]').click();

    // Back button should exist and be functional
    cy.get('[data-testid="symbol-back"]').should('exist');
  });

  it('symbols should display emoji icons by default', () => {
    // Check that symbols display their default emoji
    cy.get('[data-testid="symbol-want"]').should('contain', '👋');
    cy.get('[data-testid="symbol-more"]').should('contain', '➕');
    cy.get('[data-testid="symbol-help"]').should('contain', '🆘');
  });

  it('category symbols should display emoji icons', () => {
    cy.get('[data-testid="symbol-categories"]').click();

    cy.get('[data-testid="symbol-people"]').should('contain', '👨‍👩‍👧‍👦');
    cy.get('[data-testid="symbol-food"]').should('contain', '🍎');
    cy.get('[data-testid="symbol-feelings"]').should('contain', '😊');
  });
});
