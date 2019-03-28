import React from 'react';
import renderer from 'react-test-renderer';
import PrimaryButton from '../components/loginComponents/primaryButtonComponent';
import RoundedInput from '../components/loginComponents/inputComponent';

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

function simulateChangeText(renderedObject) {
    renderedObject
        .props
        .onChangeText();
}

describe('PrimaryButton', () => {
    it('Renders correctly', () => {
        const rendered = renderer.create(<PrimaryButton />).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    it('Calls the OnPressFunction', () => {
        const mockedFn = jest.fn(() => {});
        const rendered = renderer.create(
            <PrimaryButton onPressFunction={mockedFn}/>
        ).toJSON();

        simulatePress(rendered);

        expect(mockedFn).toBeCalled();
    });
});

describe('Rounded Input', () => {
    it('Renders correctly', () => {
        const rendered = renderer.create(<RoundedInput />).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    it('Calls the OnChangeFunction', () => {
        const mockedFn = jest.fn(() => {});
        const rendered = renderer.create(
            <RoundedInput onChangeFunction={mockedFn}/>
        ).toJSON();

        simulateChangeText(rendered.children[1]);

        expect(mockedFn).toBeCalled();
    });
});