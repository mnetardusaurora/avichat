// E2E tests for text-to-speech functionality
// Note: Actual TTS audio cannot be verified in e2e tests,
// but we can verify the tap interactions work correctly

describe('Speech (Symbol Tap)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow tapping core word symbols', () => {
    // These symbols should be tappable and trigger speech
    const coreWords = ['want', 'more', 'help', 'stop', 'go', 'allDone', 'yes', 'no'];

    coreWords.forEach(word => {
      cy.get(`[data-testid="symbol-${word}"]`).click();
      // Allow brief moment for speech to be triggered
      cy.wait(100);
    });
  });

  it('should allow tapping Want symbol', () => {
    cy.get('[data-testid="symbol-want"]').click();
  });

  it('should allow tapping More symbol', () => {
    cy.get('[data-testid="symbol-more"]').click();
  });

  it('should allow tapping Help symbol', () => {
    cy.get('[data-testid="symbol-help"]').click();
  });

  it('should allow tapping Stop symbol', () => {
    cy.get('[data-testid="symbol-stop"]').click();
  });

  it('should allow tapping food category symbols', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-food"]').click();

    // Tap food items
    cy.get('[data-testid="symbol-apple"]').click();
    cy.get('[data-testid="symbol-banana"]').click();
    cy.get('[data-testid="symbol-cookie"]').click();
  });

  it('should allow tapping feelings category symbols', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-feelings"]').click();

    // Tap feeling items
    cy.get('[data-testid="symbol-happy"]').click();
    cy.get('[data-testid="symbol-sad"]').click();
    cy.get('[data-testid="symbol-mad"]').click();
  });

  it('should allow tapping people category symbols', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-people"]').click();

    // Tap people items
    cy.get('[data-testid="symbol-mommy"]').click();
    cy.get('[data-testid="symbol-daddy"]').click();
    cy.get('[data-testid="symbol-baby"]').click();
  });

  it('should allow rapid tapping of symbols', () => {
    // Test that rapid tapping works (speech should interrupt)
    cy.get('[data-testid="symbol-want"]').click();
    cy.get('[data-testid="symbol-more"]').click();
    cy.get('[data-testid="symbol-help"]').click();
    cy.get('[data-testid="symbol-stop"]').click();
  });

  it('should have correct accessibility attributes for speech', () => {
    cy.get('[data-testid="symbol-want"]')
      .should('have.attr', 'role', 'button')
      .and('have.attr', 'aria-label', 'Want');
  });
});
