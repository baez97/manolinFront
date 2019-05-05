import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../../screens/loginScreen';
import { Font } from 'expo';
import deviceStorage from '../../components/deviceStorage';
import { StackActions } from 'react-navigation';
import fetchToAPI from '../../components/fetchToAPI';


jest.mock('../../components/deviceStorage')
jest.mock('../../components/fetchToAPI');
jest.unmock("react-navigation")
jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

function simulatePress(renderedObject) {
    renderedObject
        .props
        .onStartShouldSetResponder
        .__reactBoundContext
        .props
        .onPress();
}

describe("LoginScreen", () => {

    Font.loadAsync = jest.fn();

    describe("ComponentDidMount", () => {

        it("Loads the fonts", async () => {
            // MOCKING THE loadAsync FUNCTION
            // THAT SHOULD BE CALLED
            const mockedFn = jest.fn();
            Font.loadAsync = mockedFn;

            // FORCING THE COMPONENT TO MOUNT
            // SO THE FUNCTION IS CALLED
            await renderer.create(<LoginScreen/>);
            expect( mockedFn ).toBeCalled();
        });

        it("Calls to setState", async () => {
            // MOCKING THE loadAsync FUNCTION
            // THAT SHOULD BE CALLED
            const mockedFn = jest.fn();
            
            const l = new LoginScreen();
            l.setState = mockedFn;
            await l.componentDidMount();

            expect( mockedFn ).toBeCalled();
        });
    });

    describe("Functions", () => {
        it("SetPassword", () => {
            const l = new LoginScreen();
            l.setState = jest.fn();
            l.setPassword("mockedPassword");

            expect( l.setState ).toBeCalledWith({password: "mockedPassword"});
        });

        it("SetUsername", () => {
            const l = new LoginScreen();
            l.setState = jest.fn();
            l.setUsername("mockedUsername");

            expect( l.setState ).toBeCalledWith({username: "mockedUsername"});
        });

        describe("TestInput", () => {
            const l = new LoginScreen();

            it("Calls to ShowWarning when the name is undefined", () =>  {
                // EXPECTED OUTPUT
                const expectedOutput = false;
                // EXPECTED ARGS THAT THE FUNCTION
                // SHOULD RECEIVE
                const expectedArgs = {
                    title   : "Nombre vacío",
                    message : "Debes introducir el nombre para continuar"
                }

                // FUNCTION THAT SHOULD BE CALLED
                const mockedFn = jest.fn();
                l.showWarning  = mockedFn;

                // MOCKED DATA THAT SHOULD PRODUCE
                // A CALL TO THE FUNCTION
                l.state = {
                    username : undefined,
                    password : undefined,
                }

                // TESTED METHOD
                const actualOutput = l.testInput();

                // ASSERTIONS
                expect( actualOutput ).toBe(expectedOutput)
                expect( mockedFn     ).toBeCalled();
                expect( mockedFn     ).toBeCalledWith(expectedArgs);
            });

            it("Calls to ShowWarning when the name is empty", () =>  {
                // EXPECTED OUTPUT
                const expectedOutput = false;
                // EXPECTED ARGS THAT THE FUNCTION
                // SHOULD RECEIVE
                const expectedArgs = {
                    title   : "Nombre vacío",
                    message : "Debes introducir el nombre para continuar"
                }

                // FUNCTION THAT SHOULD BE CALLED
                const mockedFn = jest.fn();
                l.showWarning  = mockedFn;

                // MOCKED DATA THAT SHOULD PRODUCE
                // A CALL TO THE FUNCTION
                l.state = {
                    username : "",
                    password : undefined,
                }

                // TESTED METHOD
                const actualOutput = l.testInput();

                // ASSERTIONS
                expect( actualOutput ).toBe(expectedOutput)
                expect( mockedFn     ).toBeCalled();
                expect( mockedFn     ).toBeCalledWith(expectedArgs);
            });

            it("Calls to ShowWarning when the password is undefined", () =>  {
                // EXPECTED OUTPUT
                const expectedOutput = false;
                // EXPECTED ARGS THAT THE FUNCTION
                // SHOULD RECEIVE
                const expectedArgs = {
                    title   : "Contraseña vacía",
                    message : "Debes introducir la contraseña para continuar"
                }

                // FUNCTION THAT SHOULD BE CALLED
                const mockedFn = jest.fn();
                l.showWarning  = mockedFn;

                // MOCKED DATA THAT SHOULD PRODUCE
                // A CALL TO THE FUNCTION
                l.state = {
                    username : "A",
                    password : undefined,
                }

                // TESTED METHOD
                const actualOutput = l.testInput();

                // ASSERTIONS
                expect( actualOutput ).toBe(expectedOutput)
                expect( mockedFn     ).toBeCalled();
                expect( mockedFn     ).toBeCalledWith(expectedArgs);
            });

            it("Calls to ShowWarning when the password is undefined", () =>  {
                // EXPECTED OUTPUT
                const expectedOutput = false;
                // EXPECTED ARGS THAT THE FUNCTION
                // SHOULD RECEIVE
                const expectedArgs = {
                    title   : "Contraseña vacía",
                    message : "Debes introducir la contraseña para continuar"
                }

                // FUNCTION THAT SHOULD BE CALLED
                const mockedFn = jest.fn();
                l.showWarning  = mockedFn;

                // MOCKED DATA THAT SHOULD PRODUCE
                // A CALL TO THE FUNCTION
                l.state = {
                    username : "A",
                    password : "",
                }

                // TESTED METHOD
                const actualOutput = l.testInput();

                // ASSERTIONS
                expect( actualOutput ).toBe(expectedOutput)
                expect( mockedFn     ).toBeCalled();
                expect( mockedFn     ).toBeCalledWith(expectedArgs);
            });

            it("Returns true if username and password are fulfilled", () => {
                // EXPECTED OUTPUT
                const expectedOutput = true;

                // CORRECT STATE THAT PRODUCES A TRUE
                // IN THE TESTED METHOD
                l.state = {
                    username : "NAME",
                    password : "PASSWORD",
                }

                // CALL TO THE TESTED METHOD
                const actualOutput = l.testInput();

                //ASSERTIONS
                expect( actualOutput ).toBe(expectedOutput);
            });
        });

        describe("ShowError, ShowWarning and HideError", () => {
            const l         = new LoginScreen();
            const mockedFn  = jest.fn();
            const mockedTitle   = "TITLE";
            const mockedMessage = "MESSAGE";
            const mockedArgs = {
                title   : mockedTitle,
                message : mockedMessage
            }
            l.setState = mockedFn;

            it("ShowError calls to setState with the expected arguments", () => {
                const expectedArgs = {
                    error        : true,
                    errorMessage : mockedMessage,
                    errorTitle   : mockedTitle,
                    errorType    : "danger"
                }
                l.showError(mockedArgs);
                expect(mockedFn).toBeCalled();
                expect(mockedFn).toBeCalledWith(expectedArgs);
            });

            it("ShowWarning calls to setState with the expected arguments", () => {
                const expectedArgs = {
                    error        : true,
                    errorMessage : mockedMessage,
                    errorTitle   : mockedTitle,
                    errorType    : "warning"
                }
                l.showWarning(mockedArgs);
                expect(mockedFn).toBeCalled();
                expect(mockedFn).toBeCalledWith(expectedArgs);
            });

            it("HideError calls to setState with the expected arguments", () => {
                const expectedArgs = {
                    error        : false,
                    errorTitle   : "",
                    errorMessage : ""
                }
                l.hideError();
                expect(mockedFn).toBeCalled();
                expect(mockedFn).toBeCalledWith(expectedArgs);
            });
        });

        describe("CheckToken", () => {
            it("Calls to loadJWT", async () => {
                // deviceStorage.loadJWT.mockReturnValueOnce(
                //     new Promise((res, rej) => res(false))
                // );
                const l = new LoginScreen();
                await l.checkToken();
                expect( deviceStorage.loadJWT ).toBeCalled();
            });

            it("Does not navigate to homeScreen if the token is not found", async () => {
                const mockedFn = jest.fn();

                deviceStorage.loadJWT.mockReturnValueOnce(
                    new Promise((res, rej) => res(false))
                );

                const l = new LoginScreen();
                l.goToHomeScreen = mockedFn;
                await l.checkToken();
                expect( mockedFn ).not.toBeCalled();
            });

            it("Does not navigate to HomeScreen it the token is not valid", async () => {
                const mockedFn = jest.fn();

                const l = new LoginScreen();

                l.fetchToAPI = jest.fn();
                l.fetchToAPI.mockReturnValueOnce(
                    new Promise((res, rej) => {
                        res({json: () => ({})})
                    }));

                l.goToHomeScreen = mockedFn;
                await l.checkToken();
                expect( mockedFn ).not.toBeCalled();
            });

            it("Navigates to HomeScreen if the token is valid", async () => {
                const mockedFn = jest.fn(() => {called = true});
                const l = new LoginScreen();

                deviceStorage.loadJWT.mockReturnValueOnce(
                    new Promise((res, rej) => res("Token"))
                );

                fetchToAPI.mockReturnValueOnce(
                    new Promise((res, rej) => {
                        res({json: () => ({name:"HOLA"})})
                    }));

                l.goToHomeScreen = mockedFn;
                await l.checkToken();
                expect( mockedFn ).toBeCalled();
            });
        });

        describe("GoToHomeScreen", () => {
            it("Dispatches an action", () => {
                const mockedDispatch = jest.fn();
                const mockedReset    = jest.fn();
                StackActions.reset = mockedReset;
                const mockedProps = {
                    navigation: {
                        dispatch: mockedDispatch
                    }
                }

                const l = new LoginScreen(mockedProps);
                l.goToHomeScreen();
                expect( mockedReset    ).toBeCalled();
                expect( mockedDispatch ).toBeCalled();
            });
        });

        describe("loginPressed", () => {
            const l = new LoginScreen();
            l.state = {
                username: "A",
                password: "B"
            }
            l.goToHomeScreen = jest.fn();

            it("Does nothing when testInput returns false", async () => {
                const l2 = new LoginScreen();
                l2.testInput = jest.fn(() => false);

                l2.showError  = jest.fn();
                l2.fetchToAPI = jest.fn();

                await l2.loginPressed();

                expect( l2.showError  ).not.toBeCalled();
            });

            it("Shows an error if the username is not correct", async () => {
                const expectedArgs = {
                    title   : "Usuario incorrecto", 
                    message : "La usuario que has introducido no es correcto"
                };

                l.showError = jest.fn();
                fetchToAPI.mockReturnValueOnce(
                    new Promise((res, rej) => {
                        res({ json: () => ({ userError: true }) })
                    })
                );

                await l.loginPressed();

                expect(l.showError).toBeCalled();
                expect(l.showError).toBeCalledWith(expectedArgs);
            });

            it("Shows an error if the password is not correct", async () => {
                const expectedArgs = {
                    title   : "Contraseña incorrecta", 
                    message : "La contraseña que has introducido no es correcta"
                };

                l.showError = jest.fn();
                fetchToAPI.mockReturnValueOnce(
                    new Promise((res, rej) => {
                        res({ json: () => ({passwordError: true }) })
                    })
                );

                await l.loginPressed();

                expect(l.showError).toBeCalled();
                expect(l.showError).toBeCalledWith(expectedArgs);
            });

            it("Shows an error if there is no connection", async () => {
                var logScr = new LoginScreen();
                logScr.state = {
                    username: "A",
                    password: "B"
                };
                
                const expectedArgs = {
                    title: "Ha habido un error",
                    message: "No hay Internet"
                };

                logScr.showError = jest.fn();
                fetchToAPI.mockReturnValueOnce(
                    new Promise((res, rej) => {
                        throw { message: "Network request failed" }
                    })
                );

                await logScr.loginPressed();

                expect(logScr.showError).toBeCalled();
                expect(logScr.showError).toBeCalledWith(expectedArgs);
            })

            it("Saves the token if everything went well", async () => {
                const mockedToken = "TOKEN"
                fetchToAPI.mockReturnValueOnce(
                    new Promise((res, rej) => {
                        res({ json: () => ({ 
                            userError: false,
                            passwordError: false,
                            token: mockedToken }) 
                        })
                    })
                );

                await l.loginPressed();

                const expectedFn = deviceStorage.saveJWT;

                expect( expectedFn ).toBeCalled();
                expect( expectedFn ).toBeCalledWith(mockedToken, "A");
            });

            it("Calls to GoHomeScreen if everything went well", async () => {
                const mockedToken = "TOKEN"
                fetchToAPI.mockReturnValueOnce(
                    new Promise((res, rej) => {
                        res({ json: () => ({ 
                            userError: false,
                            passwordError: false,
                            token: mockedToken }) 
                        })
                    })
                );

                await l.loginPressed();

                const expectedFn = l.goToHomeScreen;

                expect( expectedFn ).toBeCalled();
                expect( expectedFn ).toBeCalledWith(mockedToken);
            });
        });
    });

    describe("Children", () => {
        // it("User input calls to SetState when changed", async() => {
        //     // MOCKING 
        //     const mockedSetState = jest.fn();
        //     const mockedText     = "username_text";
        //     const mockedArgs     = { username: mockedText };

        //     // RENDERING
        //     const view = <LoginScreen />
        //     const rendered = renderer.create(view);
        //     const renderedObj = rendered.root._fiber.stateNode;
        //     renderedObj.setState({ fontLoaded: true });
        //     renderedObj.setState = mockedSetState;
        //     const renderedJson = rendered.toJSON();

        //     console.log(renderedJson.children[0].children[0].children[1]);

        //     // OBTAINING THE TESTED FUNCTION
        //     const modal     = renderedJson.children[0];
        //     const userForm  = modal.children[0];
        //     const userInput = userForm.children[1];
        //     const testedFn  = userInput.props.onChangeText;

        //     // EXECUTING THE TESTED FUNCTION
        //     testedFn(mockedText);
        //     expect( mockedSetState ).toBeCalled();
        //     expect( mockedSetState ).toBeCalledWith(mockedArgs);
        // });

        // it("Password input calls to SetState when changed", async() => {
        //     // MOCKING 
        //     const mockedSetState = jest.fn();
        //     const mockedText     = "password_text";
        //     const mockedArgs     = { password: mockedText };

        //     // RENDERING
        //     const view = <LoginScreen />
        //     const rendered = renderer.create(view);
        //     const renderedObj = rendered.root._fiber.stateNode;
        //     renderedObj.setState({ fontLoaded: true });
        //     renderedObj.setState = mockedSetState;
        //     const renderedJson = rendered.toJSON();

        //     // OBTAINING THE TESTED FUNCTION
        //     const modal     = renderedJson.children[0];
        //     const passForm  = modal.children[1];
        //     const passInput = passForm.children[1];
        //     const testedFn  = passInput.props.onChangeText;

        //     // EXECUTING THE TESTED FUNCTION
        //     testedFn(mockedText);
        //     expect( mockedSetState ).toBeCalled();
        //     expect( mockedSetState ).toBeCalledWith(mockedArgs);
        // });

        // it("Login Button calls to SetState when changed", async() => {
        //     // MOCKING 
        //     const mockedLogin = jest.fn();

        //     // RENDERING
        //     const view = <LoginScreen />
        //     const rendered = renderer.create(view);
        //     const renderedObj = rendered.root._fiber.stateNode;
        //     renderedObj.setState({ fontLoaded: true });
        //     renderedObj.loginPressed = mockedLogin;
        //     const renderedJson = rendered.toJSON();

        //     // OBTAINING THE TESTED FUNCTION
        //     const modal     = renderedJson.children[0];
        //     const loginButton  = modal.children[2];
        //     simulatePress(loginButton);

        //     // EXECUTING THE TESTED FUNCTION
        //     expect( mockedLogin ).toBeCalled();
        // });
    });

    describe("View", () => {
        it("Matches the Loading Snapshot", () => {
            const rendered = renderer.create(<LoginScreen />);
            const renderedJson = rendered.toJSON();

            // WHEN THE EXPECT IS DONE, THE FONTS ARE
            // NOT LOADED YET SO IT SHOWS THE 
            // LOADING VIEW...
            expect( renderedJson ).toMatchSnapshot();
        });
        
        it("Matches the Loaded Snapshot", async () => {
            const rendered = await renderer.create(<LoginScreen />);
            const renderedObj = rendered.root._fiber.stateNode;

            // THE FONTLOADED IS FORCED SO IT SHOWS THE
            // NORMAL VIEW
            renderedObj.setState({ fontLoaded: true });

            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });
    });
});