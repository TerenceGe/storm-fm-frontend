/* eslint-env mocha */

import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import Spinner from '../../shared/components/Spinner'
import style from '../../shared/components/Spinner/style.css'

describe('<Spinner /> ', () => {
  it('should render the Spinner with className \'spinner\'', () => {
    const wrapper = shallow(<Spinner />)
    expect(wrapper.find('div')).to.has.className(style.spinner)
  })
})
