import React from 'react';
import ContactButton from '../../components/contactsComponents/contactButton';
import { Linking } from 'react-native';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

// jest.mock("react-native");

describe("ContactButton", () => {
    describe("Methods", () => {
        const cB = new ContactButton({phone: "MOCKED_PHONE"});

        it("HandlePress calls to Linking", () => {
            Linking.openUrl = jest.fn();

            cB.handlePress();
            expect( Linking.openURL ).toBeCalled();
        });

        it("GetColors returns an empty collection", () => {
            const result = cB.getColors();

            expect( result        ).toBeDefined();
            expect( result.length ).toBe(0);
        });

        it("GetImage returns undefined", () => {
            const result = cB.getImage();

            expect( result ).toBeUndefined();
        });

        it("GetImageStyle returns an object of properties", () => {
            const result = cB.getImageStyle();

            expect( result ).toBeDefined();
            expect( Object.keys(result).length ).toBe(2);
        });

        it("GetButtonStyle returns an object of properties", () => {
            const result = cB.getButtonStyle();

            expect( result ).toBeDefined();
            expect( Object.keys(result).length ).toBe(11);
        });

        it("GetTextStyle returns an object of properties", () => {
            const result = cB.getTextStyle();

            expect( result ).toBeDefined();
            expect( Object.keys(result).length ).toBe(4);
        });
    });
});