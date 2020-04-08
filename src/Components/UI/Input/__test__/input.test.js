import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../Input';

import {render, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';

afterEach(cleanup)

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Input></Input>, div)
})

it("renders input correctly",()=>{
    const {getByTestId} = render(<Input type="date" name="testname" id="testid" value="2000-02-02" placeholder="test" required={true} min="2000-01-01" className="INPUT" onChange={jest.fn} />)
    expect(getByTestId('input'))
})


it("matches snapshot",()=>{
    const tree = renderer.create(
        <Input 
            type="date"
            name="testname"
            id="testid"
            defaultValue="2000-02-02"
            placeholder="test"
            required={true}
            min="2000-01-01"
            class="INPUT"
            onChange={jest.fn}
        />).toJSON();
    expect(tree).toMatchSnapshot();
})