import React from 'react';
import { Linking } from 'react-native';
import renderer from 'react-test-renderer';
import ContactCard from '../../components/contactsComponents/contactCard';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

describe("ContactCard", () => {
    describe("Methods", () => {
        const props = {
            contact: {
                name:"CONTACT_NAME",
                phone:"CONTACT_PHONE"
            },

            onPressFn: jest.fn()
        }
        Linking.openURL = jest.fn();

        const c = new ContactCard(props);

        it("HandleLongPress calls to Linking", () => {
            c.handleLongPress();

            expect( Linking.openURL ).toBeCalled();
        });

        it("HandlePress calls to the props OnPressFn function", () => {
            c.handlePress();

            expect( props.onPressFn ).toBeCalled();
            expect( props.onPressFn ).toBeCalledWith(props.contact)
        });
    });

    describe("View", () => {
        it("Matches the Snapshot", () => {
            const contact = {
                name: "CONTACT_NAME",
                phone: "CONTACT_PHONE"
            };

            const view = <ContactCard contact={ contact }/>;
            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });
    });
});