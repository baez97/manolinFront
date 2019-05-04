import React from 'react';
import renderer from 'react-test-renderer';
import AreYouSureModal from '../../components/homeComponents/areYouSureModal';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

describe("AreYouSureModal", () => {
    describe("Methods", () => {
        it("HandlePress works fine", () => {
            const mockedProps = {
                onPressFn: jest.fn()
            }
            const modal = new AreYouSureModal(mockedProps);
            modal.handlePress();
            expect( mockedProps.onPressFn ).toBeCalled();
        })
    });

    it("Matches the Snapshot", () => {
        const rendered = renderer.create(
            <AreYouSureModal visible={true} text="ModalText" />
        ).toJSON();

        expect(rendered).toMatchSnapshot();
    })
})