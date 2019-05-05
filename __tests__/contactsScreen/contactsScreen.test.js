import React from 'react';
import { Linking } from 'react-native';
import renderer from 'react-test-renderer';
import ContactsScreen from '../../screens/contactsScreen';
import ContactCard    from '../../components/contactsComponents/contactCard';
import fetchToAPI     from '../../components/fetchToAPI';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');
jest.mock("../../components/fetchToAPI")

describe("ContactsScreen", () => {
    describe("Functions", () => {

        it("Constructor calls to GetParam", () => {
            const mockedGetParam = jest.fn();
            const mockedProps = {
                navigation: {
                    getParam: mockedGetParam
                }
            }
    
            new ContactsScreen(mockedProps);
            
            expect( mockedGetParam ).toBeCalled();
        })
    
        it("ComponentDidMount calls to loadContacts", () => {
            const mockedGetParam = jest.fn();
            const mockedProps = {
                navigation: {
                    getParam: mockedGetParam
                }
            }
    
            const CS = new ContactsScreen(mockedProps);
            CS.loadContacts = jest.fn();
            
            CS.componentDidMount();
    
            expect( CS.loadContacts ).toBeCalled();
        });
    
        it("ShowModal calls to SetState", () => {
            const mockedGetParam = jest.fn();
            const mockedProps = {
                navigation: {
                    getParam: mockedGetParam
                }
            }
    
            const CS = new ContactsScreen(mockedProps);
            CS.setState = jest.fn();
            
            CS.showModal("MOCKED_CONTACT");
    
            expect( CS.setState ).toBeCalled();
        });

        it("HideModal calls to SetState", () => {
            mockedGetParam = jest.fn();
            const mockedProps = {
                navigation: {
                    getParam: mockedGetParam
                }
            }
    
            const CS = new ContactsScreen(mockedProps);
            CS.setState = jest.fn();
            
            CS.hideModal();
    
            expect( CS.setState ).toBeCalled();
        });

        it("KeyExtractor gets the id of the passed object", () => {
            mockedGetParam = jest.fn();
            const mockedProps = {
                navigation: {
                    getParam: mockedGetParam
                }
            }
    
            const CS = new ContactsScreen(mockedProps);
            const object = { _id: "MOCKED_ID" }
            const result = CS.keyExtractor(object);
    
            expect( result ).toBe("MOCKED_ID");
        });

        describe("RenderItem", () => {
            it("Returns null if the name is the same", () => {
                mockedGetParam = jest.fn(() => "Ana");
                const mockedProps = {
                    navigation: {
                        getParam: mockedGetParam
                    }
                }

                const CS = new ContactsScreen(mockedProps);
                const result = CS.renderItem({item: {name: "Ana"}});

                expect( result ).toBe(null); 
            });

            it("Returns a ContactCard if the name is not the same", () => {
                mockedGetParam = jest.fn(() => "María");
                const mockedProps = {
                    navigation: {
                        getParam: mockedGetParam
                    }
                }

                const CS = new ContactsScreen(mockedProps);
                const result = CS.renderItem({item: {name: "Ana"}});

                expect( result.type ).toBe(ContactCard); 
            });
        });

        describe("LoadContactd (fetch)", () => {
            mockedGetParam = jest.fn(() => "María");
            
            it("Catches a fetch error", async () => {
                const mockedProps = {
                    navigation: {
                        getParam: mockedGetParam
                    }
                }
    
                const CS = new ContactsScreen(mockedProps);

                fetchToAPI.mockReturnValueOnce(
                    new Promise((res, rej) => {
                        rej("ERROR");
                    })
                );
                
                CS.setState = jest.fn();

                await CS.loadContacts();

                expect(CS.setState).toBeCalledWith({error: true});
            });

            it("Throws an error if the APIRest returns it", async () => {
                const mockedProps = {
                    navigation: {
                        getParam: mockedGetParam
                    }
                }
    
                const CS = new ContactsScreen(mockedProps);

                fetchToAPI.mockReturnValueOnce(
                    new Promise((res, rej) => {
                        res({
                            json: () => ({err: true})
                        });
                    })
                );

                CS.setState = jest.fn();

                await CS.loadContacts();

                expect(CS.setState).toBeCalledWith({error: true});
            });

            it("Calls to SetState if everything was fine", async () => {
                const mockedProps = {
                    navigation: {
                        getParam: mockedGetParam
                    }
                }
    
                const CS = new ContactsScreen(mockedProps);

                fetchToAPI.mockReturnValueOnce(
                    new Promise((res, rej) => {
                        res({
                            json: () => ({err: false, result: "-"})
                        });
                    })
                );

                CS.setState = jest.fn();

                const expectedArgs = {
                    contacts: "-",
                    loaded: true
                }
                await CS.loadContacts();

                expect(CS.setState).toBeCalledWith(expectedArgs);
            });
        });
    });

    describe("View", () => {
        it("Matches the Snapshot when there is an error", () => {
            const mockedProps = {
                navigation: {
                    getParam: mockedGetParam
                }
            }

            const CS = new ContactsScreen(mockedProps);
            CS.state = { error: true };

            expect( CS.render() ).toMatchSnapshot();
        });

        it("Matches the Snapshot when it is loading", () => {
            const mockedProps = {
                navigation: {
                    getParam: mockedGetParam
                }
            }

            const CS = new ContactsScreen(mockedProps);
            CS.state = { loading: true };

            expect( CS.render() ).toMatchSnapshot();
        });

        it("Matches the Snapshot when contacts were loaded", () => {
            const mockedContacts = [
                {
                    name: "Ana",
                    phone: "MOCKED_PHONE_1"
                },
                {
                    name: "María",
                    phone: "MOCKED_PHONE_2"
                }
            ];

            const mockedProps = {
                navigation: {
                    getParam: mockedGetParam
                }
            }

            const CS = new ContactsScreen(mockedProps);
            CS.state = { loaded: true, contacts: mockedContacts };

            expect( CS.render() ).toMatchSnapshot();
        });
    });
});