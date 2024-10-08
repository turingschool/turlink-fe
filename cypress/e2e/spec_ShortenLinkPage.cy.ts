describe('Login Page Tests', () => {
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
        }).as('loginRequest')
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/top_links', {
            statusCode: 200,
            fixture: 'topfivelinks'
        })
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags', {
            statusCode: 200,
            fixture: 'tags'
        })
        cy.intercept("POST", "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/undefined/links?link=www.example.com%2FCypressExample", {
            statusCode: 200,
            fixture: 'shortenlink.json'  
          }).as('shortenLinkRequest')
        cy.intercept("POST", "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/undefined/links?link=www.example.com%2FCypressSecondExample", {
            statusCode: 200,
            fixture: 'shortenlink2.json'  
          }).as('shortenSecondLinkRequest')
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim123')
        cy.get('.login-button').click()
        cy.wait('@loginRequest')
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
        cy.wait('@shortenLinkRequest')
        cy.get('.shortened-link-input').should('have.value', 'tur.link/4a7c204baeacaf2c')
    })
    it('should submit a second original link and return a second shortened link', () => {
        cy.get('.navbar')
        cy.get('[href="/shortenlink"]').click()
        cy.get('.shorten-link-input').type('www.example.com/CypressSecondExample')
        cy.get('.shorten-link-button').click()
        cy.wait('@shortenSecondLinkRequest')
        cy.get('.shortened-link-input').should('have.value', 'tur.link/0970e271')
    })
    it('should be able to copy the shortened link', () => {
        cy.get('.navbar')
        cy.get('[href="/shortenlink"]').click()
        cy.get('.shorten-link-input').type('www.example.com/CypressSecondExample')
        cy.get('.shorten-link-button').click()
        cy.get('.shortened-link-input').should('have.value', 'tur.link/0970e271')
        cy.window().then((win) => {
            cy.stub(win.navigator.clipboard, 'writeText').as('copyToClipboard')
        })
        cy.get('.copy-button').click()
        cy.get('.copy-message-body').should('contain', 'tur.link/0970e271 copied to clipboard!')
        cy.get('@copyToClipboard').should('have.been.calledWith', 'tur.link/0970e271')
    })
    it('should display an error when an original link is not entered', () => {
        cy.intercept('POST', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/undefined/links?link=', {
            statusCode: 422,
            body: {
                "errors": [
                    {
                        "status": "unprocessable_entity",
                        "message": "Original can't be blank"
                    }
                ]
            }
        }).as('422ErrorLinkRequest')
        cy.get('.navbar')
        cy.get('[href="/shortenlink"]').click()
        cy.get('.shorten-link-button').click()
        cy.wait('@422ErrorLinkRequest')
        cy.get('.error-message').should('contain', 'Error: Original can\'t be blank')
    })
    it('should display an error when a user ID is not entered', () => {
        cy.intercept('POST', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/undefined/links?link=www.example.com%2FUserTest', {
            statusCode: 404,
            body: {
                "errors": [
                    {
                        "status": "unprocessable_entity",
                        "message": "User must exist"
                    }
                ]
            }
        }).as('404ErrorUserIdRequest')
        cy.get('.navbar')
        cy.get('[href="/shortenlink"]').click()
        cy.get('.shorten-link-input').type('www.example.com/UserTest')
        cy.get('.shorten-link-button').click()
        cy.wait('@404ErrorUserIdRequest')
        cy.get('.error-message').should('contain', 'User must exist')
    })
})