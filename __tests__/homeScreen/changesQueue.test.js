import React from 'react';
import renderer from 'react-test-renderer';
import ChangesQueue from '../../components/homeComponents/changes/changesQueue';
import fetchToAPI from '../../components/fetchToAPI';
import mockedUsers from '../../components/__mocks__/mockedUsers';

jest.unmock("react-native");
jest.unmock("react");
jest.unmock("react-test-renderer");
jest.unmock("expo");
jest.unmock("../../components/homeComponents/changes/changeView")
jest.mock("socket.io-client");
jest.mock("../../components/fetchToAPI");


const simulateRenderItem = function(listContainer, item) {
    listContainer
        .props
        .children
        .props
        .renderItem({item});
}

const simulateSetState = function(reactObject, stateObj) {
    reactObject
        .state = stateObj;
}

describe("ChangesQueue", () => {
    
    const mockedToken = "TOKEN";
    const props = {
        token: mockedToken,
        socket: {
            on: jest.fn((chain, callback) => {
                callback()
            }),
            emit: jest.fn()
        },
        onLoaded: jest.fn()
    };
    
    fetchToAPI.mockReturnValueOnce(
        new Promise((res, rej) => {
            res(mockedUsers[0])
        })
    );

    const cQ = new ChangesQueue(props);
    cQ.setState   = jest.fn();

    describe("ComponentDidMount", () => {

        it("Calls to fetchToAPI", async() => {
            fetchToAPI.mockReturnValueOnce(
                new Promise((res, rej) => {
                    res({json: () => ({})})
                }));
            await cQ.componentDidMount();
            expect( fetchToAPI ).toBeCalled();
        });

        it("Sets the state correctly when there is not an error", async () => {
            const mockedResponse = {err: false, result: "MOCKEDRESULT"};
            const expectedArgs = {
                changesLoaded: true,
                changes: mockedResponse.result
            }
            fetchToAPI.mockReturnValueOnce(
                new Promise((res, rej) => {
                    res({json: () => (mockedResponse)})
                }));
            await cQ.componentDidMount();
            expect( cQ.setState ).toBeCalled();
            expect( cQ.setState ).toBeCalledWith(expectedArgs)
        });

        it("Sets the state correctly when there is an error", async () => {
            const mockedResponse = {err: true, result: []};
            const expectedArgs = {
                changesLoaded: true,
                changes: mockedResponse.result
            }
            fetchToAPI.mockReturnValueOnce(
                new Promise((res, rej) => {
                    res({json: () => (mockedResponse)})
                }));
            await cQ.componentDidMount();
            expect( cQ.setState ).toBeCalled();
            expect( cQ.setState ).toBeCalledWith(expectedArgs)
        });

        it("Sets the state correctly when an error is thrown", async () => {
            const expectedArgs = {
                changesLoaded: true,
                changes: []
            }
            fetchToAPI.mockReturnValueOnce(
                new Promise((res, rej) => {
                    throw "ERR";
                }));
            await cQ.componentDidMount();
            expect( cQ.setState ).toBeCalled();
            expect( cQ.setState ).toBeCalledWith(expectedArgs)
        });
    });

    describe("View", () => {
        it("Matches the Snapshot when changes are not loaded yet", () => {
            const view = <ChangesQueue token={mockedToken} socket={{on: jest.fn()}}/>
            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });

        it("Matches the Snapshot when there are no changes", async () => {
            const view     = <ChangesQueue token="TOKEN" socket={{on: jest.fn()}}/>
            const rendered = await renderer.create(view);
            const renderedObj = rendered.root._fiber.stateNode;
            renderedObj.setState({
                changesLoaded: true,
                changes: []
            });

            const renderedJson = rendered.toJSON();
            
            expect ( renderedJson ).toMatchSnapshot();
        });

        it("RenderItem works correctly", async () => {
            const mockedChange = {
                _id: "id_1",
                day: 1,
                month: 1,
                year: 2019,
                turn: 'M',
                weekday: 2
            }

            simulateSetState( cQ, {
                changesLoaded:true,
                changes: [ mockedChange ]
            });

            const rendered = cQ.render();
            React.createElement = jest.fn();
            simulateRenderItem( rendered, mockedChange );
            expect( React.createElement ).toBeCalled();
        });

        it("KeyExtractor works correctly", () => {
            const expectedOutput = "id_1";
            const mockedChange = {
                _id: "id_1",
                day: 1,
                month: 1,
                year: 2019,
                turn: 'M',
                weekday: 2
            }

            const actualOutput = cQ.keyExtractor(mockedChange);
            expect( actualOutput ).toBe(expectedOutput);
        })


    });
});