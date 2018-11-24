import React, { Component } from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Axios from 'axios';
import is from 'is_js'

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await Axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCo0kQjonP2NS1SvQRGzxdyqyf1jwuAtqI', authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }

    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await Axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCo0kQjonP2NS1SvQRGzxdyqyf1jwuAtqI', authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }

    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div className={classes.AuthForm}>
                    <h1>Авторизация</h1>
                    <p><i>*Аккаунт с примерами: <b>demo@demo.ru</b>, пароль <b>demo123</b></i></p>

                    <form onSubmit={this.submitHandler} >

                        {this.renderInputs()}

                        <Button type='success' onClick={this.loginHandler} disabled={!this.state.isFormValid}><i className="fa fa-sign-in" aria-hidden="true"></i> Войти</Button>
                        <Button type='primary' onClick={this.registerHandler}><i className="fa fa-user-plus" aria-hidden="true"></i> Создать аккаунт</Button>
                    </form>
                </div>
            </div>
        )
    }
}