describe('Dashboard Page Tests', () => {
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
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim123')
    })
    it('should display a messager to the user if there are no links to return', () => {
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/top_links', {
            statusCode: 200,
            body: {
                data: [
                ]
            }
        })
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags', {
            statusCode: 200,
            fixture: 'tags'
        })
        cy.get('.login-button').click()
        cy.get('.error-message').should('contain', "No links were found.")
        cy.get('.table-row').should('have.length', 0)
    })
    it('should display a message to the user if there was an error fetching the top links', () => {
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/top_links', {
            statusCode: 500,
        })
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags', {
            statusCode: 200,
            fixture: 'tags'
        })
        cy.get('.login-button').click()
        cy.get('.error-message').should('contain', 'No links were found.')
    })
    it('should display a message to the user if no tags meet the tag filter criteria', () => {
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/top_links', {
            statusCode: 200,
            fixture: 'topfivelinks'
        })
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags', {
            statusCode: 200,
            fixture: 'tags'
        })
        cy.get('.login-button').click()
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/top_links?tag=react', {
            statusCode: 200,
            body: {
                data: [

                ]     
            }
        })
        cy.get('.tag-filter').select('react')
        cy.get('.current').should('contain', 'Current filters:')
        cy.get('.current-filters > .tag').should('contain', 'react')
        cy.get('.table-row').should('have.length', 0)
        cy.get('.error-message').should('contain', 'No links were found.')
    })
})