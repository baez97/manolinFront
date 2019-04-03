// import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import React from 'react';
import renderer from 'react-test-renderer';
import GlobalButton from '../../components/homeComponents/globalButton';
import MidBlueButton from '../../components/homeComponents/midBlueButton';
import MidYellowButton  from '../../components/homeComponents/midYellowButton';


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

describe('GlobalButton', () => {
    it('Renders correctly', () => {
        const rendered = renderer.create(<GlobalButton />).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    it('OnPress method calls the onPressFn', () => {
        const mockedFn = jest.fn();
        const rendered = renderer.create(
            <GlobalButton onPressFn={mockedFn}/>
        ).toJSON();

        simulatePress(rendered);

        expect(mockedFn).toBeCalled();
    });
});

describe('MidBlueButton', () => {
    it('Renders correctly', () => {
        const rendered = renderer.create(<MidBlueButton />).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    it('OnPress method calls the onPressFn', () => {
        const mockedFn = jest.fn(() => {});
        const rendered = renderer.create(
            <MidBlueButton onPressFn={mockedFn}/>
        ).toJSON();

        simulatePress(rendered);

        expect(mockedFn).toBeCalled();
    });
});

describe('MidYellowButton', () => {
    it('Renders correctly', () => {
        const rendered = renderer.create(<MidYellowButton />).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    it('OnPress method calls the onPressFn', () => {
        const mockedFn = jest.fn(() => {});
        const rendered = renderer.create(
            <MidYellowButton onPressFn={mockedFn}/>
        ).toJSON();

        simulatePress(rendered);

        expect(mockedFn).toBeCalled();
    });
});


