import React from 'react';
import renderer from 'react-test-renderer';
import GlobalScreen from '../../screens/globalScreen';
import fetchMock from 'fetch-mock';
import fetchToAPI from '../../components/fetchToAPI';
import mockedNurse from '../../mockedData/mockedNurse';

jest.unmock("react-native");
jest.unmock('react');
jest.unmock("react-test-renderer");
jest.unmock('expo');
jest.mock('../../components/dateUtils');
jest.mock('../../components/fetchToAPI');
jest.useFakeTimers();

describe("GlobalScreen tests", () => {
    
    describe("ComponentDidMount", () => {
        it("Calls to fetch", async () => {
            const mockedToken = "TOKEN";
            fetchToAPI.mockReturnValueOnce(
                new Promise((res, rej) => {
                    return res({
                        json: () => ([mockedNurse, mockedNurse]) 
                    })
                })
            );

            const gS = new GlobalScreen({navigation: {getParam: jest.fn(() => mockedToken)}});

            gS.setState = jest.fn();
            await gS.componentDidMount();
            expect(fetchToAPI).toBeCalled();
            expect(gS.setState).toBeCalled();
        });

        it("Catches a fetch error", async() => {
            const mockedNavigation = {
                getParam: jest.fn(() => "TOKEN")
            };

            const gS = new GlobalScreen({navigation: mockedNavigation});
            fetchToAPI.mockReturnValueOnce( new Promise((res, rej) => {
                rej("ERR");
            }));

            gS.setState = jest.fn();
            await gS.componentDidMount();
            
            expect( gS.setState ).toBeCalled();
            expect( gS.setState ).toBeCalledWith({error: true});
        });
    });

    describe("View", () => {
        it("Shows 'Se ha producido un error' when the fetch failed", () => {
            const gS = new GlobalScreen({navigation: {getParam: jest.fn(() => mockedToken)}});
            gS.state = { error: true }
            const view = gS.render();
            const errorText = view.props.children.props.children;

            expect( errorText ).toBe(" Se ha producido un error ");
        });

        it("Shows Loading animation when the turns are not loaded", () => {
            const gS = new GlobalScreen({navigation: {getParam: jest.fn(() => mockedToken)}});
            gS.state = { usersLoaded: false }
            const view = gS.render();
            const animationView = view.props.children;

            expect(animationView.props.animationEasing).toBeDefined();
        });

        it("Shows everything when the turns are loaded", () => {
            const gS = new GlobalScreen();
            gS.state.usersLoaded = true;
            gS.state.nurses      = [ mockedNurse, mockedNurse];

            expect( gS.render() ).toMatchSnapshot();
            // const rendered = renderer.create(
            //     <GlobalScreen />
            // )

            // const renderedObj = rendered.root._fiber.stateNode;
            // renderedObj.setState({
            //     usersLoaded: true,
            //     nurses: [ mockedNurse, mockedNurse ]
            // });

            // const titleView = rendered.toJSON().children[0];
            // const titleText = titleView.children[0];
            // expect( titleText         ).toBe("Turno de Febrero");
            // expect( rendered.toJSON() ).toMatchSnapshot();
        });
    });

    describe("Children props", () => {
        it("TurnTable's setMonth method calls setState", async () => {
            // MOCKING CALLED FUNCTION SO THE NUMBER
            // OF CALLS IS CONTROLLED
            const mockedFn = jest.fn();

            // MOCKING PROPS SO THE COMPONENT IS 
            // CORRECTLY CREATED
            const mockedProps = {
                nurses: [ mockedNurse, mockedNurse ],
                navigation: {
                    getParam: () => "VALUE"
                }
            }
            const g = new GlobalScreen(mockedProps);
            
            // MOCKING THE STATE SO THE NORMAL VIEW
            // IS DISPLAYED INSTEAD OF 'Cargando...'
            g.state = {
                nurses: [ mockedNurse, mockedNurse ],
                usersLoaded: true
            }

            // MOCKING THE FUNCTION THAT IT IS EXPECTED
            // TO BE CALLED
            g.setState = mockedFn;

            // RENDERING
            const rendered        = g.render();

            // OBTAINING THE METHOD THAT SHOULD CALL
            // THE FUNCTION
            const viewContainer   = rendered.props.children[1];
            const testedComponent = viewContainer.props.children[1];
            const testedMethod    = testedComponent.props.setMonth;

            // CALLING THE METHOD AND ASSERTING THAT IT
            // CALLS TO THE CORRECT FUNCTION
            testedMethod();
            expect( mockedFn ).toBeCalled();
        });
    });
});