import React from 'react';
import MyChangesScreen from '../../screens/myChangesScreen';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

describe("MyChangesScreen", () => {
    describe("Functions", () => {
        const mockedGetParam = jest.fn();
        const mockedProps = {
            navigation: {
                getParam: mockedGetParam
            }
        }
        it("Constructor works fine", () => {
            new MyChangesScreen(mockedProps);
            expect( mockedGetParam ).toBeCalled();
        });
        
        it("PurposalPressed calls to showModal", () => {
            const MCScreen = new MyChangesScreen(mockedProps);
            MCScreen.showModal = jest.fn();

            MCScreen.purposalPressed();

            expect( MCScreen.showModal ).toBeCalled();
        });

        it("ShowModal sets the state", () => {
            const MCScreen = new MyChangesScreen(mockedProps);
            const mockedTurn = {
                day: "MOCKED_DAY",
                month: "MOCKED_MONTH",
                turn: "MOCKED_TURN",
                owner: "MOCKED_OWNER"
            };

            MCScreen.setState = jest.fn();

            MCScreen.showModal(mockedTurn, mockedTurn);

            expect( MCScreen.setState ).toBeCalled();
        });

        it("hideModal sets the state", () => {
            const MCScreen = new MyChangesScreen(mockedProps);
            MCScreen.setState = jest.fn();

            MCScreen.hideModal();

            expect( MCScreen.setState ).toBeCalled();
        });

        it("ConfirmPurposal calls to socketEmit and showConfirmation", () => {
            const mockedEmit = jest.fn();
            const mockedGetParamSocket = jest.fn((key) => {
                if ( key === "socket" ) {
                    return { emit: mockedEmit }
                }
            });
            const mockedPropsSocket = {
                navigation: {
                    getParam: mockedGetParamSocket
                }
            }

            const MCScreen = new MyChangesScreen(mockedPropsSocket);
            MCScreen.hideModal = jest.fn();
            MCScreen.showConfirmation = jest.fn();

            MCScreen.confirmPurposal();

            expect( MCScreen.hideModal ).toBeCalled();
            expect( MCScreen.showConfirmation ).toBeCalled();
            expect( mockedEmit ).toBeCalled();
        });

        it("ShowConfirmation calls to SetState", () => {
            const MCScreen = new MyChangesScreen(mockedProps);
            MCScreen.setState = jest.fn();

            MCScreen.showConfirmation();

            expect( MCScreen.setState ).toBeCalled();
        });

        it("HideConfirmation navigates to HomeScreen", () => {
            const mockedNavigate = jest.fn();
            const mockedNavigationProps = {
                navigation: {
                    navigate: mockedNavigate,
                    getParam: jest.fn()
                }
            }

            const MCScreen = new MyChangesScreen(mockedNavigationProps);

            MCScreen.hideConfirmation();

            expect( mockedNavigate ).toBeCalled();
        });      
    });

    describe("View", () => {
        it("Matches the Snapshot", () => {
            const mockedNav = {
                getParam: jest.fn()
            };

            const MCScreen = new MyChangesScreen({navigation: mockedNav});

            const view = MCScreen.render();

            expect( view ).toMatchSnapshot();
        });
    });
});