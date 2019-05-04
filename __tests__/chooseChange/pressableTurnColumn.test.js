import React from 'react';
import renderer from 'react-test-renderer';
import PressableTurnColumn from 
    '../../components/chooseChangeComponents/pressableTurnColumn';

jest.mock('../../components/dateUtils');
jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

// AUXILIAR FUNCTION TO MOCK A TURNS COLLECTION
function generateMockedTurns( day=25, month=2, year=2019, weekday=1 ) {
    const turnObj = {
        day   : day,
        month : month,
        year  : year,
        turn  : 'M',
        weekday: weekday
    };

    const turnObjsCollection = [];
    for ( let i = 0; i < 11; i++ ) {
        turnObjsCollection.push({...turnObj});
    }

    return turnObjsCollection;
}

describe('PressableTurnColumn', () => {

    describe("Methods", () => {
        it("handlePress calls to onPressFn of props", () => {
            const props = {
                onPressFn : jest.fn(),
                turnObjs  : ["FIRST_TURN", "SECOND_TURN"]
            };

            const pressCol = new PressableTurnColumn(props);
            pressCol.handlePress();

            expect( props.onPressFn ).toBeCalled();
            expect( props.onPressFn ).toBeCalledWith("FIRST_TURN");
        });
    });

    describe("View", () => {
        it("Matches the Snapshot when it is an ordinary day", () => {
            const turnCollection = generateMockedTurns();

            const rendered = renderer.create(
                <PressableTurnColumn turnObjs = { turnCollection } />
            );

            expect( rendered ).toMatchSnapshot();
        });

        it("Matches the Snapshot when it is a weekend day", () => {
            const turnCollection = generateMockedTurns(1, 1, 2019, 6);

            const rendered = renderer.create(<PressableTurnColumn turnObjs = { turnCollection } />);

            expect( rendered ).toMatchSnapshot();
        });

        it("Matches the Snapshot when it is today", () => {
            const turnCollection = generateMockedTurns(26, 2, 2019, 2);

            const rendered = renderer.create(<PressableTurnColumn turnObjs = { turnCollection } />);

            expect( rendered ).toMatchSnapshot();
        });
    });
});