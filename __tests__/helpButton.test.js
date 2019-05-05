import React from 'react';
import { Linking } from 'react-native';
import renderer from 'react-test-renderer';
import HelpButton from '../components/HelpButton';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

describe("HelpButton", () => {
    describe("Methods", () => {
        const hB = new HelpButton();

        it("Calls to Linking when it is pressed", () => {
            Linking.openURL = jest.fn();
            hB.handlePress();

            expect(Linking.openURL).toBeCalled();
        })
    });

    describe("View", () => {
        it("Matches the Snapshot", () => {
            const view = <HelpButton text="TEXT" />
            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        })
    })
})