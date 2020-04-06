import React from 'react';

// Components
import NavigationItem from './NavigationItem/NavigationItem';

// Styles
require('./NavigationItems.scss');

const navigationItems = props => {
    return (
        <ul className="NAVIGATION">
            <NavigationItem link="/">
                Home
            </NavigationItem>
            <NavigationItem link="/map">Map </NavigationItem>
        </ul>
    );
};

export default navigationItems;
