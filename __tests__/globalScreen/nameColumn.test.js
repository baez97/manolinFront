import React from 'react';
import renderer from 'react-test-renderer';
import NameColumn from '../../components/globalComponents/nameColumn';
import mockedNurse from '../../mockedData/mockedNurse';
import { Text } from 'react-native';

jest.mock("../../styles/layoutStyle")
jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

describe("NameColumn tests", () => {

    // MOCKING DATA
    const nurses = [];
    for ( let i = 0; i < 11; i++ ) 
        nurses.push(mockedNurse);

    it("Matches the Snapshot", () => {
        // RENDERING
        const view         = <NameColumn nurses={nurses} />;
        const rendered     = renderer.create(view);
        const renderedJSON = rendered.toJSON();

        // ASSERTION
        expect( renderedJSON ).toMatchSnapshot();
    });

    it("Has a FlatList with the expected items", () => {
        // EXPECTED OUTPUT
        const expectedLength = nurses.length;

        // RENDERING
        const nC       = new NameColumn({ nurses });
        const rendered = nC.render();

        // OBTAINING THE ITEMS
        const list  = rendered.props.children;
        const items = list.props.data;

        // ASSERTION
        expect(items.length).toBe(expectedLength);
        items.forEach( i => {
            expect( i ).toBe('Ana');
        });
    });

    it("RenderItem method works properly in the FlatList", () => {
        // EXPECTED OUTPUT
        // const expectedView = 
        //     ( <Text style={{
        //         allowFontScaling={false},
        //         fontFamily: 'big-noodle-titling',
        //         fontSize: 30,
        //         paddingBottom: 10,}}>
        //         { mockedNurse.name }
        //     </Text> );

        // RENDERING
        const nC       = new NameColumn({ nurses });
        const rendered = nC.render();

        // TESTED METHOD EXECUTION
        const list       = rendered.props.children;
        const actualView = list.props.renderItem({item: mockedNurse.name});

        // ASSERTION
        // expect( actualView ).toEqual(expectedView);
        expect( actualView ).toMatchSnapshot();
    })
});