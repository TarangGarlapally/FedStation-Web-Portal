import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

/* Components */
import Console, { RenderProjectCard, RenderProjects } from './Console'

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })

describe('Console', () => {
    it('Display the exact number of existing projects under the user', async () => {
        // Assembling the main component to be tested
        const wrapper = shallow(<Console />);
        // Assembline the sub component to be tested
        const RenderProjectsTag = wrapper.find(RenderProjects)

        // Assembling the sub sub component to be tested
        const RenderProjectCardTag = RenderProjectsTag.dive().find(RenderProjectCard)

        // Activating and Asserting the right number of projects
        expect(RenderProjectCardTag).toHaveLength(RenderProjectsTag.props().projects.length)
    })

    it('Check whether all the existing projects are displayed perfectly or not', () => {
        // Assembling the main component to be tested
        const wrapper = shallow(<Console />);
        // Assembline the sub component to be tested
        const RenderProjectsTag = wrapper.find(RenderProjects)
        const RenderProjectCardTag = RenderProjectsTag.dive().find(RenderProjectCard)
        for (let i = 0; i < RenderProjectsTag.props().projects.length; i++) {
            expect(RenderProjectCardTag.at(i).dive().find('h3').text()).toEqual(RenderProjectsTag.props().projects[i].projectName)
        }

    })
})