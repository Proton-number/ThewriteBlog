import React from 'react'
import Featured from './Featured'

describe('<Featured />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Featured />)
  })
})