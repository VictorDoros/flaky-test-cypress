/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    // clear the existing server data
    cy.request('POST', 'http://localhost:4000/reset', { students: [] })
  })

  Cypress._.times(10, (k) => {
    it(`Adds person to course ${k + 1} / 10`, () => {
      cy.visit('/')

      // type user name into input
      cy.get('input[name="name"]').click().type('Some Name')
      // type user email
      cy.get('input[name="email"]').click().type('some@email.com')
      // select the "core" department
      cy.get('select[name="department"]').select('core')
      // select the "git-it" course
      cy.get('select[name="course"]').select('git-it')
      // submit the form
      cy.get('input[type="submit"]').click()
      // the "Saved!" message should appear
      cy.get('input[value="Saved!"]').should('be.visible').wait(130)

      // confirm the iframe loads and it shows the "li" element
      // with the text "Some Name - <email>"
      cy.get('iframe#students')
        .its('0.contentWindow.main')
        .then(cy.wrap)
        .contains('li', 'Some Name - some@email.com')
    })
  })
})
