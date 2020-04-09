import React from 'react';

// Components
import Layout from './Components/Layout/Layout';
import HOC from './Hoc/Hoc'

import './App.scss';

function App() {
    return (
        <HOC>
            <Layout />
        </HOC>
    );
}

export default App;
