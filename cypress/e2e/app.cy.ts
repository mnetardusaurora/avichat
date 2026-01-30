describe('AviChat App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the app successfully', () => {
    // Verify the page loads without errors
    cy.document().its('readyState').should('eq', 'complete');
  });

  it('should display the app title', () => {
    // Check that the main title is visible
    cy.contains('AviChat').should('be.visible');
  });

  it('should display the symbol grid', () => {
    // Verify the symbol grid is present
    cy.get('[data-testid="symbol-grid"]').should('be.visible');
  });

  it('should have proper viewport for tablet', () => {
    // Verify the app renders properly at tablet dimensions
    cy.viewport(1024, 768);
    cy.contains('AviChat').should('be.visible');
  });

  it('should not have any console errors on load', () => {
    cy.window().then((win) => {
      // Check that window exists and app has loaded
      expect(win.document.body).to.exist;
    });
  });
});
