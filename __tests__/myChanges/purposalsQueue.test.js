import React from 'react';
import renderer from 'react-test-renderer';
import DateUtils from '../../components/dateUtils';
const dateUtils = new DateUtils();
import { Text } from 'react-native';
import PurposalsQueue from 
    '../../components/myChangesComponents/purposalsQueue';
import PurposalView from 
    '../../components/myChangesComponents/purposalView';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

jest.mock("../../components/dateUtils");

const mockedChanges = [
    {
        owner : "Ana",
        type  : "change",
        accepted: false,
        purposals: [],
        day: 2,
        month: 2,
        year: 2019,
        weekday: 2

    },
    {
        owner : "Ana",
        type  : "change",
        accepted: false,
        purposals: [],
        day: 3,
        month: 3,
        year: 2019,
        weekday: 3
    },
    {
        owner : "Ana",
        type  : "change",
        accepted: true,
        purposals: [],
        day: 3,
        month: 3,
        year: 2019,
        weekday: 3
    },
];

describe("PurposalsQueue", () => {
    describe("Methods", () => {

        const mockedProps = {
            changes: mockedChanges,
            name: "Ana"
        };

        const p = new PurposalsQueue(mockedProps);

        it("Constructor sets the state with the correct objects", () => {
            expect( p.state.changes ).toEqual(mockedChanges);
            expect( Object.keys(p.data).length ).toBe(2);
        });

        it("GetTitle works fine", () => {
            const expected = "Propuestas para el 2 por la mañana";

            const current = p.getTitle({day:2, turn: "M"});

            expect( current ).toBe(expected);
        });

        it("KeyExtractor works fine", () => {
            const mockedItem = { _id: "1" };
            const current = p.keyExtractor(mockedItem, 0);
            expect( current ).toBe(mockedItem._id);
        });

        it("RenderItem works fine", () => {
            const param = {
                item: {},
                index: 0,
                section: {
                    change: {}
                }
            };

            const current = p.renderItem(param);

            expect( current.type ).toBe(PurposalView);
        });

        it("RenderSectionHeader returns text", () => {
            const param = {
                section: {
                    title: "MOCKEDTITLE"
                }
            };

            const current = p.renderSectionHeader(param);

            expect( current.type ).toBe(Text);
        });

        it("RenderEmptySection returns text when there is no data", () => {
            const param = {
                section: {
                    data: []
                }
            };

            const current = p.renderEmptySection(param);

            expect( current.type ).toBe(Text);
        });

        it("RenderEmptySection returns undefined when data is not empty", () => {
            const param = {
                section: {
                    data: ["SOME_RANDOM_OBJECT"]
                }
            };

            const current = p.renderEmptySection(param);

            expect( current ).toBeUndefined();
        });
    });

    describe("View", () => {
        it("Matches the Snapshot when there are no purposals", () => {
            const view = <PurposalsQueue changes={[]} name="Ana"/>;
            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });

        it("Matches the Snapshot when there are purposals", () => {
            const view = <PurposalsQueue changes={mockedChanges} name="Ana"/>;
            const rendered = renderer.create(view);
            const renderedJson = rendered.toJSON();

            expect( renderedJson ).toMatchSnapshot();
        });
    });
});