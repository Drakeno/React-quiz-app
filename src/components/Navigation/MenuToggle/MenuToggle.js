import React from 'react'
import classes from './MenuToggle.css'

const MenuToggle = props => {
    const iconClass = [
        classes.MenuToggle,
        'fa'
    ]

    if (props.isOpen) {
        iconClass.push('fa-times')
        iconClass.push(classes.open)
    } else {
        iconClass.push('fa-bars')
    }

    return (
        <i className={iconClass.join(' ')} onClick={props.onToggle} />
    )
}

export default MenuToggle