import React from 'react';
import PropTypes from 'prop-types';

// Styles
require('./Button.scss');

const button = props => {
    return (
        <button disabled={props.disabled} className={'BUTTON btn ' + props.class} onClick={props.clicked} type={props.type}>
            {props.children}
        </button>
    );
};

button.propTypes = {
    disabled: PropTypes.bool,
    class: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string
};

export default button;
