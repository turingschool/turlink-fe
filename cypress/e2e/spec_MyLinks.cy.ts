describe('MyLinks Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
        cy.intercept("POST", "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/sessions", {
            statusCode: 201,
            body: {
                "data": {
                  "id": "1",
                  "type": "user",
                  "attributes": {
                    "email": "kim@example.com",
                    "links": []
                  }
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
        cy.intercept('GET', `https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/1/links`, {
            statusCode: 200,
            fixture: 'userlinks'
        })
        cy.intercept('GET', `https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/1/links`, {
            statusCode: 200,
            fixture: 'userlinks'
        })
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags?link=1', {
            statusCode: 200,
            body: {
                "data": {
                    "id": "1",
                    "type": "link",
                    "attributes": {
                        "original": "testlink.com",
                        "short": "tur.link/4a7c204baeacaf2c",
                        "user_id": 1,
                        "tags": [
                            {
                                "id": 1,
                                "name": "CSS",
                                "created_at": "2024-08-27T01:19:47.421Z",
                                "updated_at": "2024-08-27T01:19:47.421Z"
                            }
                        ]
                    }
                }
              } 
        })
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags?link=2', {
            statusCode: 200,
            body: {
                "data": {
                    "id": "2",
                    "type": "link",
                    "attributes": {
                        "original": "https://cheatography.com/aiqbal/cheat-sheets/cypress-io/",
                        "short": "tur.link/67c758fc",
                        "user_id": 1,
                        "tags": [
                            {
                                "id": 1,
                                "name": "Cypress",
                                "created_at": "2024-08-27T01:19:47.421Z",
                                "updated_at": "2024-08-27T01:19:47.421Z"
                            }
                        ]
                    }
                }
              } 
        })
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim123')
        cy.get('.login-button').click()
        cy.get('[href="/my-links"]').click()
    })
    it('should open the URL as a new browser window when the user clicks the shortened URL', () => {
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/links?short=tur.link/4a7c204baeacaf2c', {
            statusCode: 200,
            body: {
                "data": {
                    "id": "1",
                    "type": "link",
                    "attributes": {
                        "original": "https://2019.wattenberger.com/blog/css-cascade",
                        "short": "tur.link/4a7c204baeacaf2c",
                        "user_id": 1,
                        "click_count": 1,
                        "last_click": "2024-08-28T12:34:56.789Z",
                        "private": false
                    }
                }
              }
        })
        cy.get(':nth-child(2) > :nth-child(2) > a').should('contain', 'tur.link/4a7c204baeacaf2c')
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen')
        })
        cy.get(':nth-child(2) > :nth-child(2) > a').click()
        cy.get('@windowOpen').should('be.calledWith', 'https://2019.wattenberger.com/blog/css-cascade')
    })
})