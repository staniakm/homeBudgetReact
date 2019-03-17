import React from 'react'
import {NavLink} from 'react-router-dom'

const NavigationPanel = () => {
    return (
        <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/stuff">Stuff</NavLink></li>
            <li><NavLink to="/shopping">Paragony</NavLink></li>
            <li><NavLink to="/category">Kategorie</NavLink></li>
        </ul>
    )
}

export default NavigationPanel