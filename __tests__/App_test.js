import React from 'react';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import renderer from 'react-test-renderer';
import App from '../App';

it('App renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
});
