import mockedNurses from '../../components/__mocks__/mockedUsers'
import PressableTurnTable from '../../components/chooseChangeComponents/pressableTurnTable';
import PressableTurnColumn from '../../components/chooseChangeComponents/pressableTurnColumn';
jest.mock('../../components/dateUtils');
jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

describe("Methods", () => {
    it("renderItem works properly", () => {
        const mockedItem = {
            item: 0
        };

        const p = new PressableTurnTable({onPressFn: () => {}});
        p.state = {
            nurses: mockedNurses
        }
        const result = p.renderItem(mockedItem);

        expect( result ).toBeDefined();
        expect( result.props.children.type ).toBe(PressableTurnColumn);
    });
})