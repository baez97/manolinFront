import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../../screens/homeScreen';
import fetchMock from 'fetch-mock';
import mockedNurse from '../../mockedData/mockedNurse';
import { BACKEND_IP } from '../../config';
import fetchToAPI from '../../components/fetchToAPI';
import registerForPush from '../../components/registerForPush';
import SocketIOClient from 'socket.io-client';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

jest.mock('../../components/homeComponents/changes/changesQueue');
jest.mock('../../components/homeComponents/askChangeModal');
jest.mock('../../components/dateUtils');
jest.mock("../../components/fetchToAPI");
jest.mock("../../components/registerForPush");
jest.mock("socket.io-client")


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

    describe("Button methods", () => {
        const mockedFn = jest.fn();
        const props = {
            navigation: {
                navigate: mockedFn,
                getParam: () => {}
            },
        };

        const h = new HomeScreen({navigation: props.navigation});
        h.setState = jest.fn();
        h.loadTurns = jest.fn();
        h.state = { user: { name: "mockedName" } };

        it("globalButtonPressed calls to navigate", () => {
            h.globalButtonPressed();
            expect( mockedFn ).toBeCalled();
        });

        it("myChangesButtonPressed calls to navigate if $changes is defined", () => {
            h.props.navigation.navigate = jest.fn();
            h.state = { ...h.state, changes: "definedChange" };
            h.myChangesButtonPressed();
            expect( h.props.navigation.navigate ).toBeCalled();
        });
        
        it("myChangesButtonPressed does nothing if $changes is undefined", () => {
            h.props.navigation.navigate = jest.fn();
            h.state = { ...h.state, changes: undefined };
            h.myChangesButtonPressed();
            expect( h.props.navigation.navigate ).not.toBeCalled();
        });

        it("contactsButtonPressed calls to navigate",  () => {
            h.contactsButtonPressed();
            expect( mockedFn ).toBeCalled();
        });
    });

    describe("ComponentDidMount", () => {
        const mockedFn = jest.fn();
        const props = {
            navigation: {
                navigate: mockedFn,
                getParam: () => {}
            },
        }

        const h = new HomeScreen({navigation: props.navigation});
        h.setState = jest.fn();
        h.state = { user: { name: "mockedName" } };

        it("Calls to loadTurns", () => {
            h.loadTurns = jest.fn();
            h.componentDidMount();
            expect(h.loadTurns).toBeCalled();
        });
    });


    describe("LoadTurns", () => {
        const mockedFn = jest.fn();
        const props = {
            navigation: {
                navigate: mockedFn,
                getParam: () => {}
            },
        }

        it("Calls to setState if the token is defined", async () => {
            fetchToAPI.mockReturnValueOnce( new Promise((res,rej) => {
                res({json: () => ({token: "DEFINED_TOKEN"})});
            }));
            const h = new HomeScreen({navigation: props.navigation});
            h.setState = jest.fn();
            
            await h.loadTurns();
            expect( registerForPush ).not.toBeCalled();
            expect( h.setState ).toBeCalled();
        });

        it("Calls to registerForPush if the token is undefined", async () => {
            const h = new HomeScreen({navigation: props.navigation});
            h.setState = jest.fn();
            fetchToAPI.mockReturnValueOnce( new Promise((res,rej) => {
                res({json: () => ({token: undefined})});
            }));
            
            await h.loadTurns();
            expect( registerForPush ).toBeCalled();
        });

        it("Catches the error of registerForPush", async () => {
            const h = new HomeScreen({navigation: props.navigation});
            h.setState = jest.fn();
            fetchToAPI.mockReturnValueOnce( new Promise((res,rej) => {
                res({json: () => ({token: undefined})});
            }));

            registerForPush.mockReturnValueOnce( new Promise((res, rej) => {
                throw Error("error");
            }))
            
            await h.loadTurns();
            expect( registerForPush ).toBeCalled();
        });
    });

    it("Constructor creates the socket entryPoint", () => {
        const mockedFn = jest.fn((chain, callback) => {
            callback();
        });

        const mockedNav = {
            getParam: jest.fn()
        }

        SocketIOClient.mockReturnValueOnce(
            { on: mockedFn }
        );
        const view = <HomeScreen navigation={mockedNav} token="TOKEN"/>
        renderer.create(view);
        expect( mockedFn ).toBeCalled();
    });

    describe("Add methods", () => {
        const mockedFn = jest.fn();
        const props = {
            navigation: {
                navigate: mockedFn,
                getParam: () => {}
            },
        }

        const h = new HomeScreen(props);
        h.state = { user: { name: "mockedName"}};
        h.toggleModal = jest.fn();
        h.showConfirmation = jest.fn();

        it("AddFree method works properly", () => {
            h.socket.emit = jest.fn();
            h.toggleModal = jest.fn();
            h.showConfirmation = jest.fn();

            h.addFree({});
            
            expect( h.socket.emit      ).toBeCalled();
            expect( h.toggleModal      ).toBeCalled();
            expect( h.showConfirmation ).toBeCalled();
        });

        it("AddChange method works properly", () => {
            h.socket.emit = jest.fn();
            h.toggleModal = jest.fn();
            h.showConfirmation = jest.fn();
            h.addChange({});
            
            expect( h.socket.emit      ).toBeCalled();
            expect( h.toggleModal      ).toBeCalled();
            expect( h.showConfirmation ).toBeCalled();
        });
    });

    describe("Methods", () => {
        const mockedFn = jest.fn();
        const props = {
            navigation: {
                navigate: mockedFn,
                getParam: () => {}
            },
        }
        const h = new HomeScreen({navigation: props.navigation});
        h.state = { user: { name: "mockedName"} }; 
        h.setState = jest.fn();

        it("SetChanges calls to SetState", () => {
            h.setState = jest.fn();

            h.setChanges();
            
            expect( h.setState ).toBeCalled();
        });

        it("AcceptFree calls to socket.emit and showConfirmation", () => {
            const hAux = new HomeScreen({navigation: props.navigation});
            hAux.state = { user: { name: "mockedName"} };
            hAux.setState = jest.fn();

            hAux.showConfirmation = jest.fn();
            hAux.acceptFree();

            expect( hAux.socket.emit      ).toBeCalled();
            expect( hAux.showConfirmation ).toBeCalled();
        });

        it("ShowConfirmation sets the state", () => {
            h.setState = jest.fn();
            h.showConfirmation();
            expect( h.setState ).toBeCalled();
        });

        it("ShowAreYouSureFree sets the state", () => {
            h.setState = jest.fn();
            h.showAreYouSureFree({});
            expect( h.setState ).toBeCalled();
        });

        it("AcceptAreYouSure calls the corresponding methods", () => {
            h.socket.emit = jest.fn();
            h.hideAreYouSure = jest.fn();
            h.showConfirmation = jest.fn();

            h.acceptAreYouSure({});

            expect( h.socket.emit ).toBeCalled();
            expect( h.hideAreYouSure ).toBeCalled();
            expect( h.showConfirmation ).toBeCalled();
        });

        it("HideAreYouSure sets the state", () => {
            const hAux = new HomeScreen(props);
            hAux.setState = jest.fn();

            hAux.hideAreYouSure();

            expect( hAux.setState ).toBeCalled();
        });

        it("GoToChooseChange calls to navigate", () => {
            h.props.navigation = { navigate: jest.fn()};

            h.goToChooseChange();

            expect( h.props.navigation.navigate ).toBeCalled();
        });

        it("CloseConfirmModal sets the state", () => {
            h.setState = jest.fn();

            h.closeConfirmModal();

            expect( h.setState ).toBeCalled();
        });

        it("ToggleModal sets the state", () => {
            h.setState = jest.fn();

            h.toggleModal();

            expect( h.setState ).toBeCalled();
        });

        it("SelectTurn toggles the modal", () => {
            h.toggleModal = jest.fn();

            h.selectTurn();

            expect( h.toggleModal ).toBeCalled();
        });

        it("MyChangesButtonPressed calls to navigate if $change is defined", () => {
            h.props.navigation.navigate = jest.fn();
            h.state = { change: "definedChange" };

            h.myChangesButtonPressed();
        });
    });
    //     // const mockedToken = "VALUE";
    //     // const expectedOptions = { 
    //     //     method: 'POST',
    //     //     headers:
    //     //     { Accept: 'application/json',
    //     //         'Content-Type': 'application/json',
    //     //         'x-access-token': mockedToken } 
    //     //     }
    //     // fetchMock.post(BACKEND_IP + '/auth/me', JSON.stringify({}));
    //     // fetchMock.get(BACKEND_IP + '/central/changes', JSON.stringify({}));
    //     // const navigation = {
    //     //     getParam: jest.fn(key => mockedToken)
    //     // }

    //     // renderer.create(
    //     //     <HomeScreen navigation={navigation}/>
    //     // );

    //     // expect( fetchMock.lastOptions() ).toEqual(expectedOptions); 
    // // })

    //     // it("Calls to fetch", async () => {
            
    //     // });

    // //     it("Catches a fetch error", async () => {
    // //         const mockedToken = "VALUE";
    // //         fetchMock.post(BACKEND_IP + '/auth/me', 
    // //             new Promise((res, rej) => rej("ERROR")),
    // //             { overwriteRoutes: true });

    // //         const navigation = {
    // //             getParam: jest.fn( key => mockedToken ),
    // //             navigate: jest.fn( name => {} )
    // //         }

    // //         const rendered = renderer.create(
    // //             <HomeScreen navigation={navigation}/>
    // //         );

    // //         await rendered.root._fiber.stateNode.componentDidMount()

    // //         const renderedObj = rendered.root._fiber.stateNode;
    // //         expect( renderedObj.state.error ).toBe(true);
    // //     });

    // // describe("Buttons", () => {
    // //     const mockedToken = "VALUE";

    // //     const navigation = {
    // //         getParam: jest.fn( key => mockedToken ),
    // //         navigate: jest.fn( name => {} )
    // //     }

    // //     it("GlobalButton calls to the corresponding function", () => {
    // //         // New instance of HomeScreen
    // //         const h = new HomeScreen({navigation});
    // //         const mockedFn = jest.fn();

    // //         // Mocking the called function so the number
    // //         // of calls is controlled
    // //         h.globalButtonPressed = mockedFn;

    // //         // Forcing the view to show the buttons
    // //         // (Not shown until userLoaded is true)
    // //         h.state = {
    // //             userLoaded: true,
    // //             user: mockedNurse
    // //         }

    // //         // Obtaining the button from the children collection
    // //         const viewObj = h.render();
    // //         const globalButton = viewObj.props.children[1];

    // //         // Simulating the press
    // //         simulatePress(globalButton);

    // //         // Assertion
    // //         expect( mockedFn ).toBeCalled();
    // //     });

    // //     it("MyChanges button calls to the corresponding function ", () => {
    // //         // New instance of HomeScreen
    // //         const h = new HomeScreen({navigation});
    // //         const mockedFn = jest.fn();

    // //         // Mocking the called function so the number
    // //         // of calls is controlled
    // //         h.myChangesButtonPressed = mockedFn;

    // //         // Forcing the view to show the buttons
    // //         // (Not shown until userLoaded is true)
    // //         h.state = {
    // //             userLoaded: true,
    // //             user: mockedNurse
    // //         }

    // //         // Obtaining the button from the children collection
    // //         const viewObj = h.render();
    // //         const myChangesButton = viewObj.props.children[2].props.children[0];

    // //         // Simulating the press
    // //         simulatePress(myChangesButton);

    // //         // Assertion
    // //         expect( mockedFn ).toBeCalled();
    // //     });

    // //     it("Contacts button calls to the corresponding function ", () => {
    // //         // New instance of HomeScreen
    // //         const h = new HomeScreen({navigation});
    // //         const mockedFn = jest.fn();

    // //         // Mocking the called function so the number
    // //         // of calls is controlled
    // //         h.contactsButtonPressed = mockedFn;

    // //         // Forcing the view to show the buttons
    // //         // (Not shown until userLoaded is true)
    // //         h.state = {
    // //             userLoaded: true,
    // //             user: mockedNurse
    // //         }

    // //         // Obtaining the button from the children collection
    // //         const viewObj = h.render();
    // //         const contactsButton = viewObj.props.children[2].props.children[1];

    // //         // Simulating the press
    // //         simulatePress(contactsButton);

    // //         // Assertion
    // //         expect( mockedFn ).toBeCalled();
    // //     });
    // // })

    describe("View", () => {
        it("Shows 'Se ha producido un error...' when the fetch failed", async () => {
            
            fetchToAPI.mockReturnValueOnce(
                new Promise((res, rej) => rej("ERROR"))
            );

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
    });
});