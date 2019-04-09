import React from 'react';
import renderer from 'react-test-renderer';
import TurnTable from '../../components/globalComponents/turnTable';
import mockedNurse from '../../mockedData/mockedNurse';

jest.unmock("react-native");
jest.unmock('react');
jest.unmock("react-test-renderer");
jest.unmock('expo');

jest.mock('../../components/dateUtils');

describe('TurnTable', () => {
    const nurses = [];
    for ( let i = 0; i < 11; i++ )
        nurses.push(mockedNurse);

    describe("Rendering", () => {

        it('Renders correctly', () => {
            const rendered = renderer.create(
                <TurnTable nurses={nurses} />
            ).toJSON();
    
            expect( rendered ).toMatchSnapshot();
        });

        it('Renders each item correctly', () => {
            const t = new TurnTable({nurses});
            const rendered = t.renderItem({item: 0});
            
            expect( rendered ).toMatchSnapshot();
        })

    })

    describe('Methods', () => {
        var turnTableObj = new TurnTable({nurses: nurses});

        it('GetItemLayout returns the expected object', () => {
            const expectedOutput = {
                length : 88.5,
                offset : 177,
                index  : 2
            }

            const actualOutput = turnTableObj.getItemLayout({}, 2);

            expect(actualOutput).toEqual(expectedOutput);
        });

        it('onLayout scrolls to the right index', () => {
            // MOCKING THE FUNCTION
            const mockedFn = jest.fn();
            turnTableObj.list = {
                scrollToIndex: mockedFn
            };

            // EXPECTED ARGUMENT
            const expectedArg = { index: 55 };

            // PERFORMING THE CALL TO THE TESTED FUNCTION
            turnTableObj.onLayout();

            expect(mockedFn).toBeCalledWith(expectedArg);
        })
    });

    describe('HandleViewableItems', () => {
        const setMonth = jest.fn(() => {});
        turnTableObj = new TurnTable({nurses: nurses, setMonth: setMonth})

        it("Does nothing when wieableItems is undefined", () => {
            const previousMonth  = turnTableObj.state.currentMonthIndex;
            const expectedOutput = previousMonth;

            turnTableObj.handleViewableItemsChanged({ 
                viewableItems : undefined, 
                changed       : undefined });
            
            const actualOutput = turnTableObj.state.currentMonthIndex;

            expect(turnTableObj.props.setMonth).not.toBeCalled();
            expect(actualOutput).toBe(expectedOutput);
        });

        it("Does nothing when viewableItems is empty", () => {
            const previousMonth = turnTableObj.state.currentMonthIndex;
            const expectedOutput = previousMonth;

            turnTableObj.handleViewableItemsChanged({ 
                viewableItems : [], 
                changed       : undefined });
            
            const actualOutput = turnTableObj.state.currentMonthIndex;

            expect(turnTableObj.props.setMonth).not.toBeCalled();
            expect(actualOutput).toBe(expectedOutput);
        });

        it("Does nothing when all viewableItems have different months", () => {
            const previousMonth = turnTableObj.state.currentMonthIndex;
            const expectedOutput = previousMonth;

            // FROM 31/3/2019 until 6/4/2019
            const viewableItems = [
                { item: 90 },
                { item: 91 },
                { item: 92 },
                { item: 93 },
                { item: 94 },
                { item: 95 },
                { item: 96 }
            ];

            turnTableObj.handleViewableItemsChanged({ 
                viewableItems : viewableItems, 
                changed       : undefined });
            
            const actualOutput = turnTableObj.state.currentMonthIndex;
            expect( setMonth     ).not.toBeCalled();
            expect( actualOutput ).toBe(expectedOutput);
        });

        it("Updates the month when all items have the same month", () => {
            // EXPECTED OUTPUT
            // -- Index of April
            const expectedOutput = 3

            // FROM 1/4/2019 until 7/4/2019
            const viewableItems = [
                { item: 91 },
                { item: 92 },
                { item: 93 },
                { item: 94 },
                { item: 95 },
                { item: 96 },
                { item: 97 },
            ];

            turnTableObj.handleViewableItemsChanged({ 
                viewableItems : viewableItems, 
                changed       : undefined });
            
            expect( setMonth     ).toBeCalled();
            expect( setMonth     ).toBeCalledWith(expectedOutput);
        });

        it("Sets the month to the current month if it's visible on the left", () => {
            const expectedOutput = 1;

            // FROM 28/2/2019 until 6/3/2019
            const viewableItems = [
                { item: 58 },
                { item: 59 },
                { item: 60 },
                { item: 61 },
                { item: 62 },
                { item: 63 },
                { item: 64 },
            ];

            turnTableObj.handleViewableItemsChanged({ 
                viewableItems : viewableItems, 
                changed       : undefined });
            
            expect( setMonth ).toBeCalled();
            expect( setMonth ).toBeCalledWith(expectedOutput);
        });

        it("Sets the month to the current month if it's visible on the right", () => {
            const expectedOutput = 1;

            // FROM 26/1/2019 until 1/2/2019
            const viewableItems = [
                { item: 25 },
                { item: 26 },
                { item: 27 },
                { item: 28 },
                { item: 29 },
                { item: 30 },
                { item: 31 },
            ];

            turnTableObj.handleViewableItemsChanged({ 
                viewableItems : viewableItems, 
                changed       : undefined });
            
            expect( setMonth ).toBeCalled();
            expect( setMonth ).toBeCalledWith(expectedOutput);
        });
    });
});