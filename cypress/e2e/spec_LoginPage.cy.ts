import userEvent from "@testing-library/user-event"

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
                "username": "kim@example.com",
                "passsword": "kim123"
            }
        })
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim123')
        cy.get('.login-button').click()
        cy.url().should('include', 'dashboard')
        cy.get('.dashboard-header').should('contain', 'Dashboard')
    })
    it.only('should display an error message if the user enters an incorrect email but correct password', () => {
        cy.intercept("POST", "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/sessions", {
            statusCode: 401,
            body: {
                error: "Error: Incorrect username or password."
            }
        }).as('loginRequest')
        cy.get('.email-input').type('ki@turing.com')
        cy.get('.password-input').type('kim123')
        cy.get('.login-button').click()
        cy.wait("@loginRequest")
    })
    it('should display an error message if the user enters a correct email but an incorrect password', () => {
        cy.intercept("POST", "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/sessions", {
            statusCode: 401,
            body: {
                error: "Invalid email or password"
            }
        }).as('loginRequest')
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim12')
        cy.get('.login-button').click()
    })
    it('should display an error message if the user does not enter an email or password and clicks submit', () => {
        cy.get('.login-button').click()
        cy.get('.email-input-container > p').should('be.visible')
        cy.get('.email-input-container > p > .exclamation-mark').should('be.visible')
        cy.get('.email-input-container > p > .missing-field').should('contain', 'Please enter your email')
    })
    it('should display an error message if the user enters an email but does not password and clicks submit', () => {
        cy.get('.email-input').type('kim@example.com')
        cy.get('.login-button').click()
        cy.get('.password-input-container > p').should('be.visible')
        cy.get('.exclamation-mark').should('be.visible')
        cy.get('.missing-field').should('contain', 'Please enter your password')
    })
    it('should display an error message if the user enters a password but does not enter an email and clicks submit', () => {
        cy.get('.password-input').type('kim123')
        cy.get('.login-button').click()
        cy.get('.email-input-container > p').should('be.visible')
        cy.get('.email-input-container > p > .exclamation-mark').should('be.visible')
        cy.get('.email-input-container > p > .missing-field').should('contain', 'Please enter your email')
    })
    it('should log a user out when the logout link is clicked', () => {
        cy.intercept("POST", "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/sessions", {
            statusCode: 201,
            body: {
                "username": "kim@example.com",
                "passsword": "kim123"
            }
        })
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim123')
        cy.get('.login-button').click()
        cy.url().should('include', 'dashboard')
        cy.get('.dashboard-header').should('contain', 'Dashboard')
        cy.get('.logout-button').click()
        cy.url().should('include', '/')

    })
})