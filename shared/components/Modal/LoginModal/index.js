/* @jsx */

import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import Modal from '../../Modal'
import style from './style.css'

const renderField = ({ input, label, type, meta: { touched, pristine, error } }) => (
  <div className={style.formItem}>
    {pristine && <label htmlFor={label} />}
    <div>
      <input {...input} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

@reduxForm({
  form: 'loginForm'
})

export default class LoginModal extends Component {
  render() {
    const { handleSubmit, submitting } = this.props
    return (
      <Modal title="sign in">
        <form className={style.form} onSubmit={handleSubmit}>
          <Field name="identity" type="text" component={renderField} label="Username or Email" />
          <Field name="password" type="password" component={renderField} label="Password" />
          <div className={`${style.formItem} ${style.button}`}>
            <button type="submit" disabled={submitting}>Sign Up</button>
          </div>
        </form>
      </Modal>
    )
  }
}
