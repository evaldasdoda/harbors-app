import React from 'react';

// Components
import Button from '../Button/Button';

// Styles
require('./Modal.scss');

const modal = props => {
    return (
        <div className="MODAL">
            <div className="MODAL__container">
                <h2>{props.header}</h2>
                <hr/>
                <p>{props.content}</p>
                <Button class='btn-danger' clicked={props.onButtonClick}>Close</Button>
            </div>
        </div>
    );
};

export default modal;
