import React from 'react';
import renderer from 'react-test-renderer';
import ChangeBox from '../../components/homeComponents/changes/changeBox';

jest.unmock('react-native')
jest.unmock('react')
jest.unmock('react-test-renderer')
jest.unmock('expo');

describe("ChangeBox", () => {
    describe("Methods", () => {
        it("HandleLongPress works properly", () => {
            const mockedProps = {
                changeOnPress : jest.fn(),
            }

            const cB = new ChangeBox(mockedProps);
            cB.handleLongPress();
            expect( mockedProps.changeOnPress ).toBeCalled();
        });
    });

    describe("View", () => {
        it("Matches the Snapshot", () => {
            const mockedChange = {
                owner: "Ana",
                purposals: [],
                turn: "M",
                day: 2,
                month: 2,
                year: 2019,
                weekday: 2,
                type: "change",
                accepted: false
            }

            const view = <ChangeBox change={mockedChange} />;
            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        })
    })
});