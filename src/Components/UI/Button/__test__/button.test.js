import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';

import {render, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';

afterEach(cleanup)

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div)
})

it("renders button correctly",()=>{
    const {getByTestId} = render(<Button type="button" disabled={false} onClick={jest.fn}>Submit</Button>)
    expect(getByTestId('button')).toHaveTextContent('Submit')
})

it("renders button correctly",()=>{
    const {getByTestId} = render(<Button type="button" disabled={false}>Go to map</Button>)
    expect(getByTestId('button')).toHaveTextContent('Go to map')
})

it("matches snapshot",()=>{
    const tree = renderer.create(
        <Button 
            type="button" 
            disabled={false} 
            onClick={jest.fn}
            class="btn-danger" >Submit
        </Button>).toJSON();
    expect(tree).toMatchSnapshot();
})