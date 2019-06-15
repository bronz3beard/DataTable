import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

//Components
import App from './App';

configure({ adapter: new Adapter() });

describe("App Component", () => {
  it("renders without crashing in 'debug' mode " + new Date(), () => {
    const component = shallow(<App debug />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});

/*** 
//the below mount test is for components that may interact with DOM API, or use React lifecycle methods in order to fully test the component.
describe('App Component', () => {
  it("renders without crashing in 'debug' mode", () => {

    const component = mount(<App debug />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});

// test interacting with a child component.
it('should be possible to activate button with Spacebar', () => {
  const component = mount(<A-Component-Here />);
  component
    .find('button#my-button-one')
    .simulate('keydown', { keyCode: 32 });
  expect(component).toMatchSnapshot();
  component.unmount();
});
***/

/*** 
// the below 2 shallow test are for simple non-interactive components.
describe('App Component', () => {
  it('should render correctly with no props', () => {
    const component = shallow(<App/>);
    
    expect(component).toMatchSnapshot();
  });
});

describe('A-Component-Here', () => {
  it('should render banner text correctly with given strings', () => {
    const strings = ['one', 'two'];
    const component = shallow(<A-Component-Here list={strings} />);
    expect(component).toMatchSnapshot();
  });
}); 

// Check that a function passed as props is successfully called.
const clickFn = jest.fn();
describe('A-Component-Here', () => {
  it('button click should hide component', () => {
    const component = shallow(<A-Component-Here onClick={clickFn} />);
    component
      .find('button#my-button-two')
      .simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
***/