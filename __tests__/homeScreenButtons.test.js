// import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import React from 'react';
import renderer from 'react-test-renderer';
import GlobalButton from '../components/homeComponents/globalButton';
import MidBlueButton from '../components/homeComponents/midBlueButton';
import MidYellowButton  from '../components/homeComponents/midYellowButton';


jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

it('GlobalButton renders correctly', () => {
    const rendered = renderer.create(<GlobalButton />).toJSON();
    expect(rendered).toMatchSnapshot();
});

it('MidBlueButton renders correctly', () => {
    const rendered = renderer.create(<MidBlueButton />).toJSON();
    expect(rendered).toMatchSnapshot();
});

it('GlobalButton renders correctly', () => {
    const rendered = renderer.create(<MidYellowButton />).toJSON();
    expect(rendered).toMatchSnapshot();
});



