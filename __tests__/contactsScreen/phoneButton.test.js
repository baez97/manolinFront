import React from 'react';
import ContactButton from '../../components/contactsComponents/contactButton';
import { Linking } from 'react-native';
import renderer from 'react-test-renderer';
import PhoneButton from '../../components/contactsComponents/phoneButton';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

describe("PhoneButton", () => {
    describe("Methods", () => {
        const pB = new PhoneButton();

        it("GetColors returns the green gradient colors", () => {
            const expected = ['#10bad2', '#0470dc'];
            const result = pB.getColors();

            expect( result ).toEqual(expected);
        });

        it("GetColors returns the green gradient colors", () => {
            const expected = require('../../assets/phone.png');
            const result = pB.getImage();

            expect( result ).toBe(expected);
        });

        it("GetImageStyle returns a properties object", () => {
            const result = pB.getImageStyle();

            expect( result ).toBeDefined();
            expect( Object.keys(result).length ).toBe(2);
        })
    });

    describe("View", () => {
        it("Matches the Snapshot", () => {
            const view = <PhoneButton phone="PHONE" text="TEXT" />
            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        })
    })
})