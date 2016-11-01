/* @jsx */

import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Modal from '../../Modal'
import style from './style'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  return errors
}

@reduxForm({
  form: 'loginForm',
  validate,
  warn
})

export default class LoginModal extends Component {
  render() {
    return (
      <Modal title="sign in">

      </Modal>
    )
  }
}
