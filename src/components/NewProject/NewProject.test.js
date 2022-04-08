import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Steps } from 'rsuite';

/* Components */
import NewProject from './NewProject'

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })

describe('Console', () => {
    it("Can the deveoper enter all necessary details perfectly", () => {
        //Assembling the main component to be tested
        const wrapper = shallow(<NewProject />)

        //Assembling first step inputs
        let nameInput = wrapper.find("input")
        let descInput = wrapper.find("textarea")

        //Activating inputs
        nameInput.simulate('change', { target: { value: 'Dummy Project Name' } })
        descInput.simulate('change', { target: { value: 'Dummy Project Description' } })
        nameInput = wrapper.find("input")
        descInput = wrapper.find("textarea")

        //Asserting inputs
        expect(nameInput.props().value).toEqual('Dummy Project Name')
        expect(descInput.props().value).toEqual('Dummy Project Description')

        let nextButton = wrapper.find("p.new-project-p-btn")
        nextButton.simulate('click')

        //Assembling second step input
        let projectIdInput = wrapper.find("input")

        //Activating input
        projectIdInput.simulate('Input', { target: { value: 'Dummy_Project_Id' } })
        projectIdInput = wrapper.find("input")

        //Asserting input
        expect(projectIdInput.props().value).toEqual('Dummy_Project_Id')

        nextButton = wrapper.find("p.new-project-p-btn")
        nextButton.simulate('click')

        //Assembling third step inputs
        let modelTypeInput = wrapper.find("select").at(0)
        let userSizeInput = wrapper.find("select").at(1)

        //Activating inputs
        modelTypeInput.simulate('change', { target: { value: 'Dummy_Model' } })
        userSizeInput.simulate('change', { target: { value: 'Dummy_User_Size' } })
        modelTypeInput = wrapper.find("select").at(0)
        userSizeInput = wrapper.find("select").at(1)

        //Asserting inputs
        expect(modelTypeInput.props().value).toEqual('Dummy_Model')
        expect(userSizeInput.props().value).toEqual('Dummy_User_Size')

        nextButton = wrapper.find("p.new-project-p-btn")
        nextButton.simulate('click')

        //Assembling fourth step inputs
        let recTimeInput = wrapper.find("select").at(0)
        let triggerInput = wrapper.find("select").at(2)

        //Activating inputs
        recTimeInput.simulate('change', { target: { value: 2 } })
        triggerInput.simulate('change', { target: { value: 1 } })
        recTimeInput = wrapper.find("select").at(0)
        triggerInput = wrapper.find("select").at(2)

        //Asserting inputs
        expect(recTimeInput.props().value).toEqual(2)
        expect(triggerInput.props().value).toEqual(1)



    })
})