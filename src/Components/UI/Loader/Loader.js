import React from 'react';
import Loader from './loader.gif';

// Styles
require('./Loader.scss');

const loader = props => {
    return (
        <div className="LOADER">
            <div className="LOADER__container">
                <img className="LOADER__container-img" src={Loader} alt="loader" />
            </div>
        </div>
    );
};

export default loader;
