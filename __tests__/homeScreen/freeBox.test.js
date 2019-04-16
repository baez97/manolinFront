import React from 'react';
import renderer from 'react-test-renderer';
import FreeBox from '../../components/homeComponents/changes/freeBox';

jest.unmock('react-native')
jest.unmock('react')
jest.unmock('react-test-renderer')
jest.unmock('expo');

describe("ChangeBox", () => {
    describe("Methods", () => {
        it("HandleLongPress works properly", () => {
            const mockedProps = {
                freeOnPress : jest.fn(),
            }

            const fB = new FreeBox(mockedProps);
            fB.handleLongPress();
            expect( mockedProps.freeOnPress ).toBeCalled();
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
                type: "free",
                accepted: false
            }

            const view = <FreeBox change={mockedChange} />;
            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        })
    })
});