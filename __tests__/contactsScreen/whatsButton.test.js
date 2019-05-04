import React from 'react';
import ContactButton from '../../components/contactsComponents/contactButton';
import { Linking } from 'react-native';
import renderer from 'react-test-renderer';
import WhatsButton from '../../components/contactsComponents/whatsButton';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

describe("WhatsButton", () => {
    describe("Methods", () => {
        const wB = new WhatsButton();

        it("GetColors returns the green gradient colors", () => {
            const expected = ['#03cd46', '#03a73a'];
            const result = wB.getColors();

            expect( result ).toEqual(expected);
        });

        it("GetColors returns the green gradient colors", () => {
            const expected = require('../../assets/whatsSilhouette.png');
            const result = wB.getImage();

            expect( result ).toBe(expected);
        });
    });

    describe("View", () => {
        it("Matches the Snapshot", () => {
            const view = <WhatsButton phone="PHONE" text="TEXT" />
            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        })
    })
})