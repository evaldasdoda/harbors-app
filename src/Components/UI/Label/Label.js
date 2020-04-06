import React from 'react';
import PropTypes from 'prop-types';

// Styles
// require('./Input.scss');

const input = props => {
    return (
        <label htmlFor={props.for}>{props.children}</label>
    );
};

input.propTypes = {
    for: PropTypes.string
};

export default input;
