describe('Authentication', function () {
  it('Can log in.', function () {
    cy.visit('/log-in');
    cy.get('input#username').type('gary.cole@example.com');
    cy.get('input#password').type('pAssw0rd', { log: false });
    cy.get('button').contains('Log in').click();
    cy.url().should('contain', '/');
  });

  it('Can sign up.', function () {
    cy.visit('/sign-up');
    cy.get('input#username').type('gary.cole@example.com');
    cy.get('input#firstName').type('Gary');
    cy.get('input#lastName').type('Cole');
    cy.get('input#password').type('pAssw0rd', { log: false });
    cy.get('select#group').select('driver');
    cy.fixture('images/photo.png').then(photo => {
        cy.get('input#photo').upload({
          fileContent: photo,
          fileName: 'photo.png',
          mimeType: 'application/json'
        });
      });
    cy.get('button').contains('Sign up').click();
    cy.url().should('include', '/log-in');
  });

});
