describe('Landing Page Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login')
    })
    it('should display an email input, a password input, and a submit button', () => {
        cy.get('.email-label').should('contain', 'Email')
        cy.get('.email-input').should('be.visible')
        cy.get('.password-label').should('contain', 'Password')
        cy.get('.password-input').should('be.visible')
        cy.get('.login-button').should('contain', 'Login')
    })
    it('should successfully authenticate a user if the correct email and password are entered', () => {
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim123')
    })
    it('should display an error message if the user enters an incorrect email but correct password', () => {
        cy.get('.email-input').type('ki@example.com')
        cy.get('.password-input').type('kim123')
    })
    it('should display an error message if the user enters a correct email but incorrect password', () => {
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim12')
    })
    it('should display an error message if the user does not enter an email or password and clicks submit', () => {

    })
    it('should display an error message if the user enters an email but does not password and clicks submit', () => {

    })
    it('should display an error message if the user enters a password but does not enter an email and clicks submit', () => {

    })
})