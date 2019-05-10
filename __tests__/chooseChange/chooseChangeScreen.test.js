import React from 'react';
import renderer from 'react-test-renderer';
import ChooseChangeScreen from '../../screens/chooseChangeScreen'
import fetchToAPI from '../../components/fetchToAPI';
import mockedUsers from '../../components/__mocks__/mockedUsers';

jest.mock('../../components/dateUtils');
jest.mock('../../components/fetchToAPI');
jest.mock('../../components/homeComponents/changes/changeView');
jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo'); 

describe("ChooseChangeScreen", () => {
    describe("Constructor", () => {
        it("Gets the Navigation Params and Binds the methods", () => {
            const mockedProps = {
                navigation: {
                    getParam: jest.fn()
                }
            };

            new ChooseChangeScreen(mockedProps);

            expect( mockedProps.navigation.getParam ).toBeCalled();
        });
    });

    describe("ComponentDidMount", () => {
        it("Catches a fetch error", async() => {
            fetchToAPI.mockReturnValueOnce( new Promise((res, rej) => {
                rej("ERR");
            }));

            const mockedProps = {
                navigation: {
                    getParam: jest.fn(() => ({ owner_id: "id" }))
                },
            };

            const CCScreen = new ChooseChangeScreen(mockedProps);
            CCScreen.setState = jest.fn();
            
            await CCScreen.componentDidMount();

            expect( CCScreen.setState ).toBeCalledWith({ error: true })
        });

        it("Calls to setState if everything was fine", async () => {
            fetchToAPI.mockReturnValueOnce( new Promise((res, rej) => {
                res({ json: () => ("MOCKED_USER")})
            }));

            const mockedProps = {
                navigation: {
                    getParam: jest.fn(() => ({ owner_id: "id" }))
                },
            };

            const CCScreen = new ChooseChangeScreen(mockedProps);
            CCScreen.setState = jest.fn();
            
            await CCScreen.componentDidMount();

            expect( CCScreen.ownerNurse ).toBe( "MOCKED_USER" );
        });
    });

    describe("Functions", () => {
        it("WantsToChange works fine", () => {
            const mockedProps = {
                navigation: {
                    getParam: jest.fn()
                }
            };

            const CCScreen = new ChooseChangeScreen(mockedProps);

            // MOCKING DEPENDENCIES OF THE FUNCTION
            CCScreen.showModal = jest.fn();
            CCScreen.changerNurse = { name : "MOCKED_NAME" };
            CCScreen.ownerNurse   = { name : "MOCKED_NAME" };
            CCScreen.change       = { day  : "MOCKED_DAY",
                                      turn : "MOCKED_TURN" };
            const mockedTurn = {
                day: "MOCKED_DAY",
                turn: "MOCKED_TURN",
            }

            // EXECUTING THE TESTED FUNCTION
            CCScreen.wantsToChange(mockedTurn);

            // ASSERTING
            expect( CCScreen.showModal ).toBeCalled();
        });

        it("ConfirmChange works fine", () => {
            const mockedProps = {
                navigation: {
                    getParam: jest.fn()
                }
            };

            const CCScreen = new ChooseChangeScreen(mockedProps);

            // MOCKING DEPENDENCIES OF THE FUNCTION
            CCScreen.showConfirmation = jest.fn();
            CCScreen.change           = "MOCKED_CHANGE"
            CCScreen.socket           = { emit: jest.fn() };
            CCScreen.changerNurse     = { name : "MOCKED_NAME" };
            const mockedTurn = {
                day: "MOCKED_DAY",
                turn: "MOCKED_TURN",
            }

            // EXECUTING THE TESTED FUNCTION
            CCScreen.confirmChange(mockedTurn);

            // ASSERTING
            expect( CCScreen.showConfirmation ).toBeCalled();
        });

        it("ShowModal works fine", () => {
            const mockedProps = {
                navigation: {
                    getParam: jest.fn()
                }
            };

            const CCScreen = new ChooseChangeScreen(mockedProps);

            // MOCKING DEPENDENCIES OF THE FUNCTION
            CCScreen.setState = jest.fn();

            // EXECUTING THE TESTED FUNCTION
            CCScreen.showModal("message", "turn");

            // ASSERTING
            expect( CCScreen.setState ).toBeCalled();
        });

        it("HideModal works fine", () => {
            const mockedProps = {
                navigation: {
                    getParam: jest.fn()
                }
            };

            const CCScreen = new ChooseChangeScreen(mockedProps);

            // MOCKING DEPENDENCIES OF THE FUNCTION
            CCScreen.setState = jest.fn();

            // EXECUTING THE TESTED FUNCTION
            CCScreen.hideModal();

            // ASSERTING
            expect( CCScreen.setState ).toBeCalled();
        });

        it("ShowConfirmation works fine", () => {
            const mockedProps = {
                navigation: {
                    getParam: jest.fn()
                }
            };

            const CCScreen = new ChooseChangeScreen(mockedProps);

            // MOCKING DEPENDENCIES OF THE FUNCTION
            CCScreen.setState = jest.fn();
            CCScreen.ownerNurse = { name: "MOCKED_NAME" }

            // EXECUTING THE TESTED FUNCTION
            CCScreen.showConfirmation();

            // ASSERTING
            expect( CCScreen.setState ).toBeCalled();
        });

        it("ShowConfirmation works fine", () => {
            const mockedProps = {
                navigation: {
                    getParam: jest.fn()
                }
            };

            const CCScreen = new ChooseChangeScreen(mockedProps);

            // MOCKING DEPENDENCIES OF THE FUNCTION
            CCScreen.setState = jest.fn();
            CCScreen.ownerNurse = { name: "MOCKED_NAME" }

            // EXECUTING THE TESTED FUNCTION
            CCScreen.showConfirmation();

            // ASSERTING
            expect( CCScreen.setState ).toBeCalled();
        });

        it("HideConfirmation works fine", () => {
            const mockedProps = {
                navigation: {
                    getParam: jest.fn(() => "MOCKED_TOKEN"),
                }
            };

            const CCScreen = new ChooseChangeScreen(mockedProps);

            // MOCKING DEPENDENCIES OF THE FUNCTION
            const mockedFn = jest.fn();
            CCScreen.props.navigation.navigate = mockedFn;

            // EXECUTING THE TESTED FUNCTION
            CCScreen.hideConfirmation();

            // ASSERTING
            expect( mockedFn ).toBeCalled();
        });

        it("SetMonth works fine", () => {
            const mockedProps = {
                navigation: {
                    getParam: jest.fn(() => "MOCKED_TOKEN"),
                }
            };

            const CCScreen = new ChooseChangeScreen(mockedProps);

            // MOCKING DEPENDENCIES OF THE FUNCTION
            CCScreen.setState = jest.fn();

            // EXECUTING THE TESTED FUNCTION
            CCScreen.setMonth("MOCKED_MONTH");

            // ASSERTING
            expect( CCScreen.setState ).toBeCalledWith(
                { currentMonthIndex: "MOCKED_MONTH" }
            );
        });

        it("DoNothing does nothing", () => {
            const mockedProps = {
                navigation: {
                    getParam: jest.fn(() => "MOCKED_TOKEN"),
                }
            };

            const CCScreen = new ChooseChangeScreen(mockedProps);
            CCScreen.setState = jest.fn();

            CCScreen.doNothing();

            expect( CCScreen.setState ).not.toBeCalled();
        });
    });

    describe("View", () => {
        it("Shows 'Cargando...' when it is loading", async () => {
            fetchToAPI.mockReturnValue(
                new Promise((res, rej) => {})
            );
            const navigation = {
                getParam: jest.fn( key => "TOKEN" )
            }

            const rendered = await renderer.create(
                <ChooseChangeScreen navigation={navigation}/>
            );

            const loadingView = rendered.toJSON().children[0];
            const loadingText = loadingView.children[0];
            expect( loadingText ).toBe("Cargando...");
            expect( rendered    ).toMatchSnapshot();
        });

        it("Shows 'Se ha producido un error...' when the fetch failed", async () => {
            
            fetchToAPI.mockReturnValue(
                new Promise((res, rej) => rej("ERROR"))
            );

            const mockedToken = "VALUE";

            const navigation = {
                getParam: jest.fn( key => mockedToken )
            }

            const rendered = await renderer.create(
                <ChooseChangeScreen navigation={navigation}/>
            );

            await rendered.root._fiber.stateNode.componentDidMount()

            const loadingView = rendered.toJSON().children[0];
            const loadingText = loadingView.children[0];
            expect( loadingText ).toBe("Se ha producido un error");
            expect( rendered    ).toMatchSnapshot();
        });

        it("Matches the Snapshot when everything is okay", async () => {
            
            fetchToAPI.mockReturnValue(
                new Promise((res, rej) => 
                    res({ json: () => mockedUsers[0]})
                )
            );

            const mockedChange = {
                owner: "Ana",
                owner_id: "5c7ab0c331f6240fbc248f6e",
                day: 5,
                month: 2,
                year: 2019,
                weekday: 1,
                turn: "M",
                type: "change"
            };

            const navigation = {
                getParam: jest.fn( key => {
                    if ( key === "changerNurse" )
                        return mockedUsers[1];
                    else if ( key === "change")
                        return mockedChange;
                    else
                        return "MOCKED_VALUE"
                })
            }

            const rendered = await renderer.create(
                <ChooseChangeScreen navigation={navigation}/>
            );

            await rendered.root._fiber.stateNode.componentDidMount()

            expect( rendered    ).toMatchSnapshot();
        });

        it("Shows 'Turno' when currentMonthIndex has not solved yet", async () => {
            
            fetchToAPI.mockReturnValue(
                new Promise((res, rej) => 
                    res({ json: () => mockedUsers[0]})
                )
            );

            const mockedChange = {
                owner: "Ana",
                owner_id: "5c7ab0c331f6240fbc248f6e",
                day: 5,
                month: 2,
                year: 2019,
                weekday: 1,
                turn: "M",
                type: "change"
            };

            const navigation = {
                getParam: jest.fn( key => {
                    if ( key === "changerNurse" )
                        return mockedUsers[1];
                    else if ( key === "change")
                        return mockedChange;
                    else
                        return "MOCKED_VALUE"
                })
            }


            const CCScreen = new ChooseChangeScreen({navigation: navigation, changerNurse: mockedUsers[0]});
            CCScreen.ownerNurse = mockedUsers[1];
            CCScreen.state = {
                userLoaded: true,
                error: false,
                currentMonthIndex: 14,
                nurses: mockedUsers
            }

            const view = CCScreen.render();
            const monthView = view.props.children[2];
            const monthText = monthView.props.children;
            expect ( monthText ).toBe("Turno");
        });
    });
});