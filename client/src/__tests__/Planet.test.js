import React from "react"
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import Planet from '../Planet'


describe('Planet Component', () => {
    let wrapper
    let props
    configure({ adapter: new Adapter() });

    beforeAll(() => {
        global.fetch = jest.fn();
    });

    beforeEach(() => {
        props = {
            match: { params: 5 }
        }
    })

    afterEach(() => {
        wrapper.unmount();
    });

    it('succssfully mounts the component, makes Ajax call and modifies state', done => {
        const spyDidMount = jest.spyOn(Planet.prototype, 'componentDidMount')
        fetch.mockImplementation(() => {
            return Promise.resolve({
                status: 200,
                json: () => {
                    return Promise.resolve({
                        id: "5",
                        name: "pluto"
                    });
                }
            });
        });
        wrapper = shallow(<Planet {...props} />)
        expect(spyDidMount).toHaveBeenCalled()
        setTimeout(() => {
            wrapper.update();
            const state = wrapper.instance().state
            expect(state.planet).toEqual({ id: '5', name: 'pluto'})
            done()
        });
    })
})