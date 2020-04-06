import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

// Components
import Hoc from '../../Hoc/Hoc';
import Menu from '../UI/Menu/Menu';
import Footer from '../UI/Footer/Footer';
import Map from '../../Pages/Map/Map';
import Landing from '../../Pages/Landing/Landing';

// Styles
require('./Layout.scss');

const layout = props => (
    <Hoc>
        <Menu />
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/map" component={Map} />
                </Switch>
            </HashRouter>
        <Footer />
    </Hoc>
);

export default layout;
