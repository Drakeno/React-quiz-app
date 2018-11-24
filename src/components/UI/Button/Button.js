import React from 'react'
import classes from './Button.css'

const Button = props => {
    const btnClass = [
        classes.Button,
        classes[props.type]
    ]

    return (
        <button
            onClick={props.onClick}
            className={btnClass.join(' ')}
            disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default Button