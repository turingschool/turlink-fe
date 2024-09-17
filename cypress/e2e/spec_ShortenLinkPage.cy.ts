describe('Login Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })
    it('should display a login form with an email input, a password input, and a submit button', () => {
        cy.get('.login-header').should('contain', 'Login')
        cy.get('.email-label').should('contain', 'Email')
        cy.get('.email-input').should('be.visible')
        cy.get('.password-label').should('contain', 'Password')
        cy.get('.password-input').should('be.visible')
        cy.get('.login-button').should('contain', 'Login')
    })
    it('should successfully authenticate a user and route them to their dashboard, if the correct email and password are entered', () => {
        cy.intercept("POST", "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/sessions", {
            statusCode: 201,
            body: {
                data: {
                    "username": "kim@example.com",
                    "passsword": "kim123"
                }
            }
        })
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/top_links', {
            statusCode: 200,
            fixture: 'topfivelinks'
        })
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags', {
            statusCode: 200,
            fixture: 'tags'
        })
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim123')
        cy.get('.login-button').click()
        cy.url().should('include', 'dashboard')
        cy.get('.dashboard-header').should('contain', 'Dashboard')
    })
})