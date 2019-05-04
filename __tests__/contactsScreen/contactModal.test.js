import React from 'react';
import { Linking } from 'react-native';
import renderer from 'react-test-renderer';
import ContactModal from '../../components/contactsComponents/contactModal';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

describe("ContactModal", () => {
    describe("View", () => {
        const mockedContact = {
            name : "CONTACT_NAME",
            phone: "CONTACT_PHONE" 
        };

        it("Matches the Snapshot when is not visible", () => {
            const view = <ContactModal 
                isVisible = { false }
                contact   = { mockedContact }/>;
            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });

        it("Matches the Snapshot when is not visible", () => {
            const view = <ContactModal 
                isVisible = { true} 
                contact   = { mockedContact }/>;
            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });
    });
});

