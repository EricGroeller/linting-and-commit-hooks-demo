let store = 'robinson'
let loginText = 'Sign In to Earn Points'
let searchResults = 'Golf Balls'

describe('Golf Galaxy Site Tests', () => {

  beforeEach(() => {
    cy.intercept('https://gg.attn.tv/**', { statusCode: 200 } ).as('popupWindow')
    cy.viewport(1920, 1080)
    cy.visit('https://golfgalaxy.com')
  })

  it('GG site loads and the url contains "golfgalaxy.com"', () => {
    cy.url().should('include', 'golfgalaxy.com')
  })

  it('Confirm that the site defaults to Robinson as my store', () => {
    cy.get('.my-store-wrapper').should('contain.text', store)
  })

  it('Confirm that no account is signed in by default', () => {
    cy.get('.header-my-account').should('contain.text', loginText)
  })

  it('I am able to search for golf balls', () => {
    cy.get('#searchInput').type('golf balls' + '{enter}')
    cy.url().should('include', '/f/new-stock-golf-balls')
    cy.get('body').should('contain.text', searchResults)
  })
})