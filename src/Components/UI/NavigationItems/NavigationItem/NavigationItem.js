import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter, NavLink } from 'react-router-dom';

// Styles
require('../NavigationItems.scss');

const navigationItem = props => {
    return (
        <li className="NAVIGATION__item">
            <HashRouter>
                <NavLink to={props.link}> {props.children} </NavLink>
            </HashRouter>
        </li>
    );
};

navigationItem.propTypes = {
    link: PropTypes.string
};

export default navigationItem;
