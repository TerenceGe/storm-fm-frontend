/* @jsx */

import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form/es/immutable'
import Modal from '../../Modal'
import Spinner from '../../Spinner'
import style from './style.css'

const validate = (values) => {
  const errors = {}
  if (!values.get('identity')) {
    errors.identity = 'Required'
  }
  if (!values.get('password')) {
    errors.password = 'Required'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { pristine } }) => (
  <div className={style.formItem}>
    {pristine && <label htmlFor={label} />}
    <div>
      <input {...input} type={type} />
    </div>
  </div>
)

@reduxForm({
  form: 'loginForm',
  validate
})

export default class LoginModal extends Component {
  submit(data) {
    this.props.loginRequested(data.toJS())
  }

  hide() {
    this.props.hideModal()
    this.props.reset()
  }

  render() {
    const { modal, handleSubmit, invalid, auth } = this.props
    const loading = auth.get('loading')
    const error = auth.get('error')
    const disabled = invalid || loading

    return (
      <Modal isOpen={modal.get('active') === 'loginModal'} hide={::this.hide} title="sign in">
        <form className={style.form} onSubmit={handleSubmit(::this.submit)}>
          <Field name="identity" type="text" component={renderField} label="Username or Email" />
          <Field name="password" type="password" component={renderField} label="Password" />
          <div className={`${style.formItem} ${style.button}`}>
            <button type="submit" disabled={disabled}>Sign Up { loading && <Spinner /> }</button>
            <div className={style.error}>{error}</div>
          </div>
        </form>
      </Modal>
    )
  }
}
