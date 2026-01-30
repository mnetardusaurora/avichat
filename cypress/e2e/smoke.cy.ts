describe('Smoke Tests', () => {
  it('server is running and responding', () => {
    cy.request({
      url: '/',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 304]);
    });
  });

  it('page renders without crashing', () => {
    cy.visit('/');
    cy.get('body').should('exist');
  });

  it('root element is present', () => {
    cy.visit('/');
    cy.get('#root').should('exist');
  });
});
