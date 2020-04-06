import React from 'react';

// Components
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

// Styles
require('./Menu.scss');

const menu = props => {
    return (
        <header className="MENU">
            <div className="MENU__logo">
                <Logo />
            </div>
            <nav className="MENU__nav">
                <NavigationItems />
            </nav>
        </header>
    );
};

export default menu;
