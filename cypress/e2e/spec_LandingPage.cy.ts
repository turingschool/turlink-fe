describe('Landing Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
    it('should display a navigation bar with a logo and login link', () => {
      cy.get('.navbar').should('be.visible')
      cy.get('.logo').should('be.visible')
      cy.get('.site-name').should('contain', 'TurLink')
      cy.get('[href="/login"]').should('contain', 'Login')
    })

    it('should display a welcome message, a short description of the application, and an image', () => {
      cy.get('.text-section > h1').should('contain', 'Welcome to TurLink')
      cy.get('h3').should('contain', 'A link shortener for the Turing Community')
      cy.get('.image-section > img').should('be.visible')
    })

    it('should route the user to the login page when the login link is clicked', () => {
      cy.get('[href="/login"]').click()
      cy.url().should('include', 'login')
    })

    it('should route the user to the back to the landing page from the login page when the TurLink logo is clicked', () => {
      cy.get('[href="/login"]').click()
      cy.url().should('include', 'login')
      cy.get('.logo').click()
      cy.url().should('include', '/')
    })

    it('should display a footer', () => {
      cy.get('.footer').should('be.visible')
    })
    
})