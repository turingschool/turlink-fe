describe('Login Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
        cy.intercept("POST", "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/sessions", {
            statusCode: 201,
            body: {
                data: {
                    "username": "kim@example.com",
                    "passsword": "kim123"
                }
            }
        })
        cy.intercept("POST", "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/undefined/links?link=www.example.com%2FCypressExample", {
            statusCode: 200,
            fixture: 'shortenlink.json'  
          })
        cy.intercept("POST", "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/undefined/links?link=www.example.com%2FCypressSecondExample", {
            statusCode: 200,
            fixture: 'shortenlink2.json'  
          })
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim123')
        cy.get('.login-button').click()
        cy.url().should('include', 'dashboard')
        cy.get('.dashboard-header').should('contain', 'Dashboard')
    })
    it('should access the shorten link page upon page load and view the shorten link input, shorten link button, shortened link input, copy button, and Original URL container', () => {
        cy.get('.navbar')
        cy.get('[href="/shortenlink"]').click()
        cy.get('.shorten-link-header-text').should('contain', 'Shorten Your Link')
        cy.get('.shorten-link-input').should('have.attr', 'placeholder', 'Paste Your Link')
        cy.get('.shorten-link-button').should('contain', 'Shorten Link')
        cy.get('.shortened-link-input').should('have.attr', 'placeholder', 'Shorten Link Above')
        cy.get('.copy-button').should('contain', "Copy")
        cy.get('.original-link-label').should('contain', 'Original URL:')
    })
    it('should submit an original link and return a shortened link', () => {
        cy.get('.navbar')
        cy.get('[href="/shortenlink"]').click()
        cy.get('.shorten-link-input').type('www.example.com/CypressExample')
        cy.get('.shorten-link-button').click()
        cy.get('.shortened-link-input').should('have.value', 'tur.link/4a7c204baeacaf2c')
    })
    it('should submit a second original link and return a second shortened link', () => {
        cy.get('.navbar')
        cy.get('[href="/shortenlink"]').click()
        cy.get('.shorten-link-input').type('www.example.com/CypressSecondExample')
        cy.get('.shorten-link-button').click()
        cy.get('.shortened-link-input').should('have.value', 'tur.link/0970e271')
    })
})
