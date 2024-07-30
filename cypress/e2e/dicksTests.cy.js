let store = 'robinson'
let loginText = 'Sign In to Earn Points'
let searchResults = '6871 results for "shoes"'

describe("Dick's Site Tests", () => {

  beforeEach(() => {
    cy.intercept('https://dsg.attn.tv/**', { statusCode: 200 } ).as('popupWindow')
    cy.viewport(1920, 1080)
    cy.visit('https://dickssportinggoods.com')
  })

  it("Dick's site loads and the url contains 'dickssportinggoods.com'", () => {
    cy.url().should('include', 'dickssportinggoods.com')
  })

  it('Confirm that the site defaults to Robinson as my store', () => {
    cy.get('.my-store-wrapper').should('contain.text', store)
  })

  it('Confirm that no account is signed in by default', () => {
    cy.get('.header-my-account').should('contain.text', loginText)
  })

  it('I am able to search for shoes', () => {
    cy.get('#searchInput').type('shoes' + '{enter}')
    cy.url().should('include', '/search/SearchDisplay?searchTerm=shoes')
    cy.get('body').should('contain.text', searchResults)
  })
})