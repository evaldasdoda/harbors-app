import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../Modal';

import {render, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';

afterEach(cleanup)

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Modal></Modal>, div)
})

it("renders modal correctly",()=>{
    const {getByTestId} = render(<Modal header="Header" content="Content" />)
    expect(getByTestId('modal'))
})


it("matches snapshot",()=>{
    const tree = renderer.create(
        <Modal
            header="Header"
            content="Content"
        />).toJSON();
    expect(tree).toMatchSnapshot();
})