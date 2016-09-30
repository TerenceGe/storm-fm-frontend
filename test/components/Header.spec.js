/* eslint-env mocha */

import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import Header from '../../shared/components/Header'

describe('<Header /> ', () => {
  it('should render the header \'Todos\'', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.contains(<h1>Todos</h1>)).to.be.true
  })
})
