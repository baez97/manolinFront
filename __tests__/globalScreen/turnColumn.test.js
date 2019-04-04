import React from 'react';
import renderer from 'react-test-renderer';
import TurnColumn from '../../components/globalComponents/turnColumn';

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

describe('TurnColumn', () => {

    describe('Methods', () => {
        describe("IsToday method", () => {
            it("Returns false if the year is not correct", () => {

                // DECLARING EXPECTED OUTPUT
                const expectedOutput = false;

                // MOCKING THE PROPS FOR THIS TEST CASE
                const mockedProps = {
                    turnObjs: [
                        {
                            day: 26,
                            month: 2,
                            year: 2018,
                            turn: 'M'
                        }
                    ]
                }

                // CALLING THE TESTED METHOD
                const t = new TurnColumn(mockedProps);
                const actualOutput = t.isToday();

                // ASSERTION
                expect( actualOutput ).toBe(expectedOutput);
            });

            it("Returns false if the month is not correct", () => {

                // DECLARING EXPECTED OUTPUT
                const expectedOutput = false;

                // MOCKING THE PROPS FOR THIS TEST CASE
                const mockedProps = {
                    turnObjs: [
                        {
                            day: 26,
                            month: 1,
                            year: 2019,
                            turn: 'M'
                        }
                    ]
                }

                // CALLING THE TESTED METHOD
                const t = new TurnColumn(mockedProps);
                const actualOutput = t.isToday();

                // ASSERTION
                expect( actualOutput ).toBe(expectedOutput);
            });

            it("Returns false if the day is not correct", () => {

                // DECLARING EXPECTED OUTPUT
                const expectedOutput = false;

                // MOCKING THE PROPS FOR THIS TEST CASE
                const mockedProps = {
                    turnObjs: [
                        {
                            day: 25,
                            month: 2,
                            year: 2019,
                            turn: 'M'
                        }
                    ]
                }

                // CALLING THE TESTED METHOD
                const t = new TurnColumn(mockedProps);
                const actualOutput = t.isToday();

                // ASSERTION
                expect( actualOutput ).toBe(expectedOutput);
            });

            it("Returns true if it is today", () => {

                // DECLARING EXPECTED OUTPUT
                const expectedOutput = true;

                // MOCKING THE PROPS FOR THIS TEST CASE
                const mockedProps = {
                    turnObjs: [
                        {
                            day   : 26,
                            month : 2,
                            year  : 2019,
                            turn  : 'M'
                        }
                    ]
                }

                // CALLING THE TESTED METHOD
                const t = new TurnColumn(mockedProps);
                const actualOutput = t.isToday();

                // ASSERTION
                expect( actualOutput ).toBe(expectedOutput);
            });
        });

        describe("IsWeekend", () => {
            it("Returns false if it is not weekend", () => {
                // DECLARING THE EXPECTED OUTPUT
                const expectedOutput = false;
                
                // MOCKING THE PROPS FOR THIS TEST CASE
                const mockedProps = {
                    turnObjs: [
                        {
                            day   : 1,
                            month : 1,
                            year  : 2019,
                            turn  : 'M',
                            weekday: 2
                        }
                    ]
                }

                // CALLING THE TESTED METHOD
                const t = new TurnColumn(mockedProps);
                const actualOutput = t.isWeekend();
    
                expect( actualOutput ).toBe(expectedOutput);
            });

            it("Returns true if it is weekend", () => {
                // DECLARING THE EXPECTED OUTPUT
                const expectedOutput = true;
                
                // MOCKING THE PROPS FOR THIS TEST CASE
                const mockedProps = {
                    turnObjs: [
                        {
                            day   : 1,
                            month : 1,
                            year  : 2019,
                            turn  : 'M',
                            weekday: 6
                        }
                    ]
                }

                // CALLING THE TESTED METHOD
                const t = new TurnColumn(mockedProps);
                const actualOutput = t.isWeekend();
    
                expect( actualOutput ).toBe(expectedOutput);
            });
        });

        describe('GetTurnsView', () => {
            it("Returns a non-empty collection of views", () => {
                const turnObj = {
                    day   : 1,
                    month : 1,
                    year  : 2019,
                    turn  : 'M',
                    weekday: 6
                };

                const mockedProps = {
                    turnObjs: generateMockedTurns()
                };

                const t = new TurnColumn(mockedProps);
                const turnsView = t.getTurnsView();

                expect( turnsView        ).toBeDefined();
                expect( turnsView.length ).toBeDefined();
                expect( turnsView.length ).toBeGreaterThan(0);
                expect( turnsView.length ).toBe(11);
                expect( turnsView[0]     ).toBeDefined();
            });
        });
    });

    describe("View", () => {
        it("Matches the Snapshot when it is an ordinary day", () => {
            const turnCollection = generateMockedTurns();

            const rendered = renderer.create(<TurnColumn turnObjs = { turnCollection } />);

            expect( rendered ).toMatchSnapshot();
        });

        it("Matches the Snapshot when it is a weekend day", () => {
            const turnCollection = generateMockedTurns(1, 1, 2019, 6);

            const rendered = renderer.create(<TurnColumn turnObjs = { turnCollection } />);

            expect( rendered ).toMatchSnapshot();
        });

        it("Matches the Snapshot when it is today", () => {
            const turnCollection = generateMockedTurns(26, 2, 2019, 2);

            const rendered = renderer.create(<TurnColumn turnObjs = { turnCollection } />);

            expect( rendered ).toMatchSnapshot();
        });
    });
});