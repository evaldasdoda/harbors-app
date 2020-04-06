import React from 'react';

import companyLogo from '../../Assets/img/logo.png';

// Styles
require('./Logo.scss');

const logo = props => {
    return (
        <div className="LOGO">
            <img src={companyLogo} alt="Company logo" />
        </div>
    );
};

export default logo;
