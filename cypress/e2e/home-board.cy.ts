// E2E tests for home board display and symbol tap

describe('Home Board', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home board with title', () => {
    cy.get('[data-testid="header-title"]').should('contain', 'AviChat');
  });

  it('should display the 3x3 symbol grid', () => {
    cy.get('[data-testid="symbol-grid"]').should('exist');
  });

  it('should display core word symbols', () => {
    const coreWords = ['want', 'more', 'help', 'stop', 'go', 'allDone', 'yes', 'no', 'categories'];

    coreWords.forEach(word => {
      cy.get(`[data-testid="symbol-${word}"]`).should('exist');
    });
  });

  it('should display the Want symbol with correct label', () => {
    cy.get('[data-testid="symbol-want"]').should('contain', 'Want');
  });

  it('should display the More symbol with correct label', () => {
    cy.get('[data-testid="symbol-more"]').should('contain', 'More');
  });

  it('should display the Help symbol with correct label', () => {
    cy.get('[data-testid="symbol-help"]').should('contain', 'Help');
  });

  it('should display the Categories button', () => {
    cy.get('[data-testid="symbol-categories"]')
      .should('exist')
      .and('contain', 'Categories');
  });

  it('should not show back button on home screen', () => {
    cy.get('[data-testid="back-button"]').should('not.exist');
  });

  it('should have accessible labels on symbols', () => {
    cy.get('[data-testid="symbol-want"]')
      .should('have.attr', 'aria-label', 'Want');
  });
});
