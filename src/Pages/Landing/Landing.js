import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';

// Components
import Button from '../../Components/UI/Button/Button';

require('./Landing.scss');

export default function Landing() {
    return (
        <section className="HEADER">
            <div className="HEADER__content">
                <h1>Harbor searching app</h1>
                <Button class="btn-primary">
                    <HashRouter>
                        <NavLink to="/map"> Go to map </NavLink>
                    </HashRouter>
                </Button>
            </div>
        </section>
    );
}
