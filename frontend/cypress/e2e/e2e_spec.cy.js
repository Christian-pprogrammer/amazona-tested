describe('Limos tests', () => {

  it('it should load successfully', () => {
    cy.visit('http://localhost:3000');
  })

  it('should contain "sign in"', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Sign in').click()
  })
  
  it('click "a product" then explore it', () => {
    cy.visit('http://localhost:3000');
    cy.contains('watch').click()
    cy.url().should('include', '/{productId}')
  })

  it('Getting inputs and place an order for a product ', () => {
    cy.visit('http://localhost:3000');
    cy.contains('watch').click()
    cy.get('.fullName').type('james morgan')
    cy.get('.fullName').should('have.value', 'james morgan')

    cy.get('.address').type('Texas')
    cy.get('.address').should('have.value', 'Texas')
    
    cy.get('.city').type('Texas')
    cy.get('.city').should('have.value', 'Texas')
    
    cy.get('.postalCode').type('4446')
    cy.get('.postalCode').should('have.value', '4446')
    
    cy.get('.country').type('USA')
    cy.get('.country').should('have.value', 'USA')
    

    cy.contains('Add to cat').click() 
  })

})
