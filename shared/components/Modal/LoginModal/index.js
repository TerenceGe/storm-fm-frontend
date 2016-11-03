/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import Modal from '../../Modal'
import * as ModalActions from '../../../actions/modal'
import * as AuthActions from '../../../actions/auth'
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

@connect(
  state => ({ modal: state.modal }),
  dispatch => ({
    actions: bindActionCreators({ ...ModalActions, ...AuthActions }, dispatch)
  })
)

export default class LoginModal extends Component {
  submit(data) {
    this.props.actions.loginRequested(data.toJS())
  }

  hide() {
    this.props.actions.hideModal()
    this.props.reset()
  }

  render() {
    const { modal, handleSubmit, invalid, submitting } = this.props

    return (
      <Modal isOpen={modal.get('active') === 'loginModal'} hide={::this.hide} title="sign in">
        <form className={style.form} onSubmit={handleSubmit(::this.submit)}>
          <Field name="identity" type="text" component={renderField} label="Username or Email" />
          <Field name="password" type="password" component={renderField} label="Password" />
          <div className={`${style.formItem} ${style.button}`}>
            <button type="submit" disabled={invalid || submitting}>Sign Up</button>
          </div>
        </form>
      </Modal>
    )
  }
}
