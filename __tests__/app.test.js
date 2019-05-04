import React from 'react';
import renderer from 'react-test-renderer';
import { Font } from 'expo';
import App from '../App';
import deviceStorage from '../components/deviceStorage'
import { StackActions } from 'react-navigation';
import fetchToAPI from '../components/fetchToAPI';
import { createStackNavigator } from 'react-navigation';


jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

jest.mock("../components/deviceStorage");
jest.mock("../components/fetchToAPI");
jest.mock("react-navigation");

describe("App", () => {

    it("ComponentDidMount works properly", async () => {
        Font.loadAsync = jest.fn();
        const app = new App();
        app.checkToken = jest.fn();
        app.setState   = jest.fn();

        await app.componentDidMount();

        expect( Font.loadAsync ).toBeCalled();
        expect( app.checkToken ).toBeCalled();
        expect( app.setState   ).toBeCalled();
    });

    describe("CheckToken", () => {
        it("Guides to LoginScreen if the token was not found", async () => {
            deviceStorage.loadJWT.mockReturnValueOnce(
                new Promise((res, rej) => {
                    res(false);
                })
            );

            const app = new App();
            app.setState = jest.fn();
            await app.checkToken();
            
            expect( app.initialRouteName ).toBe("LoginScreen");
            expect( app.setState         ).toBeCalledWith({tokenLoaded: true});
        });

        it("Guides to LoginScreen if the token was not valid", async () => {
            deviceStorage.loadJWT.mockReturnValueOnce(
                new Promise((res, rej) => {
                    res("INVALID_TOKEN");
                })
            );

            fetchToAPI.mockReturnValueOnce(
                new Promise((res, rej) => {
                    res({json: () => ({ auth: false })})
                })
            );

            const app = new App();
            app.setState = jest.fn();
            await app.checkToken();
            
            expect( app.initialRouteName ).toBe("LoginScreen");
            expect( app.setState         ).toBeCalledWith({tokenLoaded: true});

        });

        it("Guides to LoginScreen if the answer is unexpected", async () => {
            deviceStorage.loadJWT.mockReturnValueOnce(
                new Promise((res, rej) => {
                    res("VALID_TOKEN");
                })
            );

            fetchToAPI.mockReturnValueOnce(
                new Promise((res, rej) => {
                    res({json: () => ({ name: undefined })})
                })
            );

            const app = new App();
            app.setState = jest.fn();
            await app.checkToken();
            
            expect( app.initialRouteName ).toBe("LoginScreen");
            expect( app.setState         ).toBeCalledWith({tokenLoaded: true});
        });

        it("Guides to HomeScreen if the token is valid", async () => {
            deviceStorage.loadJWT.mockReturnValueOnce(
                new Promise((res, rej) => {
                    res("VALID_TOKEN");
                })
            );

            fetchToAPI.mockReturnValueOnce(
                new Promise((res, rej) => {
                    res({json: () => ({ name: "VALID_NAME" })})
                })
            );

            const app = new App();
            app.setState = jest.fn();
            await app.checkToken();
            
            expect( app.initialRouteName ).toBe("HomeScreen");
            expect( app.savedToken       ).toBe("VALID_TOKEN");
        });
    });

    describe("Render method", () => {
        it("Does not create the Stack Navigator if the font is not loaded", () => {
            const app       = new App();
            app.state.fontLoaded  = false;
            app.state.tokenLoaded = true;
    
            // createStackNavigator = jest.fn();
    
            app.render();
    
            expect( createStackNavigator ).not.toBeCalled();
        });

        it("Does not create the Stack Navigator if the token is not loaded", () => {
            const app       = new App();
            app.state.fontLoaded  = true;
            app.state.tokenLoaded = false;
    
            // createStackNavigator = jest.fn();
    
            app.render();
    
            expect( createStackNavigator ).not.toBeCalled();
        });

        it("Creates the Stack Navigator if both were loaded", () => {
            const app       = new App();
            app.state = {
                fontLoaded: true,
                tokenLoaded: true
            };
    
            // createStackNavigator = jest.fn();
    
            app.render();
    
            expect( createStackNavigator ).toBeCalled();
        });
    });
});
