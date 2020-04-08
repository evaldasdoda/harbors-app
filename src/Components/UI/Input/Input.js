import React from 'react';
import PropTypes from 'prop-types';

// Styles
require('./Input.scss');

const input = (props) => {
    return (
        <input
            data-testid="input"
            id={props.id}
            type={props.type}
            name={props.name}
            defaultValue={props.value}
            className={'INPUT form-control'}
            onChange={props.onChange}
            placeholder={props.placeholder}
            required={props.required}
            min={props.min}
        />
    );
};

input.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    min: PropTypes.string
};

export default input;
