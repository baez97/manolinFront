import React from 'react';
import renderer from 'react-test-renderer';
import ChangeView from '../../components/homeComponents/changes/changeView';

jest.unmock("react-native");
jest.unmock("react");
jest.unmock("react-test-renderer");
jest.unmock("expo");

describe("ChangeView", () => {
    describe("Functions", () => {
        const mockedProps = {
            onPressFn : jest.fn()
        }

        const cV = new ChangeView();
        
        it("GetType returns Cambio when the type is change", () => {
            const mockedChange = {
                owner: "Ana",
                day: 5,
                month: 2,
                year: 2019,
                weekday: 1,
                turn: "M",
                type: "change"
            };

            const expectedOutput = "Cambio";
            const actualOutput = cV.getType(mockedChange);
            expect( actualOutput ).toBe(expectedOutput);
        });

        it("GetType returns Librar when the type is free", () => {
            const mockedChange = {
                owner: "Ana",
                day: 5,
                month: 2,
                year: 2019,
                weekday: 1,
                turn: "M",
                type: "free"
            };

            const expectedOutput = "Librar";
            const actualOutput = cV.getType(mockedChange);
            expect( actualOutput ).toBe(expectedOutput);
        });

        it("GetType returns an empty string when the type is not recognized", () => {
            const mockedChange = {
                owner: "Ana",
                day: 5,
                month: 2,
                year: 2019,
                weekday: 1,
                turn: "M",
                type: "UNRECOGNIZED_TYPE"
            };

            const expectedOutput = "";
            const actualOutput = cV.getType(mockedChange);
            expect( actualOutput ).toBe(expectedOutput);
        });

        it("HandleLongPress works fine", () => {
            cV.handleLongPress();
            expect( mockedProps.handleLongPress ).toBeCalled();
        })
    });

    describe("View", () => {
        it("Matches the Snapshot when the type is 'change'", () => {
            const mockedChange = {
                owner: "Ana",
                day: 5,
                month: 2,
                year: 2019,
                weekday: 1,
                turn: "M",
                type: "change"
            };

            const view         = <ChangeView change={mockedChange} />
            const rendered     = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });

        it("Matches the Snapshot when the type is 'free'", () => {
            const mockedChange = {
                owner: "Ana",
                day: 5,
                month: 2,
                year: 2019,
                weekday: 1,
                turn: "M",
                type: "free"
            };

            const view         = <ChangeView change={mockedChange} />
            const rendered     = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });

        it("Matches the Snapshot when the type is invalid", () => {
            const mockedChange = {
                owner: "Ana",
                day: 5,
                month: 2,
                year: 2019,
                weekday: 1,
                turn: "M",
                type: "INVALID_TYPE"
            };

            const view         = <ChangeView change={mockedChange} />
            const rendered     = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });
    });
})