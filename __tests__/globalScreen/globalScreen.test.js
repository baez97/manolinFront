import React from 'react';
import renderer from 'react-test-renderer';
import GlobalScreen from '../../screens/globalScreen';
import fetchMock from 'fetch-mock';
import mockedNurse from '../../mockedData/mockedNurse';
import { BACKEND_IP } from '../../config';

jest.unmock("react-native");
jest.unmock('react');
jest.unmock("react-test-renderer");
jest.unmock('expo');
jest.mock('../../components/dateUtils');
jest.useFakeTimers();

describe("GlobalScreen tests", () => {
    
    describe("ComponentDidMount", () => {

        it("Calls to fetch", async () => {
            const mockedToken = "VALUE";
            const expectedOptions = { 
                method: 'GET',
                headers:
                { Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': mockedToken } 
                }
            fetchMock.get(BACKEND_IP + '/central/nurses', JSON.stringify([ mockedNurse, mockedNurse ]));

            const navigation = {
                getParam: jest.fn(key => mockedToken)
            }

            renderer.create(
                <GlobalScreen navigation={navigation}/>
            );

            expect( fetchMock.lastOptions() ).toEqual(expectedOptions); 
        });

        it("Catches a fetch error", async () => {
            const mockedToken = "VALUE";
            fetchMock.get(BACKEND_IP + '/central/nurses', 
                new Promise((res, rej) => rej("ERROR")),
                { overwriteRoutes: true });

            const navigation = {
                getParam: jest.fn( key => mockedToken ),
                navigate: jest.fn( name => {} )
            }

            const rendered = renderer.create(
                <GlobalScreen navigation={navigation}/>
            );

            await rendered.root._fiber.stateNode.componentDidMount()

            const renderedObj = rendered.root._fiber.stateNode;
            expect( renderedObj.state.error ).toBe(true);
        });
    });

    describe("View", () => {
        it("Shows 'Se ha producido un error...' when the fetch failed", async () => {
            
            fetchMock.get(BACKEND_IP + '/central/nurses', 
                new Promise((res, rej) => rej("ERROR")),
                { overwriteRoutes: true });

            const mockedToken = "VALUE";

            const navigation = {
                getParam: jest.fn( key => mockedToken ),
                navigate: jest.fn( name => {} )
            }

            const rendered = renderer.create(
                <GlobalScreen navigation={navigation}/>
            );

            await rendered.root._fiber.stateNode.componentDidMount()

            const loadingView = rendered.toJSON().children[0];
            const loadingText = loadingView.children[0];
            expect( loadingText ).toBe(" Se ha producido un error ");
            expect( rendered    ).toMatchSnapshot();
        });

        it("Shows Loading animation when the turns are not loaded", () => {
            const rendered = renderer.create(
                <GlobalScreen />
            ).toJSON();

            expect( rendered    ).toMatchSnapshot();
        });

        it("Shows everything when the turns are loaded", () => {
            const rendered = renderer.create(
                <GlobalScreen />
            )

            const renderedObj = rendered.root._fiber.stateNode;
            renderedObj.setState({
                usersLoaded: true,
                nurses: [ mockedNurse, mockedNurse ]
            });

            const titleView = rendered.toJSON().children[0];
            const titleText = titleView.children[0];
            expect( titleText         ).toBe("Turno de Febrero");
            expect( rendered.toJSON() ).toMatchSnapshot();
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