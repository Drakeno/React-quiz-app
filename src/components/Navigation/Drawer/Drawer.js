import React, { Component } from 'react'
import classes from './Drawer.css'
import BackDrop from '../../UI/BackDrop/BackDrop';
import { NavLink } from 'react-router-dom'

const links = [
    { to: '/', label: 'Список тестов', exact: true },
    { to: '/auth', label: 'Вход', exact: false },
    { to: '/quiz-creator', label: 'Создать тест', exact: false }
]

class Drawer extends Component {
    clickHandler = () => this.props.onClose();

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const drawerClasses = [classes.Drawer]

        if (!this.props.isOpen) {
            drawerClasses.push(classes.close)
        }

        return (
            <React.Fragment>
                <nav className={drawerClasses.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null}
            </React.Fragment>
        )
    }
}

export default Drawer