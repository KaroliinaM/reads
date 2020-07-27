describe('app opens', function() {
    before(function() {
        cy.request('post', 'http://localhost:3001/api/testing/reset')
    })
    it('user can register', function() {
        cy.visit('http://localhost:3000')
        cy.get('#link-to-register').click()
        cy.get('#register-username').type('testuser')
        cy.get('#register-password').type('password')
        cy.get('#register-button').click()
        cy.contains('user created')
    })
    it('front page opens', function() {
        cy.visit('http://localhost:3000')
        cy.contains('username')
        cy.get('#login-username').type('testuser')
        cy.get('#login-password').type('password')
        cy.get('#login-button').click()

        cy.contains('testuser logged in')
        cy.get('#rate-book').children().last().children().first().click()
        cy.get('#sample-ready-button').click()
        cy.get('a').eq('rated').first().click()
    })
})