describe('app opens', function() {
    before(function() {
        cy.request('post', 'http://localhost:3001/api/testing/reset')
    })
    it('front page opens', function() {
        cy.visit('http://localhost:3000')
        cy.contains('username')
        cy.get('#login-username').type('user7')
        cy.get('#login-password').type('password')
        cy.get('#login-button').click()

        cy.contains('user7 logged in')
    })
})