import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../screens/homeScreen';
import fetchMock from 'fetch-mock';
import mockedNurse from '../mockedData/mockedNurse';
import { exportAllDeclaration } from '@babel/types';
import { BACKEND_IP } from '../config';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

// Simulating the Date so we can indicate the expected
// output
const fixedDate = new Date('2019-02-26T09:39:59');

Date = class extends Date {
    constructor() {
        super();
        return fixedDate;
    }
};

describe("HomeScreen tests", () => {
    describe("ComponentDidMount", () => {


        it("Calls to fetch", async () => {
            const mockedToken = "VALUE";
            const expectedOptions = { 
                method: 'POST',
                headers:
                { Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': mockedToken } 
                }
            fetchMock.post(BACKEND_IP + '/auth/me', JSON.stringify({}));
            const navigation = {
                getParam: jest.fn(key => mockedToken)
            }

            const rendered = renderer.create(
                <HomeScreen navigation={navigation}/>
            );

            expect(fetchMock.lastOptions()).toEqual(expectedOptions);
            
        });
    });

    describe("View", () => {
        it("Shows 'Cargando...' when the user is not loaded", () => {
            const rendered = renderer.create(
                <HomeScreen />
            ).toJSON();

            const loadingView = rendered.children[0];
            const loadingText = loadingView.children[0];
            expect(loadingText).toBe(" Cargando... ");
            expect(rendered).toMatchSnapshot();
        });

        it("Shows everything when the user is loaded", () => {
            const rendered = renderer.create(
                <HomeScreen />
            )

            const renderedObj = rendered.root._fiber.stateNode;
            renderedObj.setState({
                userLoaded: true,
                user: mockedNurse
            });

            const titleView = rendered.toJSON().children[0];
            const titleText = titleView.children[0].children[0];
            expect(titleText).toBe("Mi turno de Febrero");
            expect(rendered.toJSON()).toMatchSnapshot();

        });
    })


});