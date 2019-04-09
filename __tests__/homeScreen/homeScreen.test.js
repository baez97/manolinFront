import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../../screens/homeScreen';
import fetchMock from 'fetch-mock';
import mockedNurse from '../../mockedData/mockedNurse';
// import ChangesQueue from '../../components/homeComponents/changes/changesQueue';
import { BACKEND_IP } from '../../config';

jest.mock('../../components/homeComponents/changes/changesQueue');
jest.mock('../../components/homeComponents/askChangeModal');
jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');
jest.mock('../../components/dateUtils')


// Simulating the Date so we can indicate the expected
// output
const fixedDate = new Date('2019-02-26T09:39:59');

function simulatePress(buttonObj) {
    buttonObj.props.onPressFn()
}

Date = class extends Date {
    constructor() {
        super();
        return fixedDate;
    }
};

describe("HomeScreen tests", () => {

    describe("Functions", () => {

        it("globalButtonPressed function", () => {
            const mockedFn = jest.fn();
            const props = {
                navigation: {
                    navigate: mockedFn,
                    getParam: () => {}
                }
            }
            const h = new HomeScreen({navigation: props.navigation});

            h.globalButtonPressed();
            expect(mockedFn).toBeCalled();
        });

        it("myChangesButtonPressed function", () => {
            const mockedFn = jest.fn();
            const props = {
                navigation: {
                    navigate: mockedFn,
                    getParam: () => {}
                }
            }
            const h = new HomeScreen({navigation: props.navigation});
            expect( h.myChangesButtonPressed   ).toBeDefined();
            expect( h.myChangesButtonPressed() ).toBeUndefined();
        });
        
        it("contactsButtonPressed function",  () => {
            const mockedFn = jest.fn();
            const props = {
                navigation: {
                    navigate: mockedFn,
                    getParam: () => {}
                }
            }
            const h = new HomeScreen({navigation: props.navigation});
            expect( h.contactsButtonPressed   ).toBeDefined();
            expect( h.contactsButtonPressed() ).toBeUndefined();
        });
    });

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
            fetchMock.get(BACKEND_IP + '/central/changes', JSON.stringify({}));
            const navigation = {
                getParam: jest.fn(key => mockedToken)
            }

            renderer.create(
                <HomeScreen navigation={navigation}/>
            );

            expect( fetchMock.lastOptions() ).toEqual(expectedOptions); 
        });

        it("Catches a fetch error", async () => {
            const mockedToken = "VALUE";
            fetchMock.post(BACKEND_IP + '/auth/me', 
                new Promise((res, rej) => rej("ERROR")),
                { overwriteRoutes: true });

            const navigation = {
                getParam: jest.fn( key => mockedToken ),
                navigate: jest.fn( name => {} )
            }

            const rendered = renderer.create(
                <HomeScreen navigation={navigation}/>
            );

            await rendered.root._fiber.stateNode.componentDidMount()

            const renderedObj = rendered.root._fiber.stateNode;
            expect( renderedObj.state.error ).toBe(true);
        });
    });

    describe("Buttons", () => {
        const mockedToken = "VALUE";

        const navigation = {
            getParam: jest.fn( key => mockedToken ),
            navigate: jest.fn( name => {} )
        }

        it("GlobalButton calls to the corresponding function", () => {
            // New instance of HomeScreen
            const h = new HomeScreen({navigation});
            const mockedFn = jest.fn();

            // Mocking the called function so the number
            // of calls is controlled
            h.globalButtonPressed = mockedFn;

            // Forcing the view to show the buttons
            // (Not shown until userLoaded is true)
            h.state = {
                userLoaded: true,
                user: mockedNurse
            }

            // Obtaining the button from the children collection
            const viewObj = h.render();
            const globalButton = viewObj.props.children[1];

            // Simulating the press
            simulatePress(globalButton);

            // Assertion
            expect( mockedFn ).toBeCalled();
        });

        it("MyChanges button calls to the corresponding function ", () => {
            // New instance of HomeScreen
            const h = new HomeScreen({navigation});
            const mockedFn = jest.fn();

            // Mocking the called function so the number
            // of calls is controlled
            h.myChangesButtonPressed = mockedFn;

            // Forcing the view to show the buttons
            // (Not shown until userLoaded is true)
            h.state = {
                userLoaded: true,
                user: mockedNurse
            }

            // Obtaining the button from the children collection
            const viewObj = h.render();
            const myChangesButton = viewObj.props.children[2].props.children[0];

            // Simulating the press
            simulatePress(myChangesButton);

            // Assertion
            expect( mockedFn ).toBeCalled();
        });

        it("Contacts button calls to the corresponding function ", () => {
            // New instance of HomeScreen
            const h = new HomeScreen({navigation});
            const mockedFn = jest.fn();

            // Mocking the called function so the number
            // of calls is controlled
            h.contactsButtonPressed = mockedFn;

            // Forcing the view to show the buttons
            // (Not shown until userLoaded is true)
            h.state = {
                userLoaded: true,
                user: mockedNurse
            }

            // Obtaining the button from the children collection
            const viewObj = h.render();
            const contactsButton = viewObj.props.children[2].props.children[1];

            // Simulating the press
            simulatePress(contactsButton);

            // Assertion
            expect( mockedFn ).toBeCalled();
        });
    })

    describe("View", () => {
        const mockedToken = "VALUE";

        const navigation = {
            getParam: jest.fn( key => mockedToken ),
            navigate: jest.fn( name => {} )
        }

        it("Shows 'Se ha producido un error...' when the fetch failed", async () => {
            
            fetchMock.post(BACKEND_IP + '/auth/me', 
                new Promise((res, rej) => rej("ERROR")),
                { overwriteRoutes: true });

            const mockedToken = "VALUE";

            const navigation = {
                getParam: jest.fn( key => mockedToken ),
                navigate: jest.fn( name => {} )
            }

            const rendered = renderer.create(
                <HomeScreen navigation={navigation}/>
            );

            await rendered.root._fiber.stateNode.componentDidMount()

            const loadingView = rendered.toJSON().children[0];
            const loadingText = loadingView.children[0];
            expect( loadingText ).toBe(" Se ha producido un error ");
            expect( rendered    ).toMatchSnapshot();
        });

        it("Shows 'Cargando...' when the user is not loaded", () => {

            const mockedToken = "VALUE";

            const navigation = {
                getParam: jest.fn( key => mockedToken ),
                navigate: jest.fn( name => {} )
            }

            const rendered = renderer.create(
                <HomeScreen navigation={navigation}/>
            ).toJSON();

            const loadingView = rendered.children[0];
            const loadingText = loadingView.children[0];
            expect( loadingText ).toBe(" Cargando... ");
            expect( rendered    ).toMatchSnapshot();
        });

        // it("Shows 'Cargando cambios...' when the changes are not loaded", () => {
        //     const expectedOutput = "Cargando cambios...";
        //     const rendered = renderer.create(
        //         <HomeScreen navigation={navigation}/>
        //     )

        //     const renderedObj = rendered.root._fiber.stateNode;
        //     renderedObj.setState({
        //         userLoaded: true,
        //         user: mockedNurse
        //     });

        //     const loadingView = rendered.toJSON().children[4];
        //     const loadingText = loadingView.children[0]
        //     expect( loadingText       ).toBe(expectedOutput);
        //     expect( rendered.toJSON() ).toMatchSnapshot();
        // });
    });
});