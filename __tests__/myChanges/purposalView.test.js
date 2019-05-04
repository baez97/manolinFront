import React from 'react';
import renderer from 'react-test-renderer';
import PurposalView from '../../components/myChangesComponents/purposalView';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

describe("Methods", () => {
    const mockedProps = {
        onPressFn : jest.fn(),
        parentChange : {},
        change : {}
    };

    const p = new PurposalView(mockedProps);

    it("HandleLongPress calls to the props onPressFn", () => {
        p.handleLongPress();

        expect( mockedProps.onPressFn ).toBeCalled();
    });

    it("GetColors returns the yellow gradient colors", () => {
        const result = p.getColors();
        
        expect( result ).toEqual(['#ffcc33', '#f2994a']);
    });

    it("GetPrimaryFontColor returns the correct color", () => {
        const result = p.getPrimaryFontColor();

        expect( result ).toBe('#3f2606');
    });

    it("GetSecondaryFontColor returns the correct color", () => {
        const result = p.getSecondaryFontColor();

        expect( result ).toBe('#91620d');
    });
})