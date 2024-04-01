import React from 'react'
import SelectInput from './SelectInput'

describe('<SelectInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SelectInput />)
  })
})