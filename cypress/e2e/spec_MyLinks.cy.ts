describe('MyLinks Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
        cy.intercept("POST", "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/sessions", {
            statusCode: 201,
            body: {
                data: {
                    "username": "kim@example.com",
                    "password": "kim123"
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
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/top_links?tag=javascript', {
            statusCode: 200,
            fixture: 'topfivelinksbytag'
        })
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/top_links?tag=javascript,ruby', {
            statusCode: 200,
            fixture: 'topfivelinksbytag'
        })
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/1/links', {
            statusCode: 200,
            fixture: 'userlinks'
        })
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim123')
        cy.get('.login-button').click()
        cy.get('[href="/my-links"]').click()
    })
    it('should open the URL as a new browser window when the user clicks the shortened URL', () => {

    })
})