import React from 'react';
import renderer from 'react-test-renderer';
import AskChangeModal from '../../components/homeComponents/askChangeModal';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

describe("AskChangeModal", () => {
    const mockedProps = {
        addChange   : jest.fn(),
        addFree     : jest.fn(),
        toggleModal : jest.fn(),
        selectedTurn   : {},
        isModalVisible : true,
    }
    const askModal = new AskChangeModal(mockedProps);

    describe("Methods", () => {
        it("AskChangePressed", () => {
            askModal.askChangePressed();

            expect( mockedProps.addChange ).toBeCalled();
        });

        it("AskChangePressed", () => {
            askModal.askFreePressed();

            expect( mockedProps.addFree ).toBeCalled();
        });
    });

    describe("View", () => {
        const addChange   = jest.fn();
        const addFree     = jest.fn();
        const toggleModal = jest.fn();
        const selectedTurn   = {};
        const isModalVisible = false;

        it("Matches the Snapshot when it is not visible", () =>{
            const view =
                <AskChangeModal
                    addChange      = { addChange }
                    addFree        = { addFree }
                    toggleModal    = { toggleModal }
                    selectedTurn   = { selectedTurn }
                    isModalVisible = { isModalVisible }/>

            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });

        it("Matches the Snapshot when it is visible", () =>{
            const isModalVisible = true;

            const view =
                <AskChangeModal
                    addChange      = { addChange }
                    addFree        = { addFree }
                    toggleModal    = { toggleModal }
                    selectedTurn   = { selectedTurn }
                    isModalVisible = { isModalVisible }/>

            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });
    });
});