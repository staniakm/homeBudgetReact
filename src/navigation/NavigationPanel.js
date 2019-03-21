import React from 'react'
import {NavLink} from 'react-router-dom'

const NavigationPanel = () => {
    return (
        <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/invoice">Paragony</NavLink></li>
            <li><NavLink to="/category">Kategorie</NavLink></li>
            <li><NavLink to="/shop">Sklepy</NavLink></li>
            <li><NavLink to="/charts">Wykresy</NavLink></li>
        </ul>
    )
}

export default NavigationPanel