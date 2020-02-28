import React from "react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from "../App"

it('renders App without crashing', () => {
  configure({ adapter: new Adapter() });

  const wrapper = shallow(<App />);

  expect(wrapper.length).toEqual(1);   
}); 