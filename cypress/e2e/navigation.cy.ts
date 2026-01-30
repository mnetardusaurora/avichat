// E2E tests for navigation between boards

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to category selector when tapping Categories', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="header-title"]').should('contain', 'Categories');
  });

  it('should display category options in selector', () => {
    cy.get('[data-testid="symbol-categories"]').click();

    const categories = ['people', 'food', 'drinks', 'feelings', 'actions', 'places', 'things', 'animals'];

    categories.forEach(category => {
      cy.get(`[data-testid="symbol-${category}"]`).should('exist');
    });
  });

  it('should display back button in category selector', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-back"]').should('exist');
  });

  it('should navigate back from category selector to home', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="header-title"]').should('contain', 'Categories');

    cy.get('[data-testid="symbol-back"]').click();
    cy.get('[data-testid="header-title"]').should('contain', 'AviChat');
  });

  it('should navigate to Food category', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-food"]').click();
    cy.get('[data-testid="header-title"]').should('contain', 'Food');
  });

  it('should display food items in Food category', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-food"]').click();

    const foodItems = ['apple', 'banana', 'cookie', 'cracker'];

    foodItems.forEach(item => {
      cy.get(`[data-testid="symbol-${item}"]`).should('exist');
    });
  });

  it('should navigate to Feelings category', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-feelings"]').click();
    cy.get('[data-testid="header-title"]').should('contain', 'Feelings');
  });

  it('should display feeling items in Feelings category', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-feelings"]').click();

    const feelings = ['happy', 'sad', 'mad', 'scared', 'tired', 'hungry'];

    feelings.forEach(feeling => {
      cy.get(`[data-testid="symbol-${feeling}"]`).should('exist');
    });
  });

  it('should navigate to People category', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-people"]').click();
    cy.get('[data-testid="header-title"]').should('contain', 'People');
  });

  it('should display people items in People category', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-people"]').click();

    const people = ['mommy', 'daddy', 'baby', 'grandma', 'grandpa'];

    people.forEach(person => {
      cy.get(`[data-testid="symbol-${person}"]`).should('exist');
    });
  });

  it('should navigate back from sub-category to category selector', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-food"]').click();
    cy.get('[data-testid="header-title"]').last().should('contain', 'Food');

    // Click the back button in the header (use last to get visible one)
    cy.get('[data-testid="back-button"]').last().click();
    cy.get('[data-testid="header-title"]').last().should('contain', 'Categories');
  });

  it('should use symbol back button for navigation', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-food"]').click();
    cy.get('[data-testid="header-title"]').last().should('contain', 'Food');

    // Use the back symbol in the grid (use last to get visible one)
    cy.get('[data-testid="symbol-back"]').last().click();
    cy.get('[data-testid="header-title"]').last().should('contain', 'Categories');
  });

  it('should navigate to Animals category and back', () => {
    cy.get('[data-testid="symbol-categories"]').click();
    cy.get('[data-testid="symbol-animals"]').click();
    cy.get('[data-testid="header-title"]').last().should('contain', 'Animals');
    cy.get('[data-testid="back-button"]').last().click();
    cy.get('[data-testid="header-title"]').last().should('contain', 'Categories');
  });
});
