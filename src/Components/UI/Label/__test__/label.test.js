import React from 'react';
import ReactDOM from 'react-dom';
import Label from '../Label';

import {render, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';

afterEach(cleanup)

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Label></Label>, div)
})

it("renders label correctly",()=>{
    const {getByTestId} = render(<Label htmlFor="testid" > Test label </Label>)
    expect(getByTestId('label')).toHaveTextContent('Test label')
})


it("matches snapshot",()=>{
    const tree = renderer.create(
        <Label 
            htmlFor="testid"
        > 
        Test label
        </Label>).toJSON();
    expect(tree).toMatchSnapshot();
})