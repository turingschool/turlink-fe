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
        cy.get('.email-input').type('kim@example.com')
        cy.get('.password-input').type('kim123')
        cy.get('.login-button').click()      
    })    
    it('should display a page header, a title, click counts, and tags ', () => {
        cy.get('.dashboard-header').should('contain', 'Dashboard')
        cy.get('.popular-links > h2').should('contain', 'Popular Links')
        cy.get('.table-header > :nth-child(2)').should('contain', 'Click Count')
        cy.get('.table-header > :nth-child(3)').should('contain', 'Tags')
    })
    it('should display a page with 5 links, including their click counts and tags', () => {
        cy.get('.table-row').should('have.length', 5)
        cy.get('.link-name').first().should('contain', 'tur.link/dc79d5e0')
        cy.get('.click-count').first().should('contain', 0)
        cy.get('.tags').first().should('contain', 'rails')
        cy.get('.link-name').last().should('contain', 'tur.link/dfaf67ed')
        cy.get('.click-count').last().should('contain', 0)
        cy.get('.tags').last().should('contain', 'No tags assigned for this link')
    })
    it('should display a filter by tag section with a header, a drop down, and current filters', () => {
        cy.get('.filter-by-tag > h2').should('contain', 'Filter by Tag')
        cy.get('.tag-filter').should('be.visible')
        cy.get('.current').should('contain', 'Current filters:')
        cy.get('.no-filter').should('exist').should('contain', 'No filter applied yet, select one from the dropdown to see the top links for that tag.')
    })
    it('should return tags that meet the tag filter critera', () => {
        cy.get('.tag-filter').select('javascript')
        cy.get('.current').should('contain', 'Current filters:')
        cy.get('.current-filters > .tag').should('contain', 'javascript')
        cy.get('.table-row').should('have.length', 2)
        cy.get('.link-name').first().should('contain', 'tur.link/3b08621c')
        cy.get('.click-count').first().should('contain', 0)
        cy.get('.tags').first().should('contain', 'javascript')
        cy.get('.link-name').last().should('contain', 'tur.link/d992be64')
        cy.get('.click-count').last().should('contain', 0)
        cy.get('.tags').last().should('contain', 'Bootstrap')
    })
    it('should handle multiple tag filtering', () => {
        cy.get('.tag-filter').select('javascript')
        cy.get('.tag-filter').select('ruby')
        cy.get('.current-filters > .tag').should('contain', 'javascript').and('contain', 'ruby')
        cy.get('.table-row').should('have.length', 2) 
    })
    it('should remove a tag and update the filtered results', () => {
        cy.get('.tag-filter').select('javascript')
        cy.get('.current-filters > .tag').should('contain', 'javascript')
        cy.get('.current-filters > .tag > button').click() 
        cy.get('.table-row').should('have.length', 5) 
    })
    it.only('should increment the click count when a short URL is clicked', () => {
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/links?short=tur.link/dc79d5e0', {
            statusCode: 200,
            body: {
                "data": {
                    "id": "1",
                    "type": "link",
                    "attributes": {
                        "original": "https://2019.wattenberger.com/blog/css-cascade",
                        "short": "tur.link/dc79d5e0",
                        "user_id": 1,
                        "click_count": 1,
                        "last_click": "2024-08-28T12:34:56.789Z",
                        "private": false
                    }
                }
              }
        })
        cy.intercept('GET', 'https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/top_links', {
            statusCode: 200,
            fixture: 'topfivelinksafterclick'
        })
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen')
        })
        cy.get('.link-name').first().should('contain', 'tur.link/dc79d5e0')
        cy.get('.click-count').first().should('contain', 0)
        cy.get(':nth-child(2) > .link-name > a').click()
        cy.get(':nth-child(2) > .click-count').should('contain', 1)
        cy.get('@windowOpen').should('be.calledWith', 'https://2019.wattenberger.com/blog/css-cascade')
    })
})
