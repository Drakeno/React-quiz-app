import React from 'react'
import classes from './AnswerItem.css'

const AnswerItem = props => {
    const answerClasses = [classes.AnswerItem]

    if (props.state) {
        answerClasses.push(classes[props.state])
    }

    return (
        <li className={answerClasses.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem