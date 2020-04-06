import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';

// Components
import Button from '../../Components/UI/Button/Button'
import Modal from '../../Components/UI/Modal/Modal';

require('./Landing.scss');


export default function Landing() {
    return (
        <section className="HEADER">
            <div className="HEADER__content">
                <h1>Harbour searching app</h1>
                <Button class='btn-primary'>
                    <HashRouter>
                        <NavLink to='/map'> Go to map </NavLink>
                    </HashRouter>
                </Button>
                
            </div>
        </section>
    );
}

