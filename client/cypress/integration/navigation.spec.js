describe('Navigation', () => {
  const baseUrl = Cypress.config().baseUrl;

  it('Can navigate to sign up from home', () => {
    cy.visit('/');
    cy.get('a')
      .contains('Sign up')
      .click();
    cy.url().should('include', '/sign-up');
  });

  it('Can navigate to login from home', () => {
    cy.visit('/');
    cy.get('a')
      .contains('Log in')
      .click();
    cy.url().should('include', '/log-in');
  });

  it('Can navigate to home from sign up', function () {
    cy.visit('/sign-up');
    cy.get('a').contains('Home').click();
    cy.url().should('eq', baseUrl + '/');
  });

  it('Can navigate to log in from sign up', function () {
    cy.visit('/sign-up');
    cy.get('a').contains('Log in').click();
    cy.url().should('eq', baseUrl + '/log-in');
  });

  it('Can navigate to home from log in', function () {
    cy.visit('/log-in');
    cy.get('a').contains('Home').click();
    cy.url().should('eq', baseUrl + '/');
  });

  it('Can navigate to sign up from log in', function () {
    cy.visit('/log-in');
    cy.get('a').contains('Sign up').click();
    cy.url().should('eq', baseUrl + '/sign-up');
  });
});
