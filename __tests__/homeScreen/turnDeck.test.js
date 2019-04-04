import React from 'react';
import renderer from 'react-test-renderer';
import TurnDeck from '../../components/homeComponents/turnDeck';
import mockedNurse from '../../mockedData/mockedNurse';

jest.mock('../../components/dateUtils')
jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

const simulateRenderItem = function(rendered, item) {
    rendered
        .root
        ._fiber
        .stateNode
        .list
        ._reactInternalFiber
        .pendingProps
        .renderItem({item});
}

describe("TurnDeck", () => {
    it('Renders correctly', () => {
        const rendered = renderer.create(
            <TurnDeck turnWithDates={mockedNurse.turnWithDates} />
        ).toJSON();

        expect(rendered).toMatchSnapshot();
    })

    describe('Methods', () => {
        const turnDeckObj = new TurnDeck({ turnWithDates: mockedNurse.turnWithDates });

        it('GetItemLayout returns the expected object', () => {
            const expectedOutput = {
                length : 55,
                offset : 110,
                index  : 2
            }

            const actualOutput = turnDeckObj.getItemLayout({}, 2);

            expect(actualOutput).toEqual(expectedOutput);
        });

        it('onLayout scrolls to the right index', () => {
            // MOCKING THE FUNCTION
            const mockedFn = jest.fn(() => {});
            turnDeckObj.list = {
                scrollToIndex: mockedFn
            };

            // EXPECTED ARGUMENT
            const expectedArg = { index: 55 };

            // PERFORMING THE CALL TO THE TESTED FUNCTION
            turnDeckObj.onLayout();

            expect(mockedFn).toBeCalledWith(expectedArg);
        })

        describe('HandleViewableItems', () => {
            beforeAll(() => {
                turnDeckObj.setState = jest.fn(() => {});
            });

            it("Does nothing when wieableItems is undefined", () => {
                const previousMonth = turnDeckObj.state.currentMonthIndex;
                const expectedOutput = previousMonth;

                turnDeckObj.handleViewableItemsChanged({ 
                    viewableItems : undefined, 
                    changed       : undefined });
                
                const actualOutput = turnDeckObj.state.currentMonthIndex;

                expect(turnDeckObj.setState).not.toBeCalled();
                expect(actualOutput).toBe(expectedOutput);
            });

            it("Does nothing when viewableItems is empty", () => {
                const previousMonth = turnDeckObj.state.currentMonthIndex;
                const expectedOutput = previousMonth;

                turnDeckObj.handleViewableItemsChanged({ 
                    viewableItems : [], 
                    changed       : undefined });
                
                const actualOutput = turnDeckObj.state.currentMonthIndex;

                expect(turnDeckObj.setState).not.toBeCalled();
                expect(actualOutput).toBe(expectedOutput);
            });

            it("Does nothing when all viewableItems have different months", () => {
                const previousMonth = turnDeckObj.state.currentMonthIndex;
                const expectedOutput = previousMonth;

                const viewableItems1 = [
                    { item: { "day": 1, "month": 5, "year": 2019, "weekday": 2,
                        "turn": "M" }},
                    { item: { "day": 2, "month": 5, "year": 2019, "weekday": 3,
                        "turn": "M" }},
                    { item: { "day": 3, "month": 5, "year": 2019, "weekday": 4,
                        "turn": "T" }},
                    { item: { "day": 4, "month": 5, "year": 2019, "weekday": 5,
                        "turn": "T" }},
                    { item: { "day": 5, "month": 5, "year": 2019, "weekday": 6,
                        "turn": "N" }},
                    { item: { "day": 6, "month": 5, "year": 2019, "weekday": 7,
                        "turn": "N" }},
                    { item: { "day": 7, "month": 6, "year": 2019, "weekday": 1,
                        "turn": "-" }},
                ];

                turnDeckObj.handleViewableItemsChanged({ 
                    viewableItems : viewableItems1, 
                    changed       : undefined });
                
                const actualOutput = turnDeckObj.state.currentMonthIndex;

                expect(turnDeckObj.setState).not.toBeCalled();
                expect(actualOutput).toBe(expectedOutput);
            });

            it("Updates the month when all items have the same month", () => {
                const previousMonth = turnDeckObj.state.currentMonthIndex;
                const expectedOutput = {currentMonthIndex: 0};

                const viewableItems2 = [
                    { item: { "day": 1, "month": 1, "year": 2019, "weekday": 2,
                        "turn": "M" }},
                    { item: { "day": 2, "month": 1, "year": 2019, "weekday": 3,
                        "turn": "M" }},
                    { item: { "day": 3, "month": 1, "year": 2019, "weekday": 4,
                        "turn": "T" }},
                    { item: { "day": 4, "month": 1, "year": 2019, "weekday": 5,
                        "turn": "T" }},
                    { item: { "day": 5, "month": 1, "year": 2019, "weekday": 6,
                        "turn": "N" }},
                    { item: { "day": 6, "month": 1, "year": 2019, "weekday": 7,
                        "turn": "N" }},
                    { item: { "day": 7, "month": 1, "year": 2019, "weekday": 1,
                        "turn": "-" }},
                ];

                turnDeckObj.handleViewableItemsChanged({ 
                    viewableItems : viewableItems2, 
                    changed       : undefined });
                
                const actualOutput = turnDeckObj.state.currentMonthIndex;

                expect(turnDeckObj.setState).toBeCalled();
                expect(turnDeckObj.setState).toBeCalledWith(expectedOutput);
            });

            it("Sets the month to the current month if it's visible on the left", () => {
                const expectedOutput = {currentMonthIndex: 1};

                const viewableItems2 = [
                    { item: { "day": 1, "month": 1, "year": 2019, "weekday": 2,
                        "turn": "M" }},
                    { item: { "day": 2, "month": 2, "year": 2019, "weekday": 3,
                        "turn": "M" }},
                    { item: { "day": 3, "month": 2, "year": 2019, "weekday": 4,
                        "turn": "T" }},
                    { item: { "day": 4, "month": 2, "year": 2019, "weekday": 5,
                        "turn": "T" }},
                    { item: { "day": 5, "month": 2, "year": 2019, "weekday": 6,
                        "turn": "N" }},
                    { item: { "day": 6, "month": 2, "year": 2019, "weekday": 7,
                        "turn": "N" }},
                    { item: { "day": 7, "month": 2, "year": 2019, "weekday": 1,
                        "turn": "-" }},
                ];

                turnDeckObj.handleViewableItemsChanged({ 
                    viewableItems : viewableItems2, 
                    changed       : undefined });
                
                const actualOutput = turnDeckObj.state.currentMonthIndex;

                expect(turnDeckObj.setState).toBeCalled();
            });

            it("Sets the month to the current month if it's visible on the right", () => {
                const expectedOutput = {currentMonthIndex: 1};

                const viewableItems2 = [
                    { item: { "day": 1, "month": 0, "year": 2019, "weekday": 2,
                        "turn": "M" }},
                    { item: { "day": 2, "month": 0, "year": 2019, "weekday": 3,
                        "turn": "M" }},
                    { item: { "day": 3, "month": 0, "year": 2019, "weekday": 4,
                        "turn": "T" }},
                    { item: { "day": 4, "month": 0, "year": 2019, "weekday": 5,
                        "turn": "T" }},
                    { item: { "day": 5, "month": 0, "year": 2019, "weekday": 6,
                        "turn": "N" }},
                    { item: { "day": 6, "month": 0, "year": 2019, "weekday": 7,
                        "turn": "N" }},
                    { item: { "day": 7, "month": 1, "year": 2019, "weekday": 1,
                        "turn": "-" }},
                ];

                turnDeckObj.handleViewableItemsChanged({ 
                    viewableItems : viewableItems2, 
                    changed       : undefined });
                
                const actualOutput = turnDeckObj.state.currentMonthIndex;

                expect(turnDeckObj.setState).toBeCalled();
            });
        });
    });

    describe("View", () => {
        it("Does not show month if it is undefined", () => {
            const rendered = renderer.create(
                <TurnDeck turnWithDates={mockedNurse.turnWithDates} />
            );
            
            rendered.getInstance().setState({ currentMonthIndex: 20 });

            const firstChildren = rendered.toJSON().children[0];
            const text = firstChildren.children[0];
            expect(text).toBe("Mi turno");
        });

        it("Shows month if it is not undefined", () => {
            const rendered = renderer.create(
                <TurnDeck turnWithDates={mockedNurse.turnWithDates} />
            );
            
            const firstChildren = rendered.toJSON().children[0];
            const text = firstChildren.children[0];
            expect(text).toBe("Mi turno de Febrero");
        });

        it("Calls the onLayout method", () => {
            // MOCKED FUNCTION
            const mockedFn = jest.fn(() => {});

            // RENDERING
            const rendered = renderer.create(
                <TurnDeck turnWithDates={mockedNurse.turnWithDates} />
            );

            // MOCKING THE FUNCTION
            rendered.root._fiber.stateNode.list.scrollToIndex = mockedFn;
            
            // FINDING THE CORRESPONDING VIEW
            const secondChildren = rendered.toJSON().children[1];

            // SIMULATE ONLAYOUT
            secondChildren.props.onLayout();
            expect(mockedFn).toBeCalled();
        });

        it("Renders each item of the list correctly", () => {

            // RENDERING
            const rendered = renderer.create(
                <TurnDeck turnWithDates={mockedNurse.turnWithDates} />
            );

            // MOCKING THE FUNCTION
            const mockedFn = jest.fn(() => {});
            React.createElement = mockedFn;
            
            // FINDING THE CORRESPONDING VIEW
            const secondChildren = rendered.toJSON().children[1];
            const item = {
                day: 1,
                month: 1,
                year: 2019,
                turn: 'M',
                weekday: 2
            }

            // SIMULATE ONLAYOUT
            simulateRenderItem(rendered, item);
            expect(mockedFn).toBeCalled();
        });
    })
});

